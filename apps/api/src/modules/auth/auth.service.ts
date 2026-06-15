import {
  ConflictException,
  Injectable,
  UnauthorizedException,
  ForbiddenException,
  BadRequestException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { LoginDto, RegisterDto } from './dto/auth.dto';
import { PhoneStartDto, PhoneVerifyDto, PhoneCompleteProfileDto } from './dto/phone-auth.dto';
import * as crypto from 'crypto';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async register(dto: RegisterDto) {
    const existing = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });
    if (existing) {
      throw new ConflictException('Email already registered');
    }

    const hashedPassword = await bcrypt.hash(dto.password, 10);
    const user = await this.prisma.user.create({
      data: {
        email: dto.email,
        passwordHash: hashedPassword,
        name: dto.name,
        phone: dto.phone,
      },
    });

    return this.generateTokens(user.id, user.email || user.phone || user.id, user.role);
  }

  async login(dto: LoginDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });
    if (!user || !user.passwordHash || !(await bcrypt.compare(dto.password, user.passwordHash))) {
      throw new UnauthorizedException('Invalid credentials');
    }

    if (!user.isActive) {
      throw new UnauthorizedException('Account disabled');
    }

    return this.generateTokens(user.id, user.email || user.phone || user.id, user.role);
  }

  async getProfile(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, email: true, name: true, phone: true, role: true, isActive: true, createdAt: true },
    });
    if (!user) throw new UnauthorizedException('User not found');
    return user;
  }


  async logout(userId: string, refreshToken: string) {
    const hashedToken = this.hashToken(refreshToken);
    await this.prisma.refreshToken.updateMany({
      where: {
        userId,
        token: hashedToken,
        revokedAt: null,
      },
      data: {
        revokedAt: new Date(),
      },
    });
  }

  async refreshTokens(userId: string, refreshToken: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });
    if (!user || !user.isActive) {
      throw new ForbiddenException('Access Denied');
    }

    const hashedToken = this.hashToken(refreshToken);
    const savedToken = await this.prisma.refreshToken.findFirst({
      where: {
        token: hashedToken,
        userId,
        revokedAt: null,
        expiresAt: { gt: new Date() },
      },
    });

    if (!savedToken) {
      // Token reuse detection or invalid token
      // In a production app, we might want to revoke all tokens for this user if reuse is detected
      throw new ForbiddenException('Invalid Refresh Token');
    }

    // Revoke current token
    await this.prisma.refreshToken.update({
      where: { id: savedToken.id },
      data: { revokedAt: new Date() },
    });

    // Generate new tokens
    return this.generateTokens(user.id, user.email || user.phone || user.id, user.role);
  }

  private async generateTokens(userId: string, email: string, role: string) {
    const payload = { sub: userId, email, role, jti: crypto.randomUUID() };

    const [at, rt] = await Promise.all([
      // Access token: 7 days — long enough that a shopper navigating between pages
      // won't lose their session. Refresh token is still rotated on each use.
      this.jwtService.signAsync(payload, {
        secret: process.env.JWT_SECRET,
        expiresIn: '7d',
      }),
      this.jwtService.signAsync(payload, {
        secret: process.env.REFRESH_TOKEN_SECRET,
        expiresIn: '30d',
      }),
    ]);

    await this.saveRefreshToken(userId, rt);

    return {
      access_token: at,
      refresh_token: rt,
    };
  }

  private async saveRefreshToken(userId: string, refreshToken: string) {
    const hashedToken = this.hashToken(refreshToken);
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 30); // 30 days

    await this.prisma.refreshToken.create({
      data: {
        token: hashedToken,
        userId,
        expiresAt,
      },
    });
  }

  private hashToken(token: string): string {
    return crypto.createHash('sha256').update(token).digest('hex');
  }

  // === Phone OTP Authentication ===
  
  /**
   * Phone OTP Start: Validates phone number format and prepares for OTP verification
   * TODO: Integrate with third-party OTP provider (Twilio, AWS SNS, etc.)
   * Currently hardcoded OTP: 1234
   */
  async phoneStart(dto: PhoneStartDto) {
    const normalizedPhone = this.normalizePhoneNumber(dto.countryCode, dto.phone);
    
    // Validate phone number format
    if (!this.isValidPhoneNumber(normalizedPhone)) {
      throw new BadRequestException('Invalid phone number format');
    }

    // TODO: Send OTP via third-party provider
    // For now, we just return success
    // const otpCode = this.generateOTP();
    // await this.sendOTP(normalizedPhone, otpCode);

    return {
      success: true,
      message: 'OTP verification ready',
      // In development, hint the OTP
      ...(process.env.NODE_ENV !== 'production' && { devOtp: '1234' })
    };
  }

  /**
   * Phone OTP Verify: Verifies OTP and checks if user exists
   * Returns login tokens if user exists, or requires profile completion if new user
   */
  async phoneVerify(dto: PhoneVerifyDto) {
    const normalizedPhone = this.normalizePhoneNumber(dto.countryCode, dto.phone);

    // Verify OTP (hardcoded for now)
    // TODO: Replace with third-party OTP verification
    if (dto.otp !== '1234') {
      throw new UnauthorizedException('Invalid or expired OTP');
    }

    // Check if user exists
    const existingUser = await this.prisma.user.findUnique({
      where: { phone: normalizedPhone },
    });

    if (existingUser) {
      // User exists - proceed with login
      if (!existingUser.isActive) {
        throw new UnauthorizedException('Account is disabled');
      }

      // Update phone verified timestamp
      await this.prisma.user.update({
        where: { id: existingUser.id },
        data: { phoneVerifiedAt: new Date() },
      });

      const tokens = await this.generateTokens(
        existingUser.id,
        existingUser.email || existingUser.phone || existingUser.id,
        existingUser.role
      );

      return {
        userExists: true,
        requiresProfile: false,
        ...tokens,
        user: {
          id: existingUser.id,
          email: existingUser.email,
          name: existingUser.name,
          phone: existingUser.phone,
          role: existingUser.role,
        },
      };
    } else {
      // New user - requires profile completion
      return {
        userExists: false,
        requiresProfile: true,
        message: 'Please complete your profile',
      };
    }
  }

  /**
   * Phone Complete Profile: Creates new user with phone OTP authentication
   */
  async phoneCompleteProfile(dto: PhoneCompleteProfileDto) {
    const normalizedPhone = this.normalizePhoneNumber(dto.countryCode, dto.phone);

    // Verify OTP again for security
    // TODO: Replace with third-party OTP verification
    if (dto.otp !== '1234') {
      throw new UnauthorizedException('Invalid or expired OTP');
    }

    // Check if user already exists
    const existingUser = await this.prisma.user.findUnique({
      where: { phone: normalizedPhone },
    });

    if (existingUser) {
      throw new ConflictException('Phone number already registered');
    }

    // Check email uniqueness if provided
    if (dto.email) {
      const emailExists = await this.prisma.user.findUnique({
        where: { email: dto.email },
      });
      if (emailExists) {
        throw new ConflictException('Email already registered');
      }
    }

    // Create new user with phone authentication
    const newUser = await this.prisma.user.create({
      data: {
        phone: normalizedPhone,
        countryCode: dto.countryCode,
        phoneVerifiedAt: new Date(),
        name: dto.name,
        email: dto.email || null,
        age: dto.age || null,
        gender: dto.gender || null,
        role: 'CUSTOMER',
        isActive: true,
        // No password for phone-only auth
        passwordHash: null,
      },
    });

    const tokens = await this.generateTokens(
      newUser.id,
      newUser.email || normalizedPhone,
      newUser.role
    );

    return {
      success: true,
      ...tokens,
      user: {
        id: newUser.id,
        email: newUser.email,
        name: newUser.name,
        phone: newUser.phone,
        role: newUser.role,
      },
    };
  }

  /**
   * Normalize phone number to E.164 format
   * Example: +919876543210
   */
  private normalizePhoneNumber(countryCode: string, phone: string): string {
    // Remove all non-digit characters from phone
    const cleanPhone = phone.replace(/\D/g, '');
    
    // Ensure country code starts with +
    const cleanCountryCode = countryCode.startsWith('+') 
      ? countryCode 
      : `+${countryCode}`;

    // If phone already includes country code digits, don't duplicate
    const countryCodeDigits = cleanCountryCode.replace(/\D/g, '');
    if (cleanPhone.startsWith(countryCodeDigits)) {
      return `+${cleanPhone}`;
    }

    return `${cleanCountryCode}${cleanPhone}`;
  }

  /**
   * Basic phone number validation
   * TODO: Use libphonenumber-js for comprehensive validation
   */
  private isValidPhoneNumber(phone: string): boolean {
    // E.164 format: +[country code][number]
    // Length should be between 8 and 15 digits (excluding +)
    const phoneRegex = /^\+[1-9]\d{7,14}$/;
    return phoneRegex.test(phone);
  }
}

