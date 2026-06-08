import { PrismaService } from './modules/prisma/prisma.service';
export declare class HealthController {
    private prisma;
    constructor(prisma: PrismaService);
    health(): {
        status: string;
        timestamp: string;
    };
    healthDb(): Promise<{
        status: string;
        db: string;
    }>;
    healthRedis(): {
        status: string;
        redis: string;
    };
}
