'use client';

import React, { useState, useEffect } from 'react';
import { BsBox, BsCart, BsGraphUp, BsClockHistory, BsCheckCircle, BsTag } from 'react-icons/bs';
import { adminApiClient as apiClient } from '@/lib/api-client';
import { useAdminGuard } from '@/hooks/useAdminGuard';
import Link from 'next/link';
import { getAdminImage } from '@/lib/cloudinary';

export default function AdminDashboard() {
  useAdminGuard();
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiClient.getAdminDashboard()
      .then(setStats)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div style={{ background: '#F8F9FA', minHeight: '100dvh' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '16px 16px 24px' }}>
        <h1 style={{ fontSize: 20, fontWeight: 900, color: '#111', marginBottom: 20, textTransform: 'uppercase', letterSpacing: '-0.3px' }}>
          Dashboard
        </h1>

        {/* Quick Actions — 1 col mobile, 3 col desktop */}
        <div
          className="admin-grid-3"
          style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 10, marginBottom: 20 }}
        >
          {[
            { href: '/admin/products/new', label: 'Add Product', icon: BsBox, color: '#b22153' },
            { href: '/admin/categories', label: 'Manage Sections', icon: BsTag, color: '#1a3a3a' },
            { href: '/admin/orders', label: 'View Orders', icon: BsCart, color: '#2563EB' },
          ].map(({ href, label, icon: Icon, color }) => (
            <Link key={href} href={href} style={{
              display: 'flex', alignItems: 'center', gap: 10,
              background: 'white', borderRadius: 12,
              border: '1px solid #E5E7EB',
              padding: '14px 16px', textDecoration: 'none',
            }}>
              <div style={{ width: 36, height: 36, borderRadius: 10, background: color, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Icon size={16} color="white" />
              </div>
              <span style={{ fontSize: 12, fontWeight: 800, color: '#111', lineHeight: 1.2 }}>{label}</span>
            </Link>
          ))}
        </div>

        {/* Stats Grid — 2 col mobile, 4 col desktop */}
        <div
          className="admin-grid-4"
          style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 12, marginBottom: 20 }}
        >
          {loading ? (
            Array.from({ length: 4 }).map((_, i) => (
              <div key={i} style={{ background: 'white', borderRadius: 12, border: '1px solid #E5E7EB', padding: '16px', height: 72 }} />
            ))
          ) : (
            <>
              <StatCard title="Revenue" value={`₹${(stats?.totalRevenue || 0).toLocaleString('en-IN')}`} icon={<BsGraphUp />} color="#2563EB" />
              <StatCard title="Orders" value={stats?.totalOrders || 0} icon={<BsCart />} color="#F59E0B" />
              <StatCard title="Pending" value={stats?.pendingOrders || 0} icon={<BsClockHistory />} color="#EF4444" />
              <StatCard title="Products" value={stats?.totalProducts || 0} icon={<BsBox />} color="#10B981" />
            </>
          )}
        </div>

        {/* Bottom panels — 1 col mobile, 2 col desktop */}
        <div
          className="admin-grid-2"
          style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}
        >
          {/* Recent Orders */}
          <div style={{ background: 'white', borderRadius: 12, border: '1px solid #E5E7EB', overflow: 'hidden' }}>
            <div style={{ padding: '14px 16px', borderBottom: '1px solid #F3F4F6', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h2 style={{ fontSize: 13, fontWeight: 800, color: '#111' }}>Recent Orders</h2>
              <Link href="/admin/orders" style={{ fontSize: 12, fontWeight: 700, color: '#b22153', textDecoration: 'none' }}>View all</Link>
            </div>
            <div>
              {loading ? (
                <p style={{ padding: 20, textAlign: 'center', color: '#999', fontSize: 13 }}>Loading...</p>
              ) : stats?.recentOrders?.length > 0 ? (
                stats.recentOrders.map((order: any) => (
                  <div key={order.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 16px', borderBottom: '1px solid #F9FAFB' }}>
                    <div>
                      <p style={{ fontSize: 11, fontWeight: 800, color: '#6B7280' }}>{order.orderNumber}</p>
                      <p style={{ fontSize: 13, fontWeight: 700, color: '#111' }}>{order.recipientName}</p>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <p style={{ fontSize: 13, fontWeight: 800, color: '#111' }}>₹{order.totalAmount}</p>
                      <span style={{ fontSize: 10, fontWeight: 700, padding: '2px 6px', borderRadius: 4, background: '#F3F4F6', color: '#6B7280' }}>{order.status}</span>
                    </div>
                  </div>
                ))
              ) : (
                <p style={{ padding: '28px 16px', textAlign: 'center', color: '#9CA3AF', fontSize: 13, fontStyle: 'italic' }}>No recent orders</p>
              )}
            </div>
          </div>

          {/* Low Stock */}
          <div style={{ background: 'white', borderRadius: 12, border: '1px solid #E5E7EB', overflow: 'hidden' }}>
            <div style={{ padding: '14px 16px', borderBottom: '1px solid #F3F4F6', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h2 style={{ fontSize: 13, fontWeight: 800, color: '#111' }}>Inventory Alerts</h2>
              <Link href="/admin/products" style={{ fontSize: 12, fontWeight: 700, color: '#b22153', textDecoration: 'none' }}>Manage</Link>
            </div>
            <div>
              {loading ? (
                <p style={{ padding: 20, textAlign: 'center', color: '#999', fontSize: 13 }}>Loading...</p>
              ) : stats?.lowStockProducts?.length > 0 ? (
                stats.lowStockProducts.map((prod: any) => (
                  <div key={prod.id} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 16px', borderBottom: '1px solid #F9FAFB' }}>
                    <div style={{ width: 36, height: 36, borderRadius: 8, background: '#F3F4F6', overflow: 'hidden', flexShrink: 0 }}>
                      {prod.imageUrl && <img src={getAdminImage(prod.imageUrl) ?? prod.imageUrl} style={{ width: '100%', height: '100%', objectFit: 'contain' }} alt="" />}
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p style={{ fontSize: 12, fontWeight: 700, color: '#111', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{prod.name}</p>
                      <p style={{ fontSize: 11, fontWeight: 700, color: '#DC2626' }}>Stock: {prod.stock}</p>
                    </div>
                    <Link href={`/admin/products/${prod.id}/edit`} style={{ fontSize: 11, fontWeight: 700, color: '#b22153', textDecoration: 'none', flexShrink: 0 }}>Fix →</Link>
                  </div>
                ))
              ) : (
                <div style={{ padding: '28px 16px', textAlign: 'center' }}>
                  <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 8 }}>
                    <BsCheckCircle size={28} color="#10B981" />
                  </div>
                  <p style={{ color: '#9CA3AF', fontSize: 13 }}>All products well-stocked</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 640px) {
          .admin-grid-3 { grid-template-columns: repeat(3, 1fr) !important; gap: 8px !important; }
          .admin-grid-4 { grid-template-columns: repeat(2, 1fr) !important; }
          .admin-grid-2 { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}

function StatCard({ title, value, icon, color }: { title: string; value: any; icon: React.ReactNode; color: string }) {
  return (
    <div style={{ background: 'white', borderRadius: 12, border: '1px solid #E5E7EB', padding: '20px', display: 'flex', alignItems: 'center', gap: 14 }}>
      <div style={{ width: 44, height: 44, borderRadius: 10, background: color, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: 18, flexShrink: 0 }}>
        {icon}
      </div>
      <div>
        <p style={{ fontSize: 10, fontWeight: 800, color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 2 }}>{title}</p>
        <p style={{ fontSize: 20, fontWeight: 900, color: '#111', letterSpacing: '-0.5px' }}>{value}</p>
      </div>
    </div>
  );
}
