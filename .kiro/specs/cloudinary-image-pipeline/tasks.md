# Implementation Tasks

## Overview

This document defines the implementation tasks for the Cloudinary Image Pipeline feature. Tasks are organized in dependency order so they can be executed sequentially or in parallel where no dependencies exist.

All code has been implemented. These tasks are for **verification and testing** to ensure the implementation is production-ready.

---

## Task 1: Verify Image Helper URL Construction

**Objective:** Confirm that `cloudinary.ts` builds correct, deterministic transformation URLs.

**Description:**
The image helper module (`apps/web/src/lib/cloudinary.ts`) must construct valid Cloudinary URLs for each size variant. This task verifies the URL format, determinism, and backward compatibility with legacy full URLs.

**Subtasks:**

1. Verify `getProductImage()` returns `null` when given `null`, `undefined`, or empty string.
2. Verify `getProductImage()` returns the URL unchanged when given a full `https://` URL (backward compat).
3. Verify `getCardImage(publicId)` builds URL with correct transformation: `f_auto,q_auto,w_400,h_290,c_pad,b_white`.
4. Verify `getCartImage(publicId)` builds URL with correct transformation: `f_auto,q_auto,w_164,h_164,c_pad,b_white`.
5. Verify `getThumbImage(publicId)` builds URL with correct transformation: `f_auto,q_auto,w_104,h_104,c_pad,b_white`.
6. Verify `getAdminImage(publicId)` builds URL with correct transformation: `f_auto,q_auto,w_80,h_80,c_pad,b_white`.
7. Verify `getFullImage(publicId)` builds URL with correct transformation: `f_auto,q_auto,w_780,h_780,c_pad,b_white`.
8. Verify URL structure matches Cloudinary format: `https://res.cloudinary.com/{CLOUD_NAME}/image/upload/{transformations}/{public_id}`.
9. Verify same `public_id` and variant always produce the same URL (deterministic).
10. Verify cloud name is read from `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` env var (currently `draedbypr`).

**Expected Outcome:** All helpers produce valid, deterministic URLs with correct transformations and cloud name.

**Acceptance Criteria:**
- ✓ `getProductImage(null)` returns `null`.
- ✓ `getProductImage('https://example.com/img.png')` returns that URL unchanged.
- ✓ `getCardImage('cesto/products/test')` returns `https://res.cloudinary.com/draedbypr/image/upload/f_auto,q_auto,w_400,h_290,c_pad,b_white/cesto/products/test`.
- ✓ Multiple calls with same inputs produce identical output.

---

## Task 2: Verify Upload Service Returns public_id (Not Full URL)

**Objective:** Confirm that `uploadToCloudinary()` returns and stores only the `public_id`, not the full URL.

**Description:**
The upload service must return an object with both `url` (for reference) and `publicId` (for database storage). The ProductForm component must extract and store only the `publicId`.

**Subtasks:**

1. Verify `uploadToCloudinary()` returns object with `{ url: string, publicId: string }`.
2. Verify `publicId` matches the format uploaded to Cloudinary (e.g., starts with `cesto/products/`).
3. Verify PNG files are uploaded without client-side compression.
4. Verify JPG/WebP files are compressed to WebP client-side before upload.
5. Verify form submission stores only `publicId` in `form.imageUrls[]`, not `url`.

**Expected Outcome:** Upload service correctly extracts and returns `publicId`, form correctly stores only `publicId` in database.

**Acceptance Criteria:**
- ✓ Upload returns `publicId` in the format `cesto/products/{filename}`.
- ✓ ProductForm stores `publicId` values in `imageUrls[]`.
- ✓ PNG files pass through without compression.
- ✓ JPG files are compressed to WebP before upload.

---

## Task 3: Verify ProductForm Upload Integration

**Objective:** Confirm that the ProductForm component correctly handles image uploads and stores public_ids.

**Description:**
The admin product form must integrate with the upload service, handle progress/errors, and store only public_ids (not full URLs).

**Subtasks:**

1. Verify upload button is present and clickable.
2. Verify file picker accepts PNG, JPG, WebP formats.
3. Verify upload progress is displayed to admin during upload.
4. Verify upload error (if any) is displayed clearly.
5. Verify thumbnail previews render correctly after upload using `getAdminImage()` helper.
6. Verify thumbnails also render for legacy full URLs (backward compat).
7. Verify form submission includes public_ids in the `imageUrls` array.
8. Verify help text explains: "Upload the 780×780 PNG exported from PixelLab. All sizes generated automatically by Cloudinary."

