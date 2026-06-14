'use client';
import { useState, useEffect, useCallback } from 'react';
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';
import { adminApiClient as apiClient } from '@/lib/api-client';
import { useAdminGuard } from '@/hooks/useAdminGuard';
import AdminLoader from '@/components/admin/AdminLoader';

const STATUSES = ['', 'PAYMENT_PENDING', 'PAYMENT_CONFIRMED', 'ACCEPTED', 'PREPARING', 'READY_FOR_PICKUP', 'OUT_FOR_DELIVERY', 'DELIVERED', 'CANCELLED'];

const STATUS_COLORS: Record<string, { bg: string; color: string }> = {
  PAYMENT_PENDING:    { bg: '#FEF9C3', color: '#854D0E' },
  PAYMENT_CONFIRMED:  { bg: '#ECFDF5', color: '#065F46' },
  ACCEPTED:           { bg: '#EFF6FF', color: '#1D4ED8' },
  PREPARING:          { bg: '#F3E8FF', color: '#6B21A8' },
  READY_FOR_PICKUP:   { bg: '#CFFAFE', color: '#0E7490' },
  OUT_FOR_DELIVERY:   { bg: '#FFF7ED', color: '#C2410C' },
  DELIVERED:          { bg: '#ECFDF5', color: '#14532D' },
  CANCELLED:          { bg: '#FEF2F2', color: '#991B1B' },
};

