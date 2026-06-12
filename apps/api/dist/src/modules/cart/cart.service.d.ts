import { PrismaService } from '../prisma/prisma.service';
export declare class CartService {
    private prisma;
    constructor(prisma: PrismaService);
    getCart(userId?: string, session?: string): Promise<any>;
    addItem(cartId: string, productId: string, quantity: number, variantData?: any): Promise<any>;
    updateItem(itemId: string, quantity: number): Promise<any>;
    removeItem(itemId: string): Promise<any>;
    clearCart(cartId: string): Promise<any>;
}
