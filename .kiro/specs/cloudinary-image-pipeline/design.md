# Design Document

## Overview

This document describes the architectural and implementation design of the Cloudinary Image Pipeline feature in Cesto. The system allows admins to upload a single 780×780 PNG image per product, from which all required display sizes are automatically generated via Cloudinary URL transformations.

## Architecture

### High-Level Flow

```
Admin (PixelLab)
  ↓ (exports 780×780 PNG)
Admin UI (ProductForm)
  ↓ (triggers upload)
Cloudinary Upload Service (cloudinary-upload.ts)
  ↓ (compress if JPG/WebP, upload PNG as-is)
Cloudinary (stores as cesto/products/{public_id})
  ↓ (returns public_id)
API / Database (stores public_id only, NOT full URL)
  ↓ (retrieves public_id when rendering UI)
Image Helper (cloudinary.ts)
  ↓ (builds transformation URLs)
UI Components
  ↓ (render <img src={transformedUrl} />)
Browser
  ↓ (requests from res.cloudinary.com)
Cloudinary CDN
  ↓ (applies transformation, serves WebP/PNG)
End User (sees correctly-sized, optimized image)
```

### Core Components

#### 1. **Image Helper (`apps/web/src/lib/cloudinary.ts`)**

**Responsibility:** Build correctly-sized Cloudinary transformation URLs from a stored `public_id`.

**Key Exports:**
- `getProductImage(publicId, variant)` — Main function. Accepts `public_id` or legacy full URL. Returns formatted Cloudinary URL or null.
- `getCardImage(id)` — Convenience shorthand for 400×290 product cards.
- `getCartImage(id)` — Convenience shorthand for 164×164 cart items.
- `getThumbImage(id)` — Convenience shorthand for 104×104 thumbnails.
- `getAdminImage(id)` — Convenience shorthand for 80×80 admin panel.
- `getFullImage(id)` — Convenience shorthand for 780×780 hero image (original size).

**Transformation Strategy:**
- All display variants (card, cart, thumb, admin) use `c_thumb` (smart crop) with `g_auto` (auto-focus) to zoom into the product and remove excess white background padding, making the product fill the entire card/space.
- Full hero image uses `c_pad,b_white` to preserve the full product at original size with padding.
- `f_auto` ensures Cloudinary serves WebP to modern browsers, PNG as fallback.
- `q_auto` allows Cloudinary to optimize file size per context.

**Backward Compatibility:**
- If a full `https://…` URL is passed instead of `public_id`, the helper detects it via `isFullUrl()` and returns it as-is.
- This allows legacy products (uploaded before public_id convention) to render without database migration.

#### 2. **Upload Service (`apps/web/src/lib/cloudinary-upload.ts`)**

**Responsibility:** Handle client-side image upload and compression.

**Key Exports:**
- `uploadToCloudinary(file, folder, onProgress)` — Uploads file to Cloudinary folder. Returns `{ url, publicId }`.
- `compressToWebP(file, maxWidth, maxHeight, quality)` — Compresses non-PNG images to WebP before upload.

**Upload Strategy:**
- PNG files are preserved as-is (PixelLab exports).
- JPG/WebP files are compressed client-side to WebP before upload, reducing file size.
- Upload is direct: browser → Cloudinary (no server round-trip for the file payload).
- Signed upload params are fetched from backend (`adminApiClient.getCloudinarySignature()`).

**Return Value:**
- `publicId` is what gets stored in the database (e.g., `cesto/products/choco-jar-299`).
- `url` is the full Cloudinary secure_url, returned for reference but NOT stored.

#### 3. **Admin UI (`apps/web/src/components/admin/ProductForm.tsx`)**

**Responsibility:** Enable admins to upload images and manage product metadata.

**Upload Flow:**
1. Admin clicks upload button → file picker → selects PNG from PixelLab.
2. `uploadToCloudinary()` is called, returning `{ url, publicId }`.
3. Only `publicId` is added to `form.imageUrls[]` (NOT the full URL).
4. Form is submitted with `imageUrls: [publicId1, publicId2, ...]`.

