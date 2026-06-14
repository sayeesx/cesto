import { Injectable, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import * as https from 'https';
import * as crypto from 'crypto';

@Injectable()
export class CloudinaryService {
  private cloudName: string;
  private apiKey: string;
  private apiSecret: string;
  private configured: boolean;

  constructor() {
    this.cloudName = process.env.CLOUDINARY_CLOUD_NAME || '';
    this.apiKey = process.env.CLOUDINARY_API_KEY || '';
    this.apiSecret = process.env.CLOUDINARY_API_SECRET || '';
    this.configured = !!(this.cloudName && this.apiKey && this.apiSecret);
  }

  isConfigured() {
    return this.configured;
  }

  /**
   * Generate a signed upload params object for client-side direct upload.
   * The frontend sends the file directly to Cloudinary with these params.
   */
  generateSignedUploadParams(folder = 'cesto/products') {
    if (!this.configured) {
      throw new BadRequestException('Cloudinary is not configured. Set CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET in env.');
    }

    const timestamp = Math.round(Date.now() / 1000);
    const publicId = `${folder}/${crypto.randomUUID()}`;

    // Params to sign (must be sorted alphabetically)
    const paramsToSign = `folder=${folder}&public_id=${publicId}&timestamp=${timestamp}`;
    const signature = crypto
      .createHash('sha256')
      .update(paramsToSign + this.apiSecret)
      .digest('hex');

    return {
      cloudName: this.cloudName,
      apiKey: this.apiKey,
      timestamp,
      folder,
      publicId,
      signature,
      uploadUrl: `https://api.cloudinary.com/v1_1/${this.cloudName}/image/upload`,
    };
  }

  /**
   * Delete an image by its public_id
   */
  async deleteImage(publicId: string): Promise<void> {
    if (!this.configured) return;

    const timestamp = Math.round(Date.now() / 1000);
    const signature = crypto
      .createHash('sha256')
      .update(`public_id=${publicId}&timestamp=${timestamp}${this.apiSecret}`)
      .digest('hex');

    const formData = `public_id=${encodeURIComponent(publicId)}&timestamp=${timestamp}&api_key=${this.apiKey}&signature=${signature}`;

    await new Promise<void>((resolve, reject) => {
      const req = https.request(
        {
          hostname: 'api.cloudinary.com',
          path: `/v1_1/${this.cloudName}/image/destroy`,
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Length': Buffer.byteLength(formData),
          },
        },
        (res) => {
          res.on('data', () => {});
          res.on('end', resolve);
        },
      );
      req.on('error', reject);
      req.write(formData);
      req.end();
    });
  }
}
