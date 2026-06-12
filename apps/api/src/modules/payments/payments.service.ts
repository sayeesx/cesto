import { Injectable, BadRequestException, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AuditService } from '../audit/audit.service';
import { OrdersService } from '../orders/orders.service';
import * as crypto from 'crypto';
import { OrderStatus, PaymentStatus } from '@prisma/client';

@Injectable()
export class PaymentsService {
  constructor(
    private prisma: PrismaService,
    private audit: AuditService,
    private ordersService: OrdersService,
  ) {}

  async createRazorpayOrder(orderId: string, userId?: string) {
    const order = await this.prisma.order.findUnique({ where: { id: orderId } });
    if (!order) throw new NotFoundException('Order not found');

    // In a real implementation:
    // const rpOrder = await razorpay.orders.create({ ... })
    const mockRazorpayOrderId = `order_${crypto.randomBytes(12).toString('hex')}`;

    const payment = await this.prisma.payment.create({
      data: {
        orderId: order.id,
        razorpayOrderId: mockRazorpayOrderId,
        amount: order.finalAmount,
        status: PaymentStatus.PENDING,
      },
    });

    await this.audit.log({
      userId,
      action: 'PAYMENT_ORDER_CREATE',
      entityType: 'Payment',
      entityId: payment.id,
      newValue: { razorpayOrderId: mockRazorpayOrderId },
    });

    return {
      razorpayOrderId: payment.razorpayOrderId,
      amount: payment.amount,
      currency: 'INR',
      orderId: order.id,
    };
  }

  async verifyPayment(dto: {
    razorpayOrderId: string;
    razorpayPaymentId: string;
    razorpaySignature: string;
  }, userId?: string) {
    const secret = process.env.RAZORPAY_KEY_SECRET;
    if (!secret) throw new BadRequestException('RAZORPAY_KEY_SECRET not configured');
    
    // 1. Signature Verification
    const body = dto.razorpayOrderId + '|' + dto.razorpayPaymentId;
    const expectedSignature = crypto
      .createHmac('sha256', secret)
      .update(body)
      .digest('hex');

    if (expectedSignature !== dto.razorpaySignature) {
      throw new BadRequestException('Invalid signature');
    }

    // 2. Process Payment Confirmation
    return this.processSuccessfulPayment(dto.razorpayOrderId, dto.razorpayPaymentId, 'manual_verification', userId);
  }

  async handleWebhook(rawBody: string, signature: string, eventId: string) {
    const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET;
    if (!webhookSecret) throw new BadRequestException('RAZORPAY_WEBHOOK_SECRET not configured');

    // 1. Webhook Signature Verification
    const expectedSignature = crypto
      .createHmac('sha256', webhookSecret)
      .update(rawBody)
      .digest('hex');

    if (expectedSignature !== signature) {
      throw new BadRequestException('Invalid webhook signature');
    }

    const payload = JSON.parse(rawBody);
    const eventType = payload.event;

    // 2. Idempotency Check
    const existingEvent = await this.prisma.paymentWebhookEvent.findUnique({
      where: { razorpayEventId: eventId },
    });

    if (existingEvent && existingEvent.processed) {
      return { status: 'already_processed' };
    }

    // 3. Log the event
    const webhookEvent = await this.prisma.paymentWebhookEvent.upsert({
      where: { razorpayEventId: eventId },
      update: {},
      create: {
        razorpayEventId: eventId,
        eventType,
        payload,
      },
    });

    // 4. Process Specific Events
    try {
      if (eventType === 'payment.captured') {
        const paymentData = payload.payload.payment.entity;
        await this.processSuccessfulPayment(paymentData.order_id, paymentData.id, 'webhook', 'SYSTEM');
      }

      await this.prisma.paymentWebhookEvent.update({
        where: { id: webhookEvent.id },
        data: { processed: true },
      });
    } catch (error) {
      await this.prisma.paymentWebhookEvent.update({
        where: { id: webhookEvent.id },
        data: { error: error.message },
      });
      console.error('Webhook processing failed:', error);
    }

    return { status: 'ok' };
  }

  private async processSuccessfulPayment(rpOrderId: string, rpPaymentId: string, source: string, userId?: string) {
    const payment = await this.prisma.payment.findUnique({
      where: { razorpayOrderId: rpOrderId },
      include: { order: true }
    });

    if (!payment) throw new NotFoundException('Payment record not found');
    if (payment.status === PaymentStatus.SUCCESS) return { status: 'already_paid', orderId: payment.orderId };

    const result = await this.prisma.$transaction(async (tx) => {
      // Update Payment
      const updatedPayment = await tx.payment.update({
        where: { id: payment.id },
        data: {
          status: PaymentStatus.SUCCESS,
          razorpayPaymentId: rpPaymentId,
          method: source,
        },
      });

      // Update Order Status via OrdersService logic (historically)
      // Since we are in a transaction, we'll do it manually or call a method that accepts tx
      // For now, manual update with history
      await tx.order.update({
        where: { id: payment.orderId },
        data: { status: OrderStatus.PAYMENT_CONFIRMED },
      });

      await tx.orderStatusHistory.create({
        data: {
          orderId: payment.orderId,
          status: OrderStatus.PAYMENT_CONFIRMED,
          notes: `Payment confirmed via ${source}. Razorpay ID: ${rpPaymentId}`,
        },
      });

      // Release reserved stock (logic from previous service plan)
      const orderItems = await tx.orderItem.findMany({ where: { orderId: payment.orderId } });
      for (const item of orderItems) {
          await tx.product.update({
              where: { id: item.productId },
              data: { reservedStock: { decrement: item.quantity } }
          });
      }

      return updatedPayment;
    });

    await this.audit.log({
      userId,
      action: 'PAYMENT_SUCCESS',
      entityType: 'Order',
      entityId: payment.orderId,
      newValue: { source, rpPaymentId },
    });

    return { status: 'success', orderId: payment.orderId };
  }
}
