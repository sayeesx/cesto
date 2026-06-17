/**
 * Cloudinary Image Helper
 *
 * Admins upload one 780×780 PNG to Cloudinary (cesto/products/…).
 * Only the Cloudinary public_id is stored in the database.
 * This helper builds correctly-sized, optimized URLs on the fly.
 *
 * Usage:
 *   import { getProductImage } from '@/lib/cloudinary';
 *   <img src={getProductImage(publicId, 'card')} />
 */

const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'draedbypr';

/** All supported size variants */
export type ImageVariant = 'card' | 'cart' | 'thumb' | 'admin' | 'full';

/**
 * Cloudinary transformation strings for each UI context.
 *
 * Transformation strategy:
 * - card, cart, thumb, admin: use c_thumb (smart crop) to zoom into the product,
 *   removing excess white background padding so product fills the card/space
 * - full: use c_pad,b_white to preserve full product visibility at hero size
 *
 * f_auto delivers WebP to modern browsers, PNG as fallback.
 * q_auto lets Cloudinary pick the best quality for file size.
 */
const TRANSFORMS: Record<ImageVariant, string> = {
  /** Product card grid — 400 × 290, zoomed to fill (removes padding) */
  card:  'f_auto,q_auto,w_400,h_290,c_thumb,g_auto',
  /** Cart / checkout line item — 164 × 164, zoomed to fill */
  cart:  'f_auto,q_auto,w_164,h_164,c_thumb,g_auto',
  /** Product detail thumbnail strip — 104 × 104, zoomed to fill */
  thumb: 'f_auto,q_auto,w_104,h_104,c_thumb,g_auto',
  /** Admin panel product list — 80 × 80, zoomed to fill */
  admin: 'f_auto,q_auto,w_80,h_80,c_thumb,g_auto',
  /** Full-size product detail hero — 780 × 780, keep full product visible */
  full:  'f_auto,q_auto,w_780,h_780,c_pad,b_white',
};

/**
 * Returns true when the string looks like a full https:// URL rather than
 * a Cloudinary public_id. Used for backward compatibility with products
 * that were saved before the public_id-only convention was adopted.
 */
function isFullUrl(value: string): boolean {
  return value.startsWith('http://') || value.startsWith('https://');
}

/**
 * Build a Cloudinary transformation URL from a public_id.
 *
 * @param publicId  The Cloudinary public_id, e.g. "cesto/products/choco-jar-299"
 *                  OR a legacy full URL — returned as-is for backward compat.
 * @param variant   The size context. Defaults to 'card'.
 * @returns         A ready-to-use image URL, or null if publicId is empty.
 */
export function getProductImage(
  publicId: string | null | undefined,
  variant: ImageVariant = 'card',
): string | null {
  if (!publicId || !publicId.trim()) return null;

  // Backward compatibility: if a full URL was stored before the migration,
  // serve it directly without transformation.
  if (isFullUrl(publicId)) return publicId;

  const transform = TRANSFORMS[variant];
  return `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/${transform}/${publicId}`;
}

/**
 * Convenience shorthands for each render context.
 * These are the primary import targets for UI components.
 */
export const getCardImage  = (id: string | null | undefined) => getProductImage(id, 'card');
export const getCartImage  = (id: string | null | undefined) => getProductImage(id, 'cart');
export const getThumbImage = (id: string | null | undefined) => getProductImage(id, 'thumb');
export const getAdminImage = (id: string | null | undefined) => getProductImage(id, 'admin');
export const getFullImage  = (id: string | null | undefined) => getProductImage(id, 'full');
