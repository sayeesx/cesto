import { CartService } from './cart.service';
export declare class CartController {
    private readonly cartService;
    constructor(cartService: CartService);
    getCart(userId?: string, session?: string): Promise<any>;
    addItem(cartId: string, dto: {
        productId: string;
        quantity: number;
        variantData?: any;
    }): Promise<any>;
    updateItem(itemId: string, dto: {
        quantity: number;
    }): Promise<any>;
    removeItem(itemId: string): Promise<any>;
    clearCart(cartId: string): Promise<any>;
}
