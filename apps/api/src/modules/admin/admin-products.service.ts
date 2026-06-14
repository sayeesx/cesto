import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProductDto, UpdateProductDto } from './dto/product.dto';

@Injectable()
export class AdminProductsService {
  constructor(private prisma: PrismaService) {}

  async listProducts(page = 1, limit = 20, search?: string) {
    const skip = (page - 1) * limit;
    const where: any = search
      ? { OR: [{ name: { contains: search, mode: 'insensitive' } }] }
      : {};

    const [products, total] = await Promise.all([
      this.prisma.product.findMany({
        where,
        include: {
          images: { orderBy: { order: 'asc' }, take: 1 },
          categories: { include: { category: { select: { id: true, name: true, slug: true } } } },
          occasions: { include: { occasion: { select: { id: true, name: true, slug: true } } } },
        },
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
      this.prisma.product.count({ where }),
    ]);

    return {
      products: products.map((p) => ({
        ...p,
        imageUrl: p.images[0]?.url || null,
        categoryNames: p.categories.map((c) => c.category.name),
        occasionNames: p.occasions.map((o) => o.occasion.name),
      })),
      total,
      page,
      totalPages: Math.ceil(total / limit),
    };
  }

  async getProduct(id: string) {
    const p = await this.prisma.product.findUnique({
      where: { id },
      include: {
        images: { orderBy: { order: 'asc' } },
        categories: { include: { category: true } },
        occasions: { include: { occasion: true } },
      },
    });
    if (!p) throw new NotFoundException('Product not found');
    return p;
  }

  async createProduct(dto: CreateProductDto, adminId: string) {
    // Check slug uniqueness
    const existing = await this.prisma.product.findUnique({ where: { slug: dto.slug } });
    if (existing) throw new ConflictException('A product with this slug already exists');

    const product = await this.prisma.product.create({
      data: {
        name: dto.name,
        slug: dto.slug,
        description: dto.description,
        whatsInside: dto.whatsInside,
        price: dto.price,
        compareAtPrice: dto.compareAtPrice,
        stock: dto.stock ?? 0,
        deliveryEstimate: dto.deliveryEstimate,
        sameDayAvailable: dto.sameDayAvailable ?? false,
        isPersonalizable: dto.isPersonalizable ?? false,
        isActive: dto.isActive ?? true,
        tags: dto.tags ?? [],
        // Create images
        images: dto.imageUrls?.length
          ? {
              create: dto.imageUrls.map((url, i) => ({
                url,
                isPrimary: i === 0,
                order: i,
              })),
            }
          : undefined,
        // Link categories
        categories: dto.categoryIds?.length
          ? {
              create: dto.categoryIds.map((categoryId) => ({ categoryId })),
            }
          : undefined,
        // Link occasions
        occasions: dto.occasionIds?.length
          ? {
              create: dto.occasionIds.map((occasionId) => ({ occasionId })),
            }
          : undefined,
      },
      include: {
        images: true,
        categories: { include: { category: true } },
        occasions: { include: { occasion: true } },
      },
    });

    await this.prisma.auditLog.create({
      data: {
        userId: adminId,
        action: 'CREATE_PRODUCT',
        entityType: 'Product',
        entityId: product.id,
        newValue: { name: product.name, slug: product.slug },
      },
    });

    return product;
  }

  async updateProduct(id: string, dto: UpdateProductDto, adminId: string) {
    const product = await this.prisma.product.findUnique({ where: { id } });
    if (!product) throw new NotFoundException('Product not found');

    // Slug uniqueness check if changing
    if (dto.slug && dto.slug !== product.slug) {
      const existing = await this.prisma.product.findUnique({ where: { slug: dto.slug } });
      if (existing) throw new ConflictException('A product with this slug already exists');
    }

    // Run category/occasion updates in transaction
    const updated = await this.prisma.$transaction(async (tx) => {
      // Update base product
      const p = await tx.product.update({
        where: { id },
        data: {
          name: dto.name,
          slug: dto.slug,
          description: dto.description,
          whatsInside: dto.whatsInside,
          price: dto.price,
          compareAtPrice: dto.compareAtPrice,
          stock: dto.stock,
          deliveryEstimate: dto.deliveryEstimate,
          sameDayAvailable: dto.sameDayAvailable,
          isPersonalizable: dto.isPersonalizable,
          isActive: dto.isActive,
          tags: dto.tags,
        },
      });

      // Replace images if provided
      if (dto.imageUrls !== undefined) {
        await tx.productImage.deleteMany({ where: { productId: id } });
        if (dto.imageUrls.length > 0) {
          await tx.productImage.createMany({
            data: dto.imageUrls.map((url, i) => ({
              productId: id,
              url,
              isPrimary: i === 0,
              order: i,
            })),
          });
        }
      }

      // Replace categories if provided
      if (dto.categoryIds !== undefined) {
        await tx.productCategory.deleteMany({ where: { productId: id } });
        if (dto.categoryIds.length > 0) {
          await tx.productCategory.createMany({
            data: dto.categoryIds.map((categoryId) => ({ productId: id, categoryId })),
          });
        }
      }

      // Replace occasions if provided
      if (dto.occasionIds !== undefined) {
        await tx.productOccasion.deleteMany({ where: { productId: id } });
        if (dto.occasionIds.length > 0) {
          await tx.productOccasion.createMany({
            data: dto.occasionIds.map((occasionId) => ({ productId: id, occasionId })),
          });
        }
      }

      return tx.product.findUnique({
        where: { id },
        include: {
          images: { orderBy: { order: 'asc' } },
          categories: { include: { category: true } },
          occasions: { include: { occasion: true } },
        },
      });
    });

    await this.prisma.auditLog.create({
      data: {
        userId: adminId,
        action: 'UPDATE_PRODUCT',
        entityType: 'Product',
        entityId: id,
        newValue: dto as any,
      },
    });

    return updated;
  }

  async deleteProduct(id: string, adminId: string) {
    const product = await this.prisma.product.findUnique({ where: { id } });
    if (!product) throw new NotFoundException('Product not found');

    // Soft delete — just mark inactive
    await this.prisma.product.update({
      where: { id },
      data: { isActive: false },
    });

    await this.prisma.auditLog.create({
      data: {
        userId: adminId,
        action: 'DELETE_PRODUCT',
        entityType: 'Product',
        entityId: id,
        oldValue: { name: product.name },
      },
    });

    return { success: true };
  }
}
