import { AuthService } from './auth.service';
import { LoginDto, RegisterDto, RefreshDto } from './dto/auth.dto';
import { PhoneStartDto, PhoneVerifyDto, PhoneCompleteProfileDto } from './dto/phone-auth.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    register(dto: RegisterDto): Promise<{
        access_token: string;
        refresh_token: string;
    }>;
    login(dto: LoginDto): Promise<{
        access_token: string;
        refresh_token: string;
    }>;
    refresh(dto: RefreshDto): Promise<{
        access_token: string;
        refresh_token: string;
    }>;
    logout(req: any, dto: RefreshDto): Promise<void>;
    me(req: any): Promise<{
        id: string;
        email: string | null;
        phone: string | null;
        name: string | null;
        role: import("@prisma/client").$Enums.Role;
        createdAt: Date;
        isActive: boolean;
    }>;
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
}
