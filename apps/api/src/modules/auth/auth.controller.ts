import { Body, Controller, Post, Get, UseGuards, Req, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, RegisterDto, RefreshDto } from './dto/auth.dto';
import { PhoneStartDto, PhoneVerifyDto, PhoneCompleteProfileDto } from './dto/phone-auth.dto';
import { AuthGuard } from '../../common/guards/auth.guard';

@Controller('v1/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() dto: RegisterDto) {
    return this.authService.register(dto);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }

  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  refresh(@Body() dto: RefreshDto) {
    // Note: In a real app, you might want to extract userId from the expired JWT or pass it in DTO
    // Here we'll expect userId in the DTO for simplicity, but in production, we decode the RT
    return this.authService.refreshTokens(dto.userId, dto.refreshToken);
  }

  @UseGuards(AuthGuard)
  @Post('logout')
  @HttpCode(HttpStatus.OK)
  logout(@Req() req: any, @Body() dto: RefreshDto) {
    return this.authService.logout(req.user.sub, dto.refreshToken);
  }

  @UseGuards(AuthGuard)
  @Get('me')
  async me(@Req() req: any) {
    const user = await this.authService.getProfile(req.user.sub);
    return user;
  }

  // === Phone OTP Authentication Endpoints ===

  @Post('phone/start')
  @HttpCode(HttpStatus.OK)
  phoneStart(@Body() dto: PhoneStartDto) {
    return this.authService.phoneStart(dto);
  }

  @Post('phone/verify')
  @HttpCode(HttpStatus.OK)
  phoneVerify(@Body() dto: PhoneVerifyDto) {
    return this.authService.phoneVerify(dto);
  }

  @Post('phone/complete-profile')
  @HttpCode(HttpStatus.OK)
  phoneCompleteProfile(@Body() dto: PhoneCompleteProfileDto) {
    return this.authService.phoneCompleteProfile(dto);
  }
}
