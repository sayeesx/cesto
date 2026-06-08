import { PrismaService } from '../prisma/prisma.service';
import { CartService } from '../cart/cart.service';
export declare class OrdersService {
    private prisma;
    private cartService;
    constructor(prisma: PrismaService, cartService: CartService);
    createOrder(dto: {
        userId?: string;
        cartId: string;
        recipientName: string;
        recipientPhone: string;
        deliveryAddress: any;
        deliverySlotId?: string;
        deliveryDate: Date;
        giftMessage?: string;
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
        deliveryDate: Date;
        giftMessage: string | null;
        deliverySlotId: string | null;
        vendorId: string | null;
        deliveryPartnerId: string | null;
    }>;
    getOrder(id: string): Promise<{
        deliverySlot: {
            id: string;
            isActive: boolean;
            label: string;
            startTime: string;
            endTime: string;
            type: string;
            fee: number;
        } | null;
        items: ({
            product: {
                name: string;
                id: string;
                createdAt: Date;
                updatedAt: Date;
                isActive: boolean;
                description: string | null;
                slug: string;
                whatsInside: string | null;
                price: number;
                compareAtPrice: number | null;
                stock: number;
                deliveryEstimate: string | null;
                sameDayAvailable: boolean;
                isPersonalizable: boolean;
                tags: string[];
            };
        } & {
            id: string;
            productId: string;
            quantity: number;
            variantData: import("@prisma/client/runtime/client").JsonValue | null;
            priceAt: number;
            orderId: string;
        })[];
        payments: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            status: import("@prisma/client").$Enums.PaymentStatus;
            razorpayOrderId: string | null;
            razorpayPaymentId: string | null;
            amount: number;
            method: string | null;
            orderId: string;
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
        deliveryDate: Date;
        giftMessage: string | null;
        deliverySlotId: string | null;
        vendorId: string | null;
        deliveryPartnerId: string | null;
    }>;
}
