import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { AdminProductsService } from './admin-products.service';
import { AdminCategoriesService } from './admin-categories.service';

@Module({
  controllers: [AdminController],
  providers: [AdminService, AdminProductsService, AdminCategoriesService],
  exports: [AdminService],
})
export class AdminModule {}
