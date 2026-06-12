"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let AdminService = class AdminService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getDashboardStats() {
        const [totalOrders, pendingOrders, confirmedOrders, totalProducts, lowStockProducts, totalCustomers, totalRevenue,] = await Promise.all([
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
    async getOrders(status, page = 1, limit = 20) {
        const where = status ? { status: status } : {};
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
    async updateOrderStatus(orderId, status, userId) {
        const order = await this.prisma.order.update({
            where: { id: orderId },
            data: { status: status },
        });
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
};
exports.AdminService = AdminService;
exports.AdminService = AdminService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AdminService);
//# sourceMappingURL=admin.service.js.map