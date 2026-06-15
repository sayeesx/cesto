'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { use } from 'react';
import { apiClient } from '@/lib/api-client';
import { useAuth } from '@/context/AuthContext';
import {
  BsHeart, BsHeartFill, BsPlus, BsDash,
  BsLightningChargeFill, BsTruck, BsGift,
  BsShieldFillCheck, BsArrowLeft,
  BsChevronLeft, BsChevronRight, BsCheckCircleFill,
  BsStarFill,
} from 'react-icons/bs';

// ─── Skeleton ────────────────────────────────────────────────────────────────
function ProductSkeleton() {
  return (
    <main style={{ minHeight: '100dvh', background: '#fff' }}>
      <div style={{ aspectRatio: '1', width: '100%', background: 'linear-gradient(90deg,#f3eef1 25%,#ede6eb 50%,#f3eef1 75%)', backgroundSize: '200% 100%', animation: 'shimmer 1.4s ease-in-out infinite' }} />
      <div style={{ padding: '20px 20px', display: 'flex', flexDirection: 'column', gap: 12 }}>
        {[75, 45, 90, 55, 65].map((w, i) => (
          <div key={i} style={{ height: i === 0 ? 22 : 14, width: `${w}%`, borderRadius: 8, background: 'linear-gradient(90deg,#f3eef1 25%,#ede6eb 50%,#f3eef1 75%)', backgroundSize: '200% 100%', animation: 'shimmer 1.4s ease-in-out infinite' }} />
        ))}
      </div>
      <style>{`@keyframes shimmer{0%{background-position:200% 0}100%{background-position:-200% 0}}`}</style>
    </main>
  );
}

const messageOptions = [
  'Happy Birthday! 🎂', 'Happy Anniversary! 💕', 'With Love ❤️', 'Congratulations! 🎉',
];

