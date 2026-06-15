# Requirements Document

## Introduction

This document defines the requirements for the Cloudinary Image Pipeline feature in the Cesto gifting e-commerce application. The pipeline enables admins to upload a single master product image to Cloudinary, which the app then uses to automatically generate all required image sizes via on-the-fly Cloudinary URL transformations. No manual resizing or multi-export workflow is required from the admin.

## Glossary

- **Admin**: An authenticated Cesto administrator with access to the product management panel.
- **Cloudinary**: The cloud-based image hosting and transformation service used to store and serve product images.
- **Public_ID**: The unique Cloudinary identifier for an uploaded asset, stored in the product database. Example: `cesto/products/choco-jar-299`.
- **Master_Image**: The single 780 × 780 px PNG product image created in PixelLab and uploaded directly to Cloudinary by the admin.
- **Transformation_URL**: A Cloudinary-generated URL that includes transformation parameters (width, height, crop mode, format, quality) to serve a resized variant of the Master_Image.
- **Image_Helper**: The application utility responsible for constructing Transformation_URLs from a Public_ID.
- **Product_Card**: The UI component that displays a product in listing, search result, and category grid views.
- **Cart**: The shopping cart UI that displays a line item image next to each product.
- **Thumbnail**: The small image displayed in the product detail page thumbnail strip.
- **Admin_Panel**: The admin-facing product list and management interface.
- **PixelLab**: The image creation tool used by the admin to produce the Master_Image.

---

## Requirements

### Requirement 1: Master Image Upload Convention

**User Story:** As an admin, I want a clear, consistent convention for creating and uploading product images, so that all products have a uniform, high-quality master image in Cloudinary.

#### Acceptance Criteria

1. THE Admin SHALL create the Master_Image on a 780 × 780 px canvas in PixelLab with the product centered and breathing space on all sides.
2. THE Admin SHALL use a transparent or white background when creating the Master_Image.
3. THE Admin SHALL export the Master_Image as a PNG file.
4. WHEN uploading the Master_Image, THE Admin SHALL place it inside the `cesto/products` folder in Cloudinary.
5. WHEN a product is saved to the database, THE System SHALL store only the Cloudinary Public_ID for that product's image (e.g., `cesto/products/choco-jar-299`).
6. THE System SHALL NOT store full Cloudinary URLs in the product database.

---

### Requirement 2: Automatic Image Size Generation via Cloudinary Transformations

**User Story:** As a developer, I want the app to generate all required image sizes automatically from the stored Public_ID, so that the admin never has to manually export or upload multiple image sizes.

#### Acceptance Criteria

1. THE Image_Helper SHALL construct a Transformation_URL for the product card size (400 × 290 px) using the transformation parameters `f_auto,q_auto,w_400,h_290,c_pad,b_white`.
2. THE Image_Helper SHALL construct a Transformation_URL for the cart size (164 × 164 px) using the transformation parameters `f_auto,q_auto,w_164,h_164,c_pad,b_white`.
3. THE Image_Helper SHALL construct a Transformation_URL for the thumbnail size (104 × 104 px) using the transformation parameters `f_auto,q_auto,w_104,h_104,c_pad,b_white`.
4. THE Image_Helper SHALL construct a Transformation_URL for the admin panel size (80 × 80 px) using the transformation parameters `f_auto,q_auto,w_80,h_80,c_pad,b_white`.
5. WHEN constructing a Transformation_URL, THE Image_Helper SHALL embed the transformation parameters in the URL path before the Public_ID, conforming to the Cloudinary URL structure.
6. IF a Public_ID is null or an empty string, THEN THE Image_Helper SHALL return null and SHALL NOT construct a partial URL.

---

### Requirement 3: Product Card Image Display

**User Story:** As a shopper, I want product images in listing grids to be fully visible without cropping, so that I can clearly see the entire product before clicking.

#### Acceptance Criteria

1. WHEN rendering a Product_Card, THE Product_Card SHALL display the product image using the 400 × 290 px Transformation_URL produced by the Image_Helper.
2. THE Product_Card SHALL apply `c_pad` (pad crop mode) so the full product is visible without any part being cropped.
3. THE Product_Card SHALL use a white background fill (`b_white`) for any padding areas introduced by the pad crop mode.
4. THE Product_Card SHALL request the `f_auto` format so Cloudinary serves WebP to supported browsers and PNG as a fallback.
5. THE Product_Card SHALL request `q_auto` quality so Cloudinary applies automatic quality optimisation.

---

### Requirement 4: Cart Item Image Display

**User Story:** As a shopper, I want to see a clear product image next to each item in my cart, so that I can confirm I have the correct products before checkout.

#### Acceptance Criteria

1. WHEN rendering a cart line item, THE Cart SHALL display the product image using the 164 × 164 px Transformation_URL produced by the Image_Helper.
2. THE Cart SHALL apply `c_pad` and `b_white` so the full product is visible at the cart thumbnail size.

---

### Requirement 5: Product Detail Thumbnail Strip Display

**User Story:** As a shopper, I want to see small product thumbnails on the product detail page, so that I can quickly identify image variants.

#### Acceptance Criteria

1. WHEN rendering the thumbnail strip on the product detail page, THE Thumbnail SHALL display each product image using the 104 × 104 px Transformation_URL produced by the Image_Helper.
2. THE Thumbnail SHALL apply `c_pad` and `b_white` so the full product is visible at the thumbnail size.

---

### Requirement 6: Admin Panel Product Image Display

**User Story:** As an admin, I want to see small product images in the product list table, so that I can quickly identify products while managing inventory.

#### Acceptance Criteria

1. WHEN rendering a row in the Admin_Panel product list table, THE Admin_Panel SHALL display the product image using the 80 × 80 px Transformation_URL produced by the Image_Helper.
2. THE Admin_Panel SHALL apply `c_pad` and `b_white` so the full product is visible at the admin thumbnail size.
3. IF a product has no Public_ID stored, THEN THE Admin_Panel SHALL display a placeholder element in place of the product image.

---

### Requirement 7: URL Construction Correctness

**User Story:** As a developer, I want the Image_Helper to always produce valid, correctly-structured Cloudinary URLs, so that images load reliably across all UI contexts.

#### Acceptance Criteria

1. THE Image_Helper SHALL produce Transformation_URLs in the format `https://res.cloudinary.com/{cloud_name}/image/upload/{transformations}/{public_id}`.
2. WHEN given the same Public_ID and the same size variant, THE Image_Helper SHALL always produce the same Transformation_URL (deterministic output).
3. THE Image_Helper SHALL accept the Cloudinary cloud name from environment configuration and SHALL NOT hardcode the cloud name in source code.
4. FOR ALL valid Public_IDs, constructing a Transformation_URL and then parsing its path components SHALL recover the original Public_ID and transformation parameters (round-trip property).

---

### Requirement 8: No Manual Multi-Size Export

**User Story:** As an admin, I want to upload only one image per product, so that I do not have to manually create or manage multiple image sizes.

#### Acceptance Criteria

1. THE System SHALL derive all displayed image sizes exclusively from Cloudinary URL transformations applied to the single stored Public_ID.
2. THE System SHALL NOT require the admin to upload more than one image asset per product to Cloudinary.
3. THE System SHALL NOT store separate image URLs for different size variants in the product database.
