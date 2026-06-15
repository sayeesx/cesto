'use client';

import { BsArrowLeft, BsCreditCard, BsShieldFillCheck } from 'react-icons/bs';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { useEffect } from 'react';

export default function PaymentsPage() {
  const router = useRouter();
  const { isAuthenticated, loading } = useAuth();

  useEffect(() => {
    if (!loading && !isAuthenticated) router.push('/login?redirect=/account/payments');
  }, [loading, isAuthenticated, router]);

  return (
    <main style={{ minHeight: '100dvh', background: '#FCF9FA', paddingBottom: 100 }}>
      <div style={{ background: '#fff', padding: '14px 20px', display: 'flex', alignItems: 'center', gap: 12, borderBottom: '1px solid #F0F0F0' }}>
        <button onClick={() => router.back()} style={{ width: 36, height: 36, borderRadius: 10, background: '#F5F5F5', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
          <BsArrowLeft size={17} color="#111" />
        </button>
        <h1 style={{ fontSize: 17, fontWeight: 900, color: '#111', margin: 0 }}>Payments</h1>
      </div>
      <div style={{ maxWidth: 600, margin: '0 auto', padding: '60px 20px', textAlign: 'center' }}>
        <span style={{ display: 'flex', marginBottom: 16, justifyContent: 'center' }}><BsCreditCard size={48} color="#D0D0D0" /></span>
        <h2 style={{ fontSize: 18, fontWeight: 900, color: '#111', marginBottom: 8 }}>No saved cards</h2>
        <p style={{ fontSize: 13, color: '#9CA3AF', marginBottom: 24 }}>Pay securely via Razorpay at checkout</p>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, color: '#10B981', fontSize: 12, fontWeight: 700 }}>
          <BsShieldFillCheck size={16} /> Secure payments
        </div>
      </div>
    </main>
  );
}
