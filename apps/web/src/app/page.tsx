'use client';

import Header from '@/components/layout/Header';
import MobileHomeHeader from '@/components/layout/MobileHomeHeader';
import Footer from '@/components/layout/Footer';
import ProductCard from '@/components/product/ProductCard';
import HeroCarousel from '@/components/home/HeroCarousel';
import Link from 'next/link';
import { useState, useEffect } from 'react';

/* ── Static categories — always use these, never overwrite from API ── */
const STATIC_CATEGORIES = [
  { name: 'Flowers',     imageUrl: '/flowers.webp',     slug: 'flowers' },
  { name: 'Cakes',       imageUrl: '/cakes.webp',        slug: 'cakes' },
  { name: 'Hampers',     imageUrl: '/hampers.webp',      slug: 'hampers' },
  { name: 'Chocolates',  imageUrl: '/chocolates.webp',   slug: 'chocolates' },
  { name: 'Personalised',imageUrl: '/personalised.webp', slug: 'personalised' },
  { name: 'Jewellery',   imageUrl: '/jewellery.webp',    slug: 'jewellery' },
  { name: 'Crafts',      imageUrl: '/crafts.webp',       slug: 'crafts' },
  { name: 'Treats',      imageUrl: '/treats.webp',       slug: 'treats' },
];

/* ── Static data ── */
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

import { apiClient } from '@/lib/api-client';
import { useAuth } from '@/context/AuthContext';

// Module-level cache — survives client-side navigation, cleared on hard reload
let _productCache: { data: any[]; ts: number } | null = null;
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

function getCache() {
  if (_productCache && Date.now() - _productCache.ts < CACHE_TTL) return _productCache.data;
  return null;
}