**Image Preview:**
- Uses `getAdminImage(publicId)` to render 80×80 thumbnails in the form.
- Falls back gracefully if an old full URL is stored (backward compatibility).

**Help Text:**
- "Upload the 780×780 PNG exported from PixelLab"
- "All sizes generated automatically by Cloudinary"
- Clear messaging to prevent admin confusion about manual resizing.

#### 4. **UI Component Integration**

All image-rendering components import and use the convenience helpers:

| Component | File | Size | Helper | Use Case |
|-----------|------|------|--------|----------|
| ProductCard | `products/ProductCard.tsx` | 400×290 | `getCardImage()` | Product listing grids |
| ProductModal | `products/ProductModal.tsx` | 164×164 | `getCartImage()` | Quick view modal |
| Product Detail | `app/product/[slug]/page.tsx` | 780×780 + 104×104 | `getFullImage()`, `getThumbImage()` | Hero + thumbnail strip |
| Cart | `app/cart/page.tsx` | 164×164 | `getCartImage()` | Line item thumbnails |
| Admin Table | `app/admin/products/page.tsx` | 80×80 | `getAdminImage()` | Product list & mobile cards |
| Admin Dashboard | `app/admin/dashboard/page.tsx` | 36×36 | `getAdminImage()` | Low-stock product alerts |
| Order Tracking | `app/track-order/[id]/page.tsx` | 104×104 | `getThumbImage()` | Order summary items |

**Integration Pattern:**
```typescript
import { getCardImage } from '@/lib/cloudinary';

export default function ProductCard({ product }) {
  const imageSrc = getCardImage(product.images[0]?.url);
  return (
    <img 
      src={imageSrc ?? '/fallback.png'} 
      alt={product.name}
    />
  );
}
```

### Database Layer

**Current State:**
- `ProductImage.url` column stores either:
  - `public_id` (new convention): `cesto/products/choco-jar-299`
  - Full URL (legacy): `https://res.cloudinary.com/draedbypr/image/upload/…` (for backward compat)

**Migration Path:**
- No schema change required.
- No immediate migration script needed.
- Backward compat fallback in `isFullUrl()` handles legacy data gracefully.
- Future: Optional migration script to convert legacy URLs to public_ids for cleanup.

### Environment Configuration

**Required .env.local variable:**
```
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=draedbypr
```

**Backend needs (for signed uploads):**
- `CLOUDINARY_CLOUD_NAME`
- `CLOUDINARY_API_KEY`
- `CLOUDINARY_API_SECRET`

These are used by `adminApiClient.getCloudinarySignature()` to generate signed upload params.

## Design Decisions

### 1. Why Store Only public_id, Not Full URLs?

**Decision:** Store `public_id` (e.g., `cesto/products/choco-jar-299`) in the database.

**Rationale:**
- **Decoupling:** If Cloudinary CDN domain changes, no database update needed.
- **Storage Efficiency:** `public_id` is shorter than full URLs.
- **Clarity:** `public_id` explicitly indicates this is Cloudinary-managed, not a static file.
- **URL Generation:** The app controls all transformation logic in `cloudinary.ts`, making it easy to add new sizes or adjust params later.

### 2. Why Preserve PNG, Compress JPG/WebP?

**Decision:** PNG files (PixelLab exports) are uploaded as-is. JPG/WebP are pre-compressed to WebP client-side.

**Rationale:**
- **PNG Fidelity:** PixelLab exports are PNG for transparency; preserving them keeps quality high.
- **Upload Efficiency:** Pre-compressing JPG to WebP reduces bandwidth and speeds up upload.
- **Format Consistency:** Cloudinary's `f_auto` serves WebP to modern browsers, so pre-compression aligns with final delivery format.
- **Transparency Support:** WebP supports transparency; PNG is preserved as-is for cases where alpha channel matters.

### 3. Why Use `c_thumb` (Smart Crop) Instead of `c_pad`?

**Decision:** Display variants (card, cart, thumb, admin) use `c_thumb,g_auto` to zoom and crop intelligently. Only full hero uses `c_pad,b_white`.