**Expected Outcome:** ProductForm correctly uploads images, displays progress, and stores only public_ids.

**Acceptance Criteria:**
- ✓ After uploading a PNG, a thumbnail appears in the form.
- ✓ Thumbnail is 80×80 (via `getAdminImage()`).
- ✓ Form can be submitted with public_id stored in `imageUrls[]`.

---

## Task 4: Verify ProductCard Renders Correct Image Size

**Objective:** Confirm that ProductCard displays the 400×290 product card image using the correct Cloudinary transformation.

**Description:**
ProductCard component must import `getCardImage()` helper and render the 400×290 transformation.

**Subtasks:**

1. Verify ProductCard imports `getCardImage` from cloudinary.ts.
2. Verify ProductCard passes product image public_id to `getCardImage()`.
3. Verify rendered `<img>` element has `src` pointing to Cloudinary URL with `f_auto,q_auto,w_400,h_290,c_pad,b_white` transformation.
4. Verify image is responsive and displays at intended size in grid context.
5. Verify fallback image is shown if public_id is null.

**Expected Outcome:** ProductCard renders 400×290 images with correct transformation.

**Acceptance Criteria:**
- ✓ ProductCard in browser DevTools Network tab shows image request to Cloudinary with correct transformation.
- ✓ Image displays without cropping (full product visible).
- ✓ Image is appropriately sized for product grid cards.

---

## Task 5: Verify Cart Item Images Render Correct Size

**Objective:** Confirm that cart items display the 164×164 product image using the correct Cloudinary transformation.

**Description:**
Cart page must import `getCartImage()` helper and render the 164×164 transformation for line items.

**Subtasks:**

1. Verify cart page imports `getCartImage` from cloudinary.ts.
2. Verify each cart line item renders product image with `getCartImage(publicId)`.
3. Verify rendered `<img>` element has `src` pointing to Cloudinary URL with `f_auto,q_auto,w_164,h_164,c_pad,b_white` transformation.
4. Verify image displays at 164×164 size without distortion.
5. Verify fallback is shown if image is unavailable.

**Expected Outcome:** Cart items render 164×164 images with correct transformation.

**Acceptance Criteria:**
- ✓ Cart page network requests show Cloudinary images with correct `w_164,h_164` transformation.
- ✓ Images appear square and appropriately sized next to cart item details.

---

## Task 6: Verify Product Detail Page Images

**Objective:** Confirm that product detail page displays both hero (780×780) and thumbnail (104×104) images with correct transformations.

**Description:**
Product detail page must import both `getFullImage()` and `getThumbImage()` helpers and render the correct sizes.

**Subtasks:**

1. Verify product detail page imports `getFullImage` and `getThumbImage` from cloudinary.ts.
2. Verify hero image renders with `getFullImage(publicId)`: transformation includes `w_780,h_780`.
3. Verify thumbnail strip images render with `getThumbImage(publicId)`: transformation includes `w_104,h_104`.
4. Verify hero image is large and prominent on the page.
5. Verify thumbnails are small and clickable/swappable.
6. Verify all transformations include `f_auto,q_auto,c_pad,b_white`.

**Expected Outcome:** Product detail page renders hero and thumbnail images with correct sizes.

**Acceptance Criteria:**
- ✓ Hero image network request shows `w_780,h_780` transformation.
- ✓ Thumbnail network requests show `w_104,h_104` transformation.
- ✓ Hero image displays large and full-size on desktop.
- ✓ Thumbnails are visibly smaller and arranged in a strip.

---

## Task 7: Verify Admin Product List Images

**Objective:** Confirm that admin product list table displays 80×80 images using the correct Cloudinary transformation.

**Description:**
Admin products page must import `getAdminImage()` helper and render the 80×80 transformation for table rows and mobile cards.

**Subtasks:**

1. Verify admin products page imports `getAdminImage` from cloudinary.ts.
2. Verify table rows display product images with `getAdminImage(publicId)`: transformation includes `w_80,h_80`.
3. Verify mobile product cards display product images with `getAdminImage(publicId)` at appropriate mobile size (52×52 displayed as 80×80).
4. Verify images render with `f_auto,q_auto,c_pad,b_white`.
5. Verify placeholder is shown for products without images.

**Expected Outcome:** Admin product list renders 80×80 images with correct transformation.

**Acceptance Criteria:**
- ✓ Admin products page network requests show Cloudinary images with `w_80,h_80` transformation.
- ✓ Table and mobile layouts display appropriately-sized product thumbnails.

