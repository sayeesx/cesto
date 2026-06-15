import { Controller, Get, Param, Patch, Query, Body, UseGuards, Req, Post, Put, Delete } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminProductsService } from './admin-products.service';
import { AdminCategoriesService } from './admin-categories.service';
import { AuthGuard } from '../../common/guards/auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { CreateProductDto, UpdateProductDto } from './dto/product.dto';
import { CreateCategoryDto, UpdateCategoryDto } from './dto/category.dto';

@Controller('v1/admin')
@UseGuards(AuthGuard, RolesGuard)
@Roles('ADMIN', 'SUPER_ADMIN')
export class AdminController {
  constructor(
    private readonly adminService: AdminService,
    private readonly adminProductsService: AdminProductsService,
    private readonly adminCategoriesService: AdminCategoriesService,
  ) {}

  // ── Dashboard ──
  @Get('dashboard')
  getDashboardStats() {
    return this.adminService.getDashboardStats();
  }

  // ── Orders ──
  @Get('orders')
  getOrders(
    @Query('status') status?: string,
    @Query('page') page?: string,
    @Query('limit') limit?: string,
  ) {
    return this.adminService.getOrders(status, Number(page) || 1, Number(limit) || 20);
  }

  @Patch('orders/:id/status')
  updateOrderStatus(
    @Param('id') id: string,
    @Body() dto: { status: string },
    @Req() req: any,
  ) {
    return this.adminService.updateOrderStatus(id, dto.status, req.user?.sub);
  }

  @Get('audit-logs')
  getAuditLogs(
    @Query('page') page?: string,
    @Query('limit') limit?: string,
  ) {
    return this.adminService.getAuditLogs(Number(page) || 1, Number(limit) || 50);
  }

  // ── Products ──
  @Get('products')
  listProducts(
    @Query('page') page?: string,
    @Query('limit') limit?: string,
    @Query('search') search?: string,
  ) {
    return this.adminProductsService.listProducts(Number(page) || 1, Number(limit) || 20, search);
  }

  @Get('products/:id')
  getProduct(@Param('id') id: string) {
    return this.adminProductsService.getProduct(id);
  }

  @Post('products')
  createProduct(@Body() dto: CreateProductDto, @Req() req: any) {
    return this.adminProductsService.createProduct(dto, req.user.sub);
  }

  @Patch('products/:id')
  updateProduct(@Param('id') id: string, @Body() dto: UpdateProductDto, @Req() req: any) {
    return this.adminProductsService.updateProduct(id, dto, req.user.sub);
  }

  @Delete('products/:id')
  deleteProduct(@Param('id') id: string, @Req() req: any) {
    return this.adminProductsService.deleteProduct(id, req.user.sub);
  }

  // ── Categories & Occasions ──
  @Get('categories')
  listCategories() {
    return this.adminCategoriesService.listCategories();
  }

  @Post('categories')
  createCategory(@Body() dto: CreateCategoryDto, @Req() req: any) {
    return this.adminCategoriesService.createCategory(dto, req.user.sub);
  }

  @Patch('categories/:id')
  updateCategory(@Param('id') id: string, @Body() dto: UpdateCategoryDto, @Req() req: any) {
    return this.adminCategoriesService.updateCategory(id, dto, req.user.sub);
  }

  @Delete('categories/:id')
  deleteCategory(@Param('id') id: string, @Req() req: any) {
    return this.adminCategoriesService.deleteCategory(id, req.user.sub);
  }

  // ── Banners ──
  @Get('banners')
  getBanners() {
    return this.adminService.getBanners();
  }

  @Put('banners')
  updateBanners(@Body() dto: { banners: any[] }, @Req() req: any) {
    return this.adminService.updateBanners(dto.banners, req.user.sub);
  }
}
