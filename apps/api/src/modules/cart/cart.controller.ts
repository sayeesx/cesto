import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { CartService } from './cart.service';

@Controller('v1/cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Get()
  getCart(@Query('userId') userId?: string, @Query('session') session?: string) {
    return this.cartService.getCart(userId, session);
  }

  @Post(':cartId/items')
  addItem(
    @Param('cartId') cartId: string,
    @Body() dto: { productId: string; quantity: number; variantData?: any },
  ) {
    return this.cartService.addItem(cartId, dto.productId, dto.quantity, dto.variantData);
  }

  @Put('items/:itemId')
  updateItem(@Param('itemId') itemId: string, @Body() dto: { quantity: number }) {
    return this.cartService.updateItem(itemId, dto.quantity);
  }

  @Delete('items/:itemId')
  removeItem(@Param('itemId') itemId: string) {
    return this.cartService.removeItem(itemId);
  }

  @Delete(':cartId')
  clearCart(@Param('cartId') cartId: string) {
    return this.cartService.clearCart(cartId);
  }
}
