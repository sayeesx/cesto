import { Controller, Post, Body, UseGuards, Req, Delete, Param } from '@nestjs/common';
import { UploadsService } from './uploads.service';
import { AuthGuard } from '../../common/guards/auth.guard';

@Controller('v1/uploads')
@UseGuards(AuthGuard)
export class UploadsController {
  constructor(private readonly uploadsService: UploadsService) {}

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
