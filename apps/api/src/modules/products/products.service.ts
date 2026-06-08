import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  async findMany(query: any) {
    const { category, occasion, relationship, search, maxPrice } = query;

    const where: Prisma.ProductWhereInput = { isActive: true };

    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
      ];
    }
    if (maxPrice) {
      where.price = { lte: Number(maxPrice) };
    }
    if (category) {
      where.categories = { some: { category: { slug: category } } };
    }
    if (occasion) {
      where.occasions = { some: { occasion: { slug: occasion } } };
    }
    if (relationship) {
      where.relationships = { some: { relationship: { slug: relationship } } };
    }

    return this.prisma.product.findMany({
      where,
      include: {
        images: { orderBy: { order: 'asc' } },
      },
      take: 20,
    });
  }

  async findOne(slug: string) {
    const product = await this.prisma.product.findUnique({
      where: { slug },
      include: {
        images: { orderBy: { order: 'asc' } },
        categories: { include: { category: true } },
        occasions: { include: { occasion: true } },
        relationships: { include: { relationship: true } },
      },
    });

    if (!product) throw new NotFoundException('Product not found');
    return product;
  }
}
