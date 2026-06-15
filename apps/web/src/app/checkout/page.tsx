'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { BsArrowLeft, BsCalendar, BsChatDots, BsGeoAlt, BsPerson, BsShieldFillCheck } from 'react-icons/bs';
import { apiClient } from '@/lib/api-client';
import { useAuth } from '@/context/AuthContext';
import ProductCardSkeleton from '@/components/ui/ProductCardSkeleton';
import RollingPrice from '@/components/ui/RollingPrice';

export default function CheckoutPage() {
  const router = useRouter();
  const { user, isAuthenticated, loading: authLoading } = useAuth();
  
  const [cart, setCart] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  // Form State
  const [recipientName, setRecipientName] = useState('');
  const [recipientPhone, setRecipientPhone] = useState('');
  const [deliveryDate, setDeliveryDate] = useState('');
  const [giftMessage, setGiftMessage] = useState('');
  const [addressLine, setAddressLine] = useState('');
  const [area, setArea] = useState('');
  const [city, setCity] = useState('Kochi');
  const [pincode, setPincode] = useState('');

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push('/login?redirect=/checkout');
      return;
    }

    async function init() {
      try {
        const cartData = await apiClient.getCart();
        if (!cartData || cartData.items.length === 0) {
          router.push('/cart');
          return;
        }
        setCart(cartData);
        if (user) {
          setRecipientName(user.name || '');
        }
      } catch (err) {
        console.error('Checkout init failed', err);
      } finally {
        setLoading(false);
      }
    }

    if (isAuthenticated) init();
  }, [isAuthenticated, authLoading, user, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const order = await apiClient.createOrder({
        cartId: cart.id,
        recipientName,
        recipientPhone,
        deliveryDate: new Date(deliveryDate),
        giftMessage,
        deliveryAddress: {
          addressLine,
          area,
          city,
          pincode,
          state: 'Kerala',
          country: 'India',
        },
      });

      router.push(`/track-order/${order.orderNumber}?success=true`);
    } catch (err: any) {
      alert(err.message || 'Failed to place order. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading || authLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <ProductCardSkeleton />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FDFCFD] pb-32">
      {/* Header */}
      <div className="bg-white px-4 py-4 flex items-center gap-4 border-b border-gray-100 sticky top-0 z-50">
        <button onClick={() => router.back()} className="p-1"><BsArrowLeft size={20} /></button>
        <h1 className="text-lg font-bold text-gray-900">Checkout</h1>
      </div>

      <form onSubmit={handleSubmit} className="max-w-xl mx-auto px-4 py-6 space-y-6">
        
        {/* Recipient Details */}
        <section className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 italic-shadow">
          <div className="flex items-center gap-2 mb-4 text-[#b22153]">
            <BsPerson size={18} />
            <h2 className="font-bold text-gray-900">Recipient Details</h2>
          </div>
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Recipient's Name"
              value={recipientName}
              onChange={(e) => setRecipientName(e.target.value)}
              className="w-full px-4 py-3 bg-gray-50 rounded-xl border-none focus:ring-2 focus:ring-[#b22153]/20 font-medium"
              required
            />
            <input
              type="tel"
              placeholder="Recipient's Phone (+91)"
              value={recipientPhone}
              onChange={(e) => setRecipientPhone(e.target.value)}
              className="w-full px-4 py-3 bg-gray-50 rounded-xl border-none focus:ring-2 focus:ring-[#b22153]/20 font-medium"
              required
            />
          </div>
        </section>

        {/* Delivery Slot */}
        <section className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
          <div className="flex items-center gap-2 mb-4 text-[#b22153]">
            <BsCalendar size={18} />
            <h2 className="font-bold text-gray-900">Delivery Date</h2>
          </div>
          <input
            type="date"
            value={deliveryDate}
            min={new Date().toISOString().split('T')[0]}
            onChange={(e) => setDeliveryDate(e.target.value)}
            className="w-full px-4 py-3 bg-gray-50 rounded-xl border-none focus:ring-2 focus:ring-[#b22153]/20 font-medium"
            required
          />
        </section>

        {/* Address */}
        <section className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
          <div className="flex items-center gap-2 mb-4 text-[#b22153]">
            <BsGeoAlt size={18} />
            <h2 className="font-bold text-gray-900">Delivery Address</h2>
          </div>
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Flat / House No. / Building"
              value={addressLine}
              onChange={(e) => setAddressLine(e.target.value)}
              className="w-full px-4 py-3 bg-gray-50 rounded-xl border-none focus:ring-2 focus:ring-[#b22153]/20 font-medium"
              required
            />
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Area / Locality"
                value={area}
                onChange={(e) => setArea(e.target.value)}
                className="w-full px-4 py-3 bg-gray-50 rounded-xl border-none focus:ring-2 focus:ring-[#b22153]/20 font-medium"
                required
              />
              <input
                type="text"
                placeholder="Pincode"
                value={pincode}
                onChange={(e) => setPincode(e.target.value)}
                className="w-full px-4 py-3 bg-gray-50 rounded-xl border-none focus:ring-2 focus:ring-[#b22153]/20 font-medium"
                required
              />
            </div>
          </div>
        </section>

        {/* Gift Message */}
        <section className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
          <div className="flex items-center gap-2 mb-4 text-[#b22153]">
            <BsChatDots size={18} />
            <h2 className="font-bold text-gray-900">Gift Message</h2>
          </div>
          <textarea
            placeholder="Write a personal note (optional)"
            rows={3}
            value={giftMessage}
            onChange={(e) => setGiftMessage(e.target.value)}
            className="w-full px-4 py-3 bg-gray-50 rounded-xl border-none focus:ring-2 focus:ring-[#b22153]/20 font-medium resize-none"
          />
        </section>

        {/* Order Summary */}
        <section className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
          <h2 className="font-bold text-gray-900 mb-4">Order Summary</h2>
          <div className="space-y-3">
            {cart.items.map((item: any) => (
              <div key={item.id} className="flex justify-between items-center text-sm font-medium">
                <span className="text-gray-600 truncate max-w-[70%]">{item.product.name} x {item.quantity}</span>
                <span className="text-gray-900">₹{item.price * item.quantity}</span>
              </div>
            ))}
            <div className="h-px bg-gray-50 my-2" />
            <div className="flex justify-between items-center">
              <span className="font-bold text-gray-900">Total Amount</span>
              <span className="text-xl font-black text-[#b22153]">₹{cart.totalPrice}</span>
            </div>
          </div>
        </section>

        {/* Badges */}
        <div className="flex items-center justify-center gap-6 py-4 opacity-40 grayscale group-hover:grayscale-0 transition-all">
          <div className="flex flex-col items-center gap-1">
            <BsShieldFillCheck size={20} />
            <span className="text-[10px] font-bold uppercase tracking-widest">Secure</span>
          </div>
        </div>

      </form>

      {/* Sticky Bottom Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white p-4 border-t border-gray-100 shadow-2xl z-50">
        <div className="max-w-xl mx-auto flex items-center justify-between gap-4">
          <div className="flex flex-col">
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Amount to Pay</span>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-black text-gray-900">₹</span>
              <RollingPrice price={cart.totalPrice} size={24} color="#111111" />
            </div>
          </div>
          <button
            onClick={handleSubmit}
            disabled={submitting}
            className="flex-1 bg-[#b22153] text-white py-4 rounded-2xl font-black text-lg shadow-lg shadow-[#b22153]/20 active:scale-95 transition-all disabled:opacity-50"
          >
            {submitting ? 'Placing Order...' : 'Confirm & Pay'}
          </button>
        </div>
      </div>
    </div>
  );
}
