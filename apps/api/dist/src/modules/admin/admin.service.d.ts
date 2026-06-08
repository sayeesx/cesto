import { PrismaService } from '../prisma/prisma.service';
export declare class AdminService {
    private prisma;
    constructor(prisma: PrismaService);
    getDashboardStats(): Promise<{
        totalOrders: number;
        pendingOrders: number;
        confirmedOrders: number;
        totalProducts: number;
        lowStockProducts: number;
        totalCustomers: number;
        totalRevenue: number;
    }>;
    getOrders(status?: string, page?: number, limit?: number): Promise<{
        orders: ({
            user: {
                email: string;
                name: string | null;
                id: string;
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
        })[];
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    }>;
    updateOrderStatus(orderId: string, status: string, userId?: string): Promise<{
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
    getAuditLogs(page?: number, limit?: number): Promise<({
        user: {
            email: string;
            name: string | null;
            id: string;
        } | null;
    } & {
        id: string;
        createdAt: Date;
        userId: string | null;
        action: string;
        entity: string;
        entityId: string;
        details: import("@prisma/client/runtime/client").JsonValue | null;
    })[]>;
}
