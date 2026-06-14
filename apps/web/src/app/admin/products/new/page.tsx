'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { BsChevronLeft } from 'react-icons/bs';
import { adminApiClient as apiClient } from '@/lib/api-client';
import { useAdminGuard } from '@/hooks/useAdminGuard';
import AdminLoader from '@/components/admin/AdminLoader';
import ProductForm, { ProductFormData } from '@/components/admin/ProductForm';

export default function NewProductPage() {
  const { loading: guardLoading } = useAdminGuard();
  const router = useRouter();
  const [categories, setCategories] = useState<any[]>([]);
  const [occasions, setOccasions] = useState<any[]>([]);

  useEffect(() => {
    if (guardLoading) return;
    apiClient.adminListCategories().then((d: any) => {
      setCategories(d.categories || []);
      setOccasions(d.occasions || []);
    }).catch(console.error);
  }, [guardLoading]);

  const handleSubmit = async (data: ProductFormData) => {
    await apiClient.adminCreateProduct({
      ...data,
      price: Number(data.price),
      compareAtPrice: data.compareAtPrice ? Number(data.compareAtPrice) : undefined,
      stock: Number(data.stock),
    });
    router.push('/admin/products');
  };

  if (guardLoading) return <AdminLoader />;

  return (
    <div style={{ minHeight: '100dvh', background: '#F8F9FA' }}>
      <div style={{ maxWidth: 800, margin: '0 auto', padding: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
          <Link href="/admin/products" style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 13, color: '#6B7280', textDecoration: 'none', fontWeight: 600 }}>
            <BsChevronLeft size={14} /> Products
          </Link>
          <span style={{ color: '#D1D5DB' }}>/</span>
          <h1 style={{ fontSize: 20, fontWeight: 900, color: '#111' }}>New Product</h1>
        </div>
        <ProductForm
          categories={categories}
          occasions={occasions}
          onSubmit={handleSubmit}
          submitLabel="Create Product"
        />
      </div>
    </div>
  );
}
