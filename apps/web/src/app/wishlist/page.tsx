'use client';

import Link from 'next/link';
import { DotLottiePlayer } from '@dotlottie/react-player';
import { BsArrowRight } from 'react-icons/bs';

export default function WishlistPage() {
  return (
    <>
      <main style={{ 
        minHeight: '100vh', 
        background: '#FFFFFF', // Pure white background
        padding: '0 16px', 
        display: 'flex', 
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        position: 'relative',
        zIndex: 1
      }}>
        <div style={{ maxWidth: 400, width: '100%', paddingBottom: 100 }}>
          {/* Lottie Animation - REDUCED SIZE */}
          <div style={{ width: '100%', maxWidth: 200, margin: '0 auto' }}>
            <DotLottiePlayer
              src="/lottie/empty.lottie"
              autoplay
              loop
            />
          </div>
          
          <div style={{ marginTop: -10 }}>
            <h1 style={{ fontSize: 22, fontWeight: 900, color: '#111111', marginBottom: 12, letterSpacing: '-0.5px' }}>
              Your Wishlist is Empty
            </h1>
            
            <p style={{ fontSize: 13, color: '#5F5F5F', lineHeight: 1.6, marginBottom: 32, fontWeight: 600, padding: '0 20px' }}>
              Start adding your favorite gifts and hampers to your wishlist to keep track of what you love.
            </p>
            
            <Link href="/shop" style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 10,
              background: '#b22153',
              color: '#FFFFFF',
              padding: '14px 28px',
              borderRadius: 14,
              fontSize: 14,
              fontWeight: 800,
              textDecoration: 'none',
              boxShadow: '0 8px 24px rgba(178, 33, 83, 0.2)'
            }}>
              Explore Shop <BsArrowRight />
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
