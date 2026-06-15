import { Controller, Post, Body, Headers, Req, UseGuards, BadRequestException } from '@nestjs/common';
import { Request } from 'express';
import { PaymentsService } from './payments.service';
import { AuthGuard } from '../../common/guards/auth.guard';

@Controller('v1/payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @UseGuards(AuthGuard)
  @Post('create-order')
  createOrder(@Req() req: Request & { user: any }, @Body('orderId') orderId: string) {
    return this.paymentsService.createRazorpayOrder(orderId, req.user.sub);
  }

  @UseGuards(AuthGuard)
  @Post('verify')
  verify(
    @Req() req: Request & { user: any },
    @Body() dto: {
      razorpayOrderId: string;
      razorpayPaymentId: string;
      razorpaySignature: string;
    },
  ) {
    return this.paymentsService.verifyPayment(dto, req.user.sub);
  }

  @Post('webhook')
  async webhook(
    @Req() req: Request & { body: any },
    @Headers('x-razorpay-signature') signature: string,
    @Headers('x-razorpay-event-id') eventId: string,
  ) {
    if (!signature || !eventId) {
      throw new BadRequestException('Missing headers');
    }
    const rawBody = JSON.stringify(req.body);
    return this.paymentsService.handleWebhook(rawBody, signature, eventId);
  }
}
