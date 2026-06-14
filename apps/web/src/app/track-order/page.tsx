'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { BsChevronLeft, BsSearch } from 'react-icons/bs';

export default function TrackOrderPage() {
  const [orderId, setOrderId] = useState('');
  const router = useRouter();

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    const id = orderId.trim();
    if (id) router.push(`/track-order/${id}`);
  };

  return (
    <main style={{ minHeight: '100vh', background: '#FFFFFF', padding: '0 0 100px' }}>
      <div style={{ padding: '16px', borderBottom: '1px solid #F5F5F5', display: 'flex', alignItems: 'center', gap: 12 }}>
        <Link href="/" style={{ color: '#111', display: 'flex' }}><BsChevronLeft size={20} /></Link>
        <h1 style={{ fontSize: 18, fontWeight: 900, color: '#111111' }}>Track Your Order</h1>
      </div>
      <div style={{ padding: '32px 16px', textAlign: 'center' }}>
        <div style={{ fontSize: 48, marginBottom: 16 }}>📦</div>
        <h2 style={{ fontSize: 20, fontWeight: 900, color: '#111111', marginBottom: 8 }}>Enter your Order ID</h2>
        <p style={{ fontSize: 13, color: '#5F5F5F', marginBottom: 32 }}>Find your order ID in your confirmation email or account page.</p>
        <form onSubmit={handleTrack} style={{ display: 'flex', gap: 8 }}>
          <input
            value={orderId}
            onChange={e => setOrderId(e.target.value)}
            placeholder="e.g. ORD-12345"
            style={{
              flex: 1,
              height: 48,
              padding: '0 16px',
              borderRadius: 12,
              border: '2px solid #E5E5E5',
              fontSize: 14,
              fontWeight: 600,
              outline: 'none',
            }}
          />
          <button
            type="submit"
            style={{
              height: 48,
              padding: '0 20px',
              background: '#b22153',
              color: 'white',
              borderRadius: 12,
              border: 'none',
              fontWeight: 800,
              fontSize: 14,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 6,
            }}
          >
            <BsSearch size={14} /> Track
          </button>
        </form>
      </div>
    </main>
  );
}
