import { UploadsService } from './uploads.service';
export declare class UploadsController {
    private readonly uploadsService;
    constructor(uploadsService: UploadsService);
    getPresignedUrl(req: any, folder?: string, contentType?: string): Promise<{
        uploadUrl: string;
        publicUrl: string;
        key: string;
    }>;
    deleteFile(req: any, key: string): Promise<{
        success: boolean;
    }>;
}
