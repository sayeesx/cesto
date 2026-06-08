import { PaymentsService } from './payments.service';
export declare class PaymentsController {
    private readonly paymentsService;
    constructor(paymentsService: PaymentsService);
    createRazorpayOrder(dto: {
        orderId: string;
    }): Promise<{
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
