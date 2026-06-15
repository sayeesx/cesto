'use client';

import React from 'react';
import styled from 'styled-components';

const ProductCardSkeleton = () => {
  return (
    <StyledWrapper>
      <svg
        viewBox="0 0 200 272"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="loader"
      >
        <rect fill="#ffffff" x="1"  y="1"   width="198" height="270" rx="14"/>
        <rect fill="#fbeaf0" x="1"  y="1"   width="198" height="148" rx="14"/>
        <rect fill="#fbeaf0" x="1"  y="135" width="198" height="14"/>

        <path pathLength={360}
          d="M 15 1 H 185 Q 199 1 199 15 V 257 Q 199 271 185 271 H 15 Q 1 271 1 257 V 15 Q 1 1 15 1 Z"/>

        <path pathLength={360} d="M 1 148 H 199"/>

        <path pathLength={360}
          d="M 21 11 H 67 Q 78 11 78 20 Q 78 30 67 30 H 21 Q 10 30 10 20 Q 10 11 21 11 Z"/>

        <path pathLength={360} d="M 17 18 H 52"/>
        <path pathLength={360} d="M 17 25 H 43"/>

        <path pathLength={360}
          d="M 100 68 C 98 56 86 49 78 55 C 70 61 80 74 100 73"/>
        <path pathLength={360}
          d="M 100 68 C 102 56 114 49 122 55 C 130 61 120 74 100 73"/>
        <path pathLength={360}
          d="M 94 68 Q 100 62 106 68 Q 100 75 94 68 Z"/>
        <path pathLength={360}
          d="M 68 74 H 132 V 87 H 68 Z"/>
        <path pathLength={360}
          d="M 72 87 H 128 V 140 H 72 Z"/>
        <path pathLength={360} d="M 100 74 V 140"/>

        <path pathLength={360} d="M 14 164 H 162"/>
        <path pathLength={360} d="M 14 179 H 128"/>
        <path pathLength={360} d="M 14 195 H 86"/>
        <path pathLength={360} d="M 14 215 H 60"/>
        <path pathLength={360} d="M 11 218 L 63 211"/>
        <path pathLength={360} d="M 14 238 H 102"/>

        <path pathLength={360}
          d="M 165 214 A 24 24 0 0 1 189 238 A 24 24 0 0 1 165 262 A 24 24 0 0 1 141 238 A 24 24 0 0 1 165 214 Z"/>
        <path pathLength={360} d="M 153 238 H 177"/>
        <path pathLength={360} d="M 165 226 V 250"/>
      </svg>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;

  .loader {
    width: 120px;
    height: auto;
  }

  .loader path {
    fill: none;
    stroke: #983255;
    stroke-linecap: round;
    stroke-linejoin: round;
    animation:
      dashArray 4s ease-in-out infinite,
      dashOffset 4s linear infinite;
  }

  .loader path:nth-child(3)  { stroke-width: 0.8px; }
  .loader path:nth-child(4)  { stroke-width: 0.8px; }
  .loader path:nth-child(5)  { stroke-width: 1.4px; }
  .loader path:nth-child(6)  { stroke-width: 1.4px; }
  .loader path:nth-child(7)  { stroke-width: 1.4px; }
  .loader path:nth-child(8)  { stroke-width: 1.4px; }
  .loader path:nth-child(9)  { stroke-width: 1.4px; }
  .loader path:nth-child(10) { stroke-width: 1.4px; }
  .loader path:nth-child(11) { stroke-width: 1.4px; }
  .loader path:nth-child(12) { stroke-width: 1.4px; }
  .loader path:nth-child(13) { stroke-width: 1.4px; }
  .loader path:nth-child(14) { stroke-width: 5px; }
  .loader path:nth-child(15) { stroke-width: 5px; }
  .loader path:nth-child(16) { stroke-width: 1.4px; }
  .loader path:nth-child(17) { stroke-width: 0.8px; }
  .loader path:nth-child(18) { stroke-width: 0.8px; }
  .loader path:nth-child(19) { stroke-width: 5px; }
  .loader path:nth-child(20) { stroke-width: 2.5px; }
  .loader path:nth-child(21) { stroke-width: 2px; }
  .loader path:nth-child(22) { stroke-width: 2px; }

  .loader path:nth-child(3)  { animation-delay:  0s,    0s;    }
  .loader path:nth-child(4)  { animation-delay: -3.8s, -3.8s;  }
  .loader path:nth-child(5)  { animation-delay: -3.6s, -3.6s;  }
  .loader path:nth-child(6)  { animation-delay: -3.4s, -3.4s;  }
  .loader path:nth-child(7)  { animation-delay: -3.2s, -3.2s;  }
  .loader path:nth-child(8)  { animation-delay: -3.0s, -3.0s;  }
  .loader path:nth-child(9)  { animation-delay: -2.8s, -2.8s;  }
  .loader path:nth-child(10) { animation-delay: -2.6s, -2.6s;  }
  .loader path:nth-child(11) { animation-delay: -2.4s, -2.4s;  }
  .loader path:nth-child(12) { animation-delay: -2.2s, -2.2s;  }
  .loader path:nth-child(13) { animation-delay: -2.0s, -2.0s;  }
  .loader path:nth-child(14) { animation-delay: -1.8s, -1.8s;  }
  .loader path:nth-child(15) { animation-delay: -1.6s, -1.6s;  }
  .loader path:nth-child(16) { animation-delay: -1.4s, -1.4s;  }
  .loader path:nth-child(17) { animation-delay: -1.2s, -1.2s;  }
  .loader path:nth-child(18) { animation-delay: -1.0s, -1.0s;  }
  .loader path:nth-child(19) { animation-delay: -0.8s, -0.8s;  }
  .loader path:nth-child(20) { animation-delay: -0.6s, -0.6s;  }
  .loader path:nth-child(21) { animation-delay: -0.4s, -0.4s;  }
  .loader path:nth-child(22) { animation-delay: -0.2s, -0.2s;  }

  @keyframes dashArray {
    0%   { stroke-dasharray: 0 1 359 0; }
    50%  { stroke-dasharray: 0 359 1 0; }
    100% { stroke-dasharray: 359 1 0 0; }
  }

  @keyframes dashOffset {
    0%   { stroke-dashoffset: 365; }
    100% { stroke-dashoffset: 5;   }
  }
`;

export default ProductCardSkeleton;
