import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import { LoginDto, RegisterDto } from './dto/auth.dto';
import { PhoneStartDto, PhoneVerifyDto, PhoneCompleteProfileDto } from './dto/phone-auth.dto';
export declare class AuthService {
    private prisma;
    private jwtService;
    constructor(prisma: PrismaService, jwtService: JwtService);
    register(dto: RegisterDto): Promise<{
        access_token: string;
        refresh_token: string;
    }>;
    login(dto: LoginDto): Promise<{
        access_token: string;
        refresh_token: string;
    }>;
    getProfile(userId: string): Promise<{
        id: string;
        email: string | null;
        phone: string | null;
        name: string | null;
        role: import("@prisma/client").$Enums.Role;
        createdAt: Date;
        isActive: boolean;
    }>;
    logout(userId: string, refreshToken: string): Promise<void>;
    refreshTokens(userId: string, refreshToken: string): Promise<{
        access_token: string;
        refresh_token: string;
    }>;
    private generateTokens;
    private saveRefreshToken;
    private hashToken;
    phoneStart(dto: PhoneStartDto): Promise<{
        devOtp?: string | undefined;
        success: boolean;
        message: string;
    }>;
    phoneVerify(dto: PhoneVerifyDto): Promise<{
        user: {
            id: string;
            email: string | null;
            name: string | null;
            phone: string | null;
            role: import("@prisma/client").$Enums.Role;
        };
        access_token: string;
        refresh_token: string;
        userExists: boolean;
        requiresProfile: boolean;
        message?: undefined;
    } | {
        userExists: boolean;
        requiresProfile: boolean;
        message: string;
    }>;
    phoneCompleteProfile(dto: PhoneCompleteProfileDto): Promise<{
        user: {
            id: string;
            email: string | null;
            name: string | null;
            phone: string | null;
            role: import("@prisma/client").$Enums.Role;
        };
        access_token: string;
        refresh_token: string;
        success: boolean;
    }>;
    private normalizePhoneNumber;
    private isValidPhoneNumber;
}
