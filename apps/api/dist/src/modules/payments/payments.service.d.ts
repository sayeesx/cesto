import { PrismaService } from '../prisma/prisma.service';
import { AuditService } from '../audit/audit.service';
import { OrdersService } from '../orders/orders.service';
export declare class PaymentsService {
    private prisma;
    private audit;
    private ordersService;
    constructor(prisma: PrismaService, audit: AuditService, ordersService: OrdersService);
    createRazorpayOrder(orderId: string, userId?: string): Promise<{
        razorpayOrderId: string | null;
        amount: number;
        currency: string;
        orderId: string;
    }>;
    verifyPayment(dto: {
        razorpayOrderId: string;
        razorpayPaymentId: string;
        razorpaySignature: string;
    }, userId?: string): Promise<{
        status: string;
        orderId: string;
    }>;
    handleWebhook(rawBody: string, signature: string, eventId: string): Promise<{
        status: string;
    }>;
    private processSuccessfulPayment;
}
