# Cesto — Image Sizes Guide

> Reference for all image dimensions used across the Cesto gifting e-commerce app (Next.js, mobile-first).

---

## Quick Reference Table

| Context | Display Size | Export Size | Format | Fit |
|---|---|---|---|---|
| Product Card — Mobile | 160 × 115 px | 320 × 230 px | WebP / PNG | contain |
| Product Card — Desktop | ~200 × 144 px | 400 × 290 px | WebP / PNG | contain |
| Hero Banner — Mobile | 390 × 219 px | 780 × 438 px | WebP / JPG | cover |
| Hero Banner — Desktop | 1280 × 320 px | 1280 × 320 px | WebP / JPG | cover |
| Category Icon Circle | 76 × 76 px | 152 × 152 px | WebP / PNG | cover |
| Occasion Circle | 68 × 68 px | 136 × 136 px | WebP / PNG | cover |
| Father's Day Banner | 165 × 220 px | 330 × 440 px | WebP / PNG | contain |
| Product Detail — Main | 390 × 390 px | 780 × 780 px | WebP / PNG | cover |
| Product Detail — Thumbnail | 52 × 52 px | 104 × 104 px | WebP / PNG | cover |
| Cart Item | 82 × 82 px | 164 × 164 px | WebP / PNG | cover |
| Admin Product Thumbnail | 40 × 40 px | 80 × 80 px | WebP / PNG | cover |
| Admin Category Image | ~60 × 60 px | 120 × 120 px | WebP / PNG | cover |
| Logo — Desktop | auto × 38 px | auto × 200 px+ | SVG / PNG | — |
| Logo — Mobile | auto × 34 px | auto × 200 px+ | SVG / PNG | — |

---

## 1. Product Card Images

Used in all product grid listings across the shop, search results, and category pages.

### Mobile

| Property | Value |
|---|---|
| Card width | 160 px |
| Aspect ratio | ~72% height (portrait) |
| Display size | 160 × 115 px |
| Export size (2× retina) | **320 × 230 px** |
| Object fit | `contain` |
| Padding inside card | 8% on all sides |
| Background | White or transparent |

### Desktop

| Property | Value |
|---|---|
| Grid columns | 5–6 columns in ~1280 px max-width container |
| Approx. card width | ~200 px |
| Export size | **400 × 290 px** |
| Object fit | `contain` |
| Padding inside card | 8% on all sides |
| Background | White or transparent |

**Notes:**
- Use `contain` fit so product isn't cropped — full item must be visible.
- White or transparent background ensures the card padding area blends cleanly.
- Same image asset works for both mobile and desktop; the browser scales down from the 400 × 290 px export.

---

## 2. Hero Carousel Banner

Full-width promotional banner at the top of the home page. Rotates between multiple slides.

### Mobile

| Property | Value |
|---|---|
| Display width | Full device width (~390 px on iPhone 14) |
| Aspect ratio | 16:7 |
| Display height | ~219 px |
| Export size (2× retina) | **780 × 438 px** |
| Object fit | `cover` |

### Desktop

| Property | Value |
|---|---|
| Container max-width | 1280 px |
| Display height | ~320 px |
| Export size | **1280 × 320 px** |
| Object fit | `cover` |

**Safe zone for text overlay:**
- Text is overlaid on the **left ~40%** of the banner (≈312 px on mobile, ≈512 px on desktop).
- Keep the **right 60%** for visual content (product, illustration, etc.).
- Do not place critical subjects or text in the leftmost region — that area is covered by the UI text layer.
- Avoid placing important content within 20 px of any edge (bleed/crop buffer).

---

## 3. Category Icon Circles

Displayed as circular quick-category chips on the home page ("Birthdays", "Weddings", etc.).

| Property | Value |
|---|---|
| Display size | 76 × 76 px circle |
| Export size (2× retina) | **152 × 152 px** |
| Shape | Circular crop (CSS `border-radius: 50%`) |
| Object fit | `cover` |
| Subject placement | Centered, with visible padding around edges |

**Notes:**
- Desktop display is identical to mobile.
- The circular crop removes corners — keep the icon/subject within a ~70% inner circle of the export canvas to avoid clipping.
- Transparent or solid-colour background both work.

---

## 4. Occasion Circles

Small circular images used for occasion tags (e.g., "Father's Day", "Anniversary").

| Property | Value |
|---|---|
| Display size | 68 × 68 px circle |
| Export size (2× retina) | **136 × 136 px** |
| Shape | Circular crop (CSS `border-radius: 50%`) |
| Object fit | `cover` |
| Subject placement | Centered, with padding |

**Notes:**
- Slightly smaller than category circles — keep subject within a ~70% inner circle.
- Consistent padding across all occasion images ensures visual harmony in the row.

---

## 5. Father's Day Banner (Promotional Panel)

Tall portrait-format promotional image used in a side-panel or inline promotional block on the home page or campaign page.

| Property | Value |
|---|---|
| Container width | ~165 px |
| Container height | Up to 220 px |
| Object fit | `contain` (no cropping) |
| Export size (2× retina) | **330 × 440 px** |
| Orientation | Portrait |
| Subject placement | Full-height, centered horizontally |

