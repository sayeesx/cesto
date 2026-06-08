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
exports.CartService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let CartService = class CartService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getCart(userId, session) {
        if (!userId && !session)
            throw new common_1.BadRequestException('Provide user id or session');
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
    async addItem(cartId, productId, quantity, variantData) {
        const product = await this.prisma.product.findUnique({ where: { id: productId } });
        if (!product || !product.isActive)
            throw new common_1.NotFoundException('Product not found / active');
        if (product.stock < quantity) {
            throw new common_1.BadRequestException('Not enough stock available');
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
    async updateItem(itemId, quantity) {
        return this.prisma.cartItem.update({
            where: { id: itemId },
            data: { quantity },
        });
    }
    async removeItem(itemId) {
        return this.prisma.cartItem.delete({
            where: { id: itemId },
        });
    }
    async clearCart(cartId) {
        return this.prisma.cartItem.deleteMany({
            where: { cartId },
        });
    }
};
exports.CartService = CartService;
exports.CartService = CartService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], CartService);
//# sourceMappingURL=cart.service.js.map