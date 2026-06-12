import { OrdersService } from './orders.service';
export declare class OrdersController {
    private readonly ordersService;
    constructor(ordersService: OrdersService);
    createOrder(dto: any): Promise<any>;
    getOrder(id: string): Promise<any>;
}
