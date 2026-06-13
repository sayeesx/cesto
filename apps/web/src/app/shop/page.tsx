'use client';

import Link from 'next/link';
import { BsSearch, BsChevronRight } from 'react-icons/bs';
import ProductCard from '@/components/product/ProductCard';
import { useState, useEffect } from 'react';

const sections = [
  { title: 'Bestselling Flowers', slug: 'flowers', url: '/category/flowers' },
  { title: 'Trending Cakes', slug: 'cakes', url: '/category/cakes' },
  { title: 'Perfect for Birthdays', slug: 'birthday', url: '/occasion/birthday' },
  { title: 'Luxury Hampers', slug: 'hampers', url: '/category/hampers' },
];

const demoProducts = [
  { id: '1', name: 'Sunrise Blooms Bouquet', slug: 'sunrise-blooms', price: 899, compareAtPrice: 1199, deliveryEstimate: 'Same Day', isBestseller: true, imageUrl: 'https://images.unsplash.com/photo-1591886960571-74d15c614741?auto=format&fit=crop&q=80&w=400' },
  { id: '2', name: 'Premium Chocolate Hamper', slug: 'choco-hamper', price: 1499, compareAtPrice: 1999, deliveryEstimate: 'Same Day', isBestseller: true },
  { id: '3', name: 'Red Rose Arrangement', slug: 'red-roses', price: 699, deliveryEstimate: 'Same Day' },
  { id: '4', name: 'Birthday Cake Delight', slug: 'birthday-cake', price: 599, compareAtPrice: 749, deliveryEstimate: '2 Hours', isNew: true },
  { id: '5', name: 'Luxury Gift Hamper', slug: 'luxury-hamper', price: 2499, compareAtPrice: 2999, deliveryEstimate: 'Same Day' },
];

export default function ShopPage() {
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch('/api/v1/products');
        if (res.ok) {
          const data = await res.json();
          setProducts(data);
        }
      } catch {}
    }
    load();
  }, []);

  return (
    <main style={{ minHeight: '100vh', background: '#FFFFFF', paddingBottom: 100 }}>
      {/* Header-like search bar integrated flush at top */}
      <div style={{ padding: '12px 16px', background: '#FFFFFF', position: 'sticky', top: 0, zIndex: 10 }}>
        <div style={{
          background: '#F5F5F5',
          borderRadius: 14,
          height: 48,
          display: 'flex',
          alignItems: 'center',
          padding: '0 16px',
          gap: 12,
          border: '1px solid #EAEAEA',
        }}>
          <BsSearch size={16} color="#b22153" />
          <input 
            placeholder="Search in Shop..."
            style={{
              background: 'transparent',
              border: 'none',
              outline: 'none',
              color: '#111111',
              fontSize: 14,
              fontWeight: 600,
              flex: 1,
            }}
          />
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column' }}>
        
        {sections.map((section) => {
          // Fake filter for demo - naturally we would fetch specifically or filter by tag
          const activeProducts = products.length > 0 ? products : demoProducts;
          const sectionProducts = activeProducts.filter(p => !p.slug.includes('x')).slice(0, 5);

          return (
            <section key={section.slug} className="shop-section" style={{ background: '#FFFFFF', padding: '24px 0', borderTop: '6px solid #F5F5F5' }}>
              <div className="section-header-row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16, padding: '0 16px' }}>
                <h2 className="section-heading" style={{ fontSize: 18, fontWeight: 900, color: '#111111', letterSpacing: '-0.3px' }}>{section.title}</h2>
                <Link href={section.url} style={{ fontSize: 13, fontWeight: 800, color: '#b22153', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 4 }}>
                  View all <BsChevronRight size={10} />
                </Link>
              </div>
              <div 
                className="no-scrollbar desktop-product-grid" 
                style={{ 
                  display: 'flex', 
                  gap: 12, 
                  overflowX: 'auto',
                  scrollSnapType: 'x mandatory',
                }}
              >
                {sectionProducts.length > 0 ? sectionProducts.map((p: any, index: number) => (
                  <div 
                    key={p.id} 
                    style={{ 
                      width: 160, 
                      flexShrink: 0, 
                      scrollSnapAlign: 'start',
                      marginLeft: index === 0 ? 16 : 0,
                    }}
                  >
                    <ProductCard {...p} />
                  </div>
                )) : (
                  <div style={{ marginLeft: 16, padding: '20px 0', color: '#A9A0AE', fontSize: 12 }}>Loading products...</div>
                )}
                {/* Trailing spacer so last card has same breathing room as first */}
                <div className="scroll-spacer" style={{ width: 16, flexShrink: 0 }} />
              </div>
            </section>
          );
        })}

      </div>
    </main>
  );
}
