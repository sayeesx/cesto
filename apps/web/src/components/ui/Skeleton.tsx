'use client';

import React from 'react';

// Modern shimmer skeleton component
export const Skeleton = ({ 
  width = '100%', 
  height = '20px', 
  borderRadius = '8px',
  className = ''
}: { 
  width?: string | number; 
  height?: string | number; 
  borderRadius?: string;
  className?: string;
}) => {
  return (
    <>
      <div 
        className={`skeleton ${className}`}
        style={{ 
          width, 
          height, 
          borderRadius,
          background: 'linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)',
          backgroundSize: '200% 100%',
          animation: 'shimmer 1.5s ease-in-out infinite',
        }} 
      />
      <style jsx>{`
        @keyframes shimmer {
          0% {
            background-position: 200% 0;
          }
          100% {
            background-position: -200% 0;
          }
        }
      `}</style>
    </>
  );
};

// Product card skeleton
export const ProductCardSkeleton = () => {
  return (
    <div style={{ width: '100%' }}>
      <Skeleton height="180px" borderRadius="16px" />
      <div style={{ marginTop: 12 }}>
        <Skeleton height="16px" width="80%" />
        <Skeleton height="14px" width="60%" className="mt-2" />
        <Skeleton height="18px" width="40%" className="mt-2" />
      </div>
    </div>
  );
};

// Product grid skeleton
export const ProductGridSkeleton = ({ count = 6 }: { count?: number }) => {
  return (
    <div style={{ 
      display: 'grid', 
      gridTemplateColumns: 'repeat(2, 1fr)', 
      gap: '16px',
      padding: '0 16px'
    }}>
      {Array.from({ length: count }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  );
};

// Horizontal scroll skeleton
export const HorizontalScrollSkeleton = ({ count = 4, itemWidth = '160px' }: { count?: number; itemWidth?: string }) => {
  return (
    <div className="no-scrollbar" style={{ 
      display: 'flex', 
      gap: 12, 
      overflowX: 'auto', 
      padding: '0 16px 12px' 
    }}>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} style={{ width: itemWidth, flexShrink: 0 }}>
          <ProductCardSkeleton />
        </div>
      ))}
    </div>
  );
};

export default Skeleton;
