import { CartService } from './cart.service';
export declare class CartController {
    private readonly cartService;
    constructor(cartService: CartService);
    getCart(userId?: string, session?: string): Promise<{
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
            cartId: string;
            quantity: number;
            variantData: import("@prisma/client/runtime/client").JsonValue | null;
        })[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string | null;
        session: string | null;
    }>;
    addItem(cartId: string, dto: {
        productId: string;
        quantity: number;
        variantData?: any;
    }): Promise<{
        id: string;
        productId: string;
        cartId: string;
        quantity: number;
        variantData: import("@prisma/client/runtime/client").JsonValue | null;
    }>;
    updateItem(itemId: string, dto: {
        quantity: number;
    }): Promise<{
        id: string;
        productId: string;
        cartId: string;
        quantity: number;
        variantData: import("@prisma/client/runtime/client").JsonValue | null;
    }>;
    removeItem(itemId: string): Promise<{
        id: string;
        productId: string;
        cartId: string;
        quantity: number;
        variantData: import("@prisma/client/runtime/client").JsonValue | null;
    }>;
    clearCart(cartId: string): Promise<import("@prisma/client").Prisma.BatchPayload>;
}
