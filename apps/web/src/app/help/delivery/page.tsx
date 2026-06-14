'use client';
import Link from 'next/link';
import { BsChevronLeft } from 'react-icons/bs';

export default function DeliveryPage() {
  return (
    <main style={{ minHeight: '100vh', background: '#FFFFFF', padding: '0 0 100px' }}>
      <div style={{ padding: '16px', borderBottom: '1px solid #F5F5F5', display: 'flex', alignItems: 'center', gap: 12 }}>
        <Link href="/" style={{ color: '#111', display: 'flex' }}><BsChevronLeft size={20} /></Link>
        <h1 style={{ fontSize: 18, fontWeight: 900, color: '#111111' }}>Same-Day Delivery</h1>
      </div>
      <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: 20 }}>
        <Section title="Same-Day Delivery" body="Order before 12:00 PM to receive your gifts the same day. Available across major cities in Kerala." />
        <Section title="Delivery Slots" body="Morning (9 AM–1 PM), Afternoon (1 PM–5 PM), Evening (5 PM–9 PM). Select your preferred slot at checkout." />
        <Section title="Delivery Charges" body="Free delivery on orders above ₹999. A ₹49 delivery fee applies on orders below that." />
        <Section title="Coverage Area" body="We deliver across Kochi, Trivandrum, Thrissur, Kozhikode, and more. Enter your pincode to check." />
      </div>
    </main>
  );
}

function Section({ title, body }: { title: string; body: string }) {
  return (
    <div style={{ background: '#FCF9FA', borderRadius: 14, padding: '16px' }}>
      <p style={{ fontSize: 14, fontWeight: 800, color: '#b22153', marginBottom: 6 }}>{title}</p>
      <p style={{ fontSize: 13, color: '#5F5F5F', lineHeight: 1.6 }}>{body}</p>
    </div>
  );
}
