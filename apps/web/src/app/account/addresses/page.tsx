'use client';

import { useState, useEffect } from 'react';
import { BsArrowLeft, BsGeoAlt, BsPlus, BsTrash, BsCheckCircleFill } from 'react-icons/bs';
import { apiClient } from '@/lib/api-client';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

type Address = {
  id: string; type: string; name: string; phone: string;
  addressLine: string; area: string; city: string;
  pincode: string; state: string; isDefault: boolean;
};

export default function AddressesPage() {
  const { isAuthenticated, loading: authLoading } = useAuth();
  const router = useRouter();
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && !isAuthenticated) { router.push('/login?redirect=/account/addresses'); return; }
    if (isAuthenticated) {
      apiClient.getAddresses()
        .then((data: any) => {
          const list: Address[] = Array.isArray(data) ? data : data?.addresses ?? [];
          setAddresses(list);
        })
        .catch(console.error)
        .finally(() => setLoading(false));
    }
  }, [isAuthenticated, authLoading, router]);

  const handleDelete = async (id: string) => {
    try { await apiClient.deleteAddress(id); setAddresses((p) => p.filter((a) => a.id !== id)); }
    catch (e) { console.error(e); }
  };

  const handleSetDefault = async (id: string) => {
    try {
      await apiClient.setDefaultAddress(id);
      setAddresses((p) => p.map((a) => ({ ...a, isDefault: a.id === id })));
    } catch (e) { console.error(e); }
  };

  return (
    <main style={{ minHeight: '100dvh', background: '#FCF9FA', paddingBottom: 100 }}>
      <div style={{ background: '#fff', padding: '14px 20px', display: 'flex', alignItems: 'center', gap: 12, borderBottom: '1px solid #F0F0F0' }}>
        <button onClick={() => router.back()} style={{ width: 36, height: 36, borderRadius: 10, background: '#F5F5F5', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
          <BsArrowLeft size={17} color="#111" />
        </button>
        <h1 style={{ fontSize: 17, fontWeight: 900, color: '#111', margin: 0 }}>My Addresses</h1>
      </div>

      <div style={{ maxWidth: 600, margin: '0 auto', padding: '16px' }}>
        {loading ? (
          Array.from({ length: 2 }).map((_, i) => (
            <div key={i} style={{ background: '#fff', borderRadius: 16, padding: 16, marginBottom: 12 }}>
              <div style={{ height: 12, width: '40%', borderRadius: 6, background: '#F0F0F0', marginBottom: 8 }} />
              <div style={{ height: 10, width: '80%', borderRadius: 6, background: '#F0F0F0', marginBottom: 4 }} />
              <div style={{ height: 10, width: '50%', borderRadius: 6, background: '#F0F0F0' }} />
            </div>
          ))
        ) : addresses.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 20px' }}>
            <span style={{ display: 'flex', marginBottom: 16, justifyContent: 'center' }}><BsGeoAlt size={48} color="#D0D0D0" /></span>
            <h2 style={{ fontSize: 18, fontWeight: 900, color: '#111', marginBottom: 8 }}>No addresses saved</h2>
            <p style={{ fontSize: 13, color: '#9CA3AF', marginBottom: 24 }}>Add an address for faster checkout</p>
          </div>
        ) : (
          addresses.map((addr) => (
            <div key={addr.id} style={{ background: '#fff', borderRadius: 16, padding: 16, marginBottom: 12, boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6, flexWrap: 'wrap' }}>
                <span style={{ fontSize: 14, fontWeight: 800, color: '#111' }}>{addr.name}</span>
                <span style={{ fontSize: 9, fontWeight: 800, color: '#b22153', background: '#FCF0F5', borderRadius: 4, padding: '2px 6px' }}>{addr.type}</span>
                {addr.isDefault && (
                  <span style={{ fontSize: 9, fontWeight: 800, color: '#65a30d', background: '#f0fdf4', borderRadius: 4, padding: '2px 6px' }}>Default</span>
                )}
              </div>
              <p style={{ fontSize: 12, color: '#555', margin: '0 0 2px', lineHeight: 1.5 }}>
                {addr.addressLine}, {addr.area}, {addr.city} – {addr.pincode}
              </p>
              <p style={{ fontSize: 12, color: '#999', margin: '0 0 12px' }}>{addr.phone}</p>
              <div style={{ display: 'flex', gap: 8 }}>
                {!addr.isDefault && (
                  <button onClick={() => handleSetDefault(addr.id)} style={{ padding: '6px 14px', borderRadius: 8, border: '1px solid #E0E0E0', background: '#fff', fontSize: 11, fontWeight: 700, color: '#666', cursor: 'pointer' }}>
                    Set Default
                  </button>
                )}
                <button onClick={() => handleDelete(addr.id)} style={{ padding: '6px 14px', borderRadius: 8, border: '1px solid #FEE2E2', background: '#fff', fontSize: 11, fontWeight: 700, color: '#EF4444', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4 }}>
                  <BsTrash size={11} /> Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </main>
  );
}
