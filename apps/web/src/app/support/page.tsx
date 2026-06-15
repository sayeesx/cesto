'use client';

import { BsArrowLeft, BsHeadset, BsWhatsapp, BsEnvelope, BsTelephone } from 'react-icons/bs';
import { useRouter } from 'next/navigation';

export default function SupportPage() {
  const router = useRouter();

  return (
    <main style={{ minHeight: '100dvh', background: '#FCF9FA', paddingBottom: 100 }}>
      <div style={{ background: '#fff', padding: '14px 20px', display: 'flex', alignItems: 'center', gap: 12, borderBottom: '1px solid #F0F0F0' }}>
        <button onClick={() => router.back()} style={{ width: 36, height: 36, borderRadius: 10, background: '#F5F5F5', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
          <BsArrowLeft size={17} color="#111" />
        </button>
        <h1 style={{ fontSize: 17, fontWeight: 900, color: '#111', margin: 0 }}>Contact Us</h1>
      </div>
      <div style={{ maxWidth: 600, margin: '0 auto', padding: '16px' }}>
        <div style={{ background: '#fff', borderRadius: 20, padding: 24, boxShadow: '0 1px 4px rgba(0,0,0,0.04)', textAlign: 'center' }}>
          <div style={{ width: 64, height: 64, borderRadius: '50%', background: '#FCF0F5', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
            <BsHeadset size={28} color="#b22153" />
          </div>
          <h2 style={{ fontSize: 18, fontWeight: 900, color: '#111', marginBottom: 8 }}>We&apos;re here to help</h2>
          <p style={{ fontSize: 13, color: '#9CA3AF', marginBottom: 24, maxWidth: 280, margin: '0 auto 24px' }}>
            Reach out to us anytime and we&apos;ll get back to you as soon as possible.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <a href="tel:+919999999999" style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 20px', borderRadius: 12, border: '1px solid #E8E8E8', textDecoration: 'none', color: '#111' }}>
              <BsTelephone size={18} color="#b22153" />
              <span style={{ fontSize: 14, fontWeight: 700 }}>+91 99999 99999</span>
            </a>
            <a href="mailto:hello@cesto.in" style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 20px', borderRadius: 12, border: '1px solid #E8E8E8', textDecoration: 'none', color: '#111' }}>
              <BsEnvelope size={18} color="#b22153" />
              <span style={{ fontSize: 14, fontWeight: 700 }}>hello@cesto.in</span>
            </a>
            <a href="https://wa.me/919999999999" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 20px', borderRadius: 12, border: '1px solid #E8E8E8', textDecoration: 'none', color: '#111' }}>
              <BsWhatsapp size={18} color="#25D366" />
              <span style={{ fontSize: 14, fontWeight: 700 }}>WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
