'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  BsSearch,
  BsGeoAltFill,
  BsChevronDown,
  BsBag,
  BsX,
  BsCrosshair,
} from 'react-icons/bs';

interface MobileHomeHeaderProps {
  cartCount?: number;
}

export default function MobileHomeHeader({ cartCount = 0 }: MobileHomeHeaderProps) {
  const [showLocation, setShowLocation] = useState(false);
  const router = useRouter();

  const goToSearch = () => router.push('/search');

  return (
    <>
      {/* ── Mobile-only header — scrolls with the page, not sticky ── */}
      <div
        className="sm:hidden"
        style={{ background: '#FFFFFF', borderBottom: '1px solid #F0F0F0' }}
      >
        {/* Row 1: Location + Cart */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            padding: '14px 20px 10px',
            gap: 12,
          }}
        >
          {/* Location pill */}
          <button
            onClick={() => setShowLocation(true)}
            style={{
              flex: 1,
              minWidth: 0,
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: 0,
            }}
          >
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: 10,
                background: '#FCF1F6',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <BsGeoAltFill size={16} color="#b22153" />
            </div>

            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                minWidth: 0,
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                <span
                  style={{
                    fontSize: 15,
                    fontWeight: 800,
                    color: '#111111',
                    letterSpacing: '-0.2px',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  }}
                >
                  Kochi, Kerala
                </span>
                <BsChevronDown size={11} color="#888" />
              </div>
              <span style={{ fontSize: 11, fontWeight: 500, color: '#A9A0AE', lineHeight: 1.2 }}>
                Tap to change location
              </span>
            </div>
          </button>

          {/* Cart button */}
          <Link
            href="/cart"
            style={{
              position: 'relative',
              width: 40,
              height: 40,
              borderRadius: 12,
              background: '#F5F5F5',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#111111',
              textDecoration: 'none',
              flexShrink: 0,
            }}
          >
            <BsBag size={19} />
            {cartCount > 0 && (
              <span
                style={{
                  position: 'absolute',
                  top: -5,
                  right: -5,
                  minWidth: 18,
                  height: 18,
                  background: '#b22153',
                  color: 'white',
                  fontSize: 10,
                  fontWeight: 800,
                  borderRadius: 999,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '0 4px',
                  border: '2px solid white',
                }}
              >
                {cartCount > 99 ? '99+' : cartCount}
              </span>
            )}
          </Link>
        </div>

        {/* Row 2: Search bar — tapping opens search page */}
        <div style={{ padding: '0 20px 14px' }}>
          <button
            onClick={goToSearch}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              background: '#F5F0F3',
              border: '1.5px solid transparent',
              borderRadius: 14,
              padding: '0 14px',
              height: 46,
              width: '100%',
              cursor: 'pointer',
              fontFamily: 'inherit',
            }}
          >
            <BsSearch size={15} color="#BEB4C4" />
            <span
              style={{
                flex: 1,
                textAlign: 'left',
                fontSize: 13,
                fontWeight: 500,
                color: '#A9A0AE',
              }}
            >
              Search cakes, flowers, hampers…
            </span>
          </button>
        </div>
      </div>

      {/* ── Location bottom sheet ── */}
      {showLocation && (
        <>
          {/* Backdrop */}
          <div
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 3500,
              background: 'rgba(0,0,0,0.5)',
            }}
            className="sm:hidden"
            onClick={() => setShowLocation(false)}
          />

          {/* Sheet */}
          <div
            className="sm:hidden"
            style={{
              position: 'fixed',
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: 3501,
              background: 'white',
              borderTopLeftRadius: 24,
              borderTopRightRadius: 24,
              padding: '8px 20px 40px',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Handle */}
            <div style={{ display: 'flex', justifyContent: 'center', padding: '10px 0 16px' }}>
              <div style={{ width: 36, height: 4, borderRadius: 2, background: '#E5E5E5' }} />
            </div>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: 20,
              }}
            >
              <h3 style={{ fontSize: 18, fontWeight: 900, color: '#111111', margin: 0 }}>
                Select Location
              </h3>
              <button
                onClick={() => setShowLocation(false)}
                style={{
                  background: '#F5F5F5',
                  border: 'none',
                  borderRadius: 10,
                  width: 32,
                  height: 32,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  color: '#111111',
                }}
              >
                <BsX size={20} />
              </button>
            </div>

            {/* Search */}
            <div
              style={{
                background: '#F5F5F5',
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                padding: '0 16px',
                height: 48,
                borderRadius: 12,
                marginBottom: 20,
              }}
            >
              <BsSearch size={14} color="#b22153" />
              <input
                placeholder="Search for area or street..."
                style={{
                  background: 'transparent',
                  border: 'none',
                  outline: 'none',
                  fontSize: 14,
                  flex: 1,
                  fontFamily: 'inherit',
                  color: '#111111',
                }}
              />
            </div>

            {/* Use current location */}
            <button
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                gap: 14,
                padding: '14px 0',
                borderBottom: '1px solid #F5F5F5',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                borderBottomWidth: 1,
                borderBottomStyle: 'solid',
                borderBottomColor: '#F5F5F5',
              }}
            >
              <div
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 12,
                  background: '#FCF1F6',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <BsCrosshair size={18} color="#b22153" />
              </div>
              <div style={{ textAlign: 'left' }}>
                <div style={{ fontSize: 14, fontWeight: 800, color: '#b22153' }}>
                  Use Current Location
                </div>
                <div style={{ fontSize: 11, color: '#5F5F5F', marginTop: 1 }}>Using GPS</div>
              </div>
            </button>

            {/* Saved addresses */}
            <div style={{ marginTop: 20 }}>
              <h4
                style={{
                  fontSize: 11,
                  fontWeight: 800,
                  color: '#A9A0AE',
                  textTransform: 'uppercase',
                  letterSpacing: '0.8px',
                  marginBottom: 12,
                }}
              >
                Saved Addresses
              </h4>
              <p
                style={{
                  fontSize: 13,
                  color: '#A9A0AE',
                  textAlign: 'center',
                  padding: '20px 0',
                }}
              >
                Login to view saved addresses
              </p>
            </div>
          </div>
        </>
      )}
    </>
  );
}
