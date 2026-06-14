'use client';
import Link from 'next/link';
import { BsChevronLeft } from 'react-icons/bs';

export default function CancellationPage() {
  return (
    <main style={{ minHeight: '100vh', background: '#FFFFFF', padding: '0 0 100px' }}>
      <div style={{ padding: '16px', borderBottom: '1px solid #F5F5F5', display: 'flex', alignItems: 'center', gap: 12 }}>
        <Link href="/" style={{ color: '#111', display: 'flex' }}><BsChevronLeft size={20} /></Link>
        <h1 style={{ fontSize: 18, fontWeight: 900, color: '#111111' }}>Cancellation Policy</h1>
      </div>
      <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: 16 }}>
        {[
          ['Free Cancellation', 'Cancel up to 2 hours before the scheduled delivery time for a full refund.'],
          ['Late Cancellation', 'Cancellations within 2 hours of delivery may incur a 20% charge.'],
          ['Non-Cancellable Orders', 'Custom orders, perishable items prepared to order, and same-day orders placed within 1 hour cannot be cancelled.'],
          ['Refund Timeline', 'Approved refunds are processed within 5–7 business days to the original payment method.'],
        ].map(([title, body]) => (
          <div key={title} style={{ borderBottom: '1px solid #F5F5F5', paddingBottom: 16 }}>
            <p style={{ fontSize: 14, fontWeight: 800, color: '#111111', marginBottom: 4 }}>{title}</p>
            <p style={{ fontSize: 13, color: '#5F5F5F', lineHeight: 1.6 }}>{body}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
