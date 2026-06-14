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

// Demo / placeholder products — shown instantly while API responds
const demoProducts = [
  { id: 'd1', name: 'Sunrise Blooms Bouquet',   slug: 'sunrise-blooms',  price: 899,  compareAtPrice: 1199, deliveryEstimate: 'Same Day', isBestseller: true,  imageUrl: 'https://images.unsplash.com/photo-1591886960571-74d15c614741?auto=format&fit=crop&q=80&w=400' },
  { id: 'd2', name: 'Premium Chocolate Hamper', slug: 'choco-hamper',    price: 1499, compareAtPrice: 1999, deliveryEstimate: 'Same Day', isBestseller: true },
  { id: 'd3', name: 'Red Rose Arrangement',     slug: 'red-roses',       price: 699,  deliveryEstimate: 'Same Day' },
  { id: 'd4', name: 'Birthday Cake Delight',    slug: 'birthday-cake',   price: 599,  compareAtPrice: 749,  deliveryEstimate: '2 Hours',  isNew: true },
  { id: 'd5', name: 'Luxury Gift Hamper',       slug: 'luxury-hamper',   price: 2499, compareAtPrice: 2999, deliveryEstimate: 'Same Day' },
];

// Simple module-level cache so the shop page never re-fetches within the same session
let cachedProducts: any[] | null = null;

export default function ShopPage() {
  // Start with demo products immediately — no skeleton, no wait
  const [products, setProducts] = useState<any[]>(cachedProducts ?? demoProducts);
  const [fetching, setFetching] = useState(!cachedProducts);

  useEffect(() => {
    if (cachedProducts) return; // already have real data, skip fetch
    async function load() {
      try {
        const res = await fetch('/api/v1/products');
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data) && data.length > 0) {
            cachedProducts = data;
            setProducts(data);
          }
        }
      } catch {
        // keep demo products visible
      } finally {
        setFetching(false);
      }
    }
    load();
  }, []);

  function getSectionProducts(section: typeof sections[0]) {
    if (products === demoProducts || products.length === 0) {
      // Demo fallback — offset each section so they look distinct
      const offset = sections.indexOf(section);
      return [...demoProducts.slice(offset), ...demoProducts.slice(0, offset)].slice(0, 5);
    }

    // Real API data — filter by category/occasion
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

  return (
    <main style={{ minHeight: '100vh', background: '#FFFFFF', paddingBottom: 100 }}>

      {/* ── Sections ── */}
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

              {/* ── Product scroll row ──
                  KEY FIX: use paddingLeft/paddingRight on the container (not marginLeft on
                  the first child). scroll-snap honours padding, marginLeft does NOT — it
                  snaps cards to the container edge (left:0) ignoring the margin, so the
                  first card is always pulled to the extreme left no matter how far you scroll.
              ── */}
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
                {sectionProducts.map((p: any) => (
                  <div
                    key={p.id}
                    style={{
                      width: 160,
                      minWidth: 160,
                      maxWidth: 160,
                      flexShrink: 0,
                      scrollSnapAlign: 'start',
                      display: 'flex',
                    }}
                  >
                    <ProductCard {...p} />
                  </div>
                ))}
              </div>
            </section>
          );
        })}
      </div>

      {/* Subtle indicator that real data is loading in background */}
      {fetching && (
        <div style={{
          textAlign: 'center',
          padding: '8px 0 0',
          fontSize: 11,
          color: '#A9A0AE',
          fontWeight: 600,
        }}>
          Updating…
        </div>
      )}
    </main>
  );
}
