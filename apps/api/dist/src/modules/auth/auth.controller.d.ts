import { AuthService } from './auth.service';
import { LoginDto, RegisterDto, RefreshDto } from './dto/auth.dto';
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
    me(req: any): Promise<any>;
}