export default function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const router = useRouter();
  const { isAuthenticated, openLoginModal } = useAuth();

  const [product, setProduct] = useState<any>(() => {
    if (typeof window !== 'undefined') {
      try {
        const cached = sessionStorage.getItem('preview_product');
        if (cached) {
          const parsed = JSON.parse(cached);
          if (parsed.slug === slug) {
            sessionStorage.removeItem('preview_product');
            return { ...parsed, imageUrl: parsed.imageUrl || null };
          }
        }
      } catch {}
    }
    return null;
  });
  const [loading, setLoading] = useState(!product);
  const [qty, setQty] = useState(1);
  const [wishlisted, setWishlisted] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState('');
  const [customNote, setCustomNote] = useState('');
  const [addingToCart, setAddingToCart] = useState(false);
  const [imgIdx, setImgIdx] = useState(0);

  useEffect(() => {
    if (product) { setLoading(false); return; }
    async function load() {
      try {
        const res = await fetch(`/api/v1/products/${slug}`);
        if (res.ok) {
          const data = await res.json();
          setProduct({
            ...data,
            imageUrl: data.imageUrl || data.images?.[0]?.url || null,
          });
        }
      } catch {}
      setLoading(false);
    }
    load();
  }, [slug]); // eslint-disable-line react-hooks/exhaustive-deps

  if (loading) return <ProductSkeleton />;

  const p = product || {
    name: 'Premium Gift Hamper',
    price: 999,
    compareAtPrice: 1299,
    deliveryEstimate: 'Same Day',
    isBestseller: true,
    description: 'A beautifully curated gift for any occasion.',
  };

  const images: string[] = p.images?.map((i: any) => i.url).filter(Boolean)
    || (p.imageUrl ? [p.imageUrl] : []);

  const discount = p.compareAtPrice && p.compareAtPrice > p.price
    ? Math.round(((p.compareAtPrice - p.price) / p.compareAtPrice) * 100)
    : 0;

  const isSameDay = p.deliveryEstimate?.toLowerCase().includes('same')
    || p.deliveryEstimate?.toLowerCase().includes('hour');

  const doAdd = async () => {
    setAddingToCart(true);
    try {
      await apiClient.addToCart(p.id, qty);
      router.push('/cart');
    } catch (err: any) {
      if (err?.statusCode === 401) openLoginModal();
      else alert(err?.message || 'Could not add to bag.');
    } finally {
      setAddingToCart(false);
    }
  };

  const handleAddToBag = () => {
    if (!isAuthenticated) { openLoginModal(() => doAdd()); return; }
    doAdd();
  };

  const BRAND = '#983255';

  return (
    <main style={{ minHeight: '100dvh', background: '#fff', paddingBottom: 100 }}>
      <style>{`@keyframes shimmer{0%{background-position:200% 0}100%{background-position:-200% 0}}`}</style>

      {/* ── Image gallery ── */}
      <div style={{ background: '#FAF3F6', position: 'relative' }}>
        {/* Back + wishlist overlay */}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, display: 'flex', justifyContent: 'space-between', padding: 14, zIndex: 5 }}>
          <button
            onClick={() => router.back()}
            style={{ width: 40, height: 40, borderRadius: '50%', background: 'rgba(255,255,255,0.92)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(6px)', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}
          >
            <BsArrowLeft size={18} color="#111" />
          </button>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            {discount > 0 && (
              <span style={{ background: BRAND, color: 'white', fontSize: 11, fontWeight: 800, padding: '5px 11px', borderRadius: 20 }}>
                {discount}% OFF
              </span>
            )}
            <button
              onClick={() => setWishlisted(w => !w)}
              style={{ width: 40, height: 40, borderRadius: '50%', background: 'rgba(255,255,255,0.92)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(6px)', boxShadow: '0 2px 8px rgba(0,0,0,0.1)', color: wishlisted ? BRAND : '#BEB4C4' }}
            >
              {wishlisted ? <BsHeartFill size={17} /> : <BsHeart size={17} />}
            </button>
          </div>
        </div>

        {/* Main image — square */}
        <div style={{ aspectRatio: '1', width: '100%', overflow: 'hidden', position: 'relative' }}>
          {images.length > 0 ? (
            <img
              src={images[imgIdx]}
              alt={p.name}
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'opacity 0.2s' }}
            />
          ) : (
            <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 72, color: '#E0CBE8' }}>
              <BsGift />
            </div>
          )}

          {images.length > 1 && (
            <>
              <button onClick={() => setImgIdx(i => (i - 1 + images.length) % images.length)} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', width: 36, height: 36, borderRadius: '50%', background: 'rgba(255,255,255,0.88)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <BsChevronLeft size={15} color="#111" />
              </button>
              <button onClick={() => setImgIdx(i => (i + 1) % images.length)} style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', width: 36, height: 36, borderRadius: '50%', background: 'rgba(255,255,255,0.88)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <BsChevronRight size={15} color="#111" />
              </button>
              <div style={{ position: 'absolute', bottom: 12, left: 0, right: 0, display: 'flex', justifyContent: 'center', gap: 5 }}>
                {images.map((_, i) => (
                  <button key={i} onClick={() => setImgIdx(i)} style={{ width: i === imgIdx ? 20 : 6, height: 6, borderRadius: 3, background: i === imgIdx ? BRAND : 'rgba(255,255,255,0.7)', border: 'none', cursor: 'pointer', padding: 0, transition: 'all 0.2s' }} />
                ))}
              </div>
            </>
          )}
        </div>

        {/* Thumbnail strip */}
        {images.length > 1 && (
          <div style={{ display: 'flex', gap: 8, padding: '10px 16px', background: '#fff', overflowX: 'auto' }} className="no-scrollbar">
            {images.map((img, i) => (
              <button key={i} onClick={() => setImgIdx(i)} style={{ width: 52, height: 52, borderRadius: 10, overflow: 'hidden', flexShrink: 0, border: `2px solid ${i === imgIdx ? BRAND : '#F0EAEE'}`, cursor: 'pointer', padding: 0, background: 'none' }}>
                <img src={img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* ── Product info card ── */}
      <div style={{ background: '#fff', padding: '20px 20px 0' }}>

        {/* Delivery badge */}
        <div style={{ marginBottom: 10 }}>
          <span style={{
            display: 'inline-flex', alignItems: 'center', gap: 5,
            background: isSameDay ? '#F0FDF4' : '#F5F5F5',
            color: isSameDay ? '#166534' : '#5F5F5F',
            fontSize: 11, fontWeight: 800,
            padding: '5px 12px', borderRadius: 20,
          }}>
            {isSameDay ? <BsLightningChargeFill size={10} /> : <BsTruck size={10} />}
            {isSameDay ? 'Same Day Delivery' : (p.deliveryEstimate || 'Standard Delivery')}
          </span>
        </div>

        {/* Name */}
        <h1 style={{ fontSize: 22, fontWeight: 900, color: '#111', letterSpacing: '-0.4px', lineHeight: 1.2, margin: '0 0 10px' }}>
          {p.name}
        </h1>

        {/* Price row */}
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginBottom: 16 }}>
          <span style={{ fontSize: 26, fontWeight: 900, color: '#111', letterSpacing: '-0.5px' }}>
            ₹{p.price?.toLocaleString('en-IN')}
          </span>
          {p.compareAtPrice && p.compareAtPrice > p.price && (
            <>
              <span style={{ fontSize: 15, color: '#C4BAC2', textDecoration: 'line-through', fontWeight: 500 }}>
                ₹{p.compareAtPrice.toLocaleString('en-IN')}
              </span>
              <span style={{ fontSize: 13, fontWeight: 800, color: '#16a34a' }}>
                {discount}% off
              </span>
            </>
          )}
        </div>

        {/* Rating stub */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 16 }}>
          <div style={{ display: 'flex', gap: 2 }}>
            {[1,2,3,4,5].map(s => (
              <BsStarFill key={s} size={12} color={s <= 4 ? '#FBBF24' : '#E5E7EB'} />
            ))}
          </div>
          <span style={{ fontSize: 12, fontWeight: 600, color: '#6B7280' }}>4.8 (124 reviews)</span>
        </div>

        <div style={{ height: 1, background: '#F5F5F5', marginBottom: 18 }} />

        {/* Description */}
        {p.description && (
          <p style={{ fontSize: 14, color: '#555', lineHeight: 1.75, marginBottom: 20, fontWeight: 400 }}>
            {p.description}
          </p>
        )}

        {/* What's inside */}
        {p.whatsInside && (
          <div style={{ background: '#FBF4F8', borderRadius: 14, padding: '14px 16px', marginBottom: 20 }}>
            <p style={{ fontSize: 12, fontWeight: 800, color: BRAND, textTransform: 'uppercase', letterSpacing: '0.6px', marginBottom: 6 }}>What&apos;s Inside</p>
            <p style={{ fontSize: 13, color: '#555', lineHeight: 1.65 }}>{p.whatsInside}</p>
          </div>
        )}

        <div style={{ height: 1, background: '#F5F5F5', marginBottom: 20 }} />

        {/* Quantity selector */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
          <span style={{ fontSize: 15, fontWeight: 800, color: '#111' }}>Quantity</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: 0, background: '#F5F5F5', borderRadius: 50, padding: '3px' }}>
            <button
              onClick={() => setQty(q => Math.max(1, q - 1))}
              style={{ width: 38, height: 38, borderRadius: '50%', background: qty > 1 ? '#fff' : 'transparent', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#111', boxShadow: qty > 1 ? '0 1px 4px rgba(0,0,0,0.08)' : 'none', transition: 'all 0.15s' }}
            >
              <BsDash size={16} />
            </button>
            <span style={{ minWidth: 36, textAlign: 'center', fontSize: 16, fontWeight: 900, color: '#111' }}>{qty}</span>
            <button
              onClick={() => setQty(q => q + 1)}
              style={{ width: 38, height: 38, borderRadius: '50%', background: BRAND, border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', boxShadow: `0 2px 8px ${BRAND}40`, transition: 'all 0.15s' }}
            >
              <BsPlus size={18} />
            </button>
          </div>
        </div>

        {/* Message card */}
        <div style={{ marginBottom: 24 }}>
          <h3 style={{ fontSize: 15, fontWeight: 800, color: '#111', marginBottom: 12 }}>Add a Message Card</h3>
          <div style={{ display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 4 }} className="no-scrollbar">
            {messageOptions.map(msg => {
              const active = selectedMessage === msg;
              return (
                <button
                  key={msg}
                  onClick={() => { const next = active ? '' : msg; setSelectedMessage(next); setCustomNote(active ? '' : next); }}
                  style={{
                    flexShrink: 0, padding: '8px 14px', borderRadius: 24,
                    fontSize: 12, fontWeight: 700, cursor: 'pointer', whiteSpace: 'nowrap',
                    background: active ? BRAND : '#F7F3F5',
                    color: active ? '#fff' : '#3C3C3C',
                    border: `1.5px solid ${active ? BRAND : '#EAEAEA'}`,
                    transition: 'all 0.15s',
                    display: 'flex', alignItems: 'center', gap: 5,
                  }}
                >
                  {active && <BsCheckCircleFill size={10} />}
                  {msg}
                </button>
              );
            })}
          </div>
          <textarea
            placeholder="Or write your own personal message…"
            value={customNote}
            onChange={e => setCustomNote(e.target.value)}
            rows={3}
            style={{
              width: '100%', marginTop: 12, padding: '12px 14px',
              borderRadius: 14, border: '1.5px solid #EAEAEA',
              fontSize: 13, fontFamily: 'inherit', resize: 'none',
              color: '#111', outline: 'none', background: '#FAFAFA',
              boxSizing: 'border-box', lineHeight: 1.65,
            }}
          />
        </div>

        {/* Trust badges */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8, marginBottom: 28 }}>
          {[
            { icon: <BsShieldFillCheck size={18} />, title: 'Safe Payment', sub: '100% secure' },
            { icon: <BsLightningChargeFill size={18} />, title: 'Same Day', sub: 'Delivery' },
            { icon: <BsGift size={18} />, title: 'Gift Ready', sub: 'Beautifully packed' },
          ].map(b => (
            <div key={b.title} style={{ background: '#FBF4F8', borderRadius: 14, padding: '14px 8px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, textAlign: 'center' }}>
              <span style={{ color: BRAND }}>{b.icon}</span>
              <span style={{ fontSize: 11, fontWeight: 800, color: '#111' }}>{b.title}</span>
              <span style={{ fontSize: 10, color: '#A9A0AE', fontWeight: 500 }}>{b.sub}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Sticky Add to Bag ── */}
      <div style={{
        position: 'fixed', bottom: 0, left: 0, right: 0,
        background: 'rgba(255,255,255,0.97)',
        padding: '12px 20px',
        paddingBottom: 'max(14px, env(safe-area-inset-bottom))',
        borderTop: '1px solid #F0F0F0',
        zIndex: 200,
        backdropFilter: 'blur(8px)',
      }}>
        <button
          onClick={handleAddToBag}
          disabled={addingToCart}
          style={{
            width: '100%', height: 54, borderRadius: 50,
            background: addingToCart ? '#C4A0B4' : BRAND,
            color: '#fff', fontSize: 16, fontWeight: 900,
            border: 'none', cursor: addingToCart ? 'not-allowed' : 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
            boxShadow: addingToCart ? 'none' : `0 8px 24px ${BRAND}40`,
            transition: 'all 0.2s',
            letterSpacing: '-0.2px',
          }}
        >
          {addingToCart ? (
            <>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" style={{ animation: 'spin 0.7s linear infinite' }}>
                <circle cx="12" cy="12" r="9" stroke="rgba(255,255,255,0.3)" strokeWidth="3"/>
                <path d="M12 3a9 9 0 0 1 9 9" stroke="white" strokeWidth="3" strokeLinecap="round"/>
              </svg>
              Adding…
            </>
          ) : (
            `Add to Bag · ₹${(p.price * qty).toLocaleString('en-IN')}`
          )}
        </button>
      </div>
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </main>
  );
}
