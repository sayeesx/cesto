import Link from 'next/link';
import { BsStars, BsArrowLeft } from 'react-icons/bs';

export default function CorporateGiftingPage() {
  return (
    <>
      <nav style={{
        height: 56, background: '#FFFFFF', borderBottom: '1px solid #F5F5F5',
        display: 'flex', alignItems: 'center', padding: '0 16px', gap: 12,
        position: 'sticky', top: 0, zIndex: 100,
      }}>
        <Link href="/" style={{ color: '#111111' }}><BsArrowLeft size={20} /></Link>
        <span style={{ fontSize: 14, fontWeight: 800, color: '#111111' }}>Corporate Gifting</span>
      </nav>

      <main style={{ padding: '80px 16px', textAlign: 'center', minHeight: '80vh', background: '#FFFFFF' }}>
        <div style={{ maxWidth: 600, margin: '0 auto' }}>
          <div style={{ 
            width: 80, height: 80, 
            background: '#FCF1F6', 
            borderRadius: '50%', 
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 24px',
            color: '#b22153'
          }}>
            <BsStars size={40} />
          </div>
          <h1 style={{ fontSize: 28, fontWeight: 900, marginBottom: 16, color: '#111111', letterSpacing: '-0.5px' }}>
            Corporate & Bulk Orders
          </h1>
          <p style={{ fontSize: 14, lineHeight: 1.7, color: '#5F5F5F', marginBottom: 32 }}>
            Elevate your business relationships with Cesto&apos;s premium gifting solutions.
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
            <Link href="/shop" style={{ 
              background: '#111111', color: 'white', padding: '12px 24px', borderRadius: 12,
              fontSize: 14, fontWeight: 800, textDecoration: 'none'
            }}>
              Contact Sales
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
