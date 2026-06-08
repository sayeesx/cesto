'use client';

import { useState } from 'react';
import { BsHeart, BsPlus, BsLightningChargeFill, BsTruck, BsGift } from 'react-icons/bs';
import ProductModal, { ProductModalData } from './ProductModal';

interface ProductCardProps {
  id?: string;
  name: string;
  slug: string;
  price: number;
  compareAtPrice?: number;
  deliveryEstimate?: string;
  imageUrl?: string;
  isBestseller?: boolean;
  isNew?: boolean;
  description?: string;
  tint?: 'pink' | 'blue';
}

export default function ProductCard(props: ProductCardProps) {
  const { name, slug, price, compareAtPrice, deliveryEstimate, imageUrl, isBestseller, isNew, description, tint = 'pink' } = props;
  const [modalOpen, setModalOpen] = useState(false);

  const discount = compareAtPrice && compareAtPrice > price
    ? Math.round(((compareAtPrice - price) / compareAtPrice) * 100)
    : 0;

  const isSameDay = deliveryEstimate?.toLowerCase().includes('same') || deliveryEstimate?.toLowerCase().includes('hour');

  const imgBg = tint === 'blue'
    ? 'linear-gradient(135deg, #DBEAFE, #EFF6FF)'
    : 'linear-gradient(135deg, #FBE0EB, #F8EDF4)';
  const imgBgSolid = tint === 'blue' ? '#EFF6FF' : '#FCF7F8';
  const accentColor = tint === 'blue' ? '#2563EB' : '#b22153';
  const badgeBg = tint === 'blue' ? 'linear-gradient(135deg, #2563EB, #3B82F6)' : 'linear-gradient(135deg, #b22153, #d14175)';
  const topBadgeBg = tint === 'blue' ? 'linear-gradient(135deg, #EFF6FF, #DBEAFE)' : 'linear-gradient(135deg, #F9EBF2, #FCF1F6)';
  const topBadgeColor = tint === 'blue' ? '#2563EB' : '#b22153';

  const modalData: ProductModalData = {
    id: props.id || slug,
    name, slug, price, compareAtPrice, deliveryEstimate, imageUrl, isBestseller, isNew, description,
  };

  return (
    <>
      <div
        onClick={() => setModalOpen(true)}
        style={{
          background: '#FFFFFF',
          borderRadius: 14,
          overflow: 'hidden',
          border: tint === 'blue' ? '1px solid #EAEAEA' : '1px solid rgba(198,172,192,0.15)',
          display: 'flex',
          flexDirection: 'column',
          color: 'inherit',
          position: 'relative',
          boxShadow: 'none',
          transition: 'all 0.25s ease',
          cursor: 'pointer',
        }}
      >
        {/* Image */}
        <div style={{
          position: 'relative',
          aspectRatio: '1',
          overflow: 'hidden',
          background: imgBgSolid,
        }}>
          {imageUrl ? (
            <img src={imageUrl} alt={name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          ) : (
            <div style={{
              width: '100%', height: '100%',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 36,
              color: tint === 'blue' ? '#93C5FD' : '#E0CBE8',
              background: imgBg,
            }}>
              <BsGift />
            </div>
          )}

          {/* Badge */}
          {discount > 0 && (
            <span style={{
              position: 'absolute', top: 8, left: 8,
              background: badgeBg,
              color: 'white', fontSize: 9, fontWeight: 800,
              padding: '2px 8px', borderRadius: 999,
              textTransform: 'uppercase', letterSpacing: '0.5px',
            }}>{discount}% OFF</span>
          )}
          {isBestseller && !discount && (
            <span style={{
              position: 'absolute', top: 8, left: 8,
              background: topBadgeBg,
              color: topBadgeColor, fontSize: 9, fontWeight: 800,
              padding: '2px 8px', borderRadius: 999,
              textTransform: 'uppercase', letterSpacing: '0.5px',
            }}>TOP</span>
          )}
          {isNew && !discount && !isBestseller && (
            <span style={{
              position: 'absolute', top: 8, left: 8,
              background: badgeBg,
              color: 'white', fontSize: 9, fontWeight: 800,
              padding: '2px 8px', borderRadius: 999,
              textTransform: 'uppercase', letterSpacing: '0.5px',
            }}>NEW</span>
          )}

          {/* Wishlist */}
          <button
            style={{
              position: 'absolute', top: 8, right: 8,
              width: 28, height: 28,
              background: 'rgba(255,255,255,0.9)',
              border: '1px solid rgba(198,172,192,0.2)',
              borderRadius: '50%',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: '#BEB4C4', cursor: 'pointer',
              transition: 'color 0.2s ease', zIndex: 5,
            }}
            aria-label="Add to wishlist"
            onClick={(e) => { e.stopPropagation(); }}
          >
            <BsHeart size={12} />
          </button>
        </div>

        {/* Body */}
        <div style={{ padding: '10px 10px 12px', display: 'flex', flexDirection: 'column', flex: 1 }}>
          <h3 style={{
            fontSize: 12, fontWeight: 600, color: '#171717',
            lineHeight: 1.35, marginBottom: 4, height: 32,
            overflow: 'hidden', display: '-webkit-box',
            WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' as const,
          }}>
            {name}
          </h3>

          {deliveryEstimate && (
            <div style={{
              fontSize: 10, fontWeight: 700,
              display: 'flex', alignItems: 'center', gap: 3,
              marginBottom: 6,
              color: isSameDay ? '#65a30d' : '#5F5F5F',
            }}>
              {isSameDay ? <BsLightningChargeFill size={10} /> : <BsTruck size={10} />}
              {isSameDay ? 'Same Day' : deliveryEstimate}
            </div>
          )}

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 'auto', gap: 6 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ fontSize: 13, fontWeight: 900, color: '#111111' }}>₹{price.toLocaleString('en-IN')}</span>
              {compareAtPrice && compareAtPrice > price && (
                <span style={{ fontSize: 10, color: '#BEB4C4', textDecoration: 'line-through' }}>₹{compareAtPrice.toLocaleString('en-IN')}</span>
              )}
            </div>
            <button
              style={{
                width: 28, height: 28, borderRadius: '50%',
                background: accentColor,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: 'white', flexShrink: 0, cursor: 'pointer',
                transition: 'transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)',
                border: 'none', boxShadow: 'none',
              }}
              aria-label="Add to cart"
              onClick={(e) => { e.stopPropagation(); setModalOpen(true); }}
            >
              <BsPlus size={16} />
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
