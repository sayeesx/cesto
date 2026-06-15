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
exports.OrdersService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const audit_service_1 = require("../audit/audit.service");
const client_1 = require("@prisma/client");
let OrdersService = class OrdersService {
    prisma;
    audit;
    constructor(prisma, audit) {
        this.prisma = prisma;
        this.audit = audit;
    }
    async createOrder(dto) {
        const cart = await this.prisma.cart.findUnique({
            where: { id: dto.cartId },
            include: { items: { include: { product: true } } },
        });
        if (!cart || cart.items.length === 0) {
            throw new common_1.BadRequestException('Cart is empty or does not exist');
        }
        let itemsTotal = 0;
        for (const item of cart.items) {
            if (item.product.stock < item.quantity) {
                throw new common_1.BadRequestException(`Insufficient stock for ${item.product.name}. Available: ${item.product.stock}`);
            }
            itemsTotal += item.product.price * item.quantity;
        }
        let deliveryFee = 0;
        if (dto.deliverySlotId) {
            const slot = await this.prisma.deliverySlot.findUnique({ where: { id: dto.deliverySlotId } });
            if (slot)
                deliveryFee = slot.fee;
        }
        const finalAmount = itemsTotal + deliveryFee;
        try {
            const order = await this.prisma.$transaction(async (tx) => {
                for (const item of cart.items) {
                    await tx.$executeRaw `SELECT * FROM "Product" WHERE id = ${item.productId} FOR UPDATE`;
                    const p = await tx.product.findUnique({ where: { id: item.productId } });
                    if (!p || p.stock < item.quantity) {
                        throw new common_1.BadRequestException(`Stock changed for ${p?.name || 'product'}. Please try again.`);
                    }
                }
                const newOrder = await tx.order.create({
                    data: {
                        orderNumber: `CESTO-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
                        userId: dto.userId,
                        status: client_1.OrderStatus.PAYMENT_PENDING,
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
                                variantData: item.variantData ? item.variantData : undefined,
                            })),
                        },
                    },
                });
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
                await tx.orderStatusHistory.create({
                    data: {
                        orderId: newOrder.id,
                        status: client_1.OrderStatus.PAYMENT_PENDING,
                        notes: 'Order initiated, awaiting payment.',
                    },
                });
                await tx.cartItem.deleteMany({ where: { cartId: dto.cartId } });
                return newOrder;
            }, {
                timeout: 10000,
            });
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
        }
        catch (error) {
            if (error instanceof common_1.BadRequestException)
                throw error;
            console.error('Checkout Transaction Failed:', error);
            throw new common_1.InternalServerErrorException('Checkout failed. Please try again.');
        }
    }
    async listOrders(userId) {
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
    async getOrder(id) {
        const order = await this.prisma.order.findUnique({
            where: { id },
            include: {
                items: { include: { product: true } },
                payments: true,
                deliverySlot: true,
                statusHistory: { orderBy: { createdAt: 'desc' } },
            },
        });
        if (!order)
            throw new common_1.NotFoundException('Order not found');
        return order;
    }
    async updateOrderStatus(orderId, status, actorId, notes) {
        const oldOrder = await this.prisma.order.findUnique({ where: { id: orderId } });
        if (!oldOrder)
            throw new common_1.NotFoundException('Order not found');
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
            if (status === client_1.OrderStatus.CANCELLED) {
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
            if (status === client_1.OrderStatus.PAYMENT_CONFIRMED) {
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
};
exports.OrdersService = OrdersService;
exports.OrdersService = OrdersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        audit_service_1.AuditService])
], OrdersService);
//# sourceMappingURL=orders.service.js.map