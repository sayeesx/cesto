'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { BsX, BsHeart, BsHeartFill, BsPlus, BsDash, BsLightningChargeFill, BsTruck, BsGift, BsCheckCircleFill, BsShieldFillCheck, BsArrowRight } from 'react-icons/bs';
import Loader from '../ui/Loader';

export interface ProductModalData {
  id: string;
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
}

interface ProductModalProps {
  product: ProductModalData | null;
  onClose: () => void;
}

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

import { apiClient } from '@/lib/api-client';
import { useAuth } from '@/context/AuthContext';

export default function ProductModal({ product, onClose }: ProductModalProps) {
  const router = useRouter();
  const { isAuthenticated, openLoginModal } = useAuth();
  const [qty, setQty] = useState(1);
  const [wishlisted, setWishlisted] = useState(false);
  const [selectedCustom, setSelectedCustom] = useState<string[]>([]);
  const [selectedMessage, setSelectedMessage] = useState('');
  const [customNote, setCustomNote] = useState('');
  const [loadingBtn, setLoadingBtn] = useState(false);
  const [visible, setVisible] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (product) {
      setVisible(true);
      setQty(1);
      setLoadingBtn(false);
      setSelectedCustom([]);
      setSelectedMessage('');
      setCustomNote('');
    }
  }, [product]);

  if (!product) return null;

  const discount = product.compareAtPrice && product.compareAtPrice > product.price
    ? Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100)
    : 0;

  const isSameDay = product.deliveryEstimate?.toLowerCase().includes('same') || product.deliveryEstimate?.toLowerCase().includes('hour');
  const totalPrice = (product.price * qty).toLocaleString('en-IN');

  const changeQty = (delta: number) => {
    setQty(prev => Math.max(1, prev + delta));
  };

  const toggleCustom = (val: string) => {
    setSelectedCustom(prev => prev.includes(val) ? prev.filter(v => v !== val) : [...prev, val]);
  };

  const selectMessage = (msg: string) => {
    const next = selectedMessage === msg ? '' : msg;
    setSelectedMessage(next);
    setCustomNote(next);
    if (next && textareaRef.current) {
      setTimeout(() => textareaRef.current?.focus(), 50);
    }
  };

  const handleAddToBag = async () => {
    // Gate: must be logged in
    if (!isAuthenticated) {
      openLoginModal(() => {
        // After login, automatically add to cart
        handleAddToBagAuthed();
      });
      return;
    }
    handleAddToBagAuthed();
  };

  const handleAddToBagAuthed = async () => {
    setLoadingBtn(true);
    try {
      await apiClient.addToCart(product!.id, qty);
      handleClose();
      router.push('/cart');
    } catch (err: any) {
      console.error('Failed to add to cart', err);
      if (err.statusCode === 401) {
        // Token expired mid-session — show login modal
        openLoginModal();
      } else {
        alert(err.message || 'Could not add item to bag.');
      }
    } finally {
      setLoadingBtn(false);
    }
  };

  const handleClose = () => {
    setVisible(false);
    setTimeout(onClose, 280);
  };
  
  return (
    <>
      <style>{`
        /* Removed all extra animations */
      `}</style>

      {/* Backdrop */}
      <div
        style={{
          position: 'fixed', inset: 0, zIndex: 3000,
          background: visible ? 'rgba(0,0,0,0.45)' : 'rgba(0,0,0,0)',
          transition: 'background 0.28s ease',
        }}
        onClick={handleClose}
      />

      {/* Sheet */}
      <div
        style={{
          position: 'fixed',
          left: 0, right: 0, bottom: 0,
          zIndex: 3001,
          background: '#FFFFFF',
          borderTopLeftRadius: 24,
          borderTopRightRadius: 24,
          maxHeight: '80dvh',
          display: 'flex',
          flexDirection: 'column',
          transform: visible ? 'translateY(0)' : 'translateY(100%)',
          transition: 'transform 0.32s cubic-bezier(0.32, 0.72, 0, 1)',
          willChange: 'transform',
        }}
      >
        {/* Handle */}
        <div style={{ flexShrink: 0, display: 'flex', justifyContent: 'center', padding: '10px 0 0', position: 'relative' }}>
          <div style={{ width: 36, height: 4, borderRadius: 2, background: '#E5E5E5' }} />
          
          <button
            onClick={handleClose}
            style={{
              position: 'absolute', right: 14, top: 6,
              width: 30, height: 30, borderRadius: '50%',
              background: 'rgba(0,0,0,0.06)', border: 'none',
              display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
            }}
          >
            <BsX size={18} color="#111111" />
          </button>

          <button
            onClick={() => setWishlisted(w => !w)}
            style={{
              position: 'absolute', right: 14, top: 46,
              width: 30, height: 30, borderRadius: '50%',
              background: wishlisted ? '#FCF1F6' : '#F5F5F5', border: 'none',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', color: wishlisted ? '#b22153' : '#BEB4C4',
              transition: 'all 0.2s ease',
            }}
          >
            {wishlisted ? <BsHeartFill size={14} /> : <BsHeart size={14} />}
          </button>
        </div>

        {/* Scrollable content */}
        <div style={{ flex: 1, overflowY: 'auto', paddingBottom: 16 }} className="scrollbar-hide">
          
          <div style={{ display: 'flex', gap: 12, padding: '14px 16px 12px', paddingRight: 56 }}>
            <div style={{
              width: 88, height: 88, flexShrink: 0, borderRadius: 14,
              overflow: 'hidden', background: 'linear-gradient(135deg, #FBE0EB, #F8EDF4)',
            }}>
              {product.imageUrl ? (
                <img src={product.imageUrl} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              ) : (
                <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 30, color: '#E0CBE8' }}>
                  <BsGift />
                </div>
              )}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <h2 style={{ fontSize: 15, fontWeight: 900, color: '#111111', lineHeight: 1.3, marginBottom: 4 }}>{product.name}</h2>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                <span style={{ fontSize: 17, fontWeight: 900, color: '#111111' }}>
                  ₹{product.price.toLocaleString('en-IN')}
                </span>
                {product.compareAtPrice && product.compareAtPrice > product.price && (
                  <span style={{ fontSize: 11, color: '#BEB4C4', textDecoration: 'line-through' }}>₹{product.compareAtPrice.toLocaleString('en-IN')}</span>
                )}
                {discount > 0 && (
                  <span style={{ fontSize: 10, fontWeight: 800, color: '#b22153', background: '#FCF1F6', padding: '1px 6px', borderRadius: 999 }}>{discount}% off</span>
                )}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: 4, background: isSameDay ? '#ECFCCB' : '#F5F5F5', color: isSameDay ? '#3f6212' : '#5F5F5F', fontSize: 10, fontWeight: 800, padding: '3px 8px', borderRadius: 20 }}>
                  {isSameDay ? <BsLightningChargeFill size={9} /> : <BsTruck size={9} />}
                  {isSameDay ? 'Same Day' : product.deliveryEstimate}
                </div>
                <Link
                  href={`/product/${product.slug}`}
                  onClick={() => handleClose()}
                  style={{ display: 'inline-flex', alignItems: 'center', gap: 4, fontSize: 11, fontWeight: 800, color: '#b22153', textDecoration: 'none' }}
                >
                  View full details <BsArrowRight size={10} />
                </Link>
              </div>
            </div>
          </div>

          <div style={{ height: 1, background: '#F5F5F5', margin: '0 16px 14px' }} />

          {/* Quantity */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 16px', marginBottom: 20 }}>
            <span style={{ fontSize: 13, fontWeight: 800, color: '#111111' }}>Quantity</span>
            <div style={{ display: 'flex', alignItems: 'center', borderRadius: 10, border: '1.5px solid #EAEAEA', overflow: 'hidden' }}>
              <button onClick={() => changeQty(-1)} style={{ width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'none', border: 'none', cursor: 'pointer', color: '#111111' }}>
                <BsDash size={15} />
              </button>
              <span style={{ width: 32, textAlign: 'center', fontSize: 14, fontWeight: 900, color: '#111111' }}>{qty}</span>
              <button onClick={() => changeQty(1)} style={{ width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#b22153', border: 'none', cursor: 'pointer', color: 'white' }}>
                <BsPlus size={15} />
              </button>
            </div>
          </div>

          {/* Customisation */}
          <div style={{ padding: '0 16px', marginBottom: 20 }}>
            <h3 style={{ fontSize: 13, fontWeight: 800, color: '#111111', marginBottom: 10 }}>Customise Your Gift</h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {customisationOptions.map(opt => {
                const active = selectedCustom.includes(opt.value);
                return (
                  <button
                    key={opt.value}
                    onClick={() => toggleCustom(opt.value)}
                    style={{
                      display: 'inline-flex', alignItems: 'center', gap: 6,
                      padding: '5px 11px', borderRadius: 20, fontSize: 11, fontWeight: 700, cursor: 'pointer',
                      background: active ? '#b22153' : '#F5F5F5',
                      color: active ? '#FFFFFF' : '#3C3C3C',
                      border: active ? '1.5px solid #b22153' : '1.5px solid #EAEAEA',
                      transition: 'all 0.18s ease',
                    }}
                  >
                    {active && <BsCheckCircleFill size={11} />}
                    {opt.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Message Card */}
          <div style={{ padding: '0 16px', marginBottom: 20 }}>
            <h3 style={{ fontSize: 13, fontWeight: 800, color: '#111111', marginBottom: 10 }}>Add a Message Card</h3>
            <div style={{ display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 4 }} className="no-scrollbar">
              {messageOptions.map(msg => {
                const active = selectedMessage === msg;
                return (
                  <button
                    key={msg}
                    onClick={() => selectMessage(msg)}
                    style={{
                      flexShrink: 0, padding: '5px 11px', borderRadius: 20, fontSize: 11, fontWeight: 700, cursor: 'pointer',
                      background: active ? '#b22153' : '#F5F5F5',
                      color: active ? '#FFFFFF' : '#3C3C3C',
                      border: active ? '1.5px solid #b22153' : '1.5px solid #EAEAEA',
                      whiteSpace: 'nowrap', transition: 'all 0.18s ease',
                    }}
                  >
                    {msg}
                  </button>
                );
              })}
            </div>
            <textarea
              ref={textareaRef}
              placeholder="Or write your own personal message..."
              value={customNote}
              onChange={e => setCustomNote(e.target.value)}
              rows={2}
              style={{
                width: '100%', marginTop: 10, padding: '10px 12px',
                borderRadius: 10, border: '1.5px solid #EAEAEA',
                fontSize: 13, fontFamily: 'inherit', resize: 'none',
                color: '#111111', outline: 'none', background: '#FAFAFA',
                boxSizing: 'border-box',
              }}
            />
          </div>

          {/* Trust Badges */}
          <div style={{ display: 'flex', gap: 12, padding: '0 16px', marginBottom: 8 }}>
            {[
              { icon: <BsShieldFillCheck size={12} />, label: 'Safe Payment' },
              { icon: <BsLightningChargeFill size={12} />, label: 'Same Day' },
              { icon: <BsGift size={12} />, label: 'Gift Ready' },
            ].map(badge => (
              <div key={badge.label} style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 10, fontWeight: 700, color: '#A9A0AE', flex: 1 }}>
                <span style={{ color: '#b22153' }}>{badge.icon}</span> {badge.label}
              </div>
            ))}
          </div>
        </div>

        {/* Fixed Add to Bag */}
        <div style={{
          flexShrink: 0,
          background: '#FFFFFF',
          padding: '10px 16px',
          borderTop: '1px solid #F5F5F5',
          paddingBottom: 'max(10px, env(safe-area-inset-bottom))',
        }}>
          <button
            onClick={handleAddToBag}
            style={{
              width: '100%', height: 50, borderRadius: 14,
              background: '#b22153',
              color: '#FFFFFF', fontSize: 14, fontWeight: 900,
              border: 'none', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
            }}
          >
            {loadingBtn ? (
              <Loader color="#ffffff" size={20} />
            ) : (
              `Add to Bag · ₹${totalPrice}`
            )}
          </button>
        </div>
      </div>
    </>
  );
}
