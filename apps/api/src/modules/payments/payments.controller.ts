import { Body, Controller, Headers, Post, UseGuards } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { AuthGuard } from '../../common/guards/auth.guard';

@Controller('v1/payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @UseGuards(AuthGuard)
  @Post('create-order')
  createRazorpayOrder(@Body() dto: { orderId: string }) {
    return this.paymentsService.createRazorpayOrder(dto.orderId);
  }

  @UseGuards(AuthGuard)
  @Post('verify')
  verifyPayment(
    @Body()
    dto: {
      razorpayOrderId: string;
      razorpayPaymentId: string;
      razorpaySignature: string;
    },
  ) {
    return this.paymentsService.verifyPayment(dto);
  }

  @Post('webhook')
  handleWebhook(
    @Body() body: any,
    @Headers('x-razorpay-signature') signature: string,
  ) {
    return this.paymentsService.handleWebhook(body, signature);
  }
}