export default function HomePage() {
  const cached = getCache();
  const [products, setProducts] = useState<any[]>(cached ?? []);
  const [loading, setLoading] = useState(!cached);
  const { user } = useAuth();

  useEffect(() => {
    const cached = getCache();
    if (cached) { setProducts(cached); setLoading(false); return; }
    async function load() {
      // 8 second timeout — don't hang the page forever if the API is slow
      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), 8000);
      try {
        const prodData = await apiClient.getProducts();
        clearTimeout(timer);
        const arr = Array.isArray(prodData) ? prodData : [];
        _productCache = { data: arr, ts: Date.now() };
        setProducts(arr);
      } catch (err) {
        clearTimeout(timer);
        console.error('Failed to load homepage data', err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const bestsellers = products.filter((p) => p.isBestseller);

  return (
    <>
      {/* ── PROMO STRIP — always first, fixed on desktop ── */}
      <div className="promo-strip">
        <div className="promo-strip__track">
          <span className="promo-strip__item">⚡ welcomeBonus 20% off on first order</span>
          <span className="promo-strip__item">🎁 freeShipping on orders above ₹999</span>
          <span className="promo-strip__item">⚡ welcomeBonus 20% off on first order</span>
          <span className="promo-strip__item">🎁 freeShipping on orders above ₹999</span>
        </div>
      </div>

      {/* Desktop Header — hidden on mobile */}
      <Header />

      {/* Desktop spacer: pushes content below fixed promo (28px) + fixed header (~110px) */}
      <div className="desktop-page-offset" aria-hidden="true" />

      {/* Mobile Home Header — scrolls with the page, only shown on mobile */}
      <MobileHomeHeader cartCount={0} />

      <main className="home-main" style={{ paddingBottom: 20, width: '100%', overflow: 'hidden', background: '#FFFFFF' }}>
        {/* Mobile bottom padding so last section isn't hidden behind the nav dock (60px) */}
        <style>{`@media (max-width: 767px) { .home-main { padding-bottom: 80px !important; } }`}</style>
        
        {/* ── HERO CAROUSEL ── */}
        <div className="hero-carousel-wrapper">
          <HeroCarousel />
        </div>

        {/* ── Quick Categories — always static, never from API ── */}
        <section style={{ background: '#FFFFFF', padding: '10px 0 24px' }}>
          <div
            className="desktop-category-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: 12,
              padding: '0 16px'
            }}
          >
            {STATIC_CATEGORIES.map((cat) => (
              <Link key={cat.slug} href={`/category/${cat.slug}`} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, textDecoration: 'none' }}>
                <div style={{ width: 76, height: 76, borderRadius: 20, background: '#FCF9FA', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #F8EDF4' }}>
                  <img src={cat.imageUrl} alt={cat.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <span style={{ fontSize: 10, fontWeight: 800, color: '#3C3C3C', textAlign: 'center' }}>{cat.name}</span>
              </Link>
            ))}
          </div>
        </section>

        {/* ── Occasions ── */}
        <section style={{ background: '#FFFFFF', padding: '24px 0' }}>
          <div className="section-header-row" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16, padding: '0 16px' }}>
            <h2 className="section-heading" style={{ fontSize: 17, fontWeight: 900, color: '#111111' }}>Shop by Occasion</h2>
          </div>
          <div className="no-scrollbar occasions-row" style={{ display: 'flex', gap: 12, overflowX: 'auto', padding: '0 16px 12px' }}>
            {occasions.map((occ) => (
              <Link key={occ.slug} href={`/occasion/${occ.slug}`} style={{ flexShrink: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, width: 76, textDecoration: 'none' }}>
                <div style={{ width: 68, height: 68, borderRadius: '50%', background: '#FFFFFF', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #F5F5F5' }}>
                  <img src={occ.img} alt={occ.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <span style={{ fontSize: 10, fontWeight: 800, color: '#3C3C3C', textAlign: 'center' }}>{occ.name}</span>
              </Link>
            ))}
            <div style={{ flexShrink: 0, width: 4 }} />
          </div>
        </section>

        {/* ── Bestsellers ── */}
        <section style={{ background: '#FFFFFF', padding: '24px 0' }}>
          <div className="section-header-row" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16, padding: '0 16px' }}>
            <h2 className="section-heading" style={{ fontSize: 17, fontWeight: 900, color: '#111111' }}>Bestsellers</h2>
            <Link href="/shop" style={{ fontSize: 12, fontWeight: 800, color: '#b22153', textDecoration: 'none' }}>View all</Link>
          </div>
          {/* Always render card-shaped items — skeleton when loading, real when loaded.
              This prevents the visual "flash" between two different card styles. */}
          <div className="no-scrollbar desktop-product-grid" style={{ display: 'flex', gap: 12, overflowX: 'auto', paddingBottom: 12, alignItems: 'stretch' }}>
            {(loading
              ? Array.from({ length: 5 }).map((_, i) => ({ id: `sk-${i}`, _skeleton: true }))
              : (bestsellers.length > 0 ? bestsellers : products.slice(0, 6))
            ).map((product: any, index: number) => (
              <div
                key={product.id}
                style={{
                  width: 160,
                  minWidth: 160,
                  maxWidth: 160,
                  flexShrink: 0,
                  marginLeft: index === 0 ? 16 : 0,
                  display: 'flex',
                }}
              >
                {product._skeleton
                  ? <ProductCard name="" slug="" price={0} skeleton />
                  : <ProductCard {...product} />}
              </div>
            ))}
            <div className="scroll-spacer" style={{ width: 16, flexShrink: 0 }} />
          </div>
        </section>

        {/* ── Father's Day Section ── */}
        <section style={{ background: '#EFF6FF', padding: '0 0 28px', margin: '8px 0' }}>

          {/* Banner — text left, raw father.webp right, blue theme */}
          <div style={{
            display: 'flex',
            alignItems: 'stretch',
            minHeight: 150,
            overflow: 'hidden',
            background: 'linear-gradient(135deg, #1e3a8a 0%, #2563eb 100%)',
          }}>
            {/* Text block */}
            <div style={{ padding: '22px 20px', flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <p style={{ fontSize: 10, fontWeight: 800, color: 'rgba(219,234,254,0.85)', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: 4 }}>June 15</p>
              <h2 style={{ fontSize: 22, fontWeight: 900, color: '#FFFFFF', lineHeight: 1.1, letterSpacing: '-0.5px', margin: 0 }}>Father&apos;s Day</h2>
              <p style={{ fontSize: 12, color: 'rgba(219,234,254,0.9)', fontWeight: 600, margin: '5px 0 14px', maxWidth: 180 }}>
                Make Dad feel special with curated gifts
              </p>
              <Link href="/occasion/fathers-day" style={{
                background: '#FFFFFF', color: '#1e3a8a',
                padding: '8px 16px', borderRadius: 10,
                fontSize: 12, fontWeight: 800,
                textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 5,
                alignSelf: 'flex-start',
              }}>
                Shop Gifts →
              </Link>
            </div>

            {/* father.webp — full image, no crop */}
            <div style={{
              width: 140,
              flexShrink: 0,
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'center',
            }}>
              <img
                src="/father.webp"
                alt="Father's Day"
                style={{
                  width: '100%',
                  height: 'auto',
                  display: 'block',
                  objectFit: 'contain',
                  maxHeight: 200,
                }}
              />
            </div>
          </div>

          {/* Products row */}
          {products.length > 0 && (
            <>
              <div style={{ padding: '16px 16px 10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3 style={{ fontSize: 15, fontWeight: 900, color: '#1e3a8a' }}>Gifts for Dad</h3>
                <Link href="/occasion/fathers-day" style={{ fontSize: 12, fontWeight: 800, color: '#2563eb', textDecoration: 'none' }}>View all</Link>
              </div>
              <div className="no-scrollbar desktop-product-grid" style={{ display: 'flex', gap: 12, overflowX: 'auto', paddingBottom: 8, alignItems: 'stretch' }}>
                {products.slice(0, 6).map((product: any, index: number) => (
                  <div key={product.id} style={{ width: 160, minWidth: 160, maxWidth: 160, flexShrink: 0, marginLeft: index === 0 ? 16 : 0, display: 'flex' }}>
                    <ProductCard {...product} />
                  </div>
                ))}
                <div className="scroll-spacer" style={{ width: 16, flexShrink: 0 }} />
              </div>
            </>
          )}
        </section>

        {/* ── New Arrivals ── */}
        {products.length > 0 && (
          <section style={{ background: '#FFFFFF', padding: '24px 0' }}>
            <div className="section-header-row" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16, padding: '0 16px' }}>
              <h2 className="section-heading" style={{ fontSize: 17, fontWeight: 900, color: '#111111' }}>New Arrivals</h2>
              <Link href="/shop?sort=new" style={{ fontSize: 12, fontWeight: 800, color: '#b22153', textDecoration: 'none' }}>View all</Link>
            </div>
            <div className="no-scrollbar desktop-product-grid" style={{ display: 'flex', gap: 12, overflowX: 'auto', paddingBottom: 12, alignItems: 'stretch' }}>
              {[...products].reverse().slice(0, 6).map((product: any, index: number) => (
                <div key={product.id} style={{ width: 160, minWidth: 160, maxWidth: 160, flexShrink: 0, marginLeft: index === 0 ? 16 : 0, display: 'flex' }}>
                  <ProductCard {...product} />
                </div>
              ))}
              <div className="scroll-spacer" style={{ width: 16, flexShrink: 0 }} />
            </div>
          </section>
        )}

      </main>

      {/* ── LOCATION SELECTION MODAL — handled in MobileHomeHeader ── */}

      {/* Footer — desktop only */}
      <div className="hidden md:block">
        <Footer />
      </div>
    </>
  );
}
