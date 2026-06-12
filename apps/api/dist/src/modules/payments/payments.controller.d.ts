import { PaymentsService } from './payments.service';
export declare class PaymentsController {
    private readonly paymentsService;
    constructor(paymentsService: PaymentsService);
    createOrder(req: any, orderId: string): Promise<{
        razorpayOrderId: any;
        amount: any;
        currency: string;
        orderId: any;
    }>;
    verify(req: any, dto: {
        razorpayOrderId: string;
        razorpayPaymentId: string;
        razorpaySignature: string;
    }): Promise<{
        status: string;
        orderId: any;
    }>;
    webhook(req: any, signature: string, eventId: string): Promise<{
        status: string;
    }>;
}
