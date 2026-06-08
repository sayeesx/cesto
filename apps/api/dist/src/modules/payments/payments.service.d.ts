import { PrismaService } from '../prisma/prisma.service';
export declare class PaymentsService {
    private prisma;
    constructor(prisma: PrismaService);
    createRazorpayOrder(orderId: string): Promise<{
        razorpayOrderId: string | null;
        amount: number;
        currency: string;
        orderId: string;
        orderNumber: string;
    }>;
    verifyPayment(dto: {
        razorpayOrderId: string;
        razorpayPaymentId: string;
        razorpaySignature: string;
    }): Promise<{
        verified: boolean;
        orderId: string;
    }>;
    handleWebhook(body: any, signature: string): Promise<{
        received: boolean;
    }>;
}
