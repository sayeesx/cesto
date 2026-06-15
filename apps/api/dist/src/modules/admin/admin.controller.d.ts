import { AdminService } from './admin.service';
import { AdminProductsService } from './admin-products.service';
import { AdminCategoriesService } from './admin-categories.service';
import { CreateProductDto, UpdateProductDto } from './dto/product.dto';
import { CreateCategoryDto, UpdateCategoryDto } from './dto/category.dto';
export declare class AdminController {
    private readonly adminService;
    private readonly adminProductsService;
    private readonly adminCategoriesService;
    constructor(adminService: AdminService, adminProductsService: AdminProductsService, adminCategoriesService: AdminCategoriesService);
    getDashboardStats(): Promise<{
        totalOrders: number;
        pendingOrders: number;
        confirmedOrders: number;
        totalProducts: number;
        lowStockProducts: number;
        totalCustomers: number;
        totalRevenue: number;
    }>;
    getOrders(status?: string, page?: string, limit?: string): Promise<{
        orders: ({
            user: {
                id: string;
                email: string | null;
                name: string | null;
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
        })[];
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    }>;
    updateOrderStatus(id: string, dto: {
        status: string;
    }, req: any): Promise<{
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
    getAuditLogs(page?: string, limit?: string): Promise<({
        user: {
            id: string;
            email: string | null;
            name: string | null;
        } | null;
    } & {
        id: string;
        createdAt: Date;
        userId: string | null;
        action: string;
        entityId: string;
        entityType: string;
        oldValue: import("@prisma/client/runtime/client").JsonValue | null;
        newValue: import("@prisma/client/runtime/client").JsonValue | null;
        ipAddress: string | null;
        userAgent: string | null;
    })[]>;
    listProducts(page?: string, limit?: string, search?: string): Promise<{
        products: {
            imageUrl: string | null;
            categoryNames: string[];
            occasionNames: string[];
            categories: ({
                category: {
                    id: string;
                    name: string;
                    slug: string;
                };
            } & {
                productId: string;
                categoryId: string;
            })[];
            images: {
                url: string;
                id: string;
                productId: string;
                isPrimary: boolean;
                order: number;
            }[];
            occasions: ({
                occasion: {
                    id: string;
                    name: string;
                    slug: string;
                };
            } & {
                productId: string;
                occasionId: string;
            })[];
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
        }[];
        total: number;
        page: number;
        totalPages: number;
    }>;
    getProduct(id: string): Promise<{
        categories: ({
            category: {
                id: string;
                name: string;
                createdAt: Date;
                updatedAt: Date;
                isActive: boolean;
                slug: string;
                description: string | null;
                imageUrl: string | null;
            };
        } & {
            productId: string;
            categoryId: string;
        })[];
        images: {
            url: string;
            id: string;
            productId: string;
            isPrimary: boolean;
            order: number;
        }[];
        occasions: ({
            occasion: {
                id: string;
                name: string;
                isActive: boolean;
                slug: string;
                imageUrl: string | null;
            };
        } & {
            productId: string;
            occasionId: string;
        })[];
    } & {
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
    }>;
    createProduct(dto: CreateProductDto, req: any): Promise<{
        categories: ({
            category: {
                id: string;
                name: string;
                createdAt: Date;
                updatedAt: Date;
                isActive: boolean;
                slug: string;
                description: string | null;
                imageUrl: string | null;
            };
        } & {
            productId: string;
            categoryId: string;
        })[];
        images: {
            url: string;
            id: string;
            productId: string;
            isPrimary: boolean;
            order: number;
        }[];
        occasions: ({
            occasion: {
                id: string;
                name: string;
                isActive: boolean;
                slug: string;
                imageUrl: string | null;
            };
        } & {
            productId: string;
            occasionId: string;
        })[];
    } & {
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
    }>;
    updateProduct(id: string, dto: UpdateProductDto, req: any): Promise<({
        categories: ({
            category: {
                id: string;
                name: string;
                createdAt: Date;
                updatedAt: Date;
                isActive: boolean;
                slug: string;
                description: string | null;
                imageUrl: string | null;
            };
        } & {
            productId: string;
            categoryId: string;
        })[];
        images: {
            url: string;
            id: string;
            productId: string;
            isPrimary: boolean;
            order: number;
        }[];
        occasions: ({
            occasion: {
                id: string;
                name: string;
                isActive: boolean;
                slug: string;
                imageUrl: string | null;
            };
        } & {
            productId: string;
            occasionId: string;
        })[];
    } & {
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
    }) | null>;
    deleteProduct(id: string, req: any): Promise<{
        success: boolean;
    }>;
    listCategories(): Promise<{
        categories: ({
            _count: {
                products: number;
            };
        } & {
            id: string;
            name: string;
            createdAt: Date;
            updatedAt: Date;
            isActive: boolean;
            slug: string;
            description: string | null;
            imageUrl: string | null;
        })[];
        occasions: ({
            _count: {
                products: number;
            };
        } & {
            id: string;
            name: string;
            isActive: boolean;
            slug: string;
            imageUrl: string | null;
        })[];
    }>;
    createCategory(dto: CreateCategoryDto, req: any): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        isActive: boolean;
        slug: string;
        description: string | null;
        imageUrl: string | null;
    }>;
    updateCategory(id: string, dto: UpdateCategoryDto, req: any): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        isActive: boolean;
        slug: string;
        description: string | null;
        imageUrl: string | null;
    }>;
    deleteCategory(id: string, req: any): Promise<{
        success: boolean;
    }>;
    getBanners(): Promise<any[]>;
    updateBanners(dto: {
        banners: any[];
    }, req: any): Promise<import("@prisma/client/runtime/client").JsonValue>;
}
