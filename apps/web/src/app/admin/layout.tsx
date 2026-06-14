'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  BsSpeedometer,
  BsBoxSeam,
  BsCart3,
  BsTag,
  BsShieldLock,
  BsBoxArrowLeft,
} from 'react-icons/bs';
import { adminApiClient } from '@/lib/api-client';
import { clearAdminCache } from '@/hooks/useAdminGuard';

const mobileNavItems = [
  { href: '/admin/dashboard', label: 'Dashboard', icon: BsSpeedometer },
  { href: '/admin/products',  label: 'Products',  icon: BsBoxSeam },
  { href: '/admin/orders',    label: 'Orders',    icon: BsCart3 },
  { href: '/admin/categories',label: 'Sections',  icon: BsTag },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  // Clear admin session and go back to the store
  const handleExitAdmin = () => {
    clearAdminCache();         // wipe module-level cache first
    adminApiClient.clearTokens();
    // Hard navigate so the customer app reinitialises cleanly
    window.location.href = '/';
  };

  // Login page — no shell
  if (pathname === '/admin/login' || pathname === '/admin') {
    return <>{children}</>;
  }

  return (
    <div style={{ minHeight: '100dvh', background: '#F8F9FA' }}>

      {/* ── Desktop top nav ── */}
      <header
        className="hidden md:flex"
        style={{
          background: '#1a3a3a',
          height: 56,
          alignItems: 'center',
          padding: '0 24px',
          gap: 32,
          position: 'sticky',
          top: 0,
          zIndex: 50,
          borderBottom: '1px solid rgba(255,255,255,0.08)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <BsShieldLock size={18} color="rgba(255,255,255,0.8)" />
          <span style={{ fontSize: 13, fontWeight: 900, color: 'white', letterSpacing: '1px', textTransform: 'uppercase' }}>
            Cesto Admin
          </span>
        </div>

        <nav style={{ display: 'flex', gap: 4 }}>
          {mobileNavItems.map(({ href, label }) => {
            const active = pathname === href || (href !== '/admin/dashboard' && pathname.startsWith(href));
            return (
              <Link
                key={href}
                href={href}
                style={{
                  padding: '6px 14px',
                  borderRadius: 8,
                  fontSize: 13,
                  fontWeight: 700,
                  textDecoration: 'none',
                  color: active ? 'white' : 'rgba(255,255,255,0.55)',
                  background: active ? 'rgba(255,255,255,0.12)' : 'transparent',
                  transition: 'all 0.15s',
                }}
              >
                {label}
              </Link>
            );
          })}
        </nav>

        {/* Exit admin — clears admin session, goes to store */}
        <button
          onClick={handleExitAdmin}
          style={{
            marginLeft: 'auto',
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            fontSize: 12,
            color: 'rgba(255,255,255,0.45)',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            fontWeight: 600,
            fontFamily: 'inherit',
            padding: 0,
          }}
        >
          <BsBoxArrowLeft size={14} />
          Back to Store
        </button>
      </header>

      {/* ── Mobile top bar ── */}
      <header
        className="flex md:hidden"
        style={{
          background: '#1a3a3a',
          height: 52,
          alignItems: 'center',
          padding: '0 16px',
          position: 'sticky',
          top: 0,
          zIndex: 50,
          justifyContent: 'space-between',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <BsShieldLock size={16} color="rgba(255,255,255,0.8)" />
          <span style={{ fontSize: 13, fontWeight: 900, color: 'white', letterSpacing: '0.5px', textTransform: 'uppercase' }}>
            Admin
          </span>
        </div>

        {/* Exit admin button on mobile too */}
        <button
          onClick={handleExitAdmin}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 5,
            fontSize: 12,
            color: 'rgba(255,255,255,0.5)',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            fontWeight: 600,
            fontFamily: 'inherit',
            padding: 0,
          }}
        >
          <BsBoxArrowLeft size={13} />
          Store
        </button>
      </header>

      {/* ── Page content — extra bottom padding for mobile nav ── */}
      <div style={{ paddingBottom: 72 }} className="md:!pb-0">
        {children}
      </div>

      {/* ── Mobile bottom nav ── */}
      <nav
        className="flex md:hidden"
        style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          background: '#FFFFFF',
          borderTop: '1px solid #E5E7EB',
          zIndex: 50,
          paddingBottom: 'env(safe-area-inset-bottom)',
        }}
      >
        <div
          style={{
            height: 60,
            minHeight: 60,
            maxHeight: 60,
            display: 'flex',
            width: '100%',
            overflow: 'hidden',
          }}
        >
          {mobileNavItems.map(({ href, label, icon: Icon }) => {
            const active = pathname === href || (href !== '/admin/dashboard' && pathname.startsWith(href));
            return (
              <Link
                key={href}
                href={href}
                style={{
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 3,
                  textDecoration: 'none',
                  color: active ? '#1a3a3a' : '#9CA3AF',
                  position: 'relative',
                  WebkitTapHighlightColor: 'transparent',
                }}
              >
                {active && (
                  <div style={{
                    position: 'absolute',
                    top: 0,
                    width: 28,
                    height: 3,
                    background: '#1a3a3a',
                    borderRadius: '0 0 4px 4px',
                  }} />
                )}
                <Icon size={20} />
                <span style={{ fontSize: 10, fontWeight: active ? 800 : 600 }}>{label}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
