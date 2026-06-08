import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CartService } from '../cart/cart.service';

@Injectable()
export class OrdersService {
  constructor(
    private prisma: PrismaService,
    private cartService: CartService,
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
  }) {
    const cart = await this.prisma.cart.findUnique({
      where: { id: dto.cartId },
      include: { items: { include: { product: true } } },
    });

    if (!cart || cart.items.length === 0) {
      throw new BadRequestException('Cart is empty');
    }

    let itemsTotal = 0;
    const orderItemsData: any[] = [];

    // Verify stock and calculate total
    for (const item of cart.items) {
      if (item.product.stock < item.quantity) {
        throw new BadRequestException(`Not enough stock for ${item.product.name}`);
      }
      itemsTotal += item.product.price * item.quantity;
      orderItemsData.push({
        productId: item.productId,
        quantity: item.quantity,
        priceAt: item.product.price,
        variantData: item.variantData,
      });
    }

    let deliveryFee = 0;
    if (dto.deliverySlotId) {
      const slot = await this.prisma.deliverySlot.findUnique({ where: { id: dto.deliverySlotId } });
      if (slot) deliveryFee = slot.fee;
    }

    const finalAmount = itemsTotal + deliveryFee;

    // Use transaction to create order, clear cart, and decrement stock
    const order = await this.prisma.$transaction(async (tx) => {
      // 1. Create Order
      const newOrder = await tx.order.create({
        data: {
          orderNumber: `CESTO-${Date.now()}`,
          userId: dto.userId,
          status: 'PAYMENT_PENDING',
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
            create: orderItemsData,
          },
        },
      });

      // 2. Decrement Stock
      for (const item of orderItemsData) {
        await tx.product.update({
          where: { id: item.productId },
          data: { stock: { decrement: item.quantity } },
        });
      }

      // 3. Clear Cart
      await tx.cartItem.deleteMany({ where: { cartId: dto.cartId } });

      return newOrder;
    });

    return order;
  }

  async getOrder(id: string) {
    const order = await this.prisma.order.findUnique({
      where: { id },
      include: {
        items: { include: { product: true } },
        payments: true,
        deliverySlot: true,
      },
    });

    if (!order) throw new NotFoundException('Order not found');
    return order;
  }
}
