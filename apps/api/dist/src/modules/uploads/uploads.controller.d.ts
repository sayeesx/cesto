import { Request } from 'express';
import { UploadsService } from './uploads.service';
import { CloudinaryService } from './cloudinary.service';
export declare class UploadsController {
    private readonly uploadsService;
    private readonly cloudinaryService;
    constructor(uploadsService: UploadsService, cloudinaryService: CloudinaryService);
    getCloudinarySignature(folder?: string): {
        cloudName: string;
        apiKey: string;
        timestamp: number;
        folder: string;
        publicId: string;
        signature: string;
        uploadUrl: string;
    };
    getPresignedUrl(req: Request & {
        user: any;
    }, folder?: string, contentType?: string): Promise<{
        uploadUrl: string;
        publicUrl: string;
        key: string;
    }>;
    deleteFile(req: Request & {
        user: any;
    }, key: string): Promise<{
        success: boolean;
    }>;
}
