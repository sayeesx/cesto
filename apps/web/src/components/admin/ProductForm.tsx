'use client';
import { useState, useRef } from 'react';
import { BsCloudUpload, BsX, BsPlus } from 'react-icons/bs';
import { uploadToCloudinary } from '@/lib/cloudinary-upload';
import { getAdminImage } from '@/lib/cloudinary';

interface Category { id: string; name: string; slug: string; }
interface Occasion { id: string; name: string; slug: string; }

export interface ProductFormData {
  name: string;
  slug: string;
  description: string;
  whatsInside: string;
  price: string;
  compareAtPrice: string;
  stock: string;
  deliveryEstimate: string;
  sameDayAvailable: boolean;
  isPersonalizable: boolean;
  isActive: boolean;
  imageUrls: string[];
  categoryIds: string[];
  occasionIds: string[];
  tags: string[];
}

interface ProductFormProps {
  initial?: Partial<ProductFormData>;
  categories: Category[];
  occasions: Occasion[];
  onSubmit: (data: ProductFormData) => Promise<void>;
  submitLabel?: string;
}

export default function ProductForm({ initial, categories, occasions, onSubmit, submitLabel = 'Save Product' }: ProductFormProps) {
  const [form, setForm] = useState<ProductFormData>({
    name: initial?.name || '',
    slug: initial?.slug || '',
    description: initial?.description || '',
    whatsInside: initial?.whatsInside || '',
    price: initial?.price || '',
    compareAtPrice: initial?.compareAtPrice || '',
    stock: initial?.stock || '0',
    deliveryEstimate: initial?.deliveryEstimate || 'Same Day',
    sameDayAvailable: initial?.sameDayAvailable ?? true,
    isPersonalizable: initial?.isPersonalizable ?? false,
    isActive: initial?.isActive ?? true,
    imageUrls: initial?.imageUrls || [],
    categoryIds: initial?.categoryIds || [],
    occasionIds: initial?.occasionIds || [],
    tags: initial?.tags || [],
  });

  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadError, setUploadError] = useState('');
  const [saving, setSaving] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [tagInput, setTagInput] = useState('');
  const fileRef = useRef<HTMLInputElement>(null);

  const set = (key: keyof ProductFormData, val: any) =>
    setForm(f => ({ ...f, [key]: val }));

  // Auto-generate slug from name
  const handleNameChange = (val: string) => {
    set('name', val);
    if (!initial?.slug) {
      set('slug', val.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''));
    }
  };

  const toggleId = (key: 'categoryIds' | 'occasionIds', id: string) => {
    set(key, form[key].includes(id) ? form[key].filter(x => x !== id) : [...form[key], id]);
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;
    setUploading(true);
    setUploadProgress(0);
    setUploadError('');

    // Validate file types
    const allowed = ['image/jpeg', 'image/png', 'image/webp'];
    const invalid = files.filter(f => !allowed.includes(f.type));
    if (invalid.length) {
      setUploadError(`Unsupported file type: ${invalid.map(f => f.name).join(', ')}. Only JPG, PNG, WebP allowed.`);
      setUploading(false);
      if (fileRef.current) fileRef.current.value = '';
      return;
    }

    try {
      const results = await Promise.all(
        files.map(f => uploadToCloudinary(f, 'cesto/products', pct => setUploadProgress(pct)))
      );
      // Store only the publicId — the app generates sized URLs from it via getProductImage()
      set('imageUrls', [...form.imageUrls, ...results.map(r => r.publicId)]);
    } catch (err: any) {
      setUploadError(err.message || 'Image upload failed');
    } finally {
      setUploading(false);
      if (fileRef.current) fileRef.current.value = '';
    }
  };

  const removeImage = (url: string) => set('imageUrls', form.imageUrls.filter(u => u !== url));

  const addTag = () => {
    const t = tagInput.trim();
    if (t && !form.tags.includes(t)) set('tags', [...form.tags, t]);
    setTagInput('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError('');
    const errs: Record<string, string> = {};
    if (!form.name.trim())  errs.name  = 'Product name is required';
    if (!form.slug.trim())  errs.slug  = 'Slug is required';
    if (!form.price)        errs.price = 'Price is required';
    if (parseFloat(form.price) <= 0) errs.price = 'Price must be greater than 0';
    if (form.compareAtPrice && parseFloat(form.compareAtPrice) <= parseFloat(form.price))
      errs.compareAtPrice = 'Compare-at price must be higher than price';
    setFieldErrors(errs);
    if (Object.keys(errs).length > 0) return;
    setSaving(true);
    try {
      await onSubmit(form);
    } catch (err: any) {
      setSubmitError(Array.isArray(err.message) ? err.message.join(', ') : err.message || 'Save failed');
    } finally {
      setSaving(false);
    }
  };

  const inputStyle: React.CSSProperties = {
    width: '100%', height: 40, padding: '0 12px',
    border: '1.5px solid #E5E7EB', borderRadius: 8,
    fontSize: 13, outline: 'none', background: 'white',
    boxSizing: 'border-box',
  };
  const labelStyle: React.CSSProperties = {
    display: 'block', fontSize: 12, fontWeight: 700,
    color: '#374151', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.04em',
  };
  const cardStyle: React.CSSProperties = {
    background: 'white', borderRadius: 12,
    border: '1px solid #E5E7EB', padding: 24, marginBottom: 20,
  };

  const fieldError = (key: string) => fieldErrors[key] ? (
    <p style={{ fontSize: 11, color: '#DC2626', fontWeight: 600, marginTop: 4 }}>⚠ {fieldErrors[key]}</p>
  ) : null;

  return (
    <form onSubmit={handleSubmit}>

      {/* Basic Info */}
      <div style={cardStyle}>
        <h3 style={{ fontSize: 14, fontWeight: 800, color: '#111', marginBottom: 20 }}>Basic Information</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          <div style={{ gridColumn: '1/-1' }}>
            <label style={labelStyle}>Product Name *</label>
            <input style={{ ...inputStyle, borderColor: fieldErrors.name ? '#FCA5A5' : '#E5E7EB' }} value={form.name} onChange={e => { handleNameChange(e.target.value); setFieldErrors(f => ({ ...f, name: '' })); }} placeholder="e.g. Sunrise Blooms Bouquet" required />
            {fieldError('name')}
          </div>
          <div>
            <label style={labelStyle}>Slug *</label>
            <input style={{ ...inputStyle, borderColor: fieldErrors.slug ? '#FCA5A5' : '#E5E7EB' }} value={form.slug} onChange={e => { set('slug', e.target.value); setFieldErrors(f => ({ ...f, slug: '' })); }} placeholder="sunrise-blooms-bouquet" required />
            {fieldError('slug')}
          </div>
          <div>
            <label style={labelStyle}>Delivery Estimate</label>
            <input style={inputStyle} value={form.deliveryEstimate} onChange={e => set('deliveryEstimate', e.target.value)} placeholder="Same Day" />
          </div>
          <div style={{ gridColumn: '1/-1' }}>
            <label style={labelStyle}>Description</label>
            <textarea
              value={form.description}
              onChange={e => set('description', e.target.value)}
              placeholder="Product description..."
              rows={3}
              style={{ ...inputStyle, height: 'auto', padding: '10px 12px', resize: 'vertical' }}
            />
          </div>
          <div style={{ gridColumn: '1/-1' }}>
            <label style={labelStyle}>What's Inside</label>
            <textarea
              value={form.whatsInside}
              onChange={e => set('whatsInside', e.target.value)}
              placeholder="e.g. 12 red roses, 1 greeting card..."
              rows={2}
              style={{ ...inputStyle, height: 'auto', padding: '10px 12px', resize: 'vertical' }}
            />
          </div>
        </div>
      </div>

      {/* Pricing & Stock */}
      <div style={cardStyle}>
        <h3 style={{ fontSize: 14, fontWeight: 800, color: '#111', marginBottom: 20 }}>Pricing & Stock</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16 }}>
          <div>
            <label style={labelStyle}>Price (₹) *</label>
            <input type="number" min="0" style={{ ...inputStyle, borderColor: fieldErrors.price ? '#FCA5A5' : '#E5E7EB' }} value={form.price} onChange={e => { set('price', e.target.value); setFieldErrors(f => ({ ...f, price: '' })); }} placeholder="899" required />
            {fieldError('price')}
          </div>
          <div>
            <label style={labelStyle}>Compare At Price (₹)</label>
            <input type="number" min="0" style={{ ...inputStyle, borderColor: fieldErrors.compareAtPrice ? '#FCA5A5' : '#E5E7EB' }} value={form.compareAtPrice} onChange={e => { set('compareAtPrice', e.target.value); setFieldErrors(f => ({ ...f, compareAtPrice: '' })); }} placeholder="1199" />
            {fieldError('compareAtPrice')}
          </div>
          <div>
            <label style={labelStyle}>Stock Qty</label>
            <input type="number" min="0" style={inputStyle} value={form.stock} onChange={e => set('stock', e.target.value)} placeholder="0" />
          </div>
        </div>
      </div>

      {/* Images */}
      <div style={cardStyle}>
        <h3 style={{ fontSize: 14, fontWeight: 800, color: '#111', marginBottom: 8 }}>Image (Cloudinary)</h3>
        <p style={{ fontSize: 11, color: '#6B7280', marginBottom: 14, lineHeight: 1.5 }}>
          Upload the 780×780 PNG exported from PixelLab. The app generates all display sizes automatically — you never need to export multiple sizes.
        </p>
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 12 }}>
          {form.imageUrls.map((publicIdOrUrl, i) => {
            // Preview uses admin size (80×80). Falls back gracefully for legacy full URLs.
            const previewSrc = getAdminImage(publicIdOrUrl) ?? publicIdOrUrl;
            return (
            <div key={publicIdOrUrl} style={{ position: 'relative', width: 80, height: 80 }}>
              <img src={previewSrc} alt="" style={{ width: 80, height: 80, objectFit: 'contain', borderRadius: 8, border: '2px solid ' + (i === 0 ? '#b22153' : '#E5E7EB'), background: '#F9F4F6' }} />
              {i === 0 && <span style={{ position: 'absolute', bottom: 2, left: 2, fontSize: 8, fontWeight: 800, background: '#b22153', color: 'white', borderRadius: 4, padding: '1px 4px' }}>PRIMARY</span>}
              <button type="button" onClick={() => removeImage(publicIdOrUrl)} style={{
                position: 'absolute', top: -6, right: -6,
                width: 20, height: 20, borderRadius: '50%', background: '#EF4444',
                border: '2px solid white', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <BsX size={10} color="white" />
              </button>
            </div>
            );
          })}
          <button
            type="button"
            onClick={() => fileRef.current?.click()}
            disabled={uploading}
            style={{
              width: 80, height: 80, borderRadius: 8,
              border: '2px dashed #D1D5DB', background: '#F9FAFB',
              cursor: uploading ? 'not-allowed' : 'pointer',
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              gap: 4, color: '#9CA3AF', fontSize: 11, fontWeight: 700,
            }}
          >
            {uploading ? (
              <span style={{ fontSize: 11, color: '#b22153' }}>{uploadProgress}%</span>
            ) : (
              <><BsCloudUpload size={20} /> Upload</>
            )}
          </button>
        </div>
        <input ref={fileRef} type="file" accept="image/png,image/jpeg,image/webp" multiple style={{ display: 'none' }} onChange={handleFileChange} />
        {uploadError && (
          <p style={{ fontSize: 12, color: '#DC2626', fontWeight: 600, marginTop: 8 }}>⚠ {uploadError}</p>
        )}
        <p style={{ fontSize: 11, color: '#9CA3AF', marginTop: uploadError ? 4 : 0 }}>
          PNG (preferred — from PixelLab 780×780), JPG or WebP. All sizes generated automatically by Cloudinary.
        </p>
      </div>

      {/* Sections: Categories */}
      <div style={cardStyle}>
        <h3 style={{ fontSize: 14, fontWeight: 800, color: '#111', marginBottom: 6 }}>Categories (Sections)</h3>
        <p style={{ fontSize: 12, color: '#6B7280', marginBottom: 14 }}>Select which categories this product appears in.</p>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {categories.map(cat => {
            const selected = form.categoryIds.includes(cat.id);
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => toggleId('categoryIds', cat.id)}
                style={{
                  padding: '6px 14px', borderRadius: 20,
                  border: `1.5px solid ${selected ? '#b22153' : '#E5E7EB'}`,
                  background: selected ? '#b22153' : 'white',
                  color: selected ? 'white' : '#374151',
                  fontSize: 12, fontWeight: 700, cursor: 'pointer',
                  transition: 'all 0.15s',
                }}
              >
                {cat.name}
              </button>
            );
          })}
          {categories.length === 0 && <p style={{ fontSize: 12, color: '#9CA3AF' }}>No categories yet. Create some in the Sections page.</p>}
        </div>
      </div>

      {/* Occasions */}
      <div style={cardStyle}>
        <h3 style={{ fontSize: 14, fontWeight: 800, color: '#111', marginBottom: 6 }}>Occasions</h3>
        <p style={{ fontSize: 12, color: '#6B7280', marginBottom: 14 }}>Select which occasions this product appears in.</p>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {occasions.map(occ => {
            const selected = form.occasionIds.includes(occ.id);
            return (
              <button
                key={occ.id}
                type="button"
                onClick={() => toggleId('occasionIds', occ.id)}
                style={{
                  padding: '6px 14px', borderRadius: 20,
                  border: `1.5px solid ${selected ? '#1a3a3a' : '#E5E7EB'}`,
                  background: selected ? '#1a3a3a' : 'white',
                  color: selected ? 'white' : '#374151',
                  fontSize: 12, fontWeight: 700, cursor: 'pointer',
                }}
              >
                {occ.name}
              </button>
            );
          })}
          {occasions.length === 0 && <p style={{ fontSize: 12, color: '#9CA3AF' }}>No occasions found in database.</p>}
        </div>
      </div>

      {/* Tags & Settings */}
      <div style={cardStyle}>
        <h3 style={{ fontSize: 14, fontWeight: 800, color: '#111', marginBottom: 20 }}>Tags & Settings</h3>
        <div style={{ marginBottom: 16 }}>
          <label style={labelStyle}>Tags</label>
          <div style={{ display: 'flex', gap: 6, marginBottom: 8 }}>
            <input
              value={tagInput}
              onChange={e => setTagInput(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); addTag(); } }}
              placeholder="Add tag..."
              style={{ ...inputStyle, flex: 1 }}
            />
            <button type="button" onClick={addTag} style={{ height: 40, padding: '0 14px', background: '#1a3a3a', color: 'white', borderRadius: 8, border: 'none', cursor: 'pointer', fontWeight: 700, fontSize: 13 }}>
              <BsPlus size={16} />
            </button>
          </div>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            {form.tags.map(tag => (
              <span key={tag} style={{ display: 'flex', alignItems: 'center', gap: 4, padding: '4px 10px', background: '#F3F4F6', borderRadius: 20, fontSize: 12, fontWeight: 600 }}>
                {tag}
                <button type="button" onClick={() => set('tags', form.tags.filter(t => t !== tag))} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, display: 'flex' }}>
                  <BsX size={12} />
                </button>
              </span>
            ))}
          </div>
        </div>
        <div style={{ display: 'flex', gap: 20 }}>
          {[
            { key: 'isActive', label: 'Active (visible in store)' },
            { key: 'sameDayAvailable', label: 'Same Day Available' },
            { key: 'isPersonalizable', label: 'Personalizable' },
          ].map(({ key, label }) => (
            <label key={key} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={form[key as keyof ProductFormData] as boolean}
                onChange={e => set(key as keyof ProductFormData, e.target.checked)}
                style={{ width: 16, height: 16, cursor: 'pointer' }}
              />
              {label}
            </label>
          ))}
        </div>
      </div>

      {/* Submit */}
      {submitError && (
        <div style={{ background: '#FEF2F2', border: '1px solid #FECACA', borderRadius: 8, padding: '12px 16px', marginBottom: 12, fontSize: 13, color: '#DC2626', fontWeight: 600 }}>
          ⚠ {submitError}
        </div>
      )}
      <button
        type="submit"
        disabled={saving || uploading}
        style={{
          width: '100%', height: 48,
          background: saving ? '#9CA3AF' : '#b22153',
          color: 'white', borderRadius: 10,
          border: 'none', cursor: saving ? 'not-allowed' : 'pointer',
          fontWeight: 800, fontSize: 15,
        }}
      >
        {saving ? 'Saving...' : submitLabel}
      </button>
    </form>
  );
}
