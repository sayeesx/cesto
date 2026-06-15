import { Request } from 'express';
import { PaymentsService } from './payments.service';
export declare class PaymentsController {
    private readonly paymentsService;
    constructor(paymentsService: PaymentsService);
    createOrder(req: Request & {
        user: any;
    }, orderId: string): Promise<{
        razorpayOrderId: string | null;
        amount: number;
        currency: string;
        orderId: string;
    }>;
    verify(req: Request & {
        user: any;
    }, dto: {
        razorpayOrderId: string;
        razorpayPaymentId: string;
        razorpaySignature: string;
    }): Promise<{
        status: string;
        orderId: string;
    }>;
    webhook(req: Request & {
        body: any;
    }, signature: string, eventId: string): Promise<{
        status: string;
    }>;
}
