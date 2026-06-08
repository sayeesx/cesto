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
const cart_service_1 = require("../cart/cart.service");
let OrdersService = class OrdersService {
    prisma;
    cartService;
    constructor(prisma, cartService) {
        this.prisma = prisma;
        this.cartService = cartService;
    }
    async createOrder(dto) {
        const cart = await this.prisma.cart.findUnique({
            where: { id: dto.cartId },
            include: { items: { include: { product: true } } },
        });
        if (!cart || cart.items.length === 0) {
            throw new common_1.BadRequestException('Cart is empty');
        }
        let itemsTotal = 0;
        const orderItemsData = [];
        for (const item of cart.items) {
            if (item.product.stock < item.quantity) {
                throw new common_1.BadRequestException(`Not enough stock for ${item.product.name}`);
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
            if (slot)
                deliveryFee = slot.fee;
        }
        const finalAmount = itemsTotal + deliveryFee;
        const order = await this.prisma.$transaction(async (tx) => {
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
            for (const item of orderItemsData) {
                await tx.product.update({
                    where: { id: item.productId },
                    data: { stock: { decrement: item.quantity } },
                });
            }
            await tx.cartItem.deleteMany({ where: { cartId: dto.cartId } });
            return newOrder;
        });
        return order;
    }
    async getOrder(id) {
        const order = await this.prisma.order.findUnique({
            where: { id },
            include: {
                items: { include: { product: true } },
                payments: true,
                deliverySlot: true,
            },
        });
        if (!order)
            throw new common_1.NotFoundException('Order not found');
        return order;
    }
};
exports.OrdersService = OrdersService;
exports.OrdersService = OrdersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        cart_service_1.CartService])
], OrdersService);
//# sourceMappingURL=orders.service.js.map