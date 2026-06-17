'use client';

import { useState } from 'react';
import { BsPlus, BsGift } from 'react-icons/bs';
import ProductModal, { ProductModalData } from './ProductModal';
import { getCardImage } from '@/lib/cloudinary';

interface ProductCardProps {
  id?: string;
  name: string;
  slug: string;
  price: number;
  compareAtPrice?: number;
  deliveryEstimate?: string;
  imageUrl?: string;
  stock?: number;
  isBestseller?: boolean;
  isNew?: boolean;
  description?: string;
  tint?: 'pink' | 'blue';
  skeleton?: boolean;
}

const BRAND = '#b22153';

// ─── Skeleton placeholder — same exact shape as a real card ───────────────
function SkeletonCard() {
  return (
    <div style={{
      background: '#FFFFFF',
      borderRadius: 16,
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      height: '100%',
      border: '1px solid #F0EAEE',
    }}>
      {/* image area */}
      <div style={{
        width: '100%', paddingBottom: '72%',
        background: 'linear-gradient(90deg,#f3eef1 25%,#ede6eb 50%,#f3eef1 75%)',
        backgroundSize: '200% 100%',
        animation: 'shimmer 1.4s ease-in-out infinite',
        flexShrink: 0,
      }} />
      {/* info area */}
      <div style={{ padding: '10px 10px 12px', flex: 1, display: 'flex', flexDirection: 'column', gap: 6 }}>
        <div style={{ height: 13, width: '85%', borderRadius: 6, background: 'linear-gradient(90deg,#f3eef1 25%,#ede6eb 50%,#f3eef1 75%)', backgroundSize: '200% 100%', animation: 'shimmer 1.4s ease-in-out infinite' }} />
        <div style={{ height: 13, width: '60%', borderRadius: 6, background: 'linear-gradient(90deg,#f3eef1 25%,#ede6eb 50%,#f3eef1 75%)', backgroundSize: '200% 100%', animation: 'shimmer 1.4s ease-in-out infinite' }} />
        <div style={{ height: 11, width: '45%', borderRadius: 6, background: 'linear-gradient(90deg,#f3eef1 25%,#ede6eb 50%,#f3eef1 75%)', backgroundSize: '200% 100%', animation: 'shimmer 1.4s ease-in-out infinite', marginTop: 2 }} />
        <div style={{ flex: 1 }} />
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 8 }}>
          <div style={{ height: 16, width: '40%', borderRadius: 6, background: 'linear-gradient(90deg,#f3eef1 25%,#ede6eb 50%,#f3eef1 75%)', backgroundSize: '200% 100%', animation: 'shimmer 1.4s ease-in-out infinite' }} />
          <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'linear-gradient(90deg,#f3eef1 25%,#ede6eb 50%,#f3eef1 75%)', backgroundSize: '200% 100%', animation: 'shimmer 1.4s ease-in-out infinite' }} />
        </div>
      </div>
    </div>
  );
}

