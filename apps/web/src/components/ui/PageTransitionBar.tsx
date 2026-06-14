'use client';

/**
 * Slim top-of-page loading bar that shows during:
 *  - Next.js route transitions (usePathname change)
 *  - Any element that sets data-loading="true" on <html>
 *
 * No external library needed — pure CSS animation.
 * Uses the brand colour (#b22153).
 */

import { useEffect, useRef, useState } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

const BAR_COLOR = '#b22153';

function Bar() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [active, setActive] = useState(false);
  const [width, setWidth] = useState(0);
  const [visible, setVisible] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const animRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const prevRoute = useRef(pathname + searchParams.toString());

  // Start bar
  const start = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    if (animRef.current) clearInterval(animRef.current);
    setVisible(true);
    setActive(true);
    setWidth(10);

    // Gradually advance to ~85% — never completes on its own
    let w = 10;
    animRef.current = setInterval(() => {
      w = w + (85 - w) * 0.08;
      setWidth(Math.min(w, 85));
    }, 120);
  };

  // Complete bar
  const complete = () => {
    if (animRef.current) clearInterval(animRef.current);
    setWidth(100);
    timerRef.current = setTimeout(() => {
      setActive(false);
      setVisible(false);
      setWidth(0);
    }, 380);
  };

  // Watch for route changes
  useEffect(() => {
    const route = pathname + searchParams.toString();
    if (route !== prevRoute.current) {
      complete();
      prevRoute.current = route;
    }
  }, [pathname, searchParams]);

  // Listen for custom loading events dispatched by search/other components
  useEffect(() => {
    const onStart = () => start();
    const onEnd = () => complete();
    window.addEventListener('cesto_nav_start', onStart);
    window.addEventListener('cesto_nav_end', onEnd);
    return () => {
      window.removeEventListener('cesto_nav_start', onStart);
      window.removeEventListener('cesto_nav_end', onEnd);
      if (timerRef.current) clearTimeout(timerRef.current);
      if (animRef.current) clearInterval(animRef.current);
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      aria-hidden="true"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: 3,
        zIndex: 9999,
        pointerEvents: 'none',
      }}
    >
      <div
        style={{
          height: '100%',
          width: `${width}%`,
          background: BAR_COLOR,
          transition: active
            ? 'width 0.12s ease-out'
            : 'width 0.3s ease-out, opacity 0.38s ease',
          opacity: visible ? 1 : 0,
          boxShadow: `0 0 8px ${BAR_COLOR}80`,
          borderRadius: '0 2px 2px 0',
        }}
      />
    </div>
  );
}

export default function PageTransitionBar() {
  return (
    <Suspense fallback={null}>
      <Bar />
    </Suspense>
  );
}

/**
 * Call this before a navigation that won't trigger a pathname change
 * (e.g. opening search, submitting a form).
 */
export function showNavBar() {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new Event('cesto_nav_start'));
  }
}
export function hideNavBar() {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new Event('cesto_nav_end'));
  }
}
