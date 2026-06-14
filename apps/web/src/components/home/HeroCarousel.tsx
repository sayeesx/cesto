'use client';

import { useState, useEffect, useRef } from 'react';

const slides = [
  {
    id: '1',
    image: 'https://res.cloudinary.com/dar6yzr7z/image/upload/f_auto,q_auto/v1780906562/fifa_bx1ocu.avif',
  },
  {
    id: '2',
    image: 'https://res.cloudinary.com/dar6yzr7z/image/upload/f_auto,q_auto/v1780908820/fathersday_y8bigl.avif',
  },
  {
    id: '3',
    image: 'https://res.cloudinary.com/dar6yzr7z/image/upload/f_auto,q_auto/v1780909463/chocojar_1_bbw1wl.avif',
  },
];

export default function HeroCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isDesktop, setIsDesktop] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  // Mobile only: auto-advance
  useEffect(() => {
    if (isDesktop) return;
    const el = scrollRef.current;
    if (!el) return;
    const interval = setInterval(() => {
      const nextIndex = (activeIndex + 1) % slides.length;
      // card width = (container - 32px padding) + 12px gap
      const cardWidth = el.clientWidth - 32 + 12;
      el.scrollTo({ left: nextIndex * cardWidth, behavior: 'smooth' });
      setActiveIndex(nextIndex);
    }, 5000);
    return () => clearInterval(interval);
  }, [activeIndex, isDesktop]);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    if (isDesktop) return;
    const el = e.currentTarget;
    const cardWidth = el.clientWidth - 32 + 12;
    const index = Math.round(el.scrollLeft / cardWidth);
    if (index !== activeIndex && index >= 0 && index < slides.length) setActiveIndex(index);
  };

  const handleDotClick = (i: number) => {
    const el = scrollRef.current;
    if (!el) return;
    const cardWidth = el.clientWidth - 32 + 12;
    el.scrollTo({ left: i * cardWidth, behavior: 'smooth' });
    setActiveIndex(i);
  };

  // ── DESKTOP: static 3-column grid, no scroll ──
  if (isDesktop) {
    return (
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: 10,
        padding: '12px 24px 0',
      }}>
        {slides.map((slide) => (
          <div
            key={slide.id}
            style={{
              borderRadius: 14,
              overflow: 'hidden',
              aspectRatio: '16 / 9',
              background: `url(${slide.image}) center/cover no-repeat`,
            }}
          />
        ))}
      </div>
    );
  }

  // ── MOBILE: swipeable single carousel ──
  return (
    <div style={{ width: '100%' }}>
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="no-scrollbar"
        style={{
          display: 'flex',
          overflowX: 'auto',
          // Use padding instead of marginLeft on first child — snap works correctly
          paddingLeft: 16,
          paddingRight: 16,
          paddingTop: 8,
          gap: 12,
          // mandatory snap aligned to the container's left padding
          scrollSnapType: 'x mandatory',
          scrollPaddingLeft: 16,
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          WebkitOverflowScrolling: 'touch',
          // Prevent width from shrinking — avoids snap lock to left edge
          boxSizing: 'border-box',
        }}
      >
        {slides.map((slide) => (
          <div
            key={slide.id}
            style={{
              // Fill viewport minus the 32px total side padding
              minWidth: 'calc(100% - 32px)',
              flexShrink: 0,
              scrollSnapAlign: 'start',
            }}
          >
            <div
              style={{
                background: `url(${slide.image}) center/cover no-repeat`,
                aspectRatio: '1080 / 450',
                borderRadius: 20,
                overflow: 'hidden',
              }}
            />
          </div>
        ))}
      </div>

      {/* Pagination dots */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: 5, padding: '8px 0 4px' }}>
        {slides.map((_, i) => (
          <div
            key={i}
            onClick={() => handleDotClick(i)}
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
