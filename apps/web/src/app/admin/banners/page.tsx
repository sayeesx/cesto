'use client';

import React, { useState, useEffect } from 'react';
import { BsPlus, BsTrash, BsArrowUp, BsArrowDown, BsCheckCircleFill } from 'react-icons/bs';
import { adminApiClient } from '@/lib/api-client';
import { useAdminGuard } from '@/hooks/useAdminGuard';

type Banner = {
  id: string;
  image: string;
};

export default function AdminBannersPage() {
  useAdminGuard();
  const [banners, setBanners] = useState<Banner[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const load = async () => {
    try {
      const data = await adminApiClient.adminGetBanners();
      const arr = Array.isArray(data) ? data : [];
      setBanners(arr.length > 0 ? arr : [{ id: '1', image: '' }]);
    } catch (e) { console.error(e); }
    finally { setLoading(false); }
  };

  useEffect(() => { load(); }, []);

  const addBanner = () => {
    setBanners((prev) => [...prev, { id: String(Date.now()), image: '' }]);
  };

  const removeBanner = (id: string) => {
    setBanners((prev) => prev.filter((b) => b.id !== id));
  };

  const updateBanner = (id: string, image: string) => {
    setBanners((prev) => prev.map((b) => (b.id === id ? { ...b, image } : b)));
  };

  const moveBanner = (index: number, dir: 'up' | 'down') => {
    const arr = [...banners];
    const target = dir === 'up' ? index - 1 : index + 1;
    if (target < 0 || target >= arr.length) return;
    [arr[index], arr[target]] = [arr[target], arr[index]];
    setBanners(arr);
  };

  const handleSave = async () => {
    setSaving(true);
    setSaved(false);
    try {
      const valid = banners.filter((b) => b.image.trim());
      await adminApiClient.adminUpdateBanners(valid);
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    } catch (e) {
      console.error(e);
      alert('Failed to save banners');
    }
    finally { setSaving(false); }
  };

  if (loading) return <div style={{ padding: 24, color: '#999' }}>Loading...</div>;

  return (
    <div style={{ background: '#F8F9FA', minHeight: '100dvh' }}>
      <div style={{ maxWidth: 800, margin: '0 auto', padding: '16px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
          <h1 style={{ fontSize: 20, fontWeight: 900, color: '#111', textTransform: 'uppercase', letterSpacing: '-0.3px', margin: 0 }}>
            Home Banners
          </h1>
          <button
            onClick={addBanner}
            style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 16px', borderRadius: 10, border: 'none', background: '#1a3a3a', color: '#fff', fontSize: 12, fontWeight: 800, cursor: 'pointer' }}
          >
            <BsPlus size={16} /> Add Banner
          </button>
        </div>

        {banners.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 20px', background: '#fff', borderRadius: 16 }}>
            <p style={{ fontSize: 14, color: '#9CA3AF', marginBottom: 16 }}>No banners yet. Add your first banner to appear on the homepage carousel.</p>
            <button onClick={addBanner} style={{ padding: '12px 24px', borderRadius: 10, border: 'none', background: '#b22153', color: '#fff', fontSize: 13, fontWeight: 800, cursor: 'pointer' }}>
              Add First Banner
            </button>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {banners.map((banner, index) => (
              <div key={banner.id} style={{ background: '#fff', borderRadius: 16, padding: 16, border: '1px solid #E5E7EB' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                  <span style={{ fontSize: 11, fontWeight: 800, color: '#9CA3AF', background: '#F3F4F6', padding: '2px 8px', borderRadius: 6 }}>
                    #{index + 1}
                  </span>
                  <div style={{ flex: 1 }} />
                  <button onClick={() => moveBanner(index, 'up')} disabled={index === 0} style={{ background: 'none', border: 'none', cursor: index === 0 ? 'not-allowed' : 'pointer', color: index === 0 ? '#E0E0E0' : '#666', padding: 4 }}>
                    <BsArrowUp size={14} />
                  </button>
                  <button onClick={() => moveBanner(index, 'down')} disabled={index === banners.length - 1} style={{ background: 'none', border: 'none', cursor: index === banners.length - 1 ? 'not-allowed' : 'pointer', color: index === banners.length - 1 ? '#E0E0E0' : '#666', padding: 4 }}>
                    <BsArrowDown size={14} />
                  </button>
                  <button onClick={() => removeBanner(banner.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#EF4444', padding: 4 }}>
                    <BsTrash size={14} />
                  </button>
                </div>

                <label style={{ fontSize: 11, fontWeight: 700, color: '#666', marginBottom: 4, display: 'block' }}>Image URL *</label>
                <input
                  type="text"
                  value={banner.image}
                  onChange={(e) => updateBanner(banner.id, e.target.value)}
                  placeholder="https://res.cloudinary.com/..."
                  style={{ width: '100%', padding: '10px 14px', borderRadius: 10, border: '1.5px solid #E8E8E8', fontSize: 13, fontFamily: 'inherit', outline: 'none', boxSizing: 'border-box' }}
                />

                {banner.image && (
                  <div style={{ marginTop: 10, borderRadius: 10, overflow: 'hidden', maxHeight: 160, background: '#F9FAFB' }}>
                    <img src={banner.image} alt="" style={{ width: '100%', height: 120, objectFit: 'cover' }} onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        <div style={{ marginTop: 24, display: 'flex', gap: 12, alignItems: 'center' }}>
          <button
            onClick={handleSave}
            disabled={saving}
            style={{ padding: '12px 32px', borderRadius: 12, border: 'none', background: saving ? '#95a5a6' : '#1a3a3a', color: '#fff', fontSize: 14, fontWeight: 800, cursor: saving ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', gap: 8 }}
          >
            {saving ? 'Saving...' : 'Save Banners'}
          </button>
          {saved && (
            <span style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, fontWeight: 700, color: '#10B981' }}>
              <BsCheckCircleFill size={14} /> Saved successfully
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
