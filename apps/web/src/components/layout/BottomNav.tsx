'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  BsHouseDoor,
  BsHouseDoorFill,
  BsGrid,
  BsGridFill,
  BsBag,
  BsBagFill,
  BsHeart,
  BsHeartFill,
  BsPerson,
  BsPersonFill,
} from 'react-icons/bs';

const navItems = [
  {
    label: 'Home',
    href: '/',
    icon: BsHouseDoor,
    iconActive: BsHouseDoorFill,
  },
  {
    label: 'Shop',
    href: '/shop',
    icon: BsGrid,
    iconActive: BsGridFill,
  },
  {
    label: 'Cart',
    href: '/cart',
    isCart: true,
    badge: 0,
    icon: BsBag,
    iconActive: BsBagFill,
  },
  {
    label: 'Wishlist',
    href: '/wishlist',
    icon: BsHeart,
    iconActive: BsHeartFill,
  },
  {
    label: 'Account',
    href: '/account',
    icon: BsPerson,
    iconActive: BsPersonFill,
  },
];

export default function BottomNav() {
  const pathname = usePathname();

  if (pathname?.startsWith('/product/')) return null;

  return (
    <nav 
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        height: 60,
        background: '#FFFFFF',
        borderTop: '1px solid #F5F5F5',
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
        padding: '0 4px',
        boxShadow: 'none',
      }}
      className="sm:hidden"
      aria-label="Mobile navigation"
    >
      {navItems.map((item) => {
        const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
        const Icon = isActive ? item.iconActive : item.icon;
        
        return (
          <Link
            key={item.href}
            href={item.href}
            style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 2,
              height: '100%',
              textDecoration: 'none',
              color: isActive ? '#b22153' : '#5F5F5F',
              transition: 'all 0.2s ease',
              WebkitTapHighlightColor: 'transparent',
              position: 'relative'
            }}
          >
            {/* Active indicator dot */}
            {isActive && (
              <div style={{
                position: 'absolute',
                top: 0,
                width: 24,
                height: 3,
                background: '#b22153',
                borderRadius: '0 0 4px 4px',
              }} />
            )}
            
            <div style={{ 
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <Icon size={20} />
              {item.isCart && (item.badge ?? 0) > 0 && (
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
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '0 2px',
                  border: '1.5px solid white',
                }}>
                  {item.badge}
                </span>
              )}
            </div>
            
            <span style={{ 
              fontSize: 10, 
              fontWeight: isActive ? 800 : 600,
            }}>
              {item.label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
