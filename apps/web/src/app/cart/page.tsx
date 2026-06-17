'use client';

import Link from 'next/link';
import { DotLottiePlayer } from '@dotlottie/react-player';
import {
  BsArrowLeft, BsTrash, BsPlus, BsDash, BsGift, BsArrowRight,
  BsChevronDown, BsChevronUp, BsGeoAlt, BsPlusCircle, BsCheckCircleFill,
  BsExclamationCircleFill,
} from 'react-icons/bs';
import RollingPrice from '@/components/ui/RollingPrice';
import { apiClient } from '@/lib/api-client';
import { useAuth } from '@/context/AuthContext';
import { getCartImage } from '@/lib/cloudinary';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

// ─── Skeleton ────────────────────────────────────────────────────────────────
function CartSkeleton() {
  return (
    <main style={{ minHeight: '100dvh', background: '#F5F5F5', paddingBottom: 120 }}>
      <div style={{ background: '#fff', padding: '16px 20px', display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{ width: 36, height: 36, borderRadius: 10, background: '#F0F0F0' }} />
        <div style={{ height: 18, width: 60, borderRadius: 6, background: '#F0F0F0' }} />
      </div>
      <div style={{ margin: '12px 16px', background: '#fff', borderRadius: 20, padding: 16, display: 'flex', flexDirection: 'column', gap: 0 }}>
        {[1, 2, 3].map((i, idx) => (
          <div key={i}>
            <div style={{ display: 'flex', gap: 14, padding: '14px 0', alignItems: 'center' }}>
              <div style={{ width: 80, height: 80, borderRadius: 14, flexShrink: 0, background: 'linear-gradient(90deg,#f3eef1 25%,#ede6eb 50%,#f3eef1 75%)', backgroundSize: '200% 100%', animation: 'shimmer 1.4s ease-in-out infinite' }} />
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 8 }}>
                <div style={{ height: 13, width: '80%', borderRadius: 6, background: 'linear-gradient(90deg,#f3eef1 25%,#ede6eb 50%,#f3eef1 75%)', backgroundSize: '200% 100%', animation: 'shimmer 1.4s ease-in-out infinite' }} />
                <div style={{ height: 11, width: '45%', borderRadius: 6, background: 'linear-gradient(90deg,#f3eef1 25%,#ede6eb 50%,#f3eef1 75%)', backgroundSize: '200% 100%', animation: 'shimmer 1.4s ease-in-out infinite' }} />
                <div style={{ height: 30, width: 100, borderRadius: 24, background: 'linear-gradient(90deg,#f3eef1 25%,#ede6eb 50%,#f3eef1 75%)', backgroundSize: '200% 100%', animation: 'shimmer 1.4s ease-in-out infinite', marginTop: 4 }} />
              </div>
            </div>
            {idx < 2 && <div style={{ height: 1, background: '#F5F5F5' }} />}
          </div>
        ))}
      </div>
      <style>{`@keyframes shimmer{0%{background-position:200% 0}100%{background-position:-200% 0}}`}</style>
    </main>
  );
}

// ─── Address type ─────────────────────────────────────────────────────────────
type Address = {
  id: string;
  type: string;
  name: string;
  phone: string;
  addressLine: string;
  area: string;
  city: string;
  pincode: string;
  state: string;
  isDefault: boolean;
};

