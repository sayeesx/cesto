import { Injectable, BadRequestException } from '@nestjs/common';
import { S3Client, PutObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import * as crypto from 'crypto';

@Injectable()
export class UploadsService {
  private s3Client: S3Client | null = null;

  constructor() {
    const accountId = process.env.R2_ACCOUNT_ID;
    const accessKeyId = process.env.R2_ACCESS_KEY_ID;
    const secretAccessKey = process.env.R2_SECRET_ACCESS_KEY;

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

  /**
   * Generate a presigned URL for frontend upload to Cloudflare R2.
   */
  async getPresignedUploadUrl(folder: string, contentType: string) {
    if (!this.s3Client) {
      throw new BadRequestException('R2 storage not configured');
    }

    const bucket = process.env.R2_BUCKET_NAME;
    if (!bucket) throw new BadRequestException('R2 bucket not configured');

    const fileExtension = contentType.split('/')[1] || 'bin';
    const key = `${folder}/${crypto.randomUUID()}.${fileExtension}`;

    const command = new PutObjectCommand({
      Bucket: bucket,
      Key: key,
      ContentType: contentType,
    });

    const presignedUrl = await getSignedUrl(this.s3Client, command, {
      expiresIn: 600, // 10 minutes
    });

    const publicUrl = process.env.R2_PUBLIC_URL
      ? `${process.env.R2_PUBLIC_URL}/${key}`
      : key;

    return {
      uploadUrl: presignedUrl,
      publicUrl,
      key,
    };
  }
}
