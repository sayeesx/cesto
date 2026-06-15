'use client';

import { BsArrowLeft, BsShieldLock, BsPhone, BsCheckCircleFill } from 'react-icons/bs';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { useEffect } from 'react';

export default function SecurityPage() {
  const router = useRouter();
  const { isAuthenticated, loading, user } = useAuth();

  useEffect(() => {
    if (!loading && !isAuthenticated) router.push('/login?redirect=/account/security');
  }, [loading, isAuthenticated, router]);

  return (
    <main style={{ minHeight: '100dvh', background: '#FCF9FA', paddingBottom: 100 }}>
      <div style={{ background: '#fff', padding: '14px 20px', display: 'flex', alignItems: 'center', gap: 12, borderBottom: '1px solid #F0F0F0' }}>
        <button onClick={() => router.back()} style={{ width: 36, height: 36, borderRadius: 10, background: '#F5F5F5', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
          <BsArrowLeft size={17} color="#111" />
        </button>
        <h1 style={{ fontSize: 17, fontWeight: 900, color: '#111', margin: 0 }}>Security</h1>
      </div>
      <div style={{ maxWidth: 600, margin: '0 auto', padding: '16px' }}>
        <div style={{ background: '#fff', borderRadius: 16, padding: 16, boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 0', borderBottom: '1px solid #F5F5F5' }}>
            <div style={{ width: 40, height: 40, borderRadius: 10, background: '#F0FDF4', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <BsPhone size={18} color="#22C55E" />
            </div>
            <div style={{ flex: 1 }}>
              <p style={{ fontSize: 13, fontWeight: 800, color: '#111', margin: 0 }}>Phone Number</p>
              <p style={{ fontSize: 12, color: '#666', margin: '2px 0 0' }}>{(user as any)?.countryCode || '+91'} {(user as any)?.phone || 'Not set'}</p>
            </div>
            <BsCheckCircleFill size={16} color="#22C55E" />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 0' }}>
            <div style={{ width: 40, height: 40, borderRadius: 10, background: '#EFF6FF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <BsShieldLock size={18} color="#3B82F6" />
            </div>
            <div style={{ flex: 1 }}>
              <p style={{ fontSize: 13, fontWeight: 800, color: '#111', margin: 0 }}>Email</p>
              <p style={{ fontSize: 12, color: '#666', margin: '2px 0 0' }}>{user?.email || 'Not provided'}</p>
            </div>
            <BsCheckCircleFill size={16} color={user?.email ? '#22C55E' : '#D0D0D0'} />
          </div>
        </div>
      </div>
    </main>
  );
}
