'use client';

import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { BsBag, BsSearch, BsGeoAlt, BsChevronDown } from 'react-icons/bs';

export default function Header() {
  const [searchVal, setSearchVal] = useState('');
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isTop, setIsTop] = useState(true);
  const [searchFocused, setSearchFocused] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const controlNavbar = () => {
      if (typeof window !== 'undefined') {
        const currentScrollY = window.scrollY;
        if (currentScrollY < 10) {
          setIsVisible(true);
          setIsTop(true);
        } else {
          setIsTop(false);
          if (currentScrollY > lastScrollY && currentScrollY > 80) {
            setIsVisible(false);
          } else {
            setIsVisible(true);
          }
        }
        setLastScrollY(currentScrollY);
      }
    };
    window.addEventListener('scroll', controlNavbar, { passive: true });
    return () => window.removeEventListener('scroll', controlNavbar);
  }, [lastScrollY]);

  return (
    <header
      ref={headerRef}
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        background: isTop ? '#FFFFFF' : 'rgba(255, 253, 254, 0.92)',
        backdropFilter: isTop ? 'none' : 'blur(16px) saturate(180%)',
        WebkitBackdropFilter: isTop ? 'none' : 'blur(16px) saturate(180%)',
        borderBottom: '1px solid rgba(198, 172, 192, 0.15)',
        transform: isVisible ? 'translateY(0)' : 'translateY(-100%)',
        transition: 'transform 0.45s cubic-bezier(0.34, 1.56, 0.64, 1), background 0.4s ease, box-shadow 0.4s ease, backdrop-filter 0.4s ease',
        boxShadow: isTop ? 'none' : '0 4px 24px rgba(139, 82, 107, 0.08)',
      }}
    >
      {/* ── Main row ── */}
      <div style={{
        maxWidth: 1280,
        margin: '0 auto',
        padding: '0 16px',
        height: 60,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 12,
      }}>
        {/* Left: Logo + Location */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexShrink: 0 }}>
          {/* Desktop Logo */}
          <Link href="/" style={{ display: 'none' }} className="md:!flex">
            <img src="/logo.png" alt="Cesto" style={{ height: 40, width: 'auto', objectFit: 'contain' }} />
          </Link>

          {/* Location picker */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            cursor: 'pointer',
            padding: '6px 12px 6px 8px',
            borderRadius: 14,
            transition: 'background 0.25s ease',
          }}
            onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(251, 224, 235, 0.5)')}
            onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
          >
            <span style={{ color: '#b22153', display: 'flex', alignItems: 'center' }}>
              <BsGeoAlt size={18} />
            </span>
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                <span style={{ fontSize: 14, fontWeight: 800, color: '#171717', letterSpacing: '-0.3px' }}>Kochi</span>
                <span style={{ color: '#b22153', display: 'flex', alignItems: 'center' }}>
                  <BsChevronDown size={11} />
                </span>
              </div>
              <span style={{ fontSize: 10, fontWeight: 600, color: '#A9A0AE', lineHeight: 1.2 }}>Kerala, India</span>
            </div>
          </div>
        </div>

        {/* Center: Search bar (desktop) */}
        <div style={{
          flex: 1,
          maxWidth: 520,
          position: 'relative',
          display: 'none',
        }} className="sm:!block">
          <input
            style={{
              width: '100%',
              height: 44,
              padding: '0 44px 0 20px',
              background: searchFocused ? '#FFFFFF' : 'rgba(252, 247, 248, 0.8)',
              border: searchFocused ? '1.5px solid rgba(178, 33, 83, 0.3)' : '1.5px solid rgba(198, 172, 192, 0.18)',
              borderRadius: 16,
              fontSize: 13,
              fontWeight: 500,
              color: '#171717',
              outline: 'none',
              transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
              boxShadow: 'none',
            }}
            placeholder="Search for cakes, flowers, hampers..."
            value={searchVal}
            onChange={(e) => setSearchVal(e.target.value)}
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setSearchFocused(false)}
            aria-label="Search"
          />
          <span style={{
            position: 'absolute',
            right: 16,
            top: '50%',
            transform: 'translateY(-50%)',
            color: searchFocused ? '#b22153' : '#BEB4C4',
            transition: 'color 0.3s ease',
            pointerEvents: 'none',
            display: 'flex',
            alignItems: 'center',
          }}>
            <BsSearch size={15} />
          </span>
        </div>

        {/* Right: Cart */}
        <Link href="/cart" style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          padding: '8px 12px',
          borderRadius: 14,
          color: '#3C3C3C',
          transition: 'all 0.25s ease',
          textDecoration: 'none',
          flexShrink: 0,
        }}
          onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(251, 224, 235, 0.4)'; e.currentTarget.style.color = '#b22153'; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#3C3C3C'; }}
        >
          <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
            <BsBag size={20} />
            <span style={{
              position: 'absolute',
              top: -6,
              right: -8,
              minWidth: 16,
              height: 16,
              background: '#b22153',
              color: 'white',
              fontSize: 9,
              fontWeight: 800,
              borderRadius: 999,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '0 4px',
              boxShadow: 'none',
              border: '2px solid white',
            }}>0</span>
          </div>
          <span style={{ fontSize: 13, fontWeight: 700, display: 'none' }} className="lg:!inline">Cart</span>
        </Link>
      </div>

      {/* ── Mobile search bar ── */}
      <div style={{ padding: '0 16px 14px', display: 'block' }} className="sm:!hidden">
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          background: 'rgba(252, 247, 248, 0.9)',
          border: '1.5px solid rgba(198, 172, 192, 0.15)',
          borderRadius: 16,
          padding: '0 16px',
          height: 44,
          transition: 'all 0.4s ease',
        }}>
          <span style={{ color: '#b22153', display: 'flex', alignItems: 'center', flexShrink: 0 }}>
            <BsSearch size={15} />
          </span>
          <input
            style={{
              flex: 1,
              background: 'transparent',
              border: 'none',
              outline: 'none',
              fontSize: 13,
              fontWeight: 500,
              color: '#171717',
            }}
            placeholder="Search for cakes, flowers..."
            aria-label="Search"
          />
        </div>
      </div>

      {/* ── Desktop category sub-nav ── */}
      <nav style={{
        borderTop: '1px solid rgba(198, 172, 192, 0.10)',
        padding: '4px 0',
        background: 'transparent',
        display: 'none',
      }} className="md:!block" aria-label="Categories">
        <div style={{
          maxWidth: 1280,
          margin: '0 auto',
          padding: '0 16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 4,
        }}>
          {[
            { label: 'Flowers', href: '/category/flowers' },
            { label: 'Cakes', href: '/category/cakes' },
            { label: 'Hampers', href: '/category/hampers' },
            { label: 'Chocolates', href: '/category/chocolates' },
            { label: 'Personalised', href: '/category/personalised' },
            { label: 'Jewellery', href: '/category/jewellery' },
            { label: 'Crafts', href: '/category/crafts' },
            { label: 'Treats', href: '/category/treats' },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              style={{
                padding: '6px 10px',
                fontSize: 11,
                fontWeight: 700,
                color: '#5F5F5F',
                textTransform: 'uppercase',
                letterSpacing: '0.8px',
                transition: 'color 0.2s ease',
                whiteSpace: 'nowrap',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#b22153')}
              onMouseLeave={(e) => (e.currentTarget.style.color = '#5F5F5F')}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}
