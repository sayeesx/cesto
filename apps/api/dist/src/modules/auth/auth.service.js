"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const prisma_service_1 = require("../prisma/prisma.service");
const bcrypt = __importStar(require("bcrypt"));
const crypto = __importStar(require("crypto"));
let AuthService = class AuthService {
    prisma;
    jwtService;
    constructor(prisma, jwtService) {
        this.prisma = prisma;
        this.jwtService = jwtService;
    }
    async register(dto) {
        const existing = await this.prisma.user.findUnique({
            where: { email: dto.email },
        });
        if (existing) {
            throw new common_1.ConflictException('Email already registered');
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
    async login(dto) {
        const user = await this.prisma.user.findUnique({
            where: { email: dto.email },
        });
        if (!user || !user.passwordHash || !(await bcrypt.compare(dto.password, user.passwordHash))) {
            throw new common_1.UnauthorizedException('Invalid credentials');
        }
        if (!user.isActive) {
            throw new common_1.UnauthorizedException('Account disabled');
        }
        return this.generateTokens(user.id, user.email || user.phone || user.id, user.role);
    }
    async getProfile(userId) {
        const user = await this.prisma.user.findUnique({
            where: { id: userId },
            select: { id: true, email: true, name: true, phone: true, role: true, isActive: true, createdAt: true },
        });
        if (!user)
            throw new common_1.UnauthorizedException('User not found');
        return user;
    }
    async logout(userId, refreshToken) {
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
    async refreshTokens(userId, refreshToken) {
        const user = await this.prisma.user.findUnique({
            where: { id: userId },
        });
        if (!user || !user.isActive) {
            throw new common_1.ForbiddenException('Access Denied');
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
            throw new common_1.ForbiddenException('Invalid Refresh Token');
        }
        await this.prisma.refreshToken.update({
            where: { id: savedToken.id },
            data: { revokedAt: new Date() },
        });
        return this.generateTokens(user.id, user.email || user.phone || user.id, user.role);
    }
    async generateTokens(userId, email, role) {
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
    async saveRefreshToken(userId, refreshToken) {
        const hashedToken = this.hashToken(refreshToken);
        const expiresAt = new Date();
        expiresAt.setDate(expiresAt.getDate() + 7);
        await this.prisma.refreshToken.create({
            data: {
                token: hashedToken,
                userId,
                expiresAt,
            },
        });
    }
    hashToken(token) {
        return crypto.createHash('sha256').update(token).digest('hex');
    }
    async phoneStart(dto) {
        const normalizedPhone = this.normalizePhoneNumber(dto.countryCode, dto.phone);
        if (!this.isValidPhoneNumber(normalizedPhone)) {
            throw new common_1.BadRequestException('Invalid phone number format');
        }
        return {
            success: true,
            message: 'OTP verification ready',
            ...(process.env.NODE_ENV !== 'production' && { devOtp: '1234' })
        };
    }
    async phoneVerify(dto) {
        const normalizedPhone = this.normalizePhoneNumber(dto.countryCode, dto.phone);
        if (dto.otp !== '1234') {
            throw new common_1.UnauthorizedException('Invalid or expired OTP');
        }
        const existingUser = await this.prisma.user.findUnique({
            where: { phone: normalizedPhone },
        });
        if (existingUser) {
            if (!existingUser.isActive) {
                throw new common_1.UnauthorizedException('Account is disabled');
            }
            await this.prisma.user.update({
                where: { id: existingUser.id },
                data: { phoneVerifiedAt: new Date() },
            });
            const tokens = await this.generateTokens(existingUser.id, existingUser.email || existingUser.phone || existingUser.id, existingUser.role);
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
        }
        else {
            return {
                userExists: false,
                requiresProfile: true,
                message: 'Please complete your profile',
            };
        }
    }
    async phoneCompleteProfile(dto) {
        const normalizedPhone = this.normalizePhoneNumber(dto.countryCode, dto.phone);
        if (dto.otp !== '1234') {
            throw new common_1.UnauthorizedException('Invalid or expired OTP');
        }
        const existingUser = await this.prisma.user.findUnique({
            where: { phone: normalizedPhone },
        });
        if (existingUser) {
            throw new common_1.ConflictException('Phone number already registered');
        }
        if (dto.email) {
            const emailExists = await this.prisma.user.findUnique({
                where: { email: dto.email },
            });
            if (emailExists) {
                throw new common_1.ConflictException('Email already registered');
            }
        }
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
                passwordHash: null,
            },
        });
        const tokens = await this.generateTokens(newUser.id, newUser.email || normalizedPhone, newUser.role);
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
    normalizePhoneNumber(countryCode, phone) {
        const cleanPhone = phone.replace(/\D/g, '');
        const cleanCountryCode = countryCode.startsWith('+')
            ? countryCode
            : `+${countryCode}`;
        const countryCodeDigits = cleanCountryCode.replace(/\D/g, '');
        if (cleanPhone.startsWith(countryCodeDigits)) {
            return `+${cleanPhone}`;
        }
        return `${cleanCountryCode}${cleanPhone}`;
    }
    isValidPhoneNumber(phone) {
        const phoneRegex = /^\+[1-9]\d{7,14}$/;
        return phoneRegex.test(phone);
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map