**Rationale:**
- **Product Fills Space:** Since PixelLab images have white padding around them, `c_pad` makes products appear small. `c_thumb` intelligently crops into the product, removing padding so the product fills the card.
- **Smart Cropping:** `g_auto` (auto-focus) uses Cloudinary's AI to focus on the main product, not arbitrary padding.
- **Better UX:** Products appear larger and more prominent in cards, improving visual appeal.
- **Hero Preserves Full Product:** At 780×780 full size, using `c_pad,b_white` ensures the entire product with breathing room is always visible for detail viewing.

### 4. Why Build URLs Client-Side, Not Server-Side?

**Decision:** Image helpers are in `apps/web/src/lib/cloudinary.ts` (client), not API.

**Rationale:**
- **Performance:** No extra API call needed; URL is constructed in-browser.
- **Cacheability:** URL is deterministic; browsers cache the resized image once loaded.
- **Simplicity:** No API endpoint or database query needed just to build a URL.
- **Scalability:** Each user's browser does the URL generation, not the server.

### 5. Why Not Use next/image?

**Decision:** Use plain `<img>` tags, not Next.js `<Image>` component.

**Rationale:**
- **Cloudinary Handles Optimization:** Cloudinary's `f_auto,q_auto` already optimizes format and quality.
- **No Additional Config:** Don't need to configure `next.config.js` remote patterns or loader.
- **Simpler Mental Model:** Plain `<img>` is straightforward; Cloudinary URL is the source of truth.
- **Legacy Browser Support:** `<img>` works everywhere; Next.js Image has version-specific quirks.

## Error Handling & Edge Cases

### Case 1: Null or Empty public_id
- `getProductImage(null)` returns `null`.
- Component wraps with fallback: `<img src={imageSrc ?? '/fallback.png'} />`.

### Case 2: Legacy Full URL in Database
- `isFullUrl()` detects `https://…` prefix.
- URL is returned as-is, no transformation applied.
- Image still loads, maintaining backward compatibility.

### Case 3: Invalid public_id Format
- Cloudinary URL is still constructed and sent to browser.
- Cloudinary CDN responds with 404 if public_id doesn't exist.
- Browser shows broken image, which is acceptable (indicates data corruption or missing asset).

### Case 4: Network Latency
- Cloudinary transformation happens server-side at CDN edge, not client-side.
- Browser receives final resized image directly, no additional network hops.

## Testing & Verification

### Unit Tests (cloudinary.ts helpers)
- `getProductImage()` returns null for empty/null input.
- `getProductImage()` returns URL unchanged for full URL input (backward compat).
- `getProductImage()` builds correct transformation URL for each variant (card, cart, thumb, admin, full).
- URL structure matches Cloudinary format: `https://res.cloudinary.com/{cloud_name}/image/upload/{transforms}/{public_id}`.

### Integration Tests (Upload Flow)
- Upload PNG → public_id is extracted and returned (not full URL).
- Upload JPG → compressed to WebP, uploaded, public_id returned.
- Form stores public_id in `imageUrls[]`, not full URL.

### Acceptance Tests (UI Rendering)
- ProductCard renders with correct 400×290 transformation.
- Cart items render with correct 164×164 transformation.
- Admin panel renders with correct 80×80 transformation.
- Legacy URLs (if present) still render without error.
- Images load from Cloudinary CDN (can verify via browser DevTools Network tab).

## Future Enhancements

1. **Migration Script:** Batch-convert legacy full URLs to public_ids for cleanup.
2. **Image Variants Table:** If multiple images per product needed, extend schema to store variant metadata (e.g., "front", "side", "detail").
3. **Cloudinary Webhooks:** Validate upload success server-side via webhook instead of trusting client response.
4. **Smart Cropping:** Use Cloudinary's AI-powered auto-focus (g_auto) to center important product details instead of static padding.
5. **Admin Image Editor:** Allow admins to adjust crop, rotation, or overlay text before saving.
6. **CDN Caching Headers:** Set far-future expires on transformed images to maximize browser caching.
