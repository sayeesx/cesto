import { PrismaService } from '../prisma/prisma.service';
import { AuditService } from '../audit/audit.service';
import { OrderStatus } from '@prisma/client';
export declare class OrdersService {
    private prisma;
    private audit;
    constructor(prisma: PrismaService, audit: AuditService);
    createOrder(dto: {
        userId?: string;
        cartId: string;
        recipientName: string;
        recipientPhone: string;
        deliveryAddress: any;
        deliverySlotId?: string;
        deliveryDate: Date;
        giftMessage?: string;
        ipAddress?: string;
        userAgent?: string;
    }): Promise<any>;
    getOrder(id: string): Promise<any>;
    updateOrderStatus(orderId: string, status: OrderStatus, actorId?: string, notes?: string): Promise<any>;
}
