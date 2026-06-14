import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCategoryDto, UpdateCategoryDto } from './dto/category.dto';

@Injectable()
export class AdminCategoriesService {
  constructor(private prisma: PrismaService) {}

  async listCategories() {
    const [categories, occasions] = await Promise.all([
      this.prisma.category.findMany({
        orderBy: { name: 'asc' },
        include: { _count: { select: { products: true } } },
      }),
      this.prisma.occasion.findMany({
        orderBy: { name: 'asc' },
        include: { _count: { select: { products: true } } },
      }),
    ]);
    return { categories, occasions };
  }

  async createCategory(dto: CreateCategoryDto, adminId: string) {
    const existing = await this.prisma.category.findUnique({ where: { slug: dto.slug } });
    if (existing) throw new ConflictException('Category with this slug already exists');

    const cat = await this.prisma.category.create({ data: dto });
    await this.prisma.auditLog.create({
      data: { userId: adminId, action: 'CREATE_CATEGORY', entityType: 'Category', entityId: cat.id, newValue: dto as any },
    });
    return cat;
  }

  async updateCategory(id: string, dto: UpdateCategoryDto, adminId: string) {
    const cat = await this.prisma.category.findUnique({ where: { id } });
    if (!cat) throw new NotFoundException('Category not found');

    const updated = await this.prisma.category.update({ where: { id }, data: dto });
    await this.prisma.auditLog.create({
      data: { userId: adminId, action: 'UPDATE_CATEGORY', entityType: 'Category', entityId: id, newValue: dto as any },
    });
    return updated;
  }

  async deleteCategory(id: string, adminId: string) {
    const cat = await this.prisma.category.findUnique({ where: { id } });
    if (!cat) throw new NotFoundException('Category not found');

    await this.prisma.category.update({ where: { id }, data: { isActive: false } });
    await this.prisma.auditLog.create({
      data: { userId: adminId, action: 'DELETE_CATEGORY', entityType: 'Category', entityId: id },
    });
    return { success: true };
  }
}