// ─── Main ─────────────────────────────────────────────────────────────────────
export default function CartPage() {
  const [cart, setCart] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [showAllItems, setShowAllItems] = useState(false);

  // Pricing from Supabase (via API)
  const [deliveryFee, setDeliveryFee] = useState(0);
  const [taxRate, setTaxRate] = useState(0);
  const [deliveryLabel, setDeliveryLabel] = useState('Delivery');
  const [taxLabel, setTaxLabel] = useState('Tax');

  // Delivery address
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [selectedAddressId, setSelectedAddressId] = useState<string | null>(null);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [savingAddress, setSavingAddress] = useState(false);
  const [addressError, setAddressError] = useState<string | null>(null);
  const [newAddress, setNewAddress] = useState({
    type: 'HOME',
    name: '',
    phone: '',
    addressLine: '',
    area: '',
    city: 'Kochi',
    pincode: '',
    state: 'Kerala',
  });

  const { isAuthenticated, openLoginModal } = useAuth();
  const router = useRouter();

  const loadCart = async () => {
    try {
      const data = await apiClient.getCart();
      setCart(data);
    } catch (err) {
      console.error('Failed to load cart', err);
    } finally {
      setLoading(false);
    }
  };

  const loadPricing = async () => {
    try {
      const pricing = await apiClient.getPricing();
      if (pricing?.delivery) {
        setDeliveryFee(pricing.delivery.amount ?? 0);
        setDeliveryLabel(pricing.delivery.label ?? 'Delivery');
      }
      if (pricing?.tax) {
        setTaxRate(pricing.tax.rate ?? 0);
        setTaxLabel(pricing.tax.label ?? 'Tax');
      }
    } catch (err) {
      console.error('Failed to load pricing', err);
    }
  };

  const loadAddresses = async () => {
    if (!isAuthenticated) return;
    try {
      const data = await apiClient.getAddresses();
      const list: Address[] = Array.isArray(data) ? data : (data as any)?.addresses ?? [];
      setAddresses(list);
      const def = list.find((a) => a.isDefault);
      if (def) setSelectedAddressId(def.id);
      else if (list.length > 0) setSelectedAddressId(list[0].id);
    } catch (err) {
      console.error('Failed to load addresses', err);
    }
  };

  useEffect(() => {
    loadCart();
    loadPricing();
  }, []);

  useEffect(() => {
    loadAddresses();
  }, [isAuthenticated]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleUpdateQty = async (itemId: string, newQty: number) => {
    if (newQty < 1) return;
    setUpdatingId(itemId);
    try {
      await apiClient.updateCartItem(itemId, newQty);
      setCart((prev: any) => ({
        ...prev,
        items: prev.items.map((it: any) =>
          it.id === itemId ? { ...it, quantity: newQty } : it
        ),
      }));
    } catch (err) {
      console.error('Update qty failed', err);
    } finally {
      setUpdatingId(null);
    }
  };

  const handleRemove = async (itemId: string) => {
    setUpdatingId(itemId);
    try {
      await apiClient.removeFromCart(itemId);
      setCart((prev: any) => ({
        ...prev,
        items: prev.items.filter((it: any) => it.id !== itemId),
      }));
    } catch (err) {
      console.error('Remove item failed', err);
    } finally {
      setUpdatingId(null);
    }
  };

  const handleSaveAddress = async () => {
    setAddressError(null);
    if (!newAddress.name.trim()) { setAddressError('Please enter your full name'); return; }
    if (!newAddress.phone.trim()) { setAddressError('Please enter a phone number'); return; }
    if (!newAddress.addressLine.trim()) { setAddressError('Please enter the house / flat number'); return; }
    if (!newAddress.area.trim()) { setAddressError('Please enter the area / locality'); return; }
    if (!newAddress.pincode.trim()) { setAddressError('Please enter the pincode'); return; }

    setSavingAddress(true);
    try {
      const res = await apiClient.createAddress({
        ...newAddress,
        country: 'India',
      });
      const created = res?.address || res || {};
      const addr: Address = {
        id: created.id || created._id || '',
        type: created.type || newAddress.type,
        name: created.name || newAddress.name,
        phone: created.phone || newAddress.phone,
        addressLine: created.addressLine || newAddress.addressLine,
        area: created.area || newAddress.area,
        city: created.city || newAddress.city,
        pincode: created.pincode || newAddress.pincode,
        state: created.state || newAddress.state,
        isDefault: created.isDefault || false,
      };
      if (addr.id) {
        setAddresses((prev) => [...prev, addr]);
        setSelectedAddressId(addr.id);
      }
      setShowAddressForm(false);
      setNewAddress({ type: 'HOME', name: '', phone: '', addressLine: '', area: '', city: 'Kochi', pincode: '', state: 'Kerala' });
    } catch (err: any) {
      console.error('Failed to save address', err);
      setAddressError(err?.message || 'Failed to save address. Please try again.');
    } finally {
      setSavingAddress(false);
    }
  };

  const handleCheckout = () => {
    if (!isAuthenticated) {
      openLoginModal(() => router.push('/checkout'));
      return;
    }
    router.push('/checkout');
  };

  if (loading) return <CartSkeleton />;

  const cartItems: any[] = cart?.items || [];
  const subtotal = cartItems.reduce((sum: number, item: any) => {
    const unitPrice = item.price ?? item.product?.price ?? 0;
    return sum + unitPrice * (item.quantity ?? 1);
  }, 0);
  const taxAmount = Math.round((subtotal * taxRate) / 100);
  const total = subtotal + deliveryFee + taxAmount;
  const isEmpty = cartItems.length === 0;

  function getItemImage(item: any): string | null {
    // product.imageUrl holds the Cloudinary public_id (or a legacy full URL).
    // getCartImage() applies the 164×164 c_pad b_white transformation.
    const raw = item.product?.imageUrl || item.product?.images?.[0]?.url || item.imageUrl || null;
    return getCartImage(raw);
  }

  // Show only 2 items unless expanded
  const INITIAL_SHOW = 2;
  const hasMoreItems = cartItems.length > INITIAL_SHOW;
  const visibleItems = hasMoreItems && !showAllItems ? cartItems.slice(0, INITIAL_SHOW) : cartItems;

  // Empty state
  if (isEmpty) {
    return (
      <main style={{ minHeight: '100dvh', background: '#fff', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '0 24px', textAlign: 'center' }}>
        <div style={{ width: 220, height: 220, margin: '0 auto' }}>
          <DotLottiePlayer src="/lottie/empty.lottie" autoplay loop />
        </div>
        <h2 style={{ fontSize: 22, fontWeight: 900, color: '#111', marginTop: -12, marginBottom: 8 }}>Your bag is empty</h2>
        <p style={{ fontSize: 14, color: '#9CA3AF', lineHeight: 1.6, marginBottom: 32, maxWidth: 280 }}>
          Looks like you haven&apos;t added any gifts yet.
        </p>
        <Link href="/shop" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#983255', color: '#fff', padding: '14px 32px', borderRadius: 50, fontSize: 15, fontWeight: 800, textDecoration: 'none' }}>
          Browse Gifts <BsArrowRight />
        </Link>
        <style>{`@keyframes shimmer{0%{background-position:200% 0}100%{background-position:-200% 0}}`}</style>
      </main>
    );
  }

  return (
    <>
      <style>{`
        @keyframes shimmer{0%{background-position:200% 0}100%{background-position:-200% 0}}
        .addr-input { width:100%;padding:10px 14px;border-radius:10px;border:1.5px solid #E8E8E8;font-size:13px;font-family:inherit;outline:none;box-sizing:border-box;background:#fff; }
        .addr-input:focus { border-color: #983255; }
      `}</style>

      <main style={{ minHeight: '100dvh', background: '#F5F5F5', paddingBottom: 80 }}>

        {/* ── Sticky Top Bar ── */}
        <div style={{
          background: '#fff',
          padding: '14px 20px',
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          position: 'sticky',
          top: 0,
          zIndex: 30,
          borderBottom: '1px solid #F0F0F0',
        }}>
          <button
            onClick={() => router.back()}
            style={{ width: 36, height: 36, borderRadius: 10, background: '#F5F5F5', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flexShrink: 0 }}
          >
            <BsArrowLeft size={17} color="#111" />
          </button>
          <h1 style={{ fontSize: 17, fontWeight: 900, color: '#111', flex: 1, margin: 0 }}>Cart</h1>
          <span style={{ fontSize: 13, fontWeight: 700, color: '#983255' }}>
            {cartItems.length} item{cartItems.length !== 1 ? 's' : ''}
          </span>
        </div>

        {/* ── Sticky Bill Summary (just below top bar) ── */}
        <div style={{
          position: 'sticky',
          top: 65,
          zIndex: 20,
          background: '#fff',
          borderBottom: '1px solid #F0F0F0',
          padding: '10px 0',
          display: 'flex',
          alignItems: 'center',
        }}>
          {/* Subtotal — plain number, no animation */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', borderRight: '1px solid #F0F0F0', padding: '0 8px' }}>
            <span style={{ fontSize: 10, fontWeight: 700, color: '#A0A0A0', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Subtotal</span>
            <span style={{ fontSize: 15, fontWeight: 900, color: '#111', marginTop: 2 }}>₹{subtotal.toLocaleString('en-IN')}</span>
          </div>
          {/* Delivery */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', borderRight: '1px solid #F0F0F0', padding: '0 8px' }}>
            <span style={{ fontSize: 10, fontWeight: 700, color: '#A0A0A0', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{deliveryLabel}</span>
            <span style={{ fontSize: 15, fontWeight: 900, color: deliveryFee === 0 ? '#65a30d' : '#111', marginTop: 2 }}>
              {deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`}
            </span>
          </div>
          {/* Tax */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', borderRight: '1px solid #F0F0F0', padding: '0 8px' }}>
            <span style={{ fontSize: 10, fontWeight: 700, color: '#A0A0A0', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{taxLabel}</span>
            <span style={{ fontSize: 15, fontWeight: 900, color: taxAmount === 0 ? '#65a30d' : '#111', marginTop: 2 }}>
              {taxAmount === 0 ? 'NIL' : `₹${taxAmount}`}
            </span>
          </div>
          {/* Total — animated RollingPrice */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '0 8px' }}>
            <span style={{ fontSize: 10, fontWeight: 700, color: '#A0A0A0', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Total</span>
            <div style={{ marginTop: 2 }}>
              <RollingPrice price={total} size={15} color="#983255" />
            </div>
          </div>
        </div>

        {/* ── Items card ── */}
        <div style={{
          margin: '14px 16px 12px',
          background: '#fff',
          borderRadius: 20,
          overflow: 'hidden',
          boxShadow: '0 1px 6px rgba(0,0,0,0.04)',
        }}>
          {visibleItems.map((item: any, idx: number) => {
            const imgUrl = getItemImage(item);
            const unitPrice = item.price ?? item.product?.price ?? 0;
            const isUpdating = updatingId === item.id;

            return (
              <div key={item.id}>
                <div style={{
                  display: 'flex',
                  gap: 14,
                  padding: '16px 16px',
                  alignItems: 'center',
                  opacity: isUpdating ? 0.55 : 1,
                  transition: 'opacity 0.15s',
                }}>
                  {/* Product image */}
                  <div style={{
                    width: 82, height: 82, borderRadius: 14, flexShrink: 0,
                    background: '#F9F3F6', overflow: 'hidden',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    {imgUrl ? (
                      <img src={imgUrl} alt={item.product?.name || ''} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                    ) : (
                      <BsGift size={28} color="#DCBECE" />
                    )}
                  </div>

                  {/* Details */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 6, marginBottom: 4 }}>
                      <h3 style={{
                        fontSize: 14, fontWeight: 700, color: '#111',
                        lineHeight: 1.35, flex: 1, minWidth: 0,
                        overflow: 'hidden', display: '-webkit-box',
                        WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' as const,
                        margin: 0,
                      }}>
                        {item.product?.name || 'Gift'}
                      </h3>
                      <button
                        onClick={() => handleRemove(item.id)}
                        disabled={isUpdating}
                        style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#CCC', padding: '2px 4px', flexShrink: 0, marginTop: 2 }}
                        aria-label="Remove"
                      >
                        <BsTrash size={15} />
                      </button>
                    </div>

                    <p style={{ fontSize: 12, fontWeight: 600, color: '#983255', margin: '0 0 8px' }}>
                      {item.product?.deliveryEstimate || 'Cesto'}
                    </p>
                    <p style={{ fontSize: 15, fontWeight: 900, color: '#111', margin: '0 0 10px' }}>
                      ₹{unitPrice.toLocaleString('en-IN')}
                    </p>

                    {/* Qty stepper */}
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 0 }}>
                      <button
                        onClick={() => handleUpdateQty(item.id, item.quantity - 1)}
                        disabled={isUpdating || item.quantity <= 1}
                        style={{
                          width: 34, height: 34, borderRadius: '50%',
                          border: '1.5px solid #E0E0E0', background: '#fff',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          cursor: item.quantity <= 1 ? 'not-allowed' : 'pointer',
                          color: '#555', flexShrink: 0,
                        }}
                      >
                        <BsDash size={14} />
                      </button>
                      <span style={{ minWidth: 32, textAlign: 'center', fontSize: 15, fontWeight: 800, color: '#111' }}>
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => handleUpdateQty(item.id, item.quantity + 1)}
                        disabled={isUpdating}
                        style={{
                          width: 34, height: 34, borderRadius: '50%',
                          border: 'none', background: '#983255',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          cursor: 'pointer', color: '#fff', flexShrink: 0,
                        }}
                      >
                        <BsPlus size={16} />
                      </button>
                    </div>
                  </div>
                </div>
                {idx < visibleItems.length - 1 && (
                  <div style={{ height: 1, background: '#F5F5F5', margin: '0 16px' }} />
                )}
              </div>
            );
          })}

          {/* Show more / less — only when > 2 items */}
          {hasMoreItems && (
            <button
              onClick={() => setShowAllItems((v) => !v)}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 6,
                padding: '14px 16px',
                background: '#FBF6F9',
                border: 'none',
                borderTop: '1px solid #F5F5F5',
                cursor: 'pointer',
                fontSize: 13,
                fontWeight: 700,
                color: '#983255',
              }}
            >
              {showAllItems ? (
                <>Show less <BsChevronUp size={13} /></>
              ) : (
                <>Show all {cartItems.length} items <BsChevronDown size={13} /></>
              )}
            </button>
          )}
        </div>

        {/* ── Confirm Delivery Address ── */}
        <div style={{
          margin: '0 16px 90px',
          background: '#fff',
          borderRadius: 20,
          overflow: 'hidden',
          boxShadow: '0 1px 6px rgba(0,0,0,0.04)',
        }}>
          {/* Section header */}
          <div style={{ padding: '16px 16px 12px', borderBottom: '1px solid #F5F5F5', display: 'flex', alignItems: 'center', gap: 8 }}>
            <BsGeoAlt size={16} color="#983255" />
            <h2 style={{ fontSize: 14, fontWeight: 900, color: '#111', margin: 0 }}>Confirm your delivery address</h2>
          </div>

          {!isAuthenticated ? (
            <div style={{ padding: '20px 16px', textAlign: 'center' }}>
              <p style={{ fontSize: 13, color: '#9CA3AF', marginBottom: 14 }}>Login to select or save a delivery address</p>
              <button
                onClick={() => openLoginModal()}
                style={{ background: '#983255', color: '#fff', border: 'none', borderRadius: 12, padding: '10px 28px', fontSize: 14, fontWeight: 700, cursor: 'pointer' }}
              >
                Login to continue
              </button>
            </div>
          ) : (
            <div>
              {/* Selected address preview — shown when an address is selected */}
              {selectedAddressId && addresses.find(a => a.id === selectedAddressId) && (
                <div style={{
                  padding: '10px 16px',
                  background: '#FBF3F7',
                  borderBottom: '1px solid #F0E4EB',
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: 8,
                }}>
                  <span style={{ marginTop: 2, flexShrink: 0, display: 'flex' }}><BsGeoAlt size={14} color="#983255" /></span>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ fontSize: 12, fontWeight: 700, color: '#111', margin: 0 }}>
                      {addresses.find(a => a.id === selectedAddressId)?.name}
                    </p>
                    <p style={{ fontSize: 11, color: '#666', margin: '1px 0 0', lineHeight: 1.4 }}>
                      {addresses.find(a => a.id === selectedAddressId)?.addressLine},{' '}
                      {addresses.find(a => a.id === selectedAddressId)?.area},{' '}
                      {addresses.find(a => a.id === selectedAddressId)?.city} –{' '}
                      {addresses.find(a => a.id === selectedAddressId)?.pincode}
                    </p>
                  </div>
                  <button
                    onClick={() => setSelectedAddressId(null)}
                    style={{ background: 'none', border: 'none', color: '#983255', fontSize: 11, fontWeight: 700, cursor: 'pointer', flexShrink: 0 }}
                  >
                    Change
                  </button>
                </div>
              )}

              {/* Saved address list */}
              {addresses.map((addr) => (
                <button
                  key={addr.id}
                  onClick={() => setSelectedAddressId(addr.id)}
                  style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: 12,
                    padding: '14px 16px',
                    background: selectedAddressId === addr.id ? '#FBF3F7' : '#fff',
                    border: 'none',
                    borderBottom: '1px solid #F5F5F5',
                    cursor: 'pointer',
                    textAlign: 'left',
                  }}
                >
                  <div style={{ marginTop: 2, flexShrink: 0 }}>
                    {selectedAddressId === addr.id ? (
                      <BsCheckCircleFill size={18} color="#983255" />
                    ) : (
                      <div style={{ width: 18, height: 18, borderRadius: '50%', border: '2px solid #D0D0D0' }} />
                    )}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 3, flexWrap: 'wrap' }}>
                      <span style={{ fontSize: 13, fontWeight: 800, color: '#111' }}>{addr.name}</span>
                      <span style={{ fontSize: 9, fontWeight: 800, color: '#983255', background: '#FCF0F5', borderRadius: 4, padding: '2px 6px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                        {addr.type}
                      </span>
                      {addr.isDefault && (
                        <span style={{ fontSize: 9, fontWeight: 800, color: '#65a30d', background: '#f0fdf4', borderRadius: 4, padding: '2px 6px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                          Default
                        </span>
                      )}
                    </div>
                    <p style={{ fontSize: 12, color: '#555', margin: 0, lineHeight: 1.55 }}>
                      {addr.addressLine}, {addr.area}, {addr.city} – {addr.pincode}
                    </p>
                    <p style={{ fontSize: 12, color: '#999', margin: '2px 0 0' }}>{addr.phone}</p>
                  </div>
                </button>
              ))}

              {/* Add new address toggle */}
              {!showAddressForm ? (
                <button
                  onClick={() => { setShowAddressForm(true); setAddressError(null); }}
                  style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                    padding: '14px 16px',
                    background: '#fff',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: 13,
                    fontWeight: 700,
                    color: '#983255',
                  }}
                >
                  <BsPlusCircle size={16} />
                  Add new address
                </button>
              ) : (
                <div style={{ padding: '16px', borderTop: addresses.length > 0 ? '1px solid #F5F5F5' : 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {/* Type selector */}
                  <div style={{ display: 'flex', gap: 8 }}>
                    {['HOME', 'WORK', 'OTHER'].map((t) => (
                      <button
                        key={t}
                        type="button"
                        onClick={() => setNewAddress((p) => ({ ...p, type: t }))}
                        style={{
                          padding: '6px 16px', borderRadius: 8, border: 'none',
                          background: newAddress.type === t ? '#983255' : '#F5F5F5',
                          color: newAddress.type === t ? '#fff' : '#555',
                          fontSize: 12, fontWeight: 700, cursor: 'pointer',
                        }}
                      >
                        {t}
                      </button>
                    ))}
                  </div>

                  <input
                    className="addr-input"
                    placeholder="Full name *"
                    value={newAddress.name}
                    onChange={(e) => setNewAddress((p) => ({ ...p, name: e.target.value }))}
                  />
                  <input
                    className="addr-input"
                    placeholder="Phone number *"
                    value={newAddress.phone}
                    type="tel"
                    onChange={(e) => setNewAddress((p) => ({ ...p, phone: e.target.value }))}
                  />
                  <input
                    className="addr-input"
                    placeholder="Flat / House No. / Building *"
                    value={newAddress.addressLine}
                    onChange={(e) => setNewAddress((p) => ({ ...p, addressLine: e.target.value }))}
                  />
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                    <input
                      className="addr-input"
                      placeholder="Area / Locality *"
                      value={newAddress.area}
                      onChange={(e) => setNewAddress((p) => ({ ...p, area: e.target.value }))}
                    />
                    <input
                      className="addr-input"
                      placeholder="Pincode *"
                      value={newAddress.pincode}
                      onChange={(e) => setNewAddress((p) => ({ ...p, pincode: e.target.value }))}
                    />
                  </div>

                  {/* Error message */}
                  {addressError && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 12px', background: '#FEF2F2', borderRadius: 8 }}>
                      <BsExclamationCircleFill size={14} color="#EF4444" />
                      <span style={{ fontSize: 12, color: '#DC2626', fontWeight: 600 }}>{addressError}</span>
                    </div>
                  )}

                  <div style={{ display: 'flex', gap: 8, marginTop: 2 }}>
                    <button
                      type="button"
                      onClick={() => { setShowAddressForm(false); setAddressError(null); }}
                      style={{ flex: 1, padding: '12px 0', borderRadius: 10, border: '1.5px solid #E8E8E8', background: '#fff', fontSize: 13, fontWeight: 700, color: '#666', cursor: 'pointer' }}
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={handleSaveAddress}
                      disabled={savingAddress}
                      style={{
                        flex: 2, padding: '12px 0', borderRadius: 10, border: 'none',
                        background: savingAddress ? '#C4758A' : '#983255',
                        fontSize: 13, fontWeight: 800, color: '#fff', cursor: savingAddress ? 'not-allowed' : 'pointer',
                        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                        transition: 'background 0.2s',
                      }}
                    >
                      {savingAddress ? (
                        <>
                          <span style={{
                            width: 14, height: 14, border: '2px solid rgba(255,255,255,0.4)',
                            borderTopColor: '#fff', borderRadius: '50%',
                            animation: 'spin 0.7s linear infinite', display: 'inline-block',
                          }} />
                          Saving…
                        </>
                      ) : 'Save Address'}
                    </button>
                  </div>
                  <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
                </div>
              )}
            </div>
          )}
        </div>
      </main>

      {/* ── Checkout button — fixed full-width at bottom, no radius, no shadow ── */}
      <div style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 1001,
        paddingBottom: 'env(safe-area-inset-bottom)',
        background: '#983255',
      }}>
        <button
          onClick={handleCheckout}
          style={{
            display: 'flex',
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8,
            background: '#983255',
            color: '#fff',
            padding: '18px 24px',
            borderRadius: 0,
            fontSize: 16,
            fontWeight: 800,
            border: 'none',
            cursor: 'pointer',
            boxShadow: 'none',
          }}
        >
          Checkout Now ·&nbsp;
          <RollingPrice price={total} size={16} color="#fff" showSymbol />
        </button>
      </div>
    </>
  );
}
