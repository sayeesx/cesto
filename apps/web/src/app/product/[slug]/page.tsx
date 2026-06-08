'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { use } from 'react';
import Loader from '@/components/ui/Loader';
import { 
  BsHeart, BsHeartFill, BsPlus, BsDash, BsLightningChargeFill, BsTruck, 
  BsGift, BsCheckCircleFill, BsShieldFillCheck, BsArrowLeft, BsBoxSeam
} from 'react-icons/bs';

const customisationOptions = [
  { label: 'Without Candles', value: 'no-candles' },
  { label: 'With Candles', value: 'with-candles' },
  { label: 'Extra Ribbon', value: 'extra-ribbon' },
  { label: 'Gift Box Wrap', value: 'gift-wrap' },
];

const messageOptions = [
  'Happy Birthday! 🎂',
  'Happy Anniversary! 💕',
  'With Love ❤️',
  'Congratulations! 🎉',
];

export default function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [qty, setQty] = useState(1);
  const [wishlisted, setWishlisted] = useState(false);
  const [selectedCustom, setSelectedCustom] = useState<string[]>([]);
  const [selectedMessage, setSelectedMessage] = useState('');
  const [customNote, setCustomNote] = useState('');
  const [loadingBtn, setLoadingBtn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api'}/v1/products/${slug}`);
        if (res.ok) setProduct(await res.json());
      } catch {}
      setLoading(false);
    }
    load();
  }, [slug]);

  const toggleCustom = (val: string) => {
    setSelectedCustom(prev => prev.includes(val) ? prev.filter(v => v !== val) : [...prev, val]);
  };

  const handleAddToBag = () => {
    setLoadingBtn(true);
    setTimeout(() => {
      setLoadingBtn(false);
      router.push('/cart');
    }, 400);
  };

  const changeQty = (delta: number) => {
    setQty(prev => Math.max(1, prev + delta));
  };

  if (loading) {
    return (
      <main style={{ minHeight: '100vh', background: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ fontSize: 32, animation: 'spin 1s linear infinite' }}>🎁</div>
      </main>
    );
  }

  const p = product || {
    name: 'Premium Gift Hamper',
    price: 999,
    compareAtPrice: 1299,
    deliveryEstimate: 'Same Day',
    isBestseller: true,
    description: 'A beautifully curated gift perfect for any occasion. Handcrafted with love and premium materials.',
  };

  const discount = p.compareAtPrice && p.compareAtPrice > p.price
    ? Math.round(((p.compareAtPrice - p.price) / p.compareAtPrice) * 100)
    : 0;

  const isSameDay = p.deliveryEstimate?.toLowerCase().includes('same') || p.deliveryEstimate?.toLowerCase().includes('hour');

  const totalPrice = (p.price * qty).toLocaleString('en-IN');

  return (
    <main style={{ minHeight: '100vh', background: '#FFFFFF', paddingBottom: 120 }}>
      {/* Back Button (Absolute over image or top) */}

      {/* Styling */}
      <style>{`
        /* Removed animations */
      `}</style>

      {/* Product Image */}
      <div style={{ position: 'relative', margin: '16px 16px 0', borderRadius: 24, overflow: 'hidden', background: 'linear-gradient(135deg, #FBE0EB, #F8EDF4)', aspectRatio: '1' }}>
        {p.imageUrl ? (
          <img src={p.imageUrl} alt={p.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        ) : (
          <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 80, color: '#E0CBE8' }}>
            <BsGift />
          </div>
        )}
        
        {/* Back Button */}
        <Link href="/shop" style={{ position: 'fixed', top: 16, left: 16, width: 40, height: 40, borderRadius: '50%', background: 'rgba(255,255,255,0.95)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#111111', textDecoration: 'none', zIndex: 100, border: '1px solid rgba(0,0,0,0.05)', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
          <BsArrowLeft size={18} />
        </Link>

        {discount > 0 && (
          <span style={{ position: 'absolute', top: 16, left: 64, background: '#b22153', color: 'white', fontSize: 12, fontWeight: 800, padding: '5px 12px', borderRadius: 999, zIndex: 5 }}>{discount}% OFF</span>
        )}
        <button
          onClick={() => setWishlisted(w => !w)}
          style={{ position: 'absolute', top: 16, right: 16, width: 40, height: 40, borderRadius: '50%', background: 'rgba(255,255,255,0.9)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: wishlisted ? '#b22153' : '#BEB4C4', zIndex: 5, border: '1px solid rgba(0,0,0,0.05)' }}
        >
          {wishlisted ? <BsHeartFill size={18} /> : <BsHeart size={18} />}
        </button>
      </div>

      {/* Content */}
      <div style={{ padding: '20px 16px 0' }}>
        {/* Name & Price */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12 }}>
          <h1 style={{ fontSize: 22, fontWeight: 900, color: '#111111', letterSpacing: '-0.4px', lineHeight: 1.2, flex: 1 }}>{p.name}</h1>
          <div style={{ textAlign: 'right', flexShrink: 0 }}>
            <div style={{ fontSize: 24, fontWeight: 900, color: '#111111' }}>₹{p.price?.toLocaleString('en-IN')}</div>
            {p.compareAtPrice && p.compareAtPrice > p.price && (
              <div style={{ fontSize: 13, color: '#BEB4C4', textDecoration: 'line-through' }}>₹{p.compareAtPrice.toLocaleString('en-IN')}</div>
            )}
          </div>
        </div>

        {/* Delivery */}
        <div style={{ marginTop: 12 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 5, background: isSameDay ? '#ECFCCB' : '#F5F5F5', color: isSameDay ? '#3f6212' : '#5F5F5F', fontSize: 12, fontWeight: 800, padding: '6px 12px', borderRadius: 20 }}>
            {isSameDay ? <BsLightningChargeFill size={11} /> : <BsTruck size={11} />}
            {isSameDay ? 'Same Day Delivery Available' : p.deliveryEstimate}
          </div>
        </div>

        {/* Description */}
        <p style={{ fontSize: 14, color: '#5F5F5F', lineHeight: 1.7, margin: '16px 0', fontWeight: 500 }}>
          {p.description || 'A beautifully curated gift perfect for any occasion. Handcrafted with love and premium materials, designed to create a lasting impression.'}
        </p>

        <div style={{ height: 1, background: '#F5F5F5', margin: '8px 0 20px' }} />

        {/* Quantity */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
          <span style={{ fontSize: 14, fontWeight: 800, color: '#111111' }}>Quantity</span>
          <div style={{ display: 'flex', alignItems: 'center', borderRadius: 12, border: '1.5px solid #EAEAEA', overflow: 'hidden' }}>
            <button onClick={() => changeQty(-1)} style={{ width: 44, height: 44, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'none', border: 'none', cursor: 'pointer', color: '#111111' }}>
              <BsDash size={16} />
            </button>
            <span style={{ width: 40, textAlign: 'center', fontSize: 16, fontWeight: 900 }}>{qty}</span>
            <button onClick={() => changeQty(1)} style={{ width: 44, height: 44, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#b22153', border: 'none', cursor: 'pointer', color: 'white' }}>
              <BsPlus size={16} />
            </button>
          </div>
        </div>

        {/* Customisation */}
        <div style={{ marginBottom: 24 }}>
          <h3 style={{ fontSize: 14, fontWeight: 800, color: '#111111', marginBottom: 12 }}>Customise Your Gift</h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {customisationOptions.map(opt => {
              const active = selectedCustom.includes(opt.value);
              return (
                <button key={opt.value} onClick={() => toggleCustom(opt.value)} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '5px 11px', borderRadius: 20, fontSize: 11, fontWeight: 700, cursor: 'pointer', background: active ? '#b22153' : '#F5F5F5', color: active ? '#FFFFFF' : '#3C3C3C', border: active ? '1.5px solid #b22153' : '1.5px solid #EAEAEA', transition: 'all 0.18s ease' }}>
                  {active && <BsCheckCircleFill size={10} />}
                  {opt.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Message Card */}
        <div style={{ marginBottom: 24 }}>
          <h3 style={{ fontSize: 14, fontWeight: 800, color: '#111111', marginBottom: 12 }}>Message Card</h3>
          <div style={{ display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 4 }} className="no-scrollbar">
            {messageOptions.map(msg => {
              const active = selectedMessage === msg;
              return (
                <button key={msg} onClick={() => setSelectedMessage(active ? '' : msg)} style={{ flexShrink: 0, padding: '5px 11px', borderRadius: 20, fontSize: 11, fontWeight: 700, cursor: 'pointer', background: active ? '#b22153' : '#F5F5F5', color: active ? '#FFFFFF' : '#3C3C3C', border: active ? '1.5px solid #b22153' : '1.5px solid #EAEAEA', whiteSpace: 'nowrap' }}>
                  {msg}
                </button>
              );
            })}
          </div>
          <textarea placeholder="Or write your own personal message..." value={customNote} onChange={e => setCustomNote(e.target.value)} rows={3} style={{ width: '100%', marginTop: 12, padding: '12px 14px', borderRadius: 14, border: '1.5px solid #EAEAEA', fontSize: 13, fontFamily: 'inherit', resize: 'none', color: '#111111', outline: 'none', background: '#FAFAFA', boxSizing: 'border-box' }} />
        </div>

        {/* Trust Badges */}
        <div style={{ display: 'flex', gap: 16, marginBottom: 32 }}>
          {[
            { icon: <BsShieldFillCheck size={14} />, label: 'Safe Payment' },
            { icon: <BsLightningChargeFill size={14} />, label: 'Same Day' },
            { icon: <BsGift size={14} />, label: 'Gift Ready' },
          ].map(badge => (
            <div key={badge.label} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, fontWeight: 700, color: '#A9A0AE', flex: 1 }}>
              <span style={{ color: '#b22153' }}>{badge.icon}</span> {badge.label}
            </div>
          ))}
        </div>
      </div>

      {/* Sticky Add to Cart */}
      <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0, background: '#FFFFFF', padding: '10px 16px', paddingBottom: 'max(10px, env(safe-area-inset-bottom))', borderTop: '1px solid #F5F5F5', zIndex: 200, boxShadow: '0 -4px 12px rgba(0,0,0,0.03)' }}>
        <button
          onClick={handleAddToBag}
          style={{ width: '100%', height: 50, borderRadius: 14, background: '#b22153', color: '#FFFFFF', fontSize: 14, fontWeight: 900, border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}
        >
          {loadingBtn ? (
            <Loader color="#ffffff" size={20} />
          ) : (
            `Add to Bag · ₹${totalPrice}`
          )}
        </button>
      </div>
    </main>
  );
}
