import { IsString, IsNumber, IsOptional, IsBoolean, IsArray, Min, IsUrl } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateProductDto {
  @IsString()
  name: string;

  @IsString()
  slug: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  whatsInside?: string;

  @IsNumber()
  @Min(0)
  @Type(() => Number)
  price: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Type(() => Number)
  compareAtPrice?: number;

  @IsNumber()
  @Min(0)
  @Type(() => Number)
  stock: number;

  @IsOptional()
  @IsString()
  deliveryEstimate?: string;

  @IsOptional()
  @IsBoolean()
  sameDayAvailable?: boolean;

  @IsOptional()
  @IsBoolean()
  isPersonalizable?: boolean;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  // Cloudinary URLs for images
  @IsOptional()
  @IsArray()
  imageUrls?: string[];

  // IDs of categories to link
  @IsOptional()
  @IsArray()
  categoryIds?: string[];

  // IDs of occasions to link
  @IsOptional()
  @IsArray()
  occasionIds?: string[];

  @IsOptional()
  @IsArray()
  tags?: string[];
}

export class UpdateProductDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  slug?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  whatsInside?: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Type(() => Number)
  price?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Type(() => Number)
  compareAtPrice?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Type(() => Number)
  stock?: number;

  @IsOptional()
  @IsString()
  deliveryEstimate?: string;

  @IsOptional()
  @IsBoolean()
  sameDayAvailable?: boolean;

  @IsOptional()
  @IsBoolean()
  isPersonalizable?: boolean;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @IsOptional()
  @IsArray()
  imageUrls?: string[];

  @IsOptional()
  @IsArray()
  categoryIds?: string[];

  @IsOptional()
  @IsArray()
  occasionIds?: string[];

  @IsOptional()
  @IsArray()
  tags?: string[];
}
