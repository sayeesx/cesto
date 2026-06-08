export declare class UploadsService {
    private s3Client;
    constructor();
    getPresignedUploadUrl(folder: string, contentType: string): Promise<{
        uploadUrl: string;
        publicUrl: string;
        key: string;
    }>;
}