---

## Task 8: Verify Admin Dashboard Low-Stock Images

**Objective:** Confirm that admin dashboard displays low-stock product thumbnails using the correct Cloudinary transformation.

**Description:**
Admin dashboard must import `getAdminImage()` helper and render appropriately-sized images for low-stock product alerts.

**Subtasks:**

1. Verify admin dashboard imports `getAdminImage` from cloudinary.ts.
2. Verify low-stock products display thumbnails with `getAdminImage(publicId)` at 36×36 size (displayed via 80×80 transformation).
3. Verify images render with `f_auto,q_auto,c_pad,b_white`.
4. Verify placeholder is shown if image is unavailable.

**Expected Outcome:** Admin dashboard renders product thumbnails with correct transformation.

**Acceptance Criteria:**
- ✓ Dashboard low-stock section displays product images.
- ✓ Network requests show Cloudinary transformation.

---

## Task 9: Verify Order Tracking Page Images

**Objective:** Confirm that order tracking page displays order item images using the correct Cloudinary transformation.

**Description:**
Order tracking detail page must import `getThumbImage()` helper and render 104×104 images for order summary items.

**Subtasks:**

1. Verify order tracking page imports `getThumbImage` from cloudinary.ts.
2. Verify each order item renders product image with `getThumbImage(publicId)`: transformation includes `w_104,h_104`.
3. Verify images render with `f_auto,q_auto,c_pad,b_white`.
4. Verify fallback is shown if image is unavailable.

**Expected Outcome:** Order tracking page renders product images with correct transformation.

**Acceptance Criteria:**
- ✓ Order summary displays product images at appropriate size.
- ✓ Network requests show Cloudinary transformation.

---

## Task 10: Verify Environment Variable Configuration

**Objective:** Confirm that `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` environment variable is correctly set and used.

**Description:**
The app must read the Cloudinary cloud name from environment configuration, not hardcode it.

**Subtasks:**

1. Verify `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` is set in `apps/web/.env.local` (value: `draedbypr`).
2. Verify cloudinary.ts reads this env var: `process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME`.
3. Verify all generated URLs use the correct cloud name in the URL: `res.cloudinary.com/{cloud_name}/`.
4. Verify app builds successfully with the env var set.

**Expected Outcome:** Cloud name is correctly configured and used in all URLs.

**Acceptance Criteria:**
- ✓ `.env.local` contains `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=draedbypr`.
- ✓ All Cloudinary URLs use `res.cloudinary.com/draedbypr/`.
- ✓ Build succeeds with no env var warnings.

---

## Task 11: Verify Backward Compatibility with Legacy Full URLs

**Objective:** Confirm that the system gracefully handles legacy full URLs stored in the database.

**Description:**
If a product was uploaded before the public_id-only convention, it may have a full Cloudinary URL stored. The system must detect and render these URLs without transformation, maintaining backward compatibility.

**Subtasks:**

1. Verify `isFullUrl()` correctly identifies `https://…` URLs.
2. Verify `getProductImage('https://…')` returns that URL unchanged (no transformation added).
3. Verify legacy URLs render correctly in ProductCard, cart, admin panel, etc.
4. Verify no errors occur when rendering legacy URLs.

**Expected Outcome:** Legacy full URLs render correctly without errors.

**Acceptance Criteria:**
- ✓ If a product has a legacy full URL stored, `getProductImage()` returns it unchanged.
- ✓ Legacy URL images load in the browser without 404.
- ✓ No console errors or warnings for legacy URLs.

---

## Task 12: Build & Deployment Verification

**Objective:** Confirm that the entire web app builds successfully and has no errors before deployment.

**Description:**
Run the build process to ensure all code changes compile correctly and there are no TypeScript or runtime errors.

**Subtasks:**

1. Run `npm run build` in `apps/web/` directory.
2. Verify build completes successfully with no errors.
3. Verify build completes with no critical warnings.
4. Verify `.next/` build output is created.
5. Verify API also builds successfully: run `npm run build` in `apps/api/` directory.
6. Verify no TypeScript errors in either app.

**Expected Outcome:** Both web and API apps build successfully with no errors.

**Acceptance Criteria:**
- ✓ `apps/web` builds without errors.
- ✓ `apps/api` builds without errors.
- ✓ No TypeScript errors in either codebase.
- ✓ Ready for Vercel deployment.

---

## Task 13: Integration Test — End-to-End Upload & Render

**Objective:** Confirm the complete flow: admin uploads image → stored in DB → rendered on all pages.

