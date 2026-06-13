import { PaymentsService } from './payments.service';
export declare class PaymentsController {
    private readonly paymentsService;
    constructor(paymentsService: PaymentsService);
    createOrder(req: any, orderId: string): Promise<{
        razorpayOrderId: string | null;
        amount: number;
        currency: string;
        orderId: string;
    }>;
    verify(req: any, dto: {
        razorpayOrderId: string;
        razorpayPaymentId: string;
        razorpaySignature: string;
    }): Promise<{
        status: string;
        orderId: string;
    }>;
    webhook(req: any, signature: string, eventId: string): Promise<{
        status: string;
    }>;
}
