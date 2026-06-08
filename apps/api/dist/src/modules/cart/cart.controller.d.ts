import { CartService } from './cart.service';
export declare class CartController {
    private readonly cartService;
    constructor(cartService: CartService);
    getCart(userId?: string, session?: string): Promise<{
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
            cartId: string;
            productId: string;
            quantity: number;
            variantData: import("@prisma/client/runtime/client").JsonValue | null;
        })[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        session: string | null;
        userId: string | null;
    }>;
    addItem(cartId: string, dto: {
        productId: string;
        quantity: number;
        variantData?: any;
    }): Promise<{
        id: string;
        cartId: string;
        productId: string;
        quantity: number;
        variantData: import("@prisma/client/runtime/client").JsonValue | null;
    }>;
    updateItem(itemId: string, dto: {
        quantity: number;
    }): Promise<{
        id: string;
        cartId: string;
        productId: string;
        quantity: number;
        variantData: import("@prisma/client/runtime/client").JsonValue | null;
    }>;
    removeItem(itemId: string): Promise<{
        id: string;
        cartId: string;
        productId: string;
        quantity: number;
        variantData: import("@prisma/client/runtime/client").JsonValue | null;
    }>;
    clearCart(cartId: string): Promise<import("@prisma/client").Prisma.BatchPayload>;
}
