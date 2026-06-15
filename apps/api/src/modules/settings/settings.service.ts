import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class SettingsService {
  constructor(private prisma: PrismaService) {}

  async getBanners() {
    const row = await this.prisma.adminSetting.findUnique({ where: { key: 'home_banners' } });
    return (row?.value as any[]) || [];
  }

  async getPricing() {
    const [deliveryRow, taxRow] = await Promise.all([
      this.prisma.adminSetting.findUnique({ where: { key: 'delivery_fee' } }),
      this.prisma.adminSetting.findUnique({ where: { key: 'tax_rate' } }),
    ]);

    const delivery = (deliveryRow?.value as any) ?? { amount: 0, label: 'Delivery', type: 'fixed' };
    const tax = (taxRow?.value as any) ?? { rate: 0, label: 'Tax', type: 'percentage' };

    return { delivery, tax };
  }
}
