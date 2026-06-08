"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const crypto = __importStar(require("crypto"));
let PaymentsService = class PaymentsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createRazorpayOrder(orderId) {
        const order = await this.prisma.order.findUnique({ where: { id: orderId } });
        if (!order)
            throw new common_1.NotFoundException('Order not found');
        const mockRazorpayOrderId = `order_${crypto.randomBytes(12).toString('hex')}`;
        const payment = await this.prisma.payment.create({
            data: {
                orderId: order.id,
                razorpayOrderId: mockRazorpayOrderId,
                amount: order.finalAmount,
                status: 'PENDING',
            },
        });
        return {
            razorpayOrderId: payment.razorpayOrderId,
            amount: payment.amount,
            currency: 'INR',
            orderId: order.id,
            orderNumber: order.orderNumber,
        };
    }
    async verifyPayment(dto) {
        const secret = process.env.RAZORPAY_KEY_SECRET;
        if (!secret)
            throw new common_1.BadRequestException('Payment config missing');
        const body = dto.razorpayOrderId + '|' + dto.razorpayPaymentId;
        const expectedSignature = crypto
            .createHmac('sha256', secret)
            .update(body)
            .digest('hex');
        if (expectedSignature !== dto.razorpaySignature) {
            throw new common_1.BadRequestException('Invalid payment signature');
        }
        const payment = await this.prisma.payment.update({
            where: { razorpayOrderId: dto.razorpayOrderId },
            data: {
                razorpayPaymentId: dto.razorpayPaymentId,
                status: 'SUCCESS',
            },
        });
        await this.prisma.order.update({
            where: { id: payment.orderId },
            data: { status: 'PAYMENT_CONFIRMED' },
        });
        return { verified: true, orderId: payment.orderId };
    }
    async handleWebhook(body, signature) {
        const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET;
        if (!webhookSecret)
            throw new common_1.BadRequestException('Webhook secret not configured');
        const expectedSignature = crypto
            .createHmac('sha256', webhookSecret)
            .update(JSON.stringify(body))
            .digest('hex');
        if (expectedSignature !== signature) {
            throw new common_1.BadRequestException('Invalid webhook signature');
        }
        const event = body.event;
        const paymentEntity = body.payload?.payment?.entity;
        if (event === 'payment.captured' && paymentEntity) {
            await this.prisma.payment.updateMany({
                where: { razorpayOrderId: paymentEntity.order_id },
                data: {
                    razorpayPaymentId: paymentEntity.id,
                    status: 'SUCCESS',
                    method: paymentEntity.method,
                },
            });
            const payment = await this.prisma.payment.findFirst({
                where: { razorpayOrderId: paymentEntity.order_id },
            });
            if (payment) {
                await this.prisma.order.update({
                    where: { id: payment.orderId },
                    data: { status: 'PAYMENT_CONFIRMED' },
                });
            }
        }
        return { received: true };
    }
};
exports.PaymentsService = PaymentsService;
exports.PaymentsService = PaymentsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PaymentsService);
//# sourceMappingURL=payments.service.js.map