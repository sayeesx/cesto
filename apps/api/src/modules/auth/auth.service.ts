import {
  ConflictException,
  Injectable,
  UnauthorizedException,
  ForbiddenException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { LoginDto, RegisterDto } from './dto/auth.dto';
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

    return this.generateTokens(user.id, user.email, user.role);
  }

  async login(dto: LoginDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });
    if (!user || !(await bcrypt.compare(dto.password, user.passwordHash))) {
      throw new UnauthorizedException('Invalid credentials');
    }

    if (!user.isActive) {
      throw new UnauthorizedException('Account disabled');
    }

    return this.generateTokens(user.id, user.email, user.role);
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
    return this.generateTokens(user.id, user.email, user.role);
  }

  private async generateTokens(userId: string, email: string, role: string) {
    const payload = { sub: userId, email, role, jti: crypto.randomUUID() };

    const [at, rt] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: process.env.JWT_SECRET,
        expiresIn: '15m',
      }),
      this.jwtService.signAsync(payload, {
        secret: process.env.REFRESH_TOKEN_SECRET,
        expiresIn: '7d',
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
    expiresAt.setDate(expiresAt.getDate() + 7); // 7 days

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
}
