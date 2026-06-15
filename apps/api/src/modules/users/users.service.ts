import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async getAddresses(userId: string) {
    return this.prisma.address.findMany({
      where: { userId },
      orderBy: [{ isDefault: 'desc' }, { createdAt: 'desc' }],
    });
  }

  async createAddress(userId: string, dto: {
    type?: string;
    name: string;
    phone: string;
    addressLine: string;
    area: string;
    city: string;
    pincode: string;
    state: string;
    country?: string;
    isDefault?: boolean;
  }) {
    // If this is the first address or isDefault requested, demote others
    if (dto.isDefault) {
      await this.prisma.address.updateMany({
        where: { userId },
        data: { isDefault: false },
      });
    }
    // If no addresses exist yet, make this default automatically
    const count = await this.prisma.address.count({ where: { userId } });
    const shouldDefault = dto.isDefault || count === 0;

    return this.prisma.address.create({
      data: {
        userId,
        type: dto.type || 'HOME',
        name: dto.name,
        phone: dto.phone,
        addressLine: dto.addressLine,
        area: dto.area,
        city: dto.city,
        pincode: dto.pincode,
        state: dto.state,
        country: dto.country || 'India',
        isDefault: shouldDefault,
        updatedAt: new Date(),
      },
    });
  }

  async updateAddress(userId: string, addressId: string, dto: Partial<{
    type: string;
    name: string;
    phone: string;
    addressLine: string;
    area: string;
    city: string;
    pincode: string;
    state: string;
    country: string;
    isDefault: boolean;
  }>) {
    const address = await this.prisma.address.findFirst({ where: { id: addressId, userId } });
    if (!address) throw new NotFoundException('Address not found');

    if (dto.isDefault) {
      await this.prisma.address.updateMany({ where: { userId }, data: { isDefault: false } });
    }

    return this.prisma.address.update({
      where: { id: addressId },
      data: { ...dto, updatedAt: new Date() },
    });
  }

  async deleteAddress(userId: string, addressId: string) {
    const address = await this.prisma.address.findFirst({ where: { id: addressId, userId } });
    if (!address) throw new NotFoundException('Address not found');
    return this.prisma.address.delete({ where: { id: addressId } });
  }

  async setDefaultAddress(userId: string, addressId: string) {
    const address = await this.prisma.address.findFirst({ where: { id: addressId, userId } });
    if (!address) throw new NotFoundException('Address not found');
    await this.prisma.address.updateMany({ where: { userId }, data: { isDefault: false } });
    return this.prisma.address.update({ where: { id: addressId }, data: { isDefault: true, updatedAt: new Date() } });
  }
}
