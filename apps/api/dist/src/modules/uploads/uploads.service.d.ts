import { AuditService } from '../audit/audit.service';
export declare class UploadsService {
    private audit;
    private s3Client;
    private bucket;
    constructor(audit: AuditService);
    getPresignedUploadUrl(folder: string, contentType: string, userId: string): Promise<{
        uploadUrl: string;
        publicUrl: string;
        key: string;
    }>;
    deleteFile(key: string, userId: string): Promise<{
        success: boolean;
    }>;
}
