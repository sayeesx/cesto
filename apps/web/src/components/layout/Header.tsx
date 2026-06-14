'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { BsBag, BsSearch, BsGeoAlt, BsChevronDown } from 'react-icons/bs';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const goToSearch = () => router.push('/search');

  return (
    <header
      className="hidden md:block"
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        background: scrolled ? 'rgba(255, 253, 254, 0.97)' : '#FFFFFF',
        backdropFilter: scrolled ? 'blur(12px) saturate(180%)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(12px) saturate(180%)' : 'none',
        borderBottom: '1px solid rgba(198, 172, 192, 0.15)',
        boxShadow: scrolled ? '0 2px 16px rgba(139, 82, 107, 0.07)' : 'none',
        transition: 'background 0.3s ease, box-shadow 0.3s ease',
      }}
    >
      {/* ── Main row: Logo + Search + Cart ── */}
      <div style={{
        maxWidth: 1280,
        margin: '0 auto',
        padding: '0 16px',
        height: 60,
        display: 'flex',
        alignItems: 'center',
        gap: 12,
      }}>

        {/* Logo — desktop only */}
        <Link href="/" style={{ display: 'none', flexShrink: 0 }} className="md:!flex">
          <img src="/logo.png" alt="Cesto" style={{ height: 38, width: 'auto', objectFit: 'contain' }} />
        </Link>

        {/* Location — desktop only */}
        <div
          style={{
            display: 'none',
            alignItems: 'center',
            gap: 6,
            cursor: 'pointer',
            padding: '6px 10px',
            borderRadius: 12,
            flexShrink: 0,
          }}
          className="md:!flex"
          onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(251,224,235,0.5)')}
          onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
        >
          <BsGeoAlt size={16} color="#b22153" />
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
              <span style={{ fontSize: 13, fontWeight: 800, color: '#171717' }}>Kochi</span>
              <BsChevronDown size={10} color="#b22153" />
            </div>
            <span style={{ fontSize: 10, fontWeight: 600, color: '#A9A0AE', display: 'block', lineHeight: 1 }}>Kerala, India</span>
          </div>
        </div>

        {/* Mobile: Logo centered */}
        <Link href="/" style={{ flex: 1, display: 'flex', justifyContent: 'center' }} className="md:!hidden">
          <img src="/logo.png" alt="Cesto" style={{ height: 34, width: 'auto', objectFit: 'contain' }} />
        </Link>

        {/* Desktop Search — clicking opens search page */}
        <div
          style={{ flex: 1, maxWidth: 560, position: 'relative', display: 'none', cursor: 'pointer' }}
          className="md:!block"
          onClick={goToSearch}
        >
          <div
            style={{
              width: '100%',
              height: 42,
              padding: '0 44px 0 18px',
              background: '#F7F2F5',
              border: '1.5px solid rgba(198,172,192,0.2)',
              borderRadius: 14,
              fontSize: 13,
              fontWeight: 500,
              color: '#A9A0AE',
              display: 'flex',
              alignItems: 'center',
              userSelect: 'none',
            }}
          >
            Search for cakes, flowers, hampers…
          </div>
          <span style={{
            position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)',
            color: '#BEB4C4',
            pointerEvents: 'none', display: 'flex', alignItems: 'center',
          }}>
            <BsSearch size={14} />
          </span>
        </div>

        {/* Cart */}
        <Link
          href="/cart"
          style={{
            display: 'flex', alignItems: 'center', gap: 6,
            padding: '8px 10px', borderRadius: 12,
            color: '#3C3C3C', textDecoration: 'none', flexShrink: 0,
            transition: 'all 0.2s ease',
          }}
          onMouseEnter={(e: React.MouseEvent<HTMLAnchorElement>) => { e.currentTarget.style.background = 'rgba(251,224,235,0.4)'; e.currentTarget.style.color = '#b22153'; }}
          onMouseLeave={(e: React.MouseEvent<HTMLAnchorElement>) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#3C3C3C'; }}
        >
          <div style={{ position: 'relative' }}>
            <BsBag size={22} />
            <span style={{
              position: 'absolute', top: -5, right: -7,
              minWidth: 16, height: 16,
              background: '#b22153', color: 'white',
              fontSize: 9, fontWeight: 800, borderRadius: 999,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              padding: '0 3px', border: '2px solid white',
            }}>0</span>
          </div>
          <span style={{ fontSize: 13, fontWeight: 700, display: 'none' }} className="lg:!inline">Cart</span>
        </Link>
      </div>

      {/* ── Desktop category sub-nav ── */}
      <nav
        style={{ borderTop: '1px solid rgba(198,172,192,0.10)', padding: '0', display: 'none' }}
        className="md:!block"
        aria-label="Categories"
      >
        <div style={{
          maxWidth: 1280, margin: '0 auto', padding: '0 16px',
          display: 'flex', alignItems: 'center', gap: 2,
        }}>
          {[
            { label: 'Flowers',     href: '/category/flowers' },
            { label: 'Cakes',       href: '/category/cakes' },
            { label: 'Hampers',     href: '/category/hampers' },
            { label: 'Chocolates',  href: '/category/chocolates' },
            { label: 'Personalised',href: '/category/personalised' },
            { label: 'Jewellery',   href: '/category/jewellery' },
            { label: 'Crafts',      href: '/category/crafts' },
            { label: 'Treats',      href: '/category/treats' },
            { label: '🎉 Occasions', href: '/occasion' },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              style={{
                padding: '8px 12px',
                fontSize: 11, fontWeight: 700,
                color: '#5F5F5F',
                textTransform: 'uppercase', letterSpacing: '0.7px',
                whiteSpace: 'nowrap', textDecoration: 'none',
                transition: 'color 0.15s',
              }}
              onMouseEnter={(e: React.MouseEvent<HTMLAnchorElement>) => (e.currentTarget.style.color = '#b22153')}
              onMouseLeave={(e: React.MouseEvent<HTMLAnchorElement>) => (e.currentTarget.style.color = '#5F5F5F')}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}
