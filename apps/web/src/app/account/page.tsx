'use client';

import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';
import { 
  BsPersonCircle, 
  BsBoxSeam, 
  BsGeoAlt, 
  BsCreditCard, 
  BsQuestionCircle, 
  BsShieldLock,
  BsBoxArrowRight,
  BsHeadset,
  BsHeart,
  BsBag
} from 'react-icons/bs';

const menuItems = [
  { group: 'Orders', items: [
    { label: 'My Orders', icon: BsBoxSeam, link: '/orders' },
    { label: 'Wishlist', icon: BsHeart, link: '/wishlist' },
    { label: 'Cart', icon: BsBag, link: '/cart' },
  ]},
  { group: 'Settings', items: [
    { label: 'Addresses', icon: BsGeoAlt, link: '/account/addresses' },
    { label: 'Payments', icon: BsCreditCard, link: '/account/payments' },
    { label: 'Security', icon: BsShieldLock, link: '/account/security' },
  ]},
  { group: 'Support', items: [
    { label: 'Help Center', icon: BsQuestionCircle, link: '/help' },
    { label: 'Contact Us', icon: BsHeadset, link: '/support' },
  ]}
];

export default function AccountPage() {
  return (
    <>
      <main style={{ minHeight: '100vh', background: '#FCF9FA', paddingBottom: 100 }}>
        
        {/* Profile Header */}
        <div style={{ 
          background: 'linear-gradient(135deg, #b22153 0%, #d14175 100%)', 
          padding: '40px 20px 60px', 
          textAlign: 'center',
          color: 'white'
        }}>
          <div style={{ 
            width: 80, height: 80, borderRadius: '50%', background: 'rgba(255,255,255,0.2)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px',
            border: '3px solid rgba(255,255,255,0.4)'
          }}>
            <BsPersonCircle size={48} color="white" />
          </div>
          <h1 style={{ fontSize: 22, fontWeight: 900, marginBottom: 4 }}>John Doe</h1>
          <p style={{ fontSize: 13, opacity: 0.8, fontWeight: 500 }}>john.doe@example.com</p>
        </div>

        {/* Account Menu */}
        <div style={{ maxWidth: 600, margin: '-24px auto 0', padding: '0 16px' }}>
          <div style={{ background: 'white', borderRadius: 20, boxShadow: '0 8px 32px rgba(178, 33, 83, 0.05)', overflow: 'hidden' }}>
            {menuItems.map((group, gIdx) => (
              <div key={group.group} style={{ borderBottom: gIdx < menuItems.length - 1 ? '8px solid #FCF9FA' : 'none' }}>
                <div style={{ padding: '16px 20px 8px', fontSize: 11, fontWeight: 900, color: '#A9A0AE', textTransform: 'uppercase', letterSpacing: '1px' }}>
                  {group.group}
                </div>
                {group.items.map((item, iIdx) => (
                  <Link 
                    key={item.label} 
                    href={item.link}
                    style={{
                      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                      padding: '16px 20px', textDecoration: 'none', color: '#111111',
                      borderBottom: iIdx < group.items.length - 1 ? '1px solid #F5F5F5' : 'none'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: 14, flex: 1 }}>
                      <item.icon size={18} color={iIdx === 0 && gIdx === 0 ? '#b22153' : '#5F5F5F'} />
                      <span style={{ fontSize: 14, fontWeight: 700 }}>{item.label}</span>
                    </div>
                  </Link>
                ))}
              </div>
            ))}
          </div>

          <button style={{
            width: '100%', marginTop: 24, padding: '18px', background: 'white', borderRadius: 20,
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
            color: '#EF4444', fontWeight: 800, fontSize: 14, border: '1px solid #FEE2E2'
          }}>
            <BsBoxArrowRight size={18} /> Logout
          </button>
        </div>
      </main>
    </>
  );
}
