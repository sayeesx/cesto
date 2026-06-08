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
exports.ProductsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let ProductsService = class ProductsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findMany(query) {
        const { category, occasion, relationship, search, maxPrice } = query;
        const where = { isActive: true };
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
    async findOne(slug) {
        const product = await this.prisma.product.findUnique({
            where: { slug },
            include: {
                images: { orderBy: { order: 'asc' } },
                categories: { include: { category: true } },
                occasions: { include: { occasion: true } },
                relationships: { include: { relationship: true } },
            },
        });
        if (!product)
            throw new common_1.NotFoundException('Product not found');
        return product;
    }
};
exports.ProductsService = ProductsService;
exports.ProductsService = ProductsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ProductsService);
//# sourceMappingURL=products.service.js.map