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
const audit_service_1 = require("../audit/audit.service");
const orders_service_1 = require("../orders/orders.service");
const crypto = __importStar(require("crypto"));
const client_1 = require("@prisma/client");
let PaymentsService = class PaymentsService {
    prisma;
    audit;
    ordersService;
    constructor(prisma, audit, ordersService) {
        this.prisma = prisma;
        this.audit = audit;
        this.ordersService = ordersService;
    }
    async createRazorpayOrder(orderId, userId) {
        const order = await this.prisma.order.findUnique({ where: { id: orderId } });
        if (!order)
            throw new common_1.NotFoundException('Order not found');
        const mockRazorpayOrderId = `order_${crypto.randomBytes(12).toString('hex')}`;
        const payment = await this.prisma.payment.create({
            data: {
                orderId: order.id,
                razorpayOrderId: mockRazorpayOrderId,
                amount: order.finalAmount,
                status: client_1.PaymentStatus.PENDING,
            },
        });
        await this.audit.log({
            userId,
            action: 'PAYMENT_ORDER_CREATE',
            entityType: 'Payment',
            entityId: payment.id,
            newValue: { razorpayOrderId: mockRazorpayOrderId },
        });
        return {
            razorpayOrderId: payment.razorpayOrderId,
            amount: payment.amount,
            currency: 'INR',
            orderId: order.id,
        };
    }
    async verifyPayment(dto, userId) {
        const secret = process.env.RAZORPAY_KEY_SECRET;
        if (!secret)
            throw new common_1.BadRequestException('RAZORPAY_KEY_SECRET not configured');
        const body = dto.razorpayOrderId + '|' + dto.razorpayPaymentId;
        const expectedSignature = crypto
            .createHmac('sha256', secret)
            .update(body)
            .digest('hex');
        if (expectedSignature !== dto.razorpaySignature) {
            throw new common_1.BadRequestException('Invalid signature');
        }
        return this.processSuccessfulPayment(dto.razorpayOrderId, dto.razorpayPaymentId, 'manual_verification', userId);
    }
    async handleWebhook(rawBody, signature, eventId) {
        const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET;
        if (!webhookSecret)
            throw new common_1.BadRequestException('RAZORPAY_WEBHOOK_SECRET not configured');
        const expectedSignature = crypto
            .createHmac('sha256', webhookSecret)
            .update(rawBody)
            .digest('hex');
        if (expectedSignature !== signature) {
            throw new common_1.BadRequestException('Invalid webhook signature');
        }
        const payload = JSON.parse(rawBody);
        const eventType = payload.event;
        const existingEvent = await this.prisma.paymentWebhookEvent.findUnique({
            where: { razorpayEventId: eventId },
        });
        if (existingEvent && existingEvent.processed) {
            return { status: 'already_processed' };
        }
        const webhookEvent = await this.prisma.paymentWebhookEvent.upsert({
            where: { razorpayEventId: eventId },
            update: {},
            create: {
                razorpayEventId: eventId,
                eventType,
                payload,
            },
        });
        try {
            if (eventType === 'payment.captured') {
                const paymentData = payload.payload.payment.entity;
                await this.processSuccessfulPayment(paymentData.order_id, paymentData.id, 'webhook', 'SYSTEM');
            }
            await this.prisma.paymentWebhookEvent.update({
                where: { id: webhookEvent.id },
                data: { processed: true },
            });
        }
        catch (error) {
            await this.prisma.paymentWebhookEvent.update({
                where: { id: webhookEvent.id },
                data: { error: error.message },
            });
            console.error('Webhook processing failed:', error);
        }
        return { status: 'ok' };
    }
    async processSuccessfulPayment(rpOrderId, rpPaymentId, source, userId) {
        const payment = await this.prisma.payment.findUnique({
            where: { razorpayOrderId: rpOrderId },
            include: { order: true }
        });
        if (!payment)
            throw new common_1.NotFoundException('Payment record not found');
        if (payment.status === client_1.PaymentStatus.SUCCESS)
            return { status: 'already_paid', orderId: payment.orderId };
        const result = await this.prisma.$transaction(async (tx) => {
            const updatedPayment = await tx.payment.update({
                where: { id: payment.id },
                data: {
                    status: client_1.PaymentStatus.SUCCESS,
                    razorpayPaymentId: rpPaymentId,
                    method: source,
                },
            });
            await tx.order.update({
                where: { id: payment.orderId },
                data: { status: client_1.OrderStatus.PAYMENT_CONFIRMED },
            });
            await tx.orderStatusHistory.create({
                data: {
                    orderId: payment.orderId,
                    status: client_1.OrderStatus.PAYMENT_CONFIRMED,
                    notes: `Payment confirmed via ${source}. Razorpay ID: ${rpPaymentId}`,
                },
            });
            const orderItems = await tx.orderItem.findMany({ where: { orderId: payment.orderId } });
            for (const item of orderItems) {
                await tx.product.update({
                    where: { id: item.productId },
                    data: { reservedStock: { decrement: item.quantity } }
                });
            }
            return updatedPayment;
        });
        await this.audit.log({
            userId,
            action: 'PAYMENT_SUCCESS',
            entityType: 'Order',
            entityId: payment.orderId,
            newValue: { source, rpPaymentId },
        });
        return { status: 'success', orderId: payment.orderId };
    }
};
exports.PaymentsService = PaymentsService;
exports.PaymentsService = PaymentsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        audit_service_1.AuditService,
        orders_service_1.OrdersService])
], PaymentsService);
//# sourceMappingURL=payments.service.js.map