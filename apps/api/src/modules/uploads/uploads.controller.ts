import { Controller, Post, Body, UseGuards, Req, Delete, Param, Get } from '@nestjs/common';
import { UploadsService } from './uploads.service';
import { CloudinaryService } from './cloudinary.service';
import { AuthGuard } from '../../common/guards/auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';

@Controller('v1/uploads')
@UseGuards(AuthGuard)
export class UploadsController {
  constructor(
    private readonly uploadsService: UploadsService,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  // Cloudinary: get signed upload params (admin only)
  @Post('cloudinary-sign')
  @UseGuards(RolesGuard)
  @Roles('ADMIN', 'SUPER_ADMIN')
  getCloudinarySignature(
    @Body('folder') folder: string = 'cesto/products',
  ) {
    return this.cloudinaryService.generateSignedUploadParams(folder);
  }

  // R2 presigned URL (kept for backwards compat)
  @Post('presigned-url')
  getPresignedUrl(
    @Req() req: any,
    @Body('folder') folder: string = 'general',
    @Body('contentType') contentType: string = 'image/jpeg',
  ) {
    return this.uploadsService.getPresignedUploadUrl(folder, contentType, req.user.sub);
  }

  @Delete(':key')
  deleteFile(@Req() req: any, @Param('key') key: string) {
    return this.uploadsService.deleteFile(key, req.user.sub);
  }
}
