'use client';

import React from 'react';

const Loader = ({ color = '#b22153', size = 20 }: { color?: string; size?: number }) => {
  return (
    <>
      <style>{`
        .spinner {
          border: 3px solid rgba(255, 255, 255, 0.3);
          border-radius: 50%;
          border-top-color: currentColor;
          animation: spin 0.8s ease-in-out infinite;
        }
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
      <div 
        className="spinner" 
        style={{ 
          color: color, 
          width: size, 
          height: size,
          borderTopColor: color,
        }} 
      />
    </>
  );
};

export default Loader;
