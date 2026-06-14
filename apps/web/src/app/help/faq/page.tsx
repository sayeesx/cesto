'use client';
import Link from 'next/link';
import { BsChevronLeft } from 'react-icons/bs';

const faqs = [
  { q: 'How do I place an order?', a: 'Browse products, add to cart, and checkout. You can pay online or on delivery.' },
  { q: 'What areas do you deliver to?', a: 'We currently deliver across Kerala. Enter your pincode at checkout to confirm availability.' },
  { q: 'Can I schedule a delivery time?', a: 'Yes, you can choose a delivery slot at checkout — same-day, next-day, or a specific date.' },
  { q: 'How do I track my order?', a: 'Visit /track-order and enter your order ID. You can also check from your account page.' },
  { q: 'What is your cancellation policy?', a: 'Orders can be cancelled up to 2 hours before the scheduled delivery time.' },
  { q: 'Do you offer customisation?', a: 'Yes! Add a personalised message at checkout. For large custom orders contact us directly.' },
];

export default function FAQPage() {
  return (
    <main style={{ minHeight: '100vh', background: '#FFFFFF', padding: '0 0 100px' }}>
      <div style={{ padding: '16px', borderBottom: '1px solid #F5F5F5', display: 'flex', alignItems: 'center', gap: 12 }}>
        <Link href="/" style={{ color: '#111', display: 'flex' }}><BsChevronLeft size={20} /></Link>
        <h1 style={{ fontSize: 18, fontWeight: 900, color: '#111111' }}>FAQ</h1>
      </div>
      <div style={{ padding: '16px' }}>
        {faqs.map((item, i) => (
          <div key={i} style={{ borderBottom: '1px solid #F5F5F5', padding: '16px 0' }}>
            <p style={{ fontSize: 14, fontWeight: 800, color: '#111111', marginBottom: 6 }}>{item.q}</p>
            <p style={{ fontSize: 13, color: '#5F5F5F', lineHeight: 1.6 }}>{item.a}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
