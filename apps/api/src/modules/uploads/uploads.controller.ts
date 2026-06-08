import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { UploadsService } from './uploads.service';
import { AuthGuard } from '../../common/guards/auth.guard';

@Controller('v1/uploads')
export class UploadsController {
  constructor(private readonly uploadsService: UploadsService) {}

  @UseGuards(AuthGuard)
  @Post('presigned-url')
  getPresignedUrl(
    @Body() dto: { folder: string; contentType: string },
  ) {
    return this.uploadsService.getPresignedUploadUrl(dto.folder, dto.contentType);
  }
}
