import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AdminService {
  constructor(private prisma: PrismaService) {}

  async getDashboardStats() {
    const [
      totalOrders,
      pendingOrders,
      confirmedOrders,
      totalProducts,
      lowStockProducts,
      totalCustomers,
      totalRevenue,
    ] = await Promise.all([
      this.prisma.order.count(),
      this.prisma.order.count({ where: { status: 'PAYMENT_PENDING' } }),
      this.prisma.order.count({ where: { status: 'PAYMENT_CONFIRMED' } }),
      this.prisma.product.count({ where: { isActive: true } }),
      this.prisma.product.count({ where: { stock: { lte: 5 }, isActive: true } }),
      this.prisma.user.count({ where: { role: 'CUSTOMER' } }),
      this.prisma.payment.aggregate({
        _sum: { amount: true },
        where: { status: 'SUCCESS' },
      }),
    ]);

    return {
      totalOrders,
      pendingOrders,
      confirmedOrders,
      totalProducts,
      lowStockProducts,
      totalCustomers,
      totalRevenue: totalRevenue._sum.amount || 0,
    };
  }

  async getOrders(status?: string, page = 1, limit = 20) {
    const where = status ? { status: status as any } : {};
    const [orders, total] = await Promise.all([
      this.prisma.order.findMany({
        where,
        include: {
          items: { include: { product: true } },
          payments: true,
          user: { select: { id: true, email: true, name: true } },
        },
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * limit,
        take: limit,
      }),
      this.prisma.order.count({ where }),
    ]);

    return { orders, total, page, limit, totalPages: Math.ceil(total / limit) };
  }

  async updateOrderStatus(orderId: string, status: string, userId?: string) {
    const order = await this.prisma.order.update({
      where: { id: orderId },
      data: { status: status as any },
    });

    // Create audit log
    await this.prisma.auditLog.create({
      data: {
        userId,
        action: 'UPDATE_ORDER_STATUS',
        entityType: 'Order',
        entityId: orderId,
        newValue: { newStatus: status },
      },
    });

    return order;
  }

  async getAuditLogs(page = 1, limit = 50) {
    return this.prisma.auditLog.findMany({
      include: {
        user: { select: { id: true, email: true, name: true } },
      },
      orderBy: { createdAt: 'desc' },
      skip: (page - 1) * limit,
      take: limit,
    });
  }

  // ── Banners ──
  async getBanners() {
    const row = await this.prisma.adminSetting.findUnique({ where: { key: 'home_banners' } });
    return (row?.value as any[]) || [];
  }

  async updateBanners(banners: any[], userId?: string) {
    const row = await this.prisma.adminSetting.upsert({
      where: { key: 'home_banners' },
      create: { key: 'home_banners', value: banners },
      update: { value: banners },
    });

    await this.prisma.auditLog.create({
      data: {
        userId,
        action: 'UPDATE_BANNERS',
        entityType: 'AdminSetting',
        entityId: row.id,
        newValue: { banners },
      },
    });

    return row.value;
  }
}
