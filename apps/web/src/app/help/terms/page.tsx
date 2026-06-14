'use client';
import Link from 'next/link';
import { BsChevronLeft } from 'react-icons/bs';

export default function TermsPage() {
  return (
    <main style={{ minHeight: '100vh', background: '#FFFFFF', padding: '0 0 100px' }}>
      <div style={{ padding: '16px', borderBottom: '1px solid #F5F5F5', display: 'flex', alignItems: 'center', gap: 12 }}>
        <Link href="/" style={{ color: '#111', display: 'flex' }}><BsChevronLeft size={20} /></Link>
        <h1 style={{ fontSize: 18, fontWeight: 900, color: '#111111' }}>Terms & Conditions</h1>
      </div>
      <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: 20, fontSize: 13, color: '#5F5F5F', lineHeight: 1.7 }}>
        <p style={{ fontSize: 11, color: '#A9A0AE' }}>Last updated: June 2026</p>
        <Section title="1. Acceptance" body="By using Cesto, you agree to these terms. If you do not agree, please do not use the platform." />
        <Section title="2. Orders" body="All orders are subject to availability and confirmation. We reserve the right to cancel orders if items are unavailable." />
        <Section title="3. Pricing" body="All prices are in Indian Rupees (₹) and inclusive of GST where applicable. Delivery charges are shown at checkout." />
        <Section title="4. Delivery" body="Delivery timings are estimates and not guarantees. We are not liable for delays caused by factors outside our control." />
        <Section title="5. Returns & Refunds" body="Perishable items (flowers, fresh cakes) cannot be returned. Non-perishable items may be returned within 24 hours of delivery in original condition." />
        <Section title="6. Account" body="You are responsible for maintaining the security of your account credentials." />
        <Section title="7. Contact" body="For any queries, contact us at hello@cesto.in or call +91 98765 43210." />
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
