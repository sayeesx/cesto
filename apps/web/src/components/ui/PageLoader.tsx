'use client';

import React from 'react';

const PageLoader = () => {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      width: '100%',
      backgroundColor: '#FFFFFF',
      gap: 16,
    }}>
      {/* Spinning ring with brand color */}
      <svg
        width="56"
        height="56"
        viewBox="0 0 56 56"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ animation: 'spin 0.9s linear infinite' }}
      >
        <circle
          cx="28"
          cy="28"
          r="22"
          stroke="#F0E0E7"
          strokeWidth="5"
          fill="none"
        />
        <path
          d="M28 6 A22 22 0 0 1 50 28"
          stroke="#b22153"
          strokeWidth="5"
          strokeLinecap="round"
          fill="none"
        />
      </svg>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default PageLoader;
