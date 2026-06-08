import { UploadsService } from './uploads.service';
export declare class UploadsController {
    private readonly uploadsService;
    constructor(uploadsService: UploadsService);
    getPresignedUrl(dto: {
        folder: string;
        contentType: string;
    }): Promise<{
        uploadUrl: string;
        publicUrl: string;
        key: string;
    }>;
}