**Description:**
Execute a manual end-to-end test where an admin uploads a test product image and verifies it renders correctly across all UI contexts.

**Subtasks:**

1. Navigate to admin login page, log in as admin.
2. Go to admin products page.
3. Create a new product (or edit existing).
4. Upload a 780×780 PNG image from PixelLab (or test image).
5. Save the product.
6. Verify the public_id is stored in the database (check via admin panel or database query).
7. Navigate to storefront and find the product in a listing (ProductCard).
8. Verify product card image loads correctly (400×290 size, no cropping).
9. Add product to cart, view cart.
10. Verify cart image displays correctly (164×164 size).
11. Click on product to view detail page.
12. Verify hero image displays at large size (780×780).
13. Verify thumbnail strip displays 104×104 images.
14. View order (if applicable) and verify images render in order tracking.

**Expected Outcome:** Complete flow works; image is stored and rendered correctly at all sizes.

**Acceptance Criteria:**
- ✓ Admin can upload image and save product.
- ✓ Product displays on storefront with 400×290 image (no cropping).
- ✓ Cart displays 164×164 image.
- ✓ Product detail displays 780×780 hero and 104×104 thumbnails.
- ✓ All images are from Cloudinary (verified in browser DevTools Network tab).
- ✓ All transformations are present in URLs: `f_auto,q_auto,w_*,h_*,c_pad,b_white`.

---

## Task 14: Performance Verification

**Objective:** Confirm that image loading does not negatively impact page performance.

**Description:**
Verify that Cloudinary-served images load quickly and that the app remains performant with images included.

**Subtasks:**

1. Open browser DevTools → Network tab.
2. Navigate to product listing page.
3. Verify Cloudinary image requests complete within 1 second.
4. Verify image file sizes are reasonable (typically 20–100 KB for transformed images).
5. Verify `f_auto` results in WebP format for modern browsers (check Content-Type header).
6. Verify overall page load does not exceed 3 seconds.
7. Test on slow 3G network (via DevTools throttling) and verify images load without blocking page render.

**Expected Outcome:** Images load quickly without impacting overall page performance.

**Acceptance Criteria:**
- ✓ Cloudinary image requests complete in < 1 second.
- ✓ Image file sizes are < 150 KB.
- ✓ WebP format is served to modern browsers.
- ✓ Page remains interactive while images load.

---

## Task 15: Documentation & Cleanup

**Objective:** Ensure implementation is fully documented and no debug files remain.

**Description:**
Verify that the implementation includes appropriate code comments and that any debug/test files are cleaned up.

**Subtasks:**

1. Verify `cloudinary.ts` has clear JSDoc comments explaining each function.
2. Verify `cloudinary-upload.ts` has clear JSDoc comments explaining the upload flow.
3. Verify ProductForm has comments explaining the publicId storage convention.
4. Remove any debug/test files created during development (e.g., `test-upload.txt`, `debug.log`).
5. Verify no console.log statements remain in production code.
6. Verify README or documentation explains the Cloudinary setup to future developers.

**Expected Outcome:** Code is well-documented and clean for production.

**Acceptance Criteria:**
- ✓ All public functions have JSDoc comments.
- ✓ No debug files remain.
- ✓ No console.log statements in production files.
- ✓ README or ARCHITECTURE.md documents the Cloudinary pipeline for future developers.

---

## Summary

| Task | Description | Status |
|------|-------------|--------|
| 1 | Verify Image Helper URL Construction | Ready |
| 2 | Verify Upload Service Returns public_id | Ready |
| 3 | Verify ProductForm Upload Integration | Ready |
| 4 | Verify ProductCard Renders Correct Image Size | Ready |
| 5 | Verify Cart Item Images Render Correct Size | Ready |
| 6 | Verify Product Detail Page Images | Ready |
| 7 | Verify Admin Product List Images | Ready |
| 8 | Verify Admin Dashboard Low-Stock Images | Ready |
| 9 | Verify Order Tracking Page Images | Ready |
| 10 | Verify Environment Variable Configuration | Ready |
| 11 | Verify Backward Compatibility with Legacy Full URLs | Ready |
| 12 | Build & Deployment Verification | Ready |
| 13 | Integration Test — End-to-End Upload & Render | Ready |
| 14 | Performance Verification | Ready |
| 15 | Documentation & Cleanup | Ready |

All tasks are independent or have clear dependency relationships. Tasks can be executed in parallel where dependencies allow, or sequentially for simplicity.
