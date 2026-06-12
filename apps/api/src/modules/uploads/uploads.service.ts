import { Injectable, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { S3Client, PutObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import * as crypto from 'crypto';
import { AuditService } from '../audit/audit.service';

@Injectable()
export class UploadsService {
  private s3Client: S3Client | null = null;
  private bucket: string;

  constructor(private audit: AuditService) {
    const accountId = process.env.R2_ACCOUNT_ID;
    const accessKeyId = process.env.R2_ACCESS_KEY_ID;
    const secretAccessKey = process.env.R2_SECRET_ACCESS_KEY;
    this.bucket = process.env.R2_BUCKET_NAME || '';

    if (accountId && accessKeyId && secretAccessKey) {
      this.s3Client = new S3Client({
        region: 'auto',
        endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
        credentials: {
          accessKeyId,
          secretAccessKey,
        },
      });
    }
  }

  async getPresignedUploadUrl(folder: string, contentType: string, userId: string) {
    if (!this.s3Client) {
      throw new BadRequestException('Storage service not configured');
    }
    if (!this.bucket) {
      throw new BadRequestException('Bucket not configured');
    }

    const fileExtension = contentType.split('/')[1] || 'bin';
    const key = `${folder}/${crypto.randomUUID()}.${fileExtension}`;

    const command = new PutObjectCommand({
      Bucket: this.bucket,
      Key: key,
      ContentType: contentType,
    });

    try {
      const presignedUrl = await getSignedUrl(this.s3Client, command, {
        expiresIn: 600, // 10 minutes
      });

      const publicUrl = process.env.R2_PUBLIC_URL
        ? `${process.env.R2_PUBLIC_URL}/${key}`
        : key;

      await this.audit.log({
        userId,
        action: 'UPLOADS_URL_GENERATE',
        entityType: 'Upload',
        entityId: key,
        newValue: { folder, contentType, publicUrl },
      });

      return {
        uploadUrl: presignedUrl,
        publicUrl,
        key,
      };
    } catch (error) {
      console.error('R2 Presign Error:', error);
      throw new InternalServerErrorException('Could not generate upload URL');
    }
  }

  async deleteFile(key: string, userId: string) {
    if (!this.s3Client) throw new BadRequestException('Storage service not configured');

    const command = new DeleteObjectCommand({
      Bucket: this.bucket,
      Key: key,
    });

    try {
      await this.s3Client.send(command);
      
      await this.audit.log({
        userId,
        action: 'UPLOADS_FILE_DELETE',
        entityType: 'Upload',
        entityId: key,
      });
      
      return { success: true };
    } catch (error) {
      console.error('R2 Delete Error:', error);
      throw new InternalServerErrorException('Could not delete file');
    }
  }
}
