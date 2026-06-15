'use client';

import { BsArrowLeft, BsQuestionCircle, BsFileText, BsShieldLock, BsXCircle, BsTruck, BsChevronRight } from 'react-icons/bs';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const helpLinks = [
  { label: 'FAQ', icon: BsQuestionCircle, href: '/help/faq' },
  { label: 'Terms & Conditions', icon: BsFileText, href: '/help/terms' },
  { label: 'Privacy Policy', icon: BsShieldLock, href: '/help/privacy' },
  { label: 'Cancellation Policy', icon: BsXCircle, href: '/help/cancellation' },
  { label: 'Delivery Policy', icon: BsTruck, href: '/help/delivery' },
];

export default function HelpPage() {
  const router = useRouter();

  return (
    <main style={{ minHeight: '100dvh', background: '#FCF9FA', paddingBottom: 100 }}>
      <div style={{ background: '#fff', padding: '14px 20px', display: 'flex', alignItems: 'center', gap: 12, borderBottom: '1px solid #F0F0F0' }}>
        <button onClick={() => router.back()} style={{ width: 36, height: 36, borderRadius: 10, background: '#F5F5F5', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
          <BsArrowLeft size={17} color="#111" />
        </button>
        <h1 style={{ fontSize: 17, fontWeight: 900, color: '#111', margin: 0 }}>Help Center</h1>
      </div>
      <div style={{ maxWidth: 600, margin: '0 auto', padding: '16px' }}>
        <div style={{ background: '#fff', borderRadius: 20, overflow: 'hidden', boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
          {helpLinks.map((link, i) => (
            <Link key={link.href} href={link.href} style={{
              display: 'flex', alignItems: 'center', gap: 14,
              padding: '16px 20px', textDecoration: 'none',
              borderBottom: i < helpLinks.length - 1 ? '1px solid #F5F5F5' : 'none',
            }}>
              <link.icon size={18} color="#b22153" />
              <span style={{ fontSize: 14, fontWeight: 700, color: '#111', flex: 1 }}>{link.label}</span>
              <BsChevronRight size={14} color="#C0C0C0" />
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
