import Link from 'next/link';
import {
  BsFacebook,
  BsInstagram,
  BsYoutube,
  BsTwitterX,
  BsLightningChargeFill,
  BsShieldFillCheck,
  BsBoxSeam,
  BsHeadset,
  BsTelephone,
  BsEnvelope,
  BsGeoAlt,
  BsLock,
  BsCheckCircleFill,
} from 'react-icons/bs';

const shopLinks = [
  { label: 'Birthday Gifts', href: '/occasion/birthday' },
  { label: 'Anniversary Gifts', href: '/occasion/anniversary' },
  { label: 'Flowers', href: '/category/flowers' },
  { label: 'Cakes', href: '/category/cakes' },
  { label: 'Gift Hampers', href: '/category/hampers' },
  { label: 'Chocolates', href: '/category/chocolates' },
];

const helpLinks = [
  { label: 'FAQ', href: '/help/faq' },
  { label: 'Track My Order', href: '/track-order' },
  { label: 'Same-Day Delivery', href: '/help/delivery' },
  { label: 'Cancellation Policy', href: '/help/cancellation' },
  { label: 'Privacy Policy', href: '/help/privacy' },
  { label: 'Terms & Conditions', href: '/help/terms' },
];

const social = [
  { Icon: BsFacebook, href: '#', label: 'Facebook' },
  { Icon: BsInstagram, href: '#', label: 'Instagram' },
  { Icon: BsYoutube, href: '#', label: 'YouTube' },
  { Icon: BsTwitterX, href: '#', label: 'X / Twitter' },
];

export default function Footer() {
  return (
    <footer className="mobile-footer-compact" style={{
      background: '#FFFFFF',
      color: '#5F5F5F',
      padding: '80px 0 100px',
      borderTop: '1px solid #F5F5F5',
    }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 16px' }}>

        {/* Main grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
          gap: 40,
          marginBottom: 60,
        }}>
          {/* Brand */}
          <div style={{ gridColumn: '1 / -1' }} className="md:!col-span-2">
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
              <img src="/logo.png" alt="Cesto" style={{ height: 44, width: 'auto' }} />
            </div>
            <p style={{ fontSize: 13, lineHeight: 1.6, maxWidth: 320, marginBottom: 20, color: '#5F5F5F', fontWeight: 500 }}>
              Kerala&apos;s premium gifting platform. Delivering curated hampers, fresh flowers, and artisanal treats across the state since 2024.
            </p>
            <div style={{ display: 'flex', gap: 12 }}>
              {social.map(({ Icon, href, label }) => (
                <a key={label} href={href} style={{
                  width: 36, height: 36,
                  borderRadius: '50%',
                  background: '#F5F5F5',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: '#111111',
                  transition: 'all 0.2s ease',
                  textDecoration: 'none',
                }} aria-label={label}>
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Shop */}
          <div>
            <h4 style={{ fontSize: 12, fontWeight: 900, color: '#111111', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: 20 }}>Shop</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {shopLinks.map((l) => (
                <Link key={l.label} href={l.href} style={{ fontSize: 13, color: '#5F5F5F', textDecoration: 'none', fontWeight: 500 }}>{l.label}</Link>
              ))}
            </div>
          </div>

          {/* Help */}
          <div>
            <h4 style={{ fontSize: 12, fontWeight: 900, color: '#111111', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: 20 }}>Support</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {helpLinks.map((l) => (
                <Link key={l.label} href={l.href} style={{ fontSize: 13, color: '#5F5F5F', textDecoration: 'none', fontWeight: 500 }}>{l.label}</Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div style={{ gridColumn: '1 / -1' }} className="md:!col-span-1">
            <h4 style={{ fontSize: 12, fontWeight: 900, color: '#111111', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: 20 }}>Contact Us</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14, fontSize: 13, fontWeight: 500 }}>
              <a href="tel:+919876543210" style={{ display: 'flex', alignItems: 'center', gap: 10, color: '#5F5F5F', textDecoration: 'none' }}>
                <BsTelephone size={14} color="#b22153" /> +91 98765 43210
              </a>
              <a href="mailto:hello@cesto.in" style={{ display: 'flex', alignItems: 'center', gap: 10, color: '#5F5F5F', textDecoration: 'none' }}>
                <BsEnvelope size={14} color="#b22153" /> hello@cesto.in
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div style={{
          borderTop: '1px solid #F5F5F5',
          paddingTop: 32,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 20,
          textAlign: 'center',
        }}>
          <div style={{ fontSize: 12, color: '#A9A0AE', fontWeight: 600 }}>
            © 2026 Cesto. Handcrafted with love by <a href="https://www.narrs.in" target="_blank" rel="noopener noreferrer" style={{ color: '#b22153', textDecoration: 'none', fontWeight: 800 }}>narrs</a>
          </div>
          <div style={{ display: 'flex', gap: 12 }}>
            <span style={{
              fontSize: 10, fontWeight: 700, color: '#b22153',
              background: '#FCF1F6', padding: '6px 12px', borderRadius: 8,
              display: 'flex', alignItems: 'center', gap: 6,
            }}><BsLock size={12} /> SSL Secured</span>
            <span style={{
              fontSize: 10, fontWeight: 700, color: '#b22153',
              background: '#FCF1F6', padding: '6px 12px', borderRadius: 8,
              display: 'flex', alignItems: 'center', gap: 6,
            }}><BsCheckCircleFill size={10} /> Certified Shop</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
