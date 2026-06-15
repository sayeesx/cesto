'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { BsArrowLeft, BsBoxSeam, BsChevronRight } from 'react-icons/bs';
import { apiClient } from '@/lib/api-client';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

export default function OrdersPage() {
  const { isAuthenticated, loading: authLoading } = useAuth();
  const router = useRouter();
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push('/login?redirect=/orders');
      return;
    }
    if (isAuthenticated) {
      apiClient.getUserOrders?.()
        .then((data: any) => setOrders(Array.isArray(data) ? data : data?.orders || []))
        .catch(console.error)
        .finally(() => setLoading(false));
    }
  }, [isAuthenticated, authLoading, router]);

  const statusColors: Record<string, string> = {
    PLACED: '#F59E0B', PAYMENT_PENDING: '#9CA3AF', PAYMENT_CONFIRMED: '#3B82F6',
    ACCEPTED: '#8B5CF6', PREPARING: '#F97316', READY_FOR_PICKUP: '#06B6D4',
    OUT_FOR_DELIVERY: '#10B981', DELIVERED: '#22C55E', CANCELLED: '#EF4444', REFUNDED: '#6B7280',
  };

  return (
    <main style={{ minHeight: '100dvh', background: '#FCF9FA', paddingBottom: 100 }}>
      <div style={{ background: '#fff', padding: '14px 20px', display: 'flex', alignItems: 'center', gap: 12, borderBottom: '1px solid #F0F0F0' }}>
        <button onClick={() => router.back()} style={{ width: 36, height: 36, borderRadius: 10, background: '#F5F5F5', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
          <BsArrowLeft size={17} color="#111" />
        </button>
        <h1 style={{ fontSize: 17, fontWeight: 900, color: '#111', margin: 0 }}>My Orders</h1>
      </div>

      <div style={{ maxWidth: 600, margin: '0 auto', padding: '16px' }}>
        {loading ? (
          Array.from({ length: 3 }).map((_, i) => (
            <div key={i} style={{ background: '#fff', borderRadius: 16, padding: 16, marginBottom: 12, display: 'flex', gap: 12, alignItems: 'center' }}>
              <div style={{ width: 56, height: 56, borderRadius: 12, background: '#F0F0F0', flexShrink: 0 }} />
              <div style={{ flex: 1 }}>
                <div style={{ height: 12, width: '60%', borderRadius: 6, background: '#F0F0F0', marginBottom: 8 }} />
                <div style={{ height: 10, width: '40%', borderRadius: 6, background: '#F0F0F0' }} />
              </div>
            </div>
          ))
        ) : orders.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 20px' }}>
            <span style={{ display: 'flex', marginBottom: 16, justifyContent: 'center' }}><BsBoxSeam size={48} color="#D0D0D0" /></span>
            <h2 style={{ fontSize: 18, fontWeight: 900, color: '#111', marginBottom: 8 }}>No orders yet</h2>
            <p style={{ fontSize: 13, color: '#9CA3AF', marginBottom: 24 }}>Your order history will appear here</p>
            <Link href="/shop" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#b22153', color: '#fff', padding: '12px 28px', borderRadius: 50, fontSize: 14, fontWeight: 800, textDecoration: 'none' }}>
              Start Shopping <BsChevronRight size={12} />
            </Link>
          </div>
        ) : (
          orders.map((order) => (
            <Link key={order.id} href={`/track-order/${order.orderNumber}`} style={{ textDecoration: 'none' }}>
              <div style={{ background: '#fff', borderRadius: 16, padding: 16, marginBottom: 12, display: 'flex', gap: 12, alignItems: 'center', boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
                <div style={{ width: 56, height: 56, borderRadius: 12, background: '#F9F3F6', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <BsBoxSeam size={22} color="#b22153" />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                    <span style={{ fontSize: 13, fontWeight: 800, color: '#111' }}>#{order.orderNumber}</span>
                    <span style={{
                      fontSize: 10, fontWeight: 700, padding: '2px 8px', borderRadius: 6,
                      color: '#fff', background: statusColors[order.status] || '#9CA3AF',
                    }}>
                      {order.status?.replace(/_/g, ' ')}
                    </span>
                  </div>
                  <p style={{ fontSize: 12, color: '#666', margin: 0 }}>{order.recipientName} · ₹{order.totalAmount?.toLocaleString('en-IN')}</p>
                  <p style={{ fontSize: 11, color: '#999', margin: '2px 0 0' }}>
                    {new Date(order.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </p>
                </div>
                <BsChevronRight size={12} color="#D0D0D0" />
              </div>
            </Link>
          ))
        )}
      </div>
    </main>
  );
}
