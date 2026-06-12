'use client';

import Header from '@/components/layout/Header';
import Link from 'next/link';
import { DotLottiePlayer } from '@dotlottie/react-player';
import { BsArrowRight, BsBag, BsTrash, BsPlus, BsDash } from 'react-icons/bs';
import RollingPrice from '@/components/ui/RollingPrice';
import { apiClient } from '@/lib/api-client';
import { useAuth } from '@/context/AuthContext';
import { useState, useEffect } from 'react';
import Loader from '@/components/ui/Loader';

export default function CartPage() {
  const [cart, setCart] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const { isAuthenticated } = useAuth();

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

  useEffect(() => {
    loadCart();
  }, []);

  const handleUpdateQty = async (itemId: string, newQty: number) => {
    if (newQty < 1) return;
    try {
      await apiClient.updateCartItem(itemId, newQty);
      loadCart();
    } catch (err) {
      console.error('Update qty failed', err);
    }
  };

  const handleRemove = async (itemId: string) => {
    try {
      await apiClient.removeFromCart(itemId);
      loadCart();
    } catch (err) {
      console.error('Remove item failed', err);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60dvh]">
        <Loader color="#b22153" size={40} />
      </div>
    );
  }

  const cartItems = cart?.items || [];
  const total = cart?.totalPrice || 0;
  const isEmpty = cartItems.length === 0;

  return (
    <>
      <main style={{ minHeight: '100vh', background: '#FCF9FA', paddingBottom: 120 }}>
        
        {/* Simple Header */}
        <div style={{ background: '#FFFFFF', padding: '16px', borderBottom: '1px solid #F5F5F5', textAlign: 'center' }}>
          <h1 style={{ fontSize: 16, fontWeight: 900, color: '#111111' }}>My Shopping Bag</h1>
        </div>

        {isEmpty ? (
          <div style={{ textAlign: 'center', padding: '60px 20px', background: '#FFFFFF' }}>
            <div style={{ width: 280, height: 280, margin: '0 auto' }}>
              <DotLottiePlayer
                src="/lottie/empty.lottie"
                autoplay
                loop
              />
            </div>
            
            <h1 style={{ fontSize: 24, fontWeight: 900, color: '#111111', marginBottom: 12, marginTop: -20, letterSpacing: '-0.5px' }}>
              Your cart is empty
            </h1>
            
            <p style={{ fontSize: 14, color: '#5F5F5F', lineHeight: 1.6, marginBottom: 32, fontWeight: 500, maxWidth: 300, margin: '0 auto 32px' }}>
              Looks like you haven&apos;t added any gifts yet. Let&apos;s find something special!
            </p>
            
            <Link href="/shop" style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 10,
              background: '#b22153',
              color: '#FFFFFF',
              padding: '14px 28px',
              borderRadius: 14,
              fontSize: 14,
              fontWeight: 800,
              textDecoration: 'none',
              boxShadow: '0 8px 24px rgba(178, 33, 83, 0.2)'
            }}>
              Go Shopping <BsArrowRight />
            </Link>
          </div>
        ) : (
          <div style={{ padding: '16px', maxWidth: 600, margin: '0 auto' }}>
            
            {/* Cart Items */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 24 }}>
              {cartItems.map((item: any) => (
                <div key={item.id} style={{ 
                  background: '#FFFFFF', borderRadius: 16, padding: 12,
                  display: 'flex', gap: 12, border: '1px solid #F0F0F0'
                }}>
                  <div style={{ width: 80, height: 80, borderRadius: 12, background: '#F5F5F5', overflow: 'hidden' }}>
                    <img src={item.product?.imageUrl || '/placeholder.png'} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <h3 style={{ fontSize: 13, fontWeight: 800, color: '#111111', maxWidth: '80%' }}>{item.product?.name}</h3>
                        <button onClick={() => handleRemove(item.id)} style={{ color: '#BEB4C4' }}><BsTrash size={14} /></button>
                      </div>
                      <div style={{ fontSize: 14, fontWeight: 900, color: '#111111', marginTop: 4 }}>₹{item.price}</div>
                    </div>
                    
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <div style={{ 
                        display: 'flex', alignItems: 'center', background: '#F5F5F5', 
                        borderRadius: 8, padding: '2px'
                      }}>
                        <button onClick={() => handleUpdateQty(item.id, item.quantity - 1)} style={{ width: 24, height: 24, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><BsDash /></button>
                        <span style={{ padding: '0 8px', fontSize: 12, fontWeight: 800 }}>{item.quantity}</span>
                        <button onClick={() => handleUpdateQty(item.id, item.quantity + 1)} style={{ width: 24, height: 24, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><BsPlus /></button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Bill Details */}
            <div style={{ background: '#FFFFFF', borderRadius: 20, padding: 20, border: '1px solid #F0F0F0' }}>
              <h4 style={{ fontSize: 11, fontWeight: 900, color: '#A9A0AE', textTransform: 'uppercase', marginBottom: 16, letterSpacing: '0.5px' }}>Bill Details</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, fontWeight: 600, color: '#5F5F5F' }}>
                  <span>Item Total</span>
                  <span>₹{total}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, fontWeight: 600, color: '#5F5F5F' }}>
                  <span>Delivery Fee</span>
                  <span style={{ color: '#65a30d' }}>FREE</span>
                </div>
                <div style={{ height: 1, background: '#F5F5F5', margin: '4px 0' }} />
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <span style={{ fontSize: 15, fontWeight: 900, color: '#111111' }}>To Pay</span>
                  </div>
                  <RollingPrice price={total} size={20} color="#b22153" />
                </div>
              </div>
            </div>

            {/* Checkout Button */}
            <div style={{ 
              position: 'fixed', bottom: 'calc(64px + env(safe-area-inset-bottom))', left: 0, right: 0, 
              background: '#FFFFFF', padding: '16px', borderTop: '1px solid #F5F5F5', zIndex: 100
            }}>
              <Link href="/checkout" style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                background: '#111111', color: '#FFFFFF', padding: '16px 20px', borderRadius: 16,
                textDecoration: 'none', transition: 'all 0.2s ease'
              }}>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <RollingPrice price={total} size={16} color="#FFFFFF" />
                  <span style={{ fontSize: 9, fontWeight: 700, opacity: 0.7, textTransform: 'uppercase' }}>{cartItems.length} Items in Bag</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 14, fontWeight: 900 }}>
                  Checkout <BsArrowRight />
                </div>
              </Link>
            </div>

          </div>
        )}
      </main>
    </>
  );
}