**Notes:**
- Because fit is `contain`, the entire image is visible — export must be well-composed within the 3:4 aspect ratio.
- Subject (e.g., person, product) should fill the height of the canvas.
- White or transparent background recommended.

---

## 6. Product Detail Page — Main Image

Large hero image shown on the product detail (PDP) page.

| Property | Value |
|---|---|
| Display size | Full device width, square (1:1) |
| Approx. display size | ~390 × 390 px on mobile |
| Export size (2× retina) | **780 × 780 px** |
| Aspect ratio | 1:1 (square) |
| Object fit | `cover` |
| Subject placement | Centered |

**Notes:**
- Square crop ensures consistent layout across all products.
- Subject should be centered with enough canvas breathing room to survive `cover` cropping on non-square devices/viewports.
- This is the highest-resolution product image — quality is most critical here.

---

## 7. Product Detail Page — Thumbnail Strip

Small thumbnail images in the scrollable strip below the main image on the PDP.

| Property | Value |
|---|---|
| Display size | 52 × 52 px |
| Export size (2× retina) | **104 × 104 px** |
| Aspect ratio | 1:1 (square) |
| Object fit | `cover` |

**Notes:**
- These are the same product images as the main image, just displayed smaller.
- No separate assets needed — use the same 780 × 780 px export; Next.js Image handles resizing.
- If exporting separately, 104 × 104 px minimum.

---

## 8. Cart Item Image

Thumbnail shown next to each line item in the shopping cart.

| Property | Value |
|---|---|
| Display size | 82 × 82 px |
| Export size (2× retina) | **164 × 164 px** |
| Aspect ratio | 1:1 (square) |
| Object fit | `cover` |

**Notes:**
- Pulled from the same product image pool — no separate upload required.
- Ensure the main product image centers the subject so it reads clearly at this small size.

---

## 9. Admin — Product List Thumbnail

Tiny thumbnail shown in the product list table inside the admin panel.

| Property | Value |
|---|---|
| Display size | 40 × 40 px |
| Export size (2× retina) | **80 × 80 px** |
| Aspect ratio | 1:1 (square) |
| Object fit | `cover` |

---

## 10. Admin — Category Image

Image displayed on category cards inside the admin panel.

| Property | Value |
|---|---|
| Display size | ~60 × 60 px |
| Export size (2× retina) | **120 × 120 px** |
| Aspect ratio | 1:1 (square) |
| Object fit | `cover` |

---

## 11. Logo

The Cesto wordmark / brandmark used in the site header.

| Context | Display Height | Display Width | Export |
|---|---|---|---|
| Desktop header | 38 px | auto (proportional) | SVG preferred, or PNG ≥ 200 px tall |
| Mobile header | 34 px | auto (proportional) | SVG preferred, or PNG ≥ 200 px tall |

**Notes:**
- SVG is the preferred format — resolution-independent and tiny file size.
- If using PNG, export at **≥ 200 px tall** with a **transparent background**.
- Never use a JPG for the logo — no transparency support.
- Ensure the logo has sufficient clear space on all sides before the transparent boundary.

---

## Format & Quality Guidelines

### File Formats

| Use Case | Preferred Format | Fallback |
|---|---|---|
| All product images | WebP | PNG |
| Hero banners | WebP | JPG |
| Icons / circles | WebP | PNG |
| Promotional banners | WebP | PNG |
| Logo | SVG | PNG (transparent) |

- **WebP** is auto-converted on upload — upload original PNG or JPG and let the pipeline handle conversion.
- Next.js `<Image>` component handles format negotiation and lazy loading automatically.

### Quality & Compression

| Property | Value |
|---|---|
| WebP quality | 82% |
| Max upload size (before compression) | 5 MB |
| Target size after compression | 100–300 KB |
| Colour profile | sRGB |

### Aspect Ratio Guidelines

| Image Type | Recommended Ratio |
|---|---|
| Product images | 1:1 (square) or 3:4 (portrait) |
| Hero banners | 16:7 (mobile), ~4:1 (desktop) |
| Category / occasion circles | 1:1 (square, circular crop) |
| Father's Day / portrait banners | 3:4 (portrait) |
| Logo | Preserve original ratio |

### General Best Practices

- **White or transparent backgrounds** on all product images — avoids harsh edges on card `contain` layouts.
- **Center the subject** in all square/circle crops — many contexts apply `cover` which will crop edges.
- **Avoid text embedded in product images** where possible — UI text overlays are handled by the app.
- **sRGB colour profile** — convert from Adobe RGB or P3 before uploading to prevent washed-out colours on standard screens.
- **No interlaced PNGs** — progressive loading is handled by Next.js, not the file itself.

---

## Image Pipeline Summary

```
Upload (PNG/JPG, ≤5MB)
    ↓
Server compression + WebP conversion (82% quality)
    ↓
Stored in CDN / Supabase Storage
    ↓
Next.js <Image> serves correct size via srcset
    ↓
Browser displays at display resolution (1× or 2×)
```

---

*Last updated: June 2025 — Cesto v1*
