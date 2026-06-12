import { AdminService } from './admin.service';
export declare class AdminController {
    private readonly adminService;
    constructor(adminService: AdminService);
    getDashboardStats(): Promise<{
        totalOrders: any;
        pendingOrders: any;
        confirmedOrders: any;
        totalProducts: any;
        lowStockProducts: any;
        totalCustomers: any;
        totalRevenue: any;
    }>;
    getOrders(status?: string, page?: string, limit?: string): Promise<{
        orders: any;
        total: any;
        page: number;
        limit: number;
        totalPages: number;
    }>;
    updateOrderStatus(id: string, dto: {
        status: string;
    }, req: any): Promise<any>;
    getAuditLogs(page?: string, limit?: string): Promise<any>;
}
