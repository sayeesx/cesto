'use client';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { BsGrid, BsBox, BsTag, BsClipboard, BsPeople, BsBoxArrowRight } from 'react-icons/bs';
import { useAuth } from '@/context/AuthContext';

const links = [
  { href: '/admin/dashboard',  label: 'Dashboard',  icon: BsGrid },
  { href: '/admin/products',   label: 'Products',   icon: BsBox },
  { href: '/admin/categories', label: 'Sections',   icon: BsTag },
  { href: '/admin/orders',     label: 'Orders',     icon: BsClipboard },
];

export default function AdminNav() {
  const pathname = usePathname();
  const router = useRouter();
  const { logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    router.push('/admin/login');
  };

  return (
    <nav style={{
      background: '#1a3a3a',
      color: 'white',
      padding: '0 24px',
      height: 56,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      position: 'sticky',
      top: 0,
      zIndex: 50,
    }}>
      {/* Logo */}
      <Link href="/admin/dashboard" style={{ display: 'flex', alignItems: 'center', gap: 8, textDecoration: 'none' }}>
        <span style={{ fontWeight: 900, fontSize: 16, color: 'white', letterSpacing: '-0.5px' }}>CESTO</span>
        <span style={{ background: 'rgba(255,255,255,0.15)', padding: '2px 8px', borderRadius: 6, fontSize: 10, fontWeight: 700, color: 'white' }}>ADMIN</span>
      </Link>

      {/* Nav links */}
      <div style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
        {links.map(({ href, label, icon: Icon }) => {
          const active = pathname.startsWith(href);
          return (
            <Link key={href} href={href} style={{
              display: 'flex', alignItems: 'center', gap: 6,
              padding: '6px 12px', borderRadius: 8,
              fontSize: 12, fontWeight: 700,
              color: active ? '#b22153' : 'rgba(255,255,255,0.7)',
              background: active ? 'rgba(178,33,83,0.15)' : 'transparent',
              textDecoration: 'none',
              transition: 'all 0.15s',
            }}>
              <Icon size={14} /> {label}
            </Link>
          );
        })}
      </div>

      {/* Logout */}
      <button onClick={handleLogout} style={{
        display: 'flex', alignItems: 'center', gap: 6,
        background: 'transparent', border: 'none', cursor: 'pointer',
        color: 'rgba(255,255,255,0.6)', fontSize: 12, fontWeight: 700,
      }}>
        <BsBoxArrowRight size={14} /> Logout
      </button>
    </nav>
  );
}
