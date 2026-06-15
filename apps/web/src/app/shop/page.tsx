'use client';

import Link from 'next/link';
import { BsChevronRight } from 'react-icons/bs';
import ProductCard from '@/components/product/ProductCard';
import { useState, useEffect } from 'react';

// Static section definitions — these never change
const sections = [
  { title: 'Bestselling Flowers',   slug: 'flowers',  url: '/category/flowers',   filterKey: 'category' },
  { title: 'Trending Cakes',        slug: 'cakes',    url: '/category/cakes',      filterKey: 'category' },
  { title: 'Perfect for Birthdays', slug: 'birthday', url: '/occasion/birthday',   filterKey: 'occasion' },
  { title: 'Luxury Hampers',        slug: 'hampers',  url: '/category/hampers',    filterKey: 'category' },
];

// Simple module-level cache so the shop page never re-fetches within the same session
let cachedProducts: any[] | null = null;

export default function ShopPage() {
  const [products, setProducts] = useState<any[]>(cachedProducts ?? []);
  const [loading, setLoading] = useState(!cachedProducts);

  useEffect(() => {
    if (cachedProducts) return; // already have real data, skip fetch
    async function load() {
      try {
        const res = await fetch('/api/v1/products');
        if (res.ok) {
          const data = await res.json();
          const raw = Array.isArray(data) ? data : [];
          const mapped = raw.map((p: any) => ({
            ...p,
            imageUrl: p.imageUrl || p.images?.[0]?.url || null,
          }));
          cachedProducts = mapped;
          setProducts(mapped);
        }
      } catch {
        // stay on skeleton, nothing to show
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  function getSectionProducts(section: typeof sections[0]) {
    const filtered = products.filter((p: any) => {
      const cats: string[] = (p.categories || []).map((c: any) =>
        typeof c === 'string' ? c.toLowerCase() : (c.slug || c.name || '').toLowerCase()
      );
      const occs: string[] = (p.occasions || []).map((o: any) =>
        typeof o === 'string' ? o.toLowerCase() : (o.slug || o.name || '').toLowerCase()
      );
      if (section.filterKey === 'category') {
        return cats.includes(section.slug) || (p.slug || '').includes(section.slug);
      }
      return occs.includes(section.slug) || (p.slug || '').includes(section.slug);
    });
    return (filtered.length > 0 ? filtered : products).slice(0, 6);
  }

  // 5 skeleton slots shown while loading
  const skeletonSlots = Array.from({ length: 5 });

  return (
    <main style={{ minHeight: '100vh', background: '#FFFFFF', paddingBottom: 100 }}>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {sections.map((section) => {
          const sectionProducts = getSectionProducts(section);

          return (
            <section
              key={section.slug}
              className="shop-section"
              style={{ background: '#FFFFFF', padding: '24px 0', borderTop: '6px solid #F5F5F5' }}
            >
              {/* Section header */}
              <div
                className="section-header-row"
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: 16,
                  padding: '0 16px',
                }}
              >
                <h2
                  className="section-heading"
                  style={{ fontSize: 18, fontWeight: 900, color: '#111111', letterSpacing: '-0.3px' }}
                >
                  {section.title}
                </h2>
                <Link
                  href={section.url}
                  style={{ fontSize: 13, fontWeight: 800, color: '#b22153', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 4 }}
                >
                  View all <BsChevronRight size={10} />
                </Link>
              </div>

              {/* Product scroll row */}
              <div
                className="no-scrollbar desktop-product-grid"
                style={{
                  display: 'flex',
                  gap: 12,
                  overflowX: 'auto',
                  paddingLeft: 16,
                  paddingRight: 16,
                  paddingBottom: 8,
                  scrollSnapType: 'x mandatory',
                  scrollPaddingLeft: 16,
                  WebkitOverflowScrolling: 'touch',
                  boxSizing: 'border-box',
                  alignItems: 'stretch',
                }}
              >
                {loading
                  ? skeletonSlots.map((_, i) => (
                      <div key={i} style={{ width: 160, minWidth: 160, maxWidth: 160, flexShrink: 0, scrollSnapAlign: 'start', display: 'flex' }}>
                        <ProductCard name="" slug="" price={0} skeleton />
                      </div>
                    ))
                  : sectionProducts.map((p: any) => (
                      <div key={p.id} style={{ width: 160, minWidth: 160, maxWidth: 160, flexShrink: 0, scrollSnapAlign: 'start', display: 'flex' }}>
                        <ProductCard {...p} />
                      </div>
                    ))
                }
              </div>
            </section>
          );
        })}
      </div>
    </main>
  );
}
