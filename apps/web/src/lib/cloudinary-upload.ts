import { adminApiClient } from './api-client';

export interface UploadResult {
  /** Full Cloudinary secure_url — kept for reference but NOT stored in DB */
  url: string;
  /**
   * Cloudinary public_id — THIS is what gets stored in ProductImage.url.
   * Example: "cesto/products/choco-jar-299"
   * The app rebuilds sized URLs from this via getProductImage().
   */
  publicId: string;
}

/**
 * Compress and convert any image (jpg/png/webp/etc.) to WebP using
 * the Canvas API before uploading. This dramatically reduces file size
 * and guarantees WebP delivery for fast page loads.
 *
 * @param file         Original image file (jpg, png, webp, gif…)
 * @param maxWidth     Max output width in pixels (default 1200)
 * @param maxHeight    Max output height in pixels (default 1200)
 * @param quality      WebP quality 0–1 (default 0.82)
 */
export async function compressToWebP(
  file: File,
  maxWidth = 1200,
  maxHeight = 1200,
  quality = 0.82,
): Promise<File> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const objectUrl = URL.createObjectURL(file);

    img.onload = () => {
      URL.revokeObjectURL(objectUrl);

      // Calculate dimensions while preserving aspect ratio
      let { width, height } = img;
      if (width > maxWidth || height > maxHeight) {
        const ratio = Math.min(maxWidth / width, maxHeight / height);
        width = Math.round(width * ratio);
        height = Math.round(height * ratio);
      }

      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;

      const ctx = canvas.getContext('2d');
      if (!ctx) { resolve(file); return; }

      ctx.drawImage(img, 0, 0, width, height);

      canvas.toBlob(
        (blob) => {
          if (!blob) { resolve(file); return; }
          const webpFile = new File(
            [blob],
            file.name.replace(/\.[^.]+$/, '') + '.webp',
            { type: 'image/webp' },
          );
          resolve(webpFile);
        },
        'image/webp',
        quality,
      );
    };

    img.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      // Fall back to original file if image can't be loaded
      resolve(file);
    };

    img.src = objectUrl;
  });
}

/**
 * Upload a file to Cloudinary using signed params from our backend.
 * Accepts PNG, JPG, WebP — PNG is preserved as-is (PixelLab exports PNG).
 * JPG/WebP are compressed client-side before upload.
 * Uses the admin session token — only works inside admin pages.
 *
 * Returns { url, publicId } — the publicId should be saved to the database,
 * NOT the url. The app generates sized URLs via getProductImage(publicId, variant).
 */
export async function uploadToCloudinary(
  file: File,
  folder = 'cesto/products',
  onProgress?: (pct: number) => void,
): Promise<UploadResult> {
  // PNG files from PixelLab are kept as-is — don't compress them.
  // Cloudinary's f_auto will serve WebP to modern browsers automatically.
  // Other formats (jpg, webp) are compressed client-side.
  const isPng = file.type === 'image/png';
  const isAnimated = file.type === 'image/gif';
  const processedFile = (isPng || isAnimated) ? file : await compressToWebP(file);

  // 2. Get signed params — authenticated with admin token
  const params = await adminApiClient.getCloudinarySignature(folder);

  // 3. Build FormData for direct Cloudinary upload
  const form = new FormData();
  form.append('file', processedFile);
  form.append('api_key', params.apiKey);
  form.append('timestamp', String(params.timestamp));
  form.append('signature', params.signature);
  form.append('folder', params.folder);
  form.append('public_id', params.publicId);

  // 4. Upload directly to Cloudinary (browser → Cloudinary, no server round-trip for the file)
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', params.uploadUrl);

    xhr.upload.onprogress = (e) => {
      if (e.lengthComputable && onProgress) {
        onProgress(Math.round((e.loaded / e.total) * 100));
      }
    };

    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        const data = JSON.parse(xhr.responseText);
        resolve({ url: data.secure_url, publicId: data.public_id });
      } else {
        reject(new Error(`Cloudinary upload failed: ${xhr.responseText}`));
      }
    };

    xhr.onerror = () => reject(new Error('Upload network error'));
    xhr.send(form);
  });
}
