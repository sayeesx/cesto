import { Injectable, BadRequestException, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AuditService } from '../audit/audit.service';
import { OrderStatus } from '@prisma/client';

@Injectable()
export class OrdersService {
  constructor(
    private prisma: PrismaService,
    private audit: AuditService,
  ) {}

  async createOrder(dto: {
    userId?: string;
    cartId: string;
    recipientName: string;
    recipientPhone: string;
    deliveryAddress: any;
    deliverySlotId?: string;
    deliveryDate: Date;
    giftMessage?: string;
    ipAddress?: string;
    userAgent?: string;
  }) {
    // 1. Fetch Cart with Items
    const cart = await this.prisma.cart.findUnique({
      where: { id: dto.cartId },
      include: { items: { include: { product: true } } },
    });

    if (!cart || cart.items.length === 0) {
      throw new BadRequestException('Cart is empty or does not exist');
    }

    // 2. Validate Stock and Calculate Totals
    let itemsTotal = 0;
    for (const item of cart.items) {
      if (item.product.stock < item.quantity) {
        throw new BadRequestException(`Insufficient stock for ${item.product.name}. Available: ${item.product.stock}`);
      }
      itemsTotal += item.product.price * item.quantity;
    }

    let deliveryFee = 0;
    if (dto.deliverySlotId) {
      const slot = await this.prisma.deliverySlot.findUnique({ where: { id: dto.deliverySlotId } });
      if (slot) deliveryFee = slot.fee;
    }

    const finalAmount = itemsTotal + deliveryFee;

    // 3. Execute Transaction
    try {
      const order = await this.prisma.$transaction(async (tx) => {
        // A. Row-level locking for products to prevent race conditions
        for (const item of cart.items) {
          // Using raw SQL for SELECT FOR UPDATE in Prisma
          await tx.$executeRaw`SELECT * FROM "Product" WHERE id = ${item.productId} FOR UPDATE`;
          
          // Double check stock after lock
          const p = await tx.product.findUnique({ where: { id: item.productId } });
          if (!p || p.stock < item.quantity) {
            throw new BadRequestException(`Stock changed for ${p?.name || 'product'}. Please try again.`);
          }
        }

        // B. Create Order
        const newOrder = await tx.order.create({
          data: {
            orderNumber: `CESTO-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
            userId: dto.userId,
            status: OrderStatus.PAYMENT_PENDING,
            totalAmount: itemsTotal,
            deliveryFee,
            discount: 0,
            finalAmount,
            recipientName: dto.recipientName,
            recipientPhone: dto.recipientPhone,
            deliveryAddress: dto.deliveryAddress,
            deliveryDate: new Date(dto.deliveryDate),
            deliverySlotId: dto.deliverySlotId,
            giftMessage: dto.giftMessage,
            items: {
              create: cart.items.map(item => ({
                product: { connect: { id: item.productId } },
                quantity: item.quantity,
                priceAt: item.product.price,
                variantData: item.variantData ? (item.variantData as any) : undefined,
              })),
            },
          },
        });

        // C. Update Stock & Log Movement
        for (const item of cart.items) {
          await tx.product.update({
            where: { id: item.productId },
            data: { 
              stock: { decrement: item.quantity },
              reservedStock: { increment: item.quantity }
            },
          });

          await tx.inventoryMovement.create({
            data: {
              productId: item.productId,
              quantity: -item.quantity,
              type: 'ORDER_RESERVATION',
              referenceId: newOrder.id,
            },
          });
        }

        // D. Create Status History
        await tx.orderStatusHistory.create({
          data: {
            orderId: newOrder.id,
            status: OrderStatus.PAYMENT_PENDING,
            notes: 'Order initiated, awaiting payment.',
          },
        });

        // E. Clear Cart
        await tx.cartItem.deleteMany({ where: { cartId: dto.cartId } });

        return newOrder;
      }, {
        timeout: 10000, // 10s timeout for safety
      });

      // 4. Async Audit Log (Outside transaction to not block)
      this.audit.log({
        userId: dto.userId,
        action: 'CREATE_ORDER',
        entityType: 'Order',
        entityId: order.id,
        newValue: order,
        ipAddress: dto.ipAddress,
        userAgent: dto.userAgent,
      });

      return order;
    } catch (error) {
      if (error instanceof BadRequestException) throw error;
      console.error('Checkout Transaction Failed:', error);
      throw new InternalServerErrorException('Checkout failed. Please try again.');
    }
  }

  async listOrders(userId?: string) {
    const where = userId ? { userId } : {};
    return this.prisma.order.findMany({
      where,
      include: {
        items: { include: { product: true } },
        payments: true,
        statusHistory: { orderBy: { createdAt: 'desc' }, take: 1 },
      },
      orderBy: { createdAt: 'desc' },
      take: 50,
    });
  }

  async getOrder(id: string) {
    const order = await this.prisma.order.findUnique({
      where: { id },
      include: {
        items: { include: { product: true } },
        payments: true,
        deliverySlot: true,
        statusHistory: { orderBy: { createdAt: 'desc' } },
      },
    });

    if (!order) throw new NotFoundException('Order not found');
    return order;
  }

  async updateOrderStatus(orderId: string, status: OrderStatus, actorId?: string, notes?: string) {
    const oldOrder = await this.prisma.order.findUnique({ where: { id: orderId } });
    if (!oldOrder) throw new NotFoundException('Order not found');

    const updatedOrder = await this.prisma.$transaction(async (tx) => {
      const order = await tx.order.update({
        where: { id: orderId },
        data: { status },
      });

      await tx.orderStatusHistory.create({
        data: {
          orderId,
          status,
          notes,
          actorId,
        },
      });

      // Special logic for cancellations
      if (status === OrderStatus.CANCELLED) {
        const items = await tx.orderItem.findMany({ where: { orderId } });
        for (const item of items) {
          await tx.product.update({
            where: { id: item.productId },
            data: { 
              stock: { increment: item.quantity },
              reservedStock: { decrement: item.quantity }
            },
          });
          await tx.inventoryMovement.create({
            data: {
              productId: item.productId,
              quantity: item.quantity,
              type: 'ORDER_CANCELLED_RESTORE',
              referenceId: orderId,
            },
          });
        }
      }

      // Logic for confirming payment
      if (status === OrderStatus.PAYMENT_CONFIRMED) {
          const items = await tx.orderItem.findMany({ where: { orderId } });
          for (const item of items) {
              await tx.product.update({
                  where: { id: item.productId },
                  data: {
                      reservedStock: { decrement: item.quantity }
                  }
              });
          }
      }

      return order;
    });

    this.audit.log({
      userId: actorId,
      action: 'UPDATE_ORDER_STATUS',
      entityType: 'Order',
      entityId: orderId,
      oldValue: { status: oldOrder.status },
      newValue: { status },
    });

    return updatedOrder;
  }
}
