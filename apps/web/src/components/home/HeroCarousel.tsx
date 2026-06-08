'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { BsArrowRight } from 'react-icons/bs';

interface Slide {
  id: string;
  title?: string;
  subtitle?: string;
  buttonText?: string;
  link?: string;
  bgGradient?: string;
  image?: string;
  textColor?: string;
  buttonBg?: string;
  buttonColor?: string;
  hideContent?: boolean;
}

const slides: Slide[] = [
  {
    id: '1',
    image: 'https://res.cloudinary.com/dar6yzr7z/image/upload/f_auto,q_auto/v1780906562/fifa_bx1ocu.avif',
    textColor: '#FFFFFF',
    buttonBg: '#FFFFFF',
    buttonColor: '#111111',
    hideContent: true, // Only show the image for FIFA
  },
  {
    id: '2',
    image: 'https://res.cloudinary.com/dar6yzr7z/image/upload/f_auto,q_auto/v1780908820/fathersday_y8bigl.avif',
    textColor: '#1E40AF',
    buttonBg: '#1E40AF',
    buttonColor: '#FFFFFF',
    hideContent: true,
  },
  {
    id: '3',
    image: 'https://res.cloudinary.com/dar6yzr7z/image/upload/f_auto,q_auto/v1780909463/chocojar_1_bbw1wl.avif',
    textColor: '#b22153',
    buttonBg: '#b22153',
    buttonColor: '#FFFFFF',
    hideContent: true,
  },
];

export default function HeroCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const interval = setInterval(() => {
      const nextIndex = (activeIndex + 1) % slides.length;
      el.scrollTo({
        left: nextIndex * (el.offsetWidth - 32), // Adjust for the gap/padding logic
        behavior: 'smooth'
      });
      setActiveIndex(nextIndex);
    }, 5000);

    return () => clearInterval(interval);
  }, [activeIndex]);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    const itemWidth = el.offsetWidth - 32; // Container width minus padding
    const index = Math.round(el.scrollLeft / itemWidth);
    if (index !== activeIndex && index < slides.length) {
      setActiveIndex(index);
    }
  };

  return (
    <div style={{ width: '100%' }}>
      {/* Scroll Track */}
      <div 
        ref={scrollRef}
        onScroll={handleScroll}
        style={{
          display: 'flex',
          overflowX: 'auto',
          scrollSnapType: 'x mandatory',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          WebkitOverflowScrolling: 'touch',
          padding: '0 16px 0',
        }}
        className="no-scrollbar"
      >
        {slides.map((slide) => (
          <div key={slide.id} style={{ 
            minWidth: 'calc(100% - 32px)', 
            marginRight: 12,
            flexShrink: 0, 
            scrollSnapAlign: 'center' 
          }}>
            <div style={{
              background: slide.image ? `url(${slide.image})` : slide.bgGradient,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              borderRadius: 20,
              aspectRatio: '1080 / 450',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              gap: 8,
              position: 'relative',
              overflow: 'hidden',
            }}>
              {slide.image && !slide.hideContent && (
                <div style={{
                  position: 'absolute', inset: 0,
                  background: 'linear-gradient(90deg, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.2) 60%, transparent 100%)',
                  zIndex: 1,
                }} />
              )}
              {!slide.hideContent && (
                <div style={{ position: 'relative', zIndex: 2, padding: '0 20px' }}>
                  <h2 style={{ fontSize: 22, fontWeight: 900, color: slide.textColor, lineHeight: 1.1, letterSpacing: '-0.5px', margin: 0 }}>
                    {slide.title}
                  </h2>
                  <p style={{ fontSize: 12, color: slide.textColor, fontWeight: 600, opacity: 0.9, maxWidth: '70%', margin: '4px 0 0' }}>
                    {slide.subtitle}
                  </p>
                  {slide.link && slide.buttonText && (
                    <Link href={slide.link} style={{ background: slide.buttonBg, color: slide.buttonColor, padding: '10px 18px', borderRadius: 12, fontSize: 12, fontWeight: 800, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 6, marginTop: 12 }}>
                      {slide.buttonText} <BsArrowRight />
                    </Link>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}
        <div style={{ minWidth: 4, flexShrink: 0 }} />
      </div>

      {/* Pagination Dots — BELOW the carousel, centred */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: 5, padding: '8px 0 4px' }}>
        {slides.map((_, i) => (
          <div
            key={i}
            onClick={() => {
              const itemWidth = scrollRef.current?.offsetWidth || 0;
              scrollRef.current?.scrollTo({ left: i * (itemWidth - 32), behavior: 'smooth' });
              setActiveIndex(i);
            }}
            style={{
              width: i === activeIndex ? 14 : 5,
              height: 5,
              borderRadius: 3,
              background: i === activeIndex ? '#b22153' : '#D4C7CF',
              transition: 'all 0.3s ease',
              cursor: 'pointer',
            }}
          />
        ))}
      </div>
    </div>
  );
}
