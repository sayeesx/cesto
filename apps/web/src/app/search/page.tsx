'use client';

import { Suspense } from 'react';
import { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { BsSearch, BsX, BsArrowLeft } from 'react-icons/bs';
import ProductCard from '@/components/product/ProductCard';
import { apiClient } from '@/lib/api-client';

// Module-level product cache shared with the home page
let _searchProductCache: { data: any[]; ts: number } | null = null;
const CACHE_TTL = 5 * 60 * 1000;

function getCachedProducts() {
  if (_searchProductCache && Date.now() - _searchProductCache.ts < CACHE_TTL) {
    return _searchProductCache.data;
  }
  return null;
}

const POPULAR = [
  'Roses', 'Birthday Cake', 'Hamper', 'Chocolates', 'Anniversary',
  'Sunflower', 'Personalised', 'Jewellery',
];

function SearchContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get('q') || '';

  const [query, setQuery] = useState(initialQuery);
  const [allProducts, setAllProducts] = useState<any[]>(getCachedProducts() ?? []);
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(getCachedProducts() === null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-focus the input on mount
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Load products once
  useEffect(() => {
    const cached = getCachedProducts();
    if (cached) {
      setAllProducts(cached);
      setLoading(false);
      return;
    }
    apiClient.getProducts()
      .then((data: any) => {
        const arr = Array.isArray(data) ? data : [];
        _searchProductCache = { data: arr, ts: Date.now() };
        setAllProducts(arr);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  // Filter whenever query or products change
  const search = useCallback((q: string, products: any[]) => {
    const term = q.trim().toLowerCase();
    if (!term) { setResults([]); return; }
    const filtered = products.filter((p) => {
      const name = (p.name || '').toLowerCase();
      const desc = (p.description || '').toLowerCase();
      const tags = (p.tags || []).join(' ').toLowerCase();
      const cats = (p.categories || []).map((c: any) =>
        typeof c === 'string' ? c : (c.name || c.slug || '')
      ).join(' ').toLowerCase();
      const occs = (p.occasions || []).map((o: any) =>
        typeof o === 'string' ? o : (o.name || o.slug || '')
      ).join(' ').toLowerCase();
      return name.includes(term) || desc.includes(term) || tags.includes(term) ||
             cats.includes(term) || occs.includes(term);
    });
    setResults(filtered);
  }, []);

  useEffect(() => {
    search(query, allProducts);
  }, [query, allProducts, search]);

  const handleClear = () => {
    setQuery('');
    inputRef.current?.focus();
  };

  const handlePopular = (tag: string) => {
    setQuery(tag);
    inputRef.current?.focus();
  };

  const showEmpty = query.trim().length > 0 && results.length === 0 && !loading;
  const showResults = query.trim().length > 0 && results.length > 0;
  const showIdle = query.trim().length === 0;

  return (
    <main
      style={{
        minHeight: '100dvh',
        background: '#FFFFFF',
        paddingBottom: 100,
      }}
    >
      {/* ── Header bar ── */}
      <div
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 50,
          background: '#FFFFFF',
          borderBottom: '1px solid #F0F0F0',
          padding: '12px 16px',
          display: 'flex',
          alignItems: 'center',
          gap: 10,
        }}
      >
        {/* Back button */}
        <button
          onClick={() => router.back()}
          aria-label="Go back"
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: 6,
            display: 'flex',
            alignItems: 'center',
            color: '#111',
            borderRadius: 8,
            flexShrink: 0,
          }}
        >
          <BsArrowLeft size={20} />
        </button>

        {/* Search input */}
        <div
          style={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            background: '#F5F0F3',
            border: '1.5px solid rgba(178,33,83,0.25)',
            borderRadius: 14,
            padding: '0 14px',
            height: 46,
          }}
        >
          <BsSearch size={15} color="#b22153" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search cakes, flowers, hampers…"
            autoComplete="off"
            autoCapitalize="off"
            spellCheck={false}
            style={{
              flex: 1,
              border: 'none',
              outline: 'none',
              background: 'transparent',
              fontSize: 14,
              fontWeight: 500,
              color: '#171717',
              fontFamily: 'inherit',
            }}
          />
          {query && (
            <button
              onClick={handleClear}
              aria-label="Clear search"
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: 0,
                display: 'flex',
                alignItems: 'center',
                color: '#BEB4C4',
                flexShrink: 0,
              }}
            >
              <BsX size={20} />
            </button>
          )}
        </div>
      </div>

      {/* ── Loading shimmer ── */}
      {loading && (
        <div style={{ padding: '24px 16px', display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12 }}>
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              style={{ height: 220, borderRadius: 16, background: '#F5F5F5', animation: 'pulse 1.5s ease-in-out infinite' }}
            />
          ))}
          <style>{`@keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.5} }`}</style>
        </div>
      )}

      {/* ── Idle state: popular searches ── */}
      {showIdle && !loading && (
        <div style={{ padding: '24px 16px' }}>
          <h2 style={{ fontSize: 13, fontWeight: 800, color: '#A9A0AE', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 16 }}>
            Popular searches
          </h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
            {POPULAR.map((tag) => (
              <button
                key={tag}
                onClick={() => handlePopular(tag)}
                style={{
                  padding: '8px 16px',
                  borderRadius: 24,
                  border: '1.5px solid #EAEAEA',
                  background: '#FAFAFA',
                  fontSize: 13,
                  fontWeight: 700,
                  color: '#374151',
                  cursor: 'pointer',
                  fontFamily: 'inherit',
                }}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ── Empty state ── */}
      {showEmpty && (
        <div style={{ padding: '60px 16px', textAlign: 'center' }}>
          <div style={{ fontSize: 40, marginBottom: 12 }}>🔍</div>
          <p style={{ fontSize: 16, fontWeight: 800, color: '#111', marginBottom: 6 }}>
            No results for &ldquo;{query}&rdquo;
          </p>
          <p style={{ fontSize: 13, color: '#9CA3AF', fontWeight: 500, marginBottom: 24 }}>
            Try a different keyword or browse our categories
          </p>
          <Link
            href="/shop"
            style={{
              display: 'inline-block',
              padding: '10px 24px',
              background: '#b22153',
              color: 'white',
              borderRadius: 12,
              fontSize: 13,
              fontWeight: 800,
              textDecoration: 'none',
            }}
          >
            Browse All Products
          </Link>
        </div>
      )}

      {/* ── Results grid ── */}
      {showResults && (
        <div style={{ padding: '16px 16px 0' }}>
          <p style={{ fontSize: 12, fontWeight: 700, color: '#9CA3AF', marginBottom: 16 }}>
            {results.length} result{results.length !== 1 ? 's' : ''} for &ldquo;{query}&rdquo;
          </p>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: 12,
            }}
          >
            {results.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
        </div>
      )}
    </main>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={
      <main style={{ minHeight: '100dvh', background: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ width: 36, height: 36, border: '3px solid #F5F0F3', borderTopColor: '#b22153', borderRadius: '50%', animation: 'spin 0.7s linear infinite' }} />
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </main>
    }>
      <SearchContent />
    </Suspense>
  );
}
