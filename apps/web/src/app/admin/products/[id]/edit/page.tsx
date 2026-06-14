'use client';
import { useEffect, useState, use } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { BsChevronLeft } from 'react-icons/bs';
import { apiClient } from '@/lib/api-client';
import { useAdminGuard } from '@/hooks/useAdminGuard';
import ProductForm, { ProductFormData } from '@/components/admin/ProductForm';

export default function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { loading: guardLoading } = useAdminGuard();
  const router = useRouter();
  const [product, setProduct] = useState<any>(null);
  const [categories, setCategories] = useState<any[]>([]);
  const [occasions, setOccasions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (guardLoading) return;
    Promise.all([
      apiClient.adminGetProduct(id),
      apiClient.adminListCategories(),
    ]).then(([prod, cats]: [any, any]) => {
      setProduct(prod);
      setCategories(cats.categories || []);
      setOccasions(cats.occasions || []);
    }).catch(console.error).finally(() => setLoading(false));
  }, [id, guardLoading]);

  const handleSubmit = async (data: ProductFormData) => {
    await apiClient.adminUpdateProduct(id, {
      ...data,
      price: Number(data.price),
      compareAtPrice: data.compareAtPrice ? Number(data.compareAtPrice) : undefined,
      stock: Number(data.stock),
    });
    router.push('/admin/products');
  };

  if (guardLoading || loading) {
    return (
      <div style={{ minHeight: '100dvh', background: '#F8F9FA' }}>
        <div style={{ padding: 40, textAlign: 'center', color: '#999', fontSize: 14 }}>Loading product...</div>
      </div>
    );
  }

  if (!product) {
    return (
      <div style={{ minHeight: '100dvh', background: '#F8F9FA' }}>
        <div style={{ padding: 40, textAlign: 'center', color: '#DC2626', fontSize: 14 }}>Product not found.</div>
      </div>
    );
  }

  // Build initial form values from existing product
  const initial: Partial<ProductFormData> = {
    name: product.name,
    slug: product.slug,
    description: product.description || '',
    whatsInside: product.whatsInside || '',
    price: String(product.price),
    compareAtPrice: product.compareAtPrice ? String(product.compareAtPrice) : '',
    stock: String(product.stock),
    deliveryEstimate: product.deliveryEstimate || 'Same Day',
    sameDayAvailable: product.sameDayAvailable,
    isPersonalizable: product.isPersonalizable,
    isActive: product.isActive,
    imageUrls: product.images?.map((img: any) => img.url) || [],
    categoryIds: product.categories?.map((c: any) => c.categoryId) || [],
    occasionIds: product.occasions?.map((o: any) => o.occasionId) || [],
    tags: product.tags || [],
  };

  return (
    <div style={{ minHeight: '100dvh', background: '#F8F9FA' }}>
      <div style={{ maxWidth: 800, margin: '0 auto', padding: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
          <Link href="/admin/products" style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 13, color: '#6B7280', textDecoration: 'none', fontWeight: 600 }}>
            <BsChevronLeft size={14} /> Products
          </Link>
          <span style={{ color: '#D1D5DB' }}>/</span>
          <h1 style={{ fontSize: 18, fontWeight: 900, color: '#111' }}>Edit: {product.name}</h1>
        </div>
        <ProductForm
          initial={initial}
          categories={categories}
          occasions={occasions}
          onSubmit={handleSubmit}
          submitLabel="Update Product"
        />
      </div>
    </div>
  );
}
