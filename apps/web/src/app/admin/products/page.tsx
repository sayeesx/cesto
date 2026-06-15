'use client';
import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { BsPlus, BsSearch, BsPencil, BsTrash, BsChevronLeft, BsChevronRight } from 'react-icons/bs';
import { adminApiClient as apiClient } from '@/lib/api-client';
import { useAdminGuard } from '@/hooks/useAdminGuard';
import ProductCardSkeleton from '@/components/ui/ProductCardSkeleton';

export default function AdminProductsPage() {
  useAdminGuard();
  const [products, setProducts] = useState<any[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const data = await apiClient.adminListProducts(page, search);
      setProducts(data.products);
      setTotal(data.total);
      setTotalPages(data.totalPages);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, [page, search]);

  useEffect(() => { load(); }, [load]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1);
    setSearch(searchInput);
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Deactivate "${name}"? It will be hidden from the store.`)) return;
    setDeleting(id);
    try {
      await apiClient.adminDeleteProduct(id);
      load();
    } catch (e: any) {
      alert(e.message || 'Delete failed');
    } finally {
      setDeleting(null);
    }
  };

  return (
    <div style={{ background: '#F8F9FA', minHeight: '100dvh' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '16px' }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
          <div>
            <h1 style={{ fontSize: 20, fontWeight: 900, color: '#111' }}>Products</h1>
            <p style={{ fontSize: 12, color: '#666', marginTop: 2 }}>{total} total</p>
          </div>
          <Link href="/admin/products/new" style={{
            display: 'flex', alignItems: 'center', gap: 6,
            background: '#b22153', color: 'white',
            padding: '9px 16px', borderRadius: 10,
            fontWeight: 800, fontSize: 13, textDecoration: 'none',
          }}>
            <BsPlus size={18} /> Add
          </Link>
        </div>

        {/* Search */}
        <form onSubmit={handleSearch} style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
          <div style={{ flex: 1, position: 'relative' }}>
            <span style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#999', display: 'flex', alignItems: 'center', pointerEvents: 'none' }}>
              <BsSearch size={14} />
            </span>
            <input
              value={searchInput}
              onChange={e => setSearchInput(e.target.value)}
              placeholder="Search products..."
              style={{ width: '100%', height: 40, paddingLeft: 34, paddingRight: 12, border: '1.5px solid #E5E7EB', borderRadius: 8, fontSize: 13, outline: 'none', background: 'white', boxSizing: 'border-box' }}
            />
          </div>
          <button type="submit" style={{ height: 40, padding: '0 14px', background: '#1a3a3a', color: 'white', borderRadius: 8, border: 'none', fontWeight: 700, fontSize: 13, cursor: 'pointer' }}>
            Search
          </button>
        </form>

        {/* Desktop: table | Mobile: cards */}
        {loading ? (
          <div style={{ padding: 40, display: 'flex', justifyContent: 'center' }}>
            <ProductCardSkeleton />
          </div>
        ) : products.length === 0 ? (
          <div style={{ padding: 40, textAlign: 'center', color: '#999', fontSize: 14 }}>
            No products found. <Link href="/admin/products/new" style={{ color: '#b22153', fontWeight: 700 }}>Add one →</Link>
          </div>
        ) : (
          <>
            {/* Desktop table */}
            <div className="admin-table-wrap" style={{ background: 'white', borderRadius: 12, border: '1px solid #E5E7EB', overflow: 'hidden' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid #F3F4F6', background: '#FAFAFA' }}>
                    {['Product', 'Price', 'Stock', 'Categories', 'Status', 'Actions'].map(h => (
                      <th key={h} style={{ padding: '11px 14px', textAlign: 'left', fontSize: 11, fontWeight: 800, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {products.map((p) => (
                    <tr key={p.id} style={{ borderBottom: '1px solid #F9FAFB' }}>
                      <td style={{ padding: '11px 14px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                          <div style={{ width: 40, height: 40, borderRadius: 8, background: '#F3F4F6', overflow: 'hidden', flexShrink: 0 }}>
                            {p.imageUrl && <img src={p.imageUrl} alt={p.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />}
                          </div>
                          <div>
                            <p style={{ fontSize: 13, fontWeight: 700, color: '#111', marginBottom: 2 }}>{p.name}</p>
                            <p style={{ fontSize: 11, color: '#999' }}>{p.slug}</p>
                          </div>
                        </div>
                      </td>
                      <td style={{ padding: '11px 14px', fontSize: 13, fontWeight: 700, color: '#111' }}>
                        ₹{p.price?.toLocaleString('en-IN')}
                        {p.compareAtPrice && <span style={{ fontSize: 11, color: '#bbb', marginLeft: 4, textDecoration: 'line-through' }}>₹{p.compareAtPrice}</span>}
                      </td>
                      <td style={{ padding: '11px 14px' }}>
                        <span style={{ fontSize: 12, fontWeight: 700, padding: '3px 8px', borderRadius: 6, background: p.stock <= 5 ? '#FEF2F2' : '#F0FDF4', color: p.stock <= 5 ? '#DC2626' : '#16A34A' }}>{p.stock}</span>
                      </td>
                      <td style={{ padding: '11px 14px', fontSize: 12, color: '#555' }}>{p.categoryNames?.join(', ') || '—'}</td>
                      <td style={{ padding: '11px 14px' }}>
                        <span style={{ fontSize: 11, fontWeight: 700, padding: '3px 8px', borderRadius: 6, background: p.isActive ? '#ECFDF5' : '#F9FAFB', color: p.isActive ? '#059669' : '#9CA3AF' }}>{p.isActive ? 'Active' : 'Inactive'}</span>
                      </td>
                      <td style={{ padding: '11px 14px' }}>
                        <div style={{ display: 'flex', gap: 6 }}>
                          <Link href={`/admin/products/${p.id}/edit`} style={{ display: 'flex', alignItems: 'center', gap: 4, padding: '5px 10px', borderRadius: 7, background: '#EFF6FF', color: '#2563EB', fontSize: 12, fontWeight: 700, textDecoration: 'none' }}>
                            <BsPencil size={11} /> Edit
                          </Link>
                          <button onClick={() => handleDelete(p.id, p.name)} disabled={deleting === p.id} style={{ display: 'flex', alignItems: 'center', gap: 4, padding: '5px 10px', borderRadius: 7, background: '#FEF2F2', color: '#DC2626', fontSize: 12, fontWeight: 700, border: 'none', cursor: 'pointer' }}>
                            <BsTrash size={11} /> {deleting === p.id ? '...' : 'Del'}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile cards */}
            <div className="admin-card-list" style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {products.map((p) => (
                <div key={p.id} style={{ background: 'white', borderRadius: 12, border: '1px solid #E5E7EB', padding: 14 }}>
                  <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                    <div style={{ width: 52, height: 52, borderRadius: 10, background: '#F3F4F6', overflow: 'hidden', flexShrink: 0 }}>
                      {p.imageUrl && <img src={p.imageUrl} alt={p.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />}
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p style={{ fontSize: 14, fontWeight: 800, color: '#111', marginBottom: 2 }}>{p.name}</p>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                        <span style={{ fontSize: 13, fontWeight: 800, color: '#111' }}>₹{p.price?.toLocaleString('en-IN')}</span>
                        <span style={{ fontSize: 11, fontWeight: 700, padding: '2px 7px', borderRadius: 5, background: p.stock <= 5 ? '#FEF2F2' : '#F0FDF4', color: p.stock <= 5 ? '#DC2626' : '#16A34A' }}>
                          Stock: {p.stock}
                        </span>
                        <span style={{ fontSize: 11, fontWeight: 700, padding: '2px 7px', borderRadius: 5, background: p.isActive ? '#ECFDF5' : '#F9FAFB', color: p.isActive ? '#059669' : '#9CA3AF' }}>
                          {p.isActive ? 'Active' : 'Inactive'}
                        </span>
                      </div>
                      {p.categoryNames?.length > 0 && (
                        <p style={{ fontSize: 11, color: '#9CA3AF', marginTop: 4 }}>{p.categoryNames.join(', ')}</p>
                      )}
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
                    <Link href={`/admin/products/${p.id}/edit`} style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, padding: '9px 0', borderRadius: 9, background: '#EFF6FF', color: '#2563EB', fontSize: 13, fontWeight: 700, textDecoration: 'none' }}>
                      <BsPencil size={13} /> Edit
                    </Link>
                    <button onClick={() => handleDelete(p.id, p.name)} disabled={deleting === p.id} style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, padding: '9px 0', borderRadius: 9, background: '#FEF2F2', color: '#DC2626', fontSize: 13, fontWeight: 700, border: 'none', cursor: 'pointer' }}>
                      <BsTrash size={13} /> {deleting === p.id ? 'Deleting...' : 'Delete'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 12, marginTop: 20 }}>
            <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1} style={{ padding: '8px 14px', borderRadius: 8, border: '1.5px solid #E5E7EB', background: 'white', cursor: 'pointer', fontWeight: 700, fontSize: 13, color: page === 1 ? '#ccc' : '#111' }}>
              <BsChevronLeft size={12} />
            </button>
            <span style={{ fontSize: 13, color: '#555', fontWeight: 600 }}>Page {page} of {totalPages}</span>
            <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages} style={{ padding: '8px 14px', borderRadius: 8, border: '1.5px solid #E5E7EB', background: 'white', cursor: 'pointer', fontWeight: 700, fontSize: 13, color: page === totalPages ? '#ccc' : '#111' }}>
              <BsChevronRight size={12} />
            </button>
          </div>
        )}
      </div>

      <style>{`
        /* Desktop: show table, hide cards */
        .admin-table-wrap { display: block; }
        .admin-card-list  { display: none; }
        /* Mobile: hide table, show cards */
        @media (max-width: 640px) {
          .admin-table-wrap { display: none !important; }
          .admin-card-list  { display: flex !important; }
        }
      `}</style>
    </div>
  );
}