export default function ProductCard(props: ProductCardProps) {
  const {
    name, slug, price, compareAtPrice,
    deliveryEstimate, imageUrl,
    isBestseller, isNew, description,
    skeleton = false,
  } = props;

  const [modalOpen, setModalOpen] = useState(false);

  if (skeleton) return <SkeletonCard />;

  const discount = compareAtPrice && compareAtPrice > price
    ? Math.round(((compareAtPrice - price) / compareAtPrice) * 100)
    : 0;

  const badgeLabel = discount > 0 ? `${discount}% OFF`
    : isBestseller ? 'TOP'
    : isNew ? 'NEW'
    : null;

  // Build the 400×290 card image URL from publicId (or pass through a legacy full URL)
  const cardImageSrc = getCardImage(imageUrl);

  const modalData: ProductModalData = {
    id: props.id || slug,
    name, slug, price, compareAtPrice,
    deliveryEstimate, imageUrl, isBestseller, isNew, description,
    stock: props.stock,
  };

  return (
    <>
      <div
        onClick={() => setModalOpen(true)}
        style={{
          background: '#FFFFFF',
          borderRadius: 16,
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          // width and height are controlled entirely by the parent wrapper (160px wide, stretch height)
          width: '100%',
          height: '100%',
          cursor: 'pointer',
          position: 'relative',
          border: '1px solid #F0EAEE',
          WebkitTapHighlightColor: 'transparent',
          userSelect: 'none',
        }}
      >
        {/* ── Image — fixed aspect ratio ── */}
        <div style={{
          position: 'relative',
          width: '100%',
          paddingBottom: '72%',
          background: '#F9F4F6',
          flexShrink: 0,
          overflow: 'hidden',
        }}>
          {cardImageSrc ? (
            <img
              src={cardImageSrc}
              alt={name}
              loading="lazy"
              style={{
                position: 'absolute', inset: 0,
                width: '100%', height: '100%',
                objectFit: 'cover',
              }}
            />
          ) : (
            <div style={{
              position: 'absolute', inset: 0,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: '#D4C7CF', fontSize: 36,
            }}>
              <BsGift />
            </div>
          )}

          {badgeLabel && (
            <span style={{
              position: 'absolute', top: 8, left: 8,
              background: BRAND, color: 'white',
              fontSize: 9, fontWeight: 800,
              padding: '3px 8px', borderRadius: 999,
              letterSpacing: '0.4px', textTransform: 'uppercase',
            }}>
              {badgeLabel}
            </span>
          )}
          {props.stock !== undefined && props.stock < 5 && (
            <span style={{
              position: 'absolute', bottom: 8, left: 8,
              background: props.stock === 0 ? '#EF4444' : '#F59E0B',
              color: 'white',
              fontSize: 9, fontWeight: 800,
              padding: '3px 8px', borderRadius: 999,
              letterSpacing: '0.4px',
            }}>
              {props.stock === 0 ? 'Stock Out' : `${props.stock} remaining`}
            </span>
          )}
        </div>

        {/* ── Info ── */}
        <div style={{
          padding: '10px 10px 12px',
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
        }}>
          {/* Name — always exactly 2 lines so all cards align */}
          <h3 style={{
            fontSize: 13, fontWeight: 800, color: '#111111',
            lineHeight: 1.3, margin: '0 0 2px',
            height: '2.6em',
            overflow: 'hidden',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical' as const,
          }}>
            {name}
          </h3>

          {/* Subtitle — always one line tall */}
          <p style={{
            fontSize: 11, fontWeight: 500, color: '#B0A8B0',
            margin: 0, lineHeight: 1.3,
            overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis',
            minHeight: '1.3em',
          }}>
            {deliveryEstimate || ''}
          </p>

          {/* Push price row to bottom */}
          <div style={{ flex: 1, minHeight: 4 }} />

          {/* Price + Add button */}
          <div style={{
            display: 'flex', alignItems: 'flex-end',
            justifyContent: 'space-between',
          }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              {compareAtPrice && compareAtPrice > price && (
                <span style={{ fontSize: 10, color: '#C4BAC2', textDecoration: 'line-through', fontWeight: 500, lineHeight: 1 }}>
                  ₹{compareAtPrice.toLocaleString('en-IN')}
                </span>
              )}
              <span style={{ fontSize: 16, fontWeight: 900, color: '#111111', letterSpacing: '-0.3px', lineHeight: 1 }}>
                ₹{price.toLocaleString('en-IN')}
              </span>
            </div>

            <button
              onClick={(e) => { e.stopPropagation(); setModalOpen(true); }}
              aria-label="Add to cart"
              style={{
                width: 32, height: 32, borderRadius: '50%',
                background: BRAND, border: 'none',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: 'white', cursor: 'pointer', flexShrink: 0,
              }}
            >
              <BsPlus size={20} />
            </button>
          </div>
        </div>
      </div>

      {modalOpen && (
        <ProductModal product={modalData} onClose={() => setModalOpen(false)} />
      )}
    </>
  );
}
