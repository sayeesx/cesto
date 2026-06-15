'use client';

import Link from 'next/link';
import { BsArrowRight } from 'react-icons/bs';
import { useState, useEffect } from 'react';
import { DotLottiePlayer } from '@dotlottie/react-player';

function WishlistSkeleton() {
  return (
    <main style={{ minHeight: '100dvh', background: '#fff', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '0 24px' }}>
      <div style={{ width: 200, height: 200, borderRadius: '50%', background: 'linear-gradient(90deg,#f3eef1 25%,#ede6eb 50%,#f3eef1 75%)', backgroundSize: '200% 100%', animation: 'shimmer 1.4s ease-in-out infinite', marginBottom: 24 }} />
      <div style={{ height: 22, width: 180, borderRadius: 8, background: 'linear-gradient(90deg,#f3eef1 25%,#ede6eb 50%,#f3eef1 75%)', backgroundSize: '200% 100%', animation: 'shimmer 1.4s ease-in-out infinite', marginBottom: 12 }} />
      <div style={{ height: 14, width: 240, borderRadius: 8, background: 'linear-gradient(90deg,#f3eef1 25%,#ede6eb 50%,#f3eef1 75%)', backgroundSize: '200% 100%', animation: 'shimmer 1.4s ease-in-out infinite' }} />
      <style>{`@keyframes shimmer{0%{background-position:200% 0}100%{background-position:-200% 0}}`}</style>
    </main>
  );
}

export default function WishlistPage() {
  const [ready, setReady] = useState(false);

  // Small delay so DotLottiePlayer mounts after hydration — prevents blank flash
  useEffect(() => {
    const t = setTimeout(() => setReady(true), 80);
    return () => clearTimeout(t);
  }, []);

  if (!ready) return <WishlistSkeleton />;

  return (
    <main style={{ minHeight: '100dvh', background: '#fff', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '0 16px', textAlign: 'center' }}>
      <div style={{ maxWidth: 380, width: '100%', paddingBottom: 80 }}>
        <div style={{ width: 200, height: 200, margin: '0 auto' }}>
          <DotLottiePlayer src="/lottie/empty.lottie" autoplay loop />
        </div>
        <div style={{ marginTop: -8 }}>
          <h1 style={{ fontSize: 22, fontWeight: 900, color: '#111', marginBottom: 10, letterSpacing: '-0.4px' }}>
            Your Wishlist is Empty
          </h1>
          <p style={{ fontSize: 13, color: '#9CA3AF', lineHeight: 1.65, marginBottom: 28, fontWeight: 500 }}>
            Start adding your favourite gifts to keep track of what you love.
          </p>
          <Link href="/shop" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#983255', color: '#fff', padding: '14px 28px', borderRadius: 50, fontSize: 14, fontWeight: 800, textDecoration: 'none', boxShadow: '0 8px 24px rgba(152,50,85,0.22)' }}>
            Explore Shop <BsArrowRight />
          </Link>
        </div>
      </div>
      <style>{`@keyframes shimmer{0%{background-position:200% 0}100%{background-position:-200% 0}}`}</style>
    </main>
  );
}
