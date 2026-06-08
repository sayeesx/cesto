import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as crypto from 'crypto';

@Injectable()
export class PaymentsService {
  constructor(private prisma: PrismaService) {}

  /**
   * Create a Razorpay order for a given internal order.
   * In production, this calls the Razorpay API.
   * For now, it creates a payment record in PENDING state.
   */
  async createRazorpayOrder(orderId: string) {
    const order = await this.prisma.order.findUnique({ where: { id: orderId } });
    if (!order) throw new NotFoundException('Order not found');

    // TODO: Replace with actual Razorpay SDK call
    // const Razorpay = require('razorpay');
    // const instance = new Razorpay({
    //   key_id: process.env.RAZORPAY_KEY_ID,
    //   key_secret: process.env.RAZORPAY_KEY_SECRET,
    // });
    // const rpOrder = await instance.orders.create({
    //   amount: order.finalAmount * 100, // paise
    //   currency: 'INR',
    //   receipt: order.orderNumber,
    // });

    const mockRazorpayOrderId = `order_${crypto.randomBytes(12).toString('hex')}`;

    const payment = await this.prisma.payment.create({
      data: {
        orderId: order.id,
        razorpayOrderId: mockRazorpayOrderId,
        amount: order.finalAmount,
        status: 'PENDING',
      },
    });

    return {
      razorpayOrderId: payment.razorpayOrderId,
      amount: payment.amount,
      currency: 'INR',
      orderId: order.id,
      orderNumber: order.orderNumber,
    };
  }

  /**
   * Verify Razorpay payment signature.
   * NEVER trust frontend for payment confirmation.
   */
  async verifyPayment(dto: {
    razorpayOrderId: string;
    razorpayPaymentId: string;
    razorpaySignature: string;
  }) {
    const secret = process.env.RAZORPAY_KEY_SECRET;
    if (!secret) throw new BadRequestException('Payment config missing');

    const body = dto.razorpayOrderId + '|' + dto.razorpayPaymentId;
    const expectedSignature = crypto
      .createHmac('sha256', secret)
      .update(body)
      .digest('hex');

    if (expectedSignature !== dto.razorpaySignature) {
      throw new BadRequestException('Invalid payment signature');
    }

    // Update payment record
    const payment = await this.prisma.payment.update({
      where: { razorpayOrderId: dto.razorpayOrderId },
      data: {
        razorpayPaymentId: dto.razorpayPaymentId,
        status: 'SUCCESS',
      },
    });

    // Update order status
    await this.prisma.order.update({
      where: { id: payment.orderId },
      data: { status: 'PAYMENT_CONFIRMED' },
    });

    return { verified: true, orderId: payment.orderId };
  }

  /**
   * Handle Razorpay webhook events.
   * Verifies webhook signature before processing.
   */
  async handleWebhook(body: any, signature: string) {
    const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET;
    if (!webhookSecret) throw new BadRequestException('Webhook secret not configured');

    const expectedSignature = crypto
      .createHmac('sha256', webhookSecret)
      .update(JSON.stringify(body))
      .digest('hex');

    if (expectedSignature !== signature) {
      throw new BadRequestException('Invalid webhook signature');
    }

    const event = body.event;
    const paymentEntity = body.payload?.payment?.entity;

    if (event === 'payment.captured' && paymentEntity) {
      await this.prisma.payment.updateMany({
        where: { razorpayOrderId: paymentEntity.order_id },
        data: {
          razorpayPaymentId: paymentEntity.id,
          status: 'SUCCESS',
          method: paymentEntity.method,
        },
      });

      const payment = await this.prisma.payment.findFirst({
        where: { razorpayOrderId: paymentEntity.order_id },
      });

      if (payment) {
        await this.prisma.order.update({
          where: { id: payment.orderId },
          data: { status: 'PAYMENT_CONFIRMED' },
        });
      }
    }

    return { received: true };
  }
}
