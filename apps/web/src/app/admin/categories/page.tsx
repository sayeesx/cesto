'use client';
import { useState, useEffect, useCallback } from 'react';
import { BsPlus, BsPencil, BsTrash, BsCheck, BsX } from 'react-icons/bs';
import { adminApiClient as apiClient } from '@/lib/api-client';
import { useAdminGuard } from '@/hooks/useAdminGuard';
import AdminLoader from '@/components/admin/AdminLoader';
import { uploadToCloudinary } from '@/lib/cloudinary-upload';

function slugify(name: string) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

interface Category { id: string; name: string; slug: string; imageUrl?: string; isActive: boolean; _count: { products: number }; }
interface Occasion { id: string; name: string; slug: string; imageUrl?: string; isActive: boolean; _count: { products: number }; }

export default function AdminCategoriesPage() {
  const { loading: guardLoading } = useAdminGuard();
  const [categories, setCategories] = useState<Category[]>([]);
  const [occasions, setOccasions] = useState<Occasion[]>([]);
  const [loading, setLoading] = useState(true);

  // New category form state
  const [newCat, setNewCat] = useState({ name: '', slug: '', imageUrl: '', uploading: false });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  // Inline edit state
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState('');

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const data: any = await apiClient.adminListCategories();
      setCategories(data.categories || []);
      setOccasions(data.occasions || []);
    } catch (e) { console.error(e); }
    finally { setLoading(false); }
  }, []);

  useEffect(() => { if (!guardLoading) load(); }, [guardLoading, load]);

  const handleCatNameChange = (name: string) => {
    setNewCat(f => ({ ...f, name, slug: slugify(name) }));
  };

  const handleCatImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setNewCat(f => ({ ...f, uploading: true }));
    try {
      const { url } = await uploadToCloudinary(file, 'cesto/categories');
      setNewCat(f => ({ ...f, imageUrl: url, uploading: false }));
    } catch {
      setNewCat(f => ({ ...f, uploading: false }));
    }
  };

  const handleCreateCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCat.name || !newCat.slug) return;
    setSaving(true); setError('');
    try {
      await apiClient.adminCreateCategory({ name: newCat.name, slug: newCat.slug, imageUrl: newCat.imageUrl || undefined });
      setNewCat({ name: '', slug: '', imageUrl: '', uploading: false });
      load();
    } catch (err: any) {
      setError(err.message || 'Failed to create category');
    } finally { setSaving(false); }
  };

  const handleSaveEdit = async (id: string) => {
    if (!editName.trim()) return;
    try {
      await apiClient.adminUpdateCategory(id, { name: editName });
      setEditingId(null);
      load();
    } catch (err: any) {
      alert(err.message || 'Update failed');
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Deactivate category "${name}"?`)) return;
    try {
      await apiClient.adminDeleteCategory(id);
      load();
    } catch (err: any) {
      alert(err.message || 'Delete failed');
    }
  };

  if (guardLoading) return <AdminLoader />;

  const inputStyle: React.CSSProperties = {
    height: 38, padding: '0 12px', border: '1.5px solid #E5E7EB',
    borderRadius: 8, fontSize: 13, outline: 'none', background: 'white',
  };

  return (
    <div style={{ minHeight: '100dvh', background: '#F8F9FA' }}>
      <div style={{ maxWidth: 900, margin: '0 auto', padding: '16px' }}>
        <h1 style={{ fontSize: 20, fontWeight: 900, color: '#111', marginBottom: 6 }}>Sections & Categories</h1>
        <p style={{ fontSize: 13, color: '#6B7280', marginBottom: 20 }}>
          Assign products to categories when creating/editing a product.
        </p>

        {/* Two column on desktop, single on mobile */}
        <div className="admin-cat-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>

          {/* ── Categories ── */}
          <div>
            <div style={{ background: 'white', borderRadius: 12, border: '1px solid #E5E7EB', overflow: 'hidden' }}>
              <div style={{ padding: '16px 20px', borderBottom: '1px solid #F3F4F6', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h2 style={{ fontSize: 14, fontWeight: 800, color: '#111' }}>Categories</h2>
                <span style={{ fontSize: 12, color: '#6B7280', fontWeight: 600 }}>{categories.length} total</span>
              </div>

              {/* New category form */}
              <form onSubmit={handleCreateCategory} style={{ padding: '16px 20px', borderBottom: '1px solid #F3F4F6', background: '#FAFAFA' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  <input
                    value={newCat.name}
                    onChange={e => handleCatNameChange(e.target.value)}
                    placeholder="Category name (e.g. Flowers)"
                    style={{ ...inputStyle, width: '100%' }}
                    required
                  />
                  <input
                    value={newCat.slug}
                    onChange={e => setNewCat(f => ({ ...f, slug: e.target.value }))}
                    placeholder="slug (e.g. flowers)"
                    style={{ ...inputStyle, width: '100%' }}
                    required
                  />
                  <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                    <label style={{
                      flex: 1, height: 38, display: 'flex', alignItems: 'center', justifyContent: 'center',
                      border: '1.5px dashed #D1D5DB', borderRadius: 8, cursor: 'pointer',
                      fontSize: 12, color: newCat.imageUrl ? '#059669' : '#9CA3AF', fontWeight: 600, gap: 6,
                    }}>
                      {newCat.uploading ? 'Uploading...' : newCat.imageUrl ? '✓ Image uploaded' : '+ Upload image'}
                      <input type="file" accept="image/*" style={{ display: 'none' }} onChange={handleCatImageUpload} />
                    </label>
                    <button type="submit" disabled={saving} style={{
                      height: 38, padding: '0 16px', background: '#b22153', color: 'white',
                      borderRadius: 8, border: 'none', cursor: 'pointer', fontWeight: 800, fontSize: 13,
                      display: 'flex', alignItems: 'center', gap: 6,
                    }}>
                      <BsPlus size={16} /> Add
                    </button>
                  </div>
                  {error && <p style={{ fontSize: 12, color: '#DC2626', fontWeight: 600 }}>{error}</p>}
                </div>
              </form>

              {/* Category list */}
              <div>
                {loading ? (
                  <p style={{ padding: '20px', textAlign: 'center', color: '#999', fontSize: 13 }}>Loading...</p>
                ) : categories.length === 0 ? (
                  <p style={{ padding: '20px', textAlign: 'center', color: '#999', fontSize: 13 }}>No categories yet.</p>
                ) : categories.map((cat) => (
                  <div key={cat.id} style={{ display: 'flex', alignItems: 'center', padding: '10px 20px', borderBottom: '1px solid #F9FAFB', gap: 10 }}>
                    {cat.imageUrl && (
                      <img src={cat.imageUrl} alt={cat.name} style={{ width: 36, height: 36, objectFit: 'cover', borderRadius: 6, flexShrink: 0 }} />
                    )}
                    <div style={{ flex: 1, minWidth: 0 }}>
                      {editingId === cat.id ? (
                        <div style={{ display: 'flex', gap: 6 }}>
                          <input
                            value={editName}
                            onChange={e => setEditName(e.target.value)}
                            style={{ ...inputStyle, height: 32, flex: 1 }}
                            autoFocus
                          />
                          <button type="button" onClick={() => handleSaveEdit(cat.id)} style={{ height: 32, padding: '0 10px', background: '#059669', color: 'white', border: 'none', borderRadius: 6, cursor: 'pointer' }}>
                            <BsCheck size={14} />
                          </button>
                          <button type="button" onClick={() => setEditingId(null)} style={{ height: 32, padding: '0 10px', background: '#F3F4F6', border: 'none', borderRadius: 6, cursor: 'pointer' }}>
                            <BsX size={14} />
                          </button>
                        </div>
                      ) : (
                        <>
                          <p style={{ fontSize: 13, fontWeight: 700, color: cat.isActive ? '#111' : '#9CA3AF' }}>{cat.name}</p>
                          <p style={{ fontSize: 11, color: '#9CA3AF' }}>{cat.slug} · {cat._count.products} products</p>
                        </>
                      )}
                    </div>
                    {editingId !== cat.id && (
                      <div style={{ display: 'flex', gap: 4, flexShrink: 0 }}>
                        <button type="button" onClick={() => { setEditingId(cat.id); setEditName(cat.name); }}
                          style={{ padding: '4px 8px', background: '#EFF6FF', color: '#2563EB', border: 'none', borderRadius: 6, cursor: 'pointer', fontSize: 11, fontWeight: 700 }}>
                          <BsPencil size={11} />
                        </button>
                        <button type="button" onClick={() => handleDelete(cat.id, cat.name)}
                          style={{ padding: '4px 8px', background: '#FEF2F2', color: '#DC2626', border: 'none', borderRadius: 6, cursor: 'pointer', fontSize: 11, fontWeight: 700 }}>
                          <BsTrash size={11} />
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── Occasions (read-only list) ── */}
          <div>
            <div style={{ background: 'white', borderRadius: 12, border: '1px solid #E5E7EB', overflow: 'hidden' }}>
              <div style={{ padding: '16px 20px', borderBottom: '1px solid #F3F4F6', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h2 style={{ fontSize: 14, fontWeight: 800, color: '#111' }}>Occasions</h2>
                <span style={{ fontSize: 12, color: '#6B7280', fontWeight: 600 }}>{occasions.length} total</span>
              </div>
              <div style={{ padding: '12px 20px', background: '#FFFBEB', borderBottom: '1px solid #FEF3C7' }}>
                <p style={{ fontSize: 12, color: '#92400E', fontWeight: 600 }}>
                  Occasions are seeded from the database. Assign products to occasions in the product form.
                </p>
              </div>
              {loading ? (
                <p style={{ padding: '20px', textAlign: 'center', color: '#999', fontSize: 13 }}>Loading...</p>
              ) : occasions.map((occ) => (
                <div key={occ.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 20px', borderBottom: '1px solid #F9FAFB' }}>
                  <div>
                    <p style={{ fontSize: 13, fontWeight: 700, color: '#111' }}>{occ.name}</p>
                    <p style={{ fontSize: 11, color: '#9CA3AF' }}>{occ.slug} · {occ._count.products} products</p>
                  </div>
                  <span style={{
                    fontSize: 11, fontWeight: 700, padding: '3px 8px', borderRadius: 6,
                    background: occ.isActive ? '#ECFDF5' : '#F9FAFB',
                    color: occ.isActive ? '#059669' : '#9CA3AF',
                  }}>{occ.isActive ? 'Active' : 'Inactive'}</span>
                </div>
              ))}
            </div>

            {/* Tips card */}
            <div style={{ marginTop: 16, background: 'white', borderRadius: 12, border: '1px solid #E5E7EB', padding: '20px' }}>
              <h3 style={{ fontSize: 13, fontWeight: 800, color: '#111', marginBottom: 12 }}>How sections work</h3>
              <ul style={{ fontSize: 12, color: '#6B7280', lineHeight: 1.8, paddingLeft: 16 }}>
                <li>Categories = horizontal scroll sections on Shop page</li>
                <li>Occasions = sidebar filter on Occasion pages</li>
                <li>Assign products → categories/occasions when creating/editing</li>
                <li>Products in "flowers" category appear in "Bestselling Flowers" section</li>
                <li>First image uploaded becomes the product thumbnail</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 640px) {
          .admin-cat-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
