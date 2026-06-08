import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CartService {
  constructor(private prisma: PrismaService) {}

  async getCart(userId?: string, session?: string) {
    if (!userId && !session) throw new BadRequestException('Provide user id or session');

    const where = userId ? { userId } : { session };
    let cart = await this.prisma.cart.findFirst({
      where,
      include: {
        items: {
          include: { product: true },
        },
      },
    });

    if (!cart) {
      cart = await this.prisma.cart.create({
        data: { userId, session },
        include: { items: { include: { product: true } } },
      });
    }
    return cart;
  }

  async addItem(cartId: string, productId: string, quantity: number, variantData?: any) {
    const product = await this.prisma.product.findUnique({ where: { id: productId } });
    if (!product || !product.isActive) throw new NotFoundException('Product not found / active');
    
    if (product.stock < quantity) {
      throw new BadRequestException('Not enough stock available');
    }

    const existingItem = await this.prisma.cartItem.findFirst({
      where: { cartId, productId },
    });

    if (existingItem) {
      return this.prisma.cartItem.update({
        where: { id: existingItem.id },
        data: { quantity: existingItem.quantity + quantity, variantData },
      });
    }

    return this.prisma.cartItem.create({
      data: {
        cartId,
        productId,
        quantity,
        variantData,
      },
    });
  }

  async updateItem(itemId: string, quantity: number) {
    return this.prisma.cartItem.update({
      where: { id: itemId },
      data: { quantity },
    });
  }

  async removeItem(itemId: string) {
    return this.prisma.cartItem.delete({
      where: { id: itemId },
    });
  }

  async clearCart(cartId: string) {
    return this.prisma.cartItem.deleteMany({
      where: { cartId },
    });
  }
}
