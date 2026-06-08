import { Controller, Get } from '@nestjs/common';
import { PrismaService } from './modules/prisma/prisma.service';

@Controller('health')
export class HealthController {
  constructor(private prisma: PrismaService) {}

  @Get()
  health() {
    return { status: 'ok', timestamp: new Date().toISOString() };
  }

  @Get('db')
  async healthDb() {
    try {
      await this.prisma.$queryRaw`SELECT 1`;
      return { status: 'ok', db: 'connected' };
    } catch (error) {
      return { status: 'error', db: 'disconnected' };
    }
  }

  @Get('redis')
  healthRedis() {
    // TODO: Add Redis check when Redis is integrated
    return { status: 'ok', redis: 'not_configured' };
  }
}
