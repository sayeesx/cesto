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
    }): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string | null;
        orderNumber: string;
        status: import("@prisma/client").$Enums.OrderStatus;
        totalAmount: number;
        deliveryFee: number;
        discount: number;
        finalAmount: number;
        recipientName: string;
        recipientPhone: string;
        deliveryAddress: import("@prisma/client/runtime/client").JsonValue;
        deliverySlotId: string | null;
        deliveryDate: Date;
        giftMessage: string | null;
        vendorId: string | null;
        deliveryPartnerId: string | null;
    }>;
    listOrders(userId?: string): Promise<({
        items: ({
            product: {
                id: string;
                name: string;
                createdAt: Date;
                updatedAt: Date;
                isActive: boolean;
                slug: string;
                description: string | null;
                whatsInside: string | null;
                price: number;
                compareAtPrice: number | null;
                stock: number;
                deliveryEstimate: string | null;
                sameDayAvailable: boolean;
                isPersonalizable: boolean;
                tags: string[];
                reservedStock: number;
            };
        } & {
            id: string;
            productId: string;
            quantity: number;
            variantData: import("@prisma/client/runtime/client").JsonValue | null;
            orderId: string;
            priceAt: number;
        })[];
        statusHistory: {
            id: string;
            createdAt: Date;
            status: import("@prisma/client").$Enums.OrderStatus;
            orderId: string;
            notes: string | null;
            actorId: string | null;
        }[];
        payments: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            status: import("@prisma/client").$Enums.PaymentStatus;
            orderId: string;
            razorpayOrderId: string | null;
            razorpayPaymentId: string | null;
            amount: number;
            method: string | null;
            errorDetails: import("@prisma/client/runtime/client").JsonValue | null;
        }[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string | null;
        orderNumber: string;
        status: import("@prisma/client").$Enums.OrderStatus;
        totalAmount: number;
        deliveryFee: number;
        discount: number;
        finalAmount: number;
        recipientName: string;
        recipientPhone: string;
        deliveryAddress: import("@prisma/client/runtime/client").JsonValue;
        deliverySlotId: string | null;
        deliveryDate: Date;
        giftMessage: string | null;
        vendorId: string | null;
        deliveryPartnerId: string | null;
    })[]>;
    getOrder(id: string): Promise<{
        deliverySlot: {
            id: string;
            isActive: boolean;
            type: string;
            label: string;
            startTime: string;
            endTime: string;
            fee: number;
        } | null;
        items: ({
            product: {
                id: string;
                name: string;
                createdAt: Date;
                updatedAt: Date;
                isActive: boolean;
                slug: string;
                description: string | null;
                whatsInside: string | null;
                price: number;
                compareAtPrice: number | null;
                stock: number;
                deliveryEstimate: string | null;
                sameDayAvailable: boolean;
                isPersonalizable: boolean;
                tags: string[];
                reservedStock: number;
            };
        } & {
            id: string;
            productId: string;
            quantity: number;
            variantData: import("@prisma/client/runtime/client").JsonValue | null;
            orderId: string;
            priceAt: number;
        })[];
        statusHistory: {
            id: string;
            createdAt: Date;
            status: import("@prisma/client").$Enums.OrderStatus;
            orderId: string;
            notes: string | null;
            actorId: string | null;
        }[];
        payments: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            status: import("@prisma/client").$Enums.PaymentStatus;
            orderId: string;
            razorpayOrderId: string | null;
            razorpayPaymentId: string | null;
            amount: number;
            method: string | null;
            errorDetails: import("@prisma/client/runtime/client").JsonValue | null;
        }[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string | null;
        orderNumber: string;
        status: import("@prisma/client").$Enums.OrderStatus;
        totalAmount: number;
        deliveryFee: number;
        discount: number;
        finalAmount: number;
        recipientName: string;
        recipientPhone: string;
        deliveryAddress: import("@prisma/client/runtime/client").JsonValue;
        deliverySlotId: string | null;
        deliveryDate: Date;
        giftMessage: string | null;
        vendorId: string | null;
        deliveryPartnerId: string | null;
    }>;
    updateOrderStatus(orderId: string, status: OrderStatus, actorId?: string, notes?: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string | null;
        orderNumber: string;
        status: import("@prisma/client").$Enums.OrderStatus;
        totalAmount: number;
        deliveryFee: number;
        discount: number;
        finalAmount: number;
        recipientName: string;
        recipientPhone: string;
        deliveryAddress: import("@prisma/client/runtime/client").JsonValue;
        deliverySlotId: string | null;
        deliveryDate: Date;
        giftMessage: string | null;
        vendorId: string | null;
        deliveryPartnerId: string | null;
    }>;
}
