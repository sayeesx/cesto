'use client';

import ProductCard from '@/components/product/ProductCard';
import Link from 'next/link';
import { useState, useEffect, use } from 'react';
import { BsSearch, BsFilter, BsX } from 'react-icons/bs';

const occasions = [
  { name: 'Birthday', img: '/occasion/birthday.avif', slug: 'birthday' },
  { name: 'Anniversary', img: '/occasion/anniversary.avif', slug: 'anniversary' },
  { name: 'Love', img: '/occasion/love.avif', slug: 'love' },
  { name: 'Get Well', img: '/occasion/get_well.avif', slug: 'get-well-soon' },
  { name: 'Thanks', img: '/occasion/thankyou.avif', slug: 'thank-you' },
  { name: 'Wedding', img: '/occasion/wedding.avif', slug: 'wedding' },
  { name: 'Baby', img: '/occasion/baby.avif', slug: 'baby-shower' },
  { name: 'Celebrate', img: '/occasion/celeberation.avif', slug: 'celebration' },
];

const demoProducts = [
  { id: 'mock1', name: 'Premium Mock Product 1', slug: 'mock-1', price: 999, compareAtPrice: 1299, isBestseller: true, deliveryEstimate: 'Same Day' },
  { id: 'mock2', name: 'Premium Mock Product 2', slug: 'mock-2', price: 1499, isNew: true, deliveryEstimate: 'Next Day' },
  { id: 'mock3', name: 'Premium Mock Product 3', slug: 'mock-3', price: 799, compareAtPrice: 999, deliveryEstimate: 'Same Day' },
  { id: 'mock4', name: 'Premium Mock Product 4', slug: 'mock-4', price: 1999, deliveryEstimate: 'Next Day' },
];

export default function OccasionPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const [products, setProducts] = useState<any[]>([]);
  const [showSort, setShowSort] = useState(false);
  const title = slug === 'all' ? 'All Occasions' : slug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());

  useEffect(() => {
    async function load() {
      try {
        const qs = slug === 'all' ? '' : `?occasion=${slug}`;
        const res = await fetch(`/api/v1/products${qs}`);
        if (res.ok) {
          const raw = await res.json();
          const arr = (Array.isArray(raw) ? raw : []).map((p: any) => ({
            ...p,
            imageUrl: p.imageUrl || p.images?.[0]?.url || null,
          }));
          setProducts(arr);
        }
      } catch {}
    }
    load();
  }, [slug]);

  return (
    <>
      <main style={{ height: '100dvh', maxHeight: '100dvh', overflow: 'hidden', background: '#FFFFFF', display: 'flex', flexDirection: 'column' }}>
        
        <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
          {/* Sidebar - INCREASED WIDTH AND BUTTON SIZES */}
          <aside style={{
            width: 76,
            background: '#FCF9FA',
            borderRight: '1px solid #F8EDF4',
            overflowY: 'auto',
            flexShrink: 0,
            display: 'flex',
            flexDirection: 'column',
            paddingTop: 12,
            paddingBottom: 100,
          }} className="scrollbar-hide">
            {occasions.map((occ) => {
              const isActive = occ.slug === slug;
              return (
                <Link 
                  key={occ.slug} 
                  href={`/occasion/${occ.slug}`}
                  style={{
                    padding: '16px 4px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 6,
                    textAlign: 'center',
                    background: isActive ? '#FFFFFF' : 'transparent',
                    borderLeft: isActive ? '4px solid #b22153' : '4px solid transparent',
                    textDecoration: 'none',
                    color: isActive ? '#111111' : '#5F5F5F',
                    transition: 'all 0.2s ease',
                  }}
                >
                  <div style={{ 
                    width: 52, height: 52, borderRadius: '50%', // Circle for occasions
                    background: '#FFFFFF', overflow: 'hidden',
                    border: isActive ? '1px solid rgba(178, 33, 83, 0.2)' : '1px solid #F0F0F0',
                    display: 'flex', alignItems: 'center', justifyContent: 'center'
                  }}>
                    <img src={occ.img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                  <span style={{ fontSize: 10, fontWeight: isActive ? 900 : 700 }}>{occ.name}</span>
                </Link>
              );
            })}
          </aside>

          {/* Main Content Area */}
          <div style={{ flex: 1, overflowY: 'auto', padding: '0', paddingBottom: 100 }} className="scrollbar-hide">
            
            {/* Header Title & Sort Button */}
            <div style={{ padding: '20px 16px 12px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <h1 style={{ fontSize: 20, fontWeight: 900, color: '#111111', letterSpacing: '-0.5px' }}>{title}</h1>
                <p style={{ fontSize: 12, fontWeight: 700, color: '#A9A0AE', marginTop: 2 }}>{products.length > 0 ? products.length : demoProducts.length} Items found</p>
              </div>
              <button 
                onClick={() => setShowSort(true)}
                style={{ 
                  display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, fontWeight: 900, 
                  color: '#111111', background: 'transparent', padding: '4px 0', border: 'none', cursor: 'pointer'
                }}
              >
                <BsFilter size={18} /> Sort
              </button>
            </div>

            {/* Search bar integrated below title */}
            <div style={{ padding: '0 16px 16px', background: '#FFFFFF', position: 'relative' }}>
              <div style={{
                background: '#F5F5F5',
                borderRadius: 12,
                height: 48,
                display: 'flex',
                alignItems: 'center',
                padding: '0 16px',
                gap: 10,
                width: '100%',
                border: '1.5px solid #EAEAEA',
              }}>
                <BsSearch size={14} color="#b22153" />
                <input 
                  placeholder={`Search in ${title}...`}
                  style={{ background: 'transparent', border: 'none', outline: 'none', fontSize: 13, flex: 1, color: '#111111', fontWeight: 600 }}
                />
              </div>
            </div>

            <div style={{ padding: '8px 16px' }}>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: 12,
              }}>
                {(products.length > 0 ? products : demoProducts).map((p: any) => (
                  <ProductCard key={p.id} {...p} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* SORT MODAL */}
      {showSort && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 2000, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'flex-end' }}>
          <div style={{ width: '100%', background: 'white', borderTopLeftRadius: 24, borderTopRightRadius: 24, padding: '24px 16px 40px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 24 }}>
              <h3 style={{ fontSize: 18, fontWeight: 900 }}>Sort By</h3>
              <button 
                onClick={() => setShowSort(false)}
                style={{ color: '#111111', cursor: 'pointer', background: 'none', border: 'none' }}
              >
                <BsX size={28} />
              </button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              {['Relevance', 'Price: Low to High', 'Price: High to Low', 'Newest First', 'Bestsellers'].map((opt) => (
                <button 
                  key={opt}
                  onClick={() => setShowSort(false)}
                  style={{ textAlign: 'left', padding: '18px 0', borderBottom: '1px solid #F5F5F5', fontSize: 15, fontWeight: 700, color: opt === 'Relevance' ? '#b22153' : '#111111', background: 'none', border: 'none' }}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
