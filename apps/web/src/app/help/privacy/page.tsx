'use client';
import Link from 'next/link';
import { BsChevronLeft } from 'react-icons/bs';

export default function PrivacyPage() {
  return (
    <main style={{ minHeight: '100vh', background: '#FFFFFF', padding: '0 0 100px' }}>
      <div style={{ padding: '16px', borderBottom: '1px solid #F5F5F5', display: 'flex', alignItems: 'center', gap: 12 }}>
        <Link href="/" style={{ color: '#111', display: 'flex' }}><BsChevronLeft size={20} /></Link>
        <h1 style={{ fontSize: 18, fontWeight: 900, color: '#111111' }}>Privacy Policy</h1>
      </div>
      <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: 20, fontSize: 13, color: '#5F5F5F', lineHeight: 1.7 }}>
        <p style={{ fontSize: 11, color: '#A9A0AE' }}>Last updated: June 2026</p>
        <Section title="Data We Collect" body="We collect your name, phone number, email, and delivery address when you place an order or create an account. We also collect usage data to improve the app." />
        <Section title="How We Use It" body="Your data is used to process orders, send delivery updates, and personalise your experience. We do not sell your data to third parties." />
        <Section title="Data Storage" body="All data is stored securely in encrypted databases. We use Supabase (PostgreSQL) hosted in Singapore." />
        <Section title="Your Rights" body="You can request deletion of your account and data at any time by contacting hello@cesto.in." />
        <Section title="Cookies" body="We use minimal cookies for authentication and session management only." />
        <Section title="Contact" body="For privacy concerns, email us at hello@cesto.in" />
      </div>
    </main>
  );
}

function Section({ title, body }: { title: string; body: string }) {
  return (
    <div>
      <p style={{ fontSize: 14, fontWeight: 800, color: '#111111', marginBottom: 6 }}>{title}</p>
      <p>{body}</p>
    </div>
  );
}