export default function AdminOrdersPage() {
  const { loading: guardLoading } = useAdminGuard();
  const [orders, setOrders] = useState<any[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [statusFilter, setStatusFilter] = useState('');
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const data: any = await apiClient.adminGetOrders(statusFilter || undefined, page);
      setOrders(data.orders || []);
      setTotal(data.total || 0);
      setTotalPages(data.totalPages || 1);
    } catch (e) { console.error(e); }
    finally { setLoading(false); }
  }, [page, statusFilter]);

  useEffect(() => { if (!guardLoading) load(); }, [load, guardLoading]);

  const handleStatusUpdate = async (orderId: string, newStatus: string) => {
    setUpdatingId(orderId);
    try {
      await apiClient.adminUpdateOrderStatus(orderId, newStatus);
      load();
    } catch (err: any) {
      alert(err.message || 'Update failed');
    } finally {
      setUpdatingId(null);
    }
  };

  if (guardLoading) return <AdminLoader />;

  return (
    <div style={{ background: '#F8F9FA', minHeight: '100dvh' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
          <div>
            <h1 style={{ fontSize: 20, fontWeight: 900, color: '#111' }}>Orders</h1>
            <p style={{ fontSize: 12, color: '#666', marginTop: 2 }}>{total} total</p>
          </div>
        </div>

        {/* Status filter — horizontal scroll on mobile */}
        <div className="no-scrollbar" style={{ display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 4, marginBottom: 16 }}>
          {STATUSES.map(s => (
            <button key={s || 'ALL'} onClick={() => { setStatusFilter(s); setPage(1); }} style={{
              padding: '6px 14px', borderRadius: 20, flexShrink: 0,
              border: `1.5px solid ${statusFilter === s ? '#b22153' : '#E5E7EB'}`,
              background: statusFilter === s ? '#b22153' : 'white',
              color: statusFilter === s ? 'white' : '#374151',
              fontSize: 12, fontWeight: 700, cursor: 'pointer', whiteSpace: 'nowrap',
            }}>
              {s || 'All'}
            </button>
          ))}
        </div>

        {loading ? (
          <div style={{ padding: 40, textAlign: 'center', color: '#999' }}>Loading...</div>
        ) : orders.length === 0 ? (
          <div style={{ padding: 40, textAlign: 'center', color: '#999', fontSize: 14 }}>No orders found.</div>
        ) : (
          <>
            {/* Desktop table */}
            <div className="admin-table-wrap" style={{ background: 'white', borderRadius: 12, border: '1px solid #E5E7EB', overflow: 'hidden' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid #F3F4F6', background: '#FAFAFA' }}>
                    {['Order', 'Customer', 'Items', 'Amount', 'Delivery', 'Status', 'Update'].map(h => (
                      <th key={h} style={{ padding: '11px 14px', textAlign: 'left', fontSize: 11, fontWeight: 800, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => {
                    const sc = STATUS_COLORS[order.status] || { bg: '#F3F4F6', color: '#6B7280' };
                    return (
                      <tr key={order.id} style={{ borderBottom: '1px solid #F9FAFB' }}>
                        <td style={{ padding: '11px 14px' }}>
                          <p style={{ fontSize: 12, fontWeight: 800, color: '#111' }}>{order.orderNumber}</p>
                          <p style={{ fontSize: 11, color: '#9CA3AF' }}>{new Date(order.createdAt).toLocaleDateString('en-IN')}</p>
                        </td>
                        <td style={{ padding: '11px 14px' }}>
                          <p style={{ fontSize: 13, fontWeight: 700, color: '#111' }}>{order.recipientName}</p>
                          <p style={{ fontSize: 11, color: '#9CA3AF' }}>{order.user?.email || order.user?.phone || '—'}</p>
                        </td>
                        <td style={{ padding: '11px 14px', fontSize: 12, color: '#555' }}>{order.items?.length || 0}</td>
                        <td style={{ padding: '11px 14px', fontSize: 13, fontWeight: 700, color: '#111' }}>₹{order.finalAmount?.toLocaleString('en-IN')}</td>
                        <td style={{ padding: '11px 14px', fontSize: 12, color: '#555' }}>{new Date(order.deliveryDate).toLocaleDateString('en-IN')}</td>
                        <td style={{ padding: '11px 14px' }}>
                          <span style={{ fontSize: 11, fontWeight: 700, padding: '3px 8px', borderRadius: 6, background: sc.bg, color: sc.color }}>{order.status}</span>
                        </td>
                        <td style={{ padding: '11px 14px' }}>
                          <select value={order.status} onChange={e => handleStatusUpdate(order.id, e.target.value)} disabled={updatingId === order.id}
                            style={{ height: 32, padding: '0 8px', borderRadius: 7, border: '1.5px solid #E5E7EB', fontSize: 12, fontWeight: 600, background: 'white', cursor: 'pointer', outline: 'none' }}>
                            {STATUSES.filter(Boolean).map(s => <option key={s} value={s}>{s}</option>)}
                          </select>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Mobile cards */}
            <div className="admin-card-list" style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {orders.map((order) => {
                const sc = STATUS_COLORS[order.status] || { bg: '#F3F4F6', color: '#6B7280' };
                return (
                  <div key={order.id} style={{ background: 'white', borderRadius: 12, border: '1px solid #E5E7EB', padding: 14 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                      <div>
                        <p style={{ fontSize: 13, fontWeight: 900, color: '#111' }}>{order.orderNumber}</p>
                        <p style={{ fontSize: 11, color: '#9CA3AF' }}>{new Date(order.createdAt).toLocaleDateString('en-IN')}</p>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <p style={{ fontSize: 14, fontWeight: 900, color: '#111' }}>₹{order.finalAmount?.toLocaleString('en-IN')}</p>
                        <span style={{ fontSize: 10, fontWeight: 700, padding: '2px 8px', borderRadius: 5, background: sc.bg, color: sc.color }}>{order.status}</span>
                      </div>
                    </div>
                    <p style={{ fontSize: 13, fontWeight: 700, color: '#374151', marginBottom: 4 }}>{order.recipientName}</p>
                    <p style={{ fontSize: 11, color: '#9CA3AF', marginBottom: 12 }}>
                      {order.items?.length || 0} item{order.items?.length !== 1 ? 's' : ''} · Delivery: {new Date(order.deliveryDate).toLocaleDateString('en-IN')}
                    </p>
                    <select value={order.status} onChange={e => handleStatusUpdate(order.id, e.target.value)} disabled={updatingId === order.id}
                      style={{ width: '100%', height: 40, padding: '0 12px', borderRadius: 9, border: '1.5px solid #E5E7EB', fontSize: 13, fontWeight: 600, background: 'white', cursor: 'pointer', outline: 'none' }}>
                      {STATUSES.filter(Boolean).map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                );
              })}
            </div>
          </>
        )}

        {totalPages > 1 && (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 12, marginTop: 20 }}>
            <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1} style={{ padding: '8px 14px', borderRadius: 8, border: '1.5px solid #E5E7EB', background: 'white', cursor: 'pointer', fontWeight: 700, fontSize: 13 }}>
              <BsChevronLeft size={12} />
            </button>
            <span style={{ fontSize: 13, color: '#555' }}>Page {page} of {totalPages}</span>
            <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages} style={{ padding: '8px 14px', borderRadius: 8, border: '1.5px solid #E5E7EB', background: 'white', cursor: 'pointer', fontWeight: 700, fontSize: 13 }}>
              <BsChevronRight size={12} />
            </button>
          </div>
        )}
      </div>

      <style>{`
        .admin-table-wrap { display: block; }
        .admin-card-list  { display: none; }
        @media (max-width: 640px) {
          .admin-table-wrap { display: none !important; }
          .admin-card-list  { display: flex !important; }
        }
      `}</style>
    </div>
  );
}
