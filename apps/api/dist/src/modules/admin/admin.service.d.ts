import { PrismaService } from '../prisma/prisma.service';
export declare class AdminService {
    private prisma;
    constructor(prisma: PrismaService);
    getDashboardStats(): Promise<{
        totalOrders: any;
        pendingOrders: any;
        confirmedOrders: any;
        totalProducts: any;
        lowStockProducts: any;
        totalCustomers: any;
        totalRevenue: any;
    }>;
    getOrders(status?: string, page?: number, limit?: number): Promise<{
        orders: any;
        total: any;
        page: number;
        limit: number;
        totalPages: number;
    }>;
    updateOrderStatus(orderId: string, status: string, userId?: string): Promise<any>;
    getAuditLogs(page?: number, limit?: number): Promise<any>;
}
