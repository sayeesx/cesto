'use client';

import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

/* 
  A premium rolling digit animation that stops at the correct price.
  It animates once from 0 to the target digit and stays there.
*/

const DigitWrapper = styled.div<{ $size: number, $color: string }>`
  display: inline-flex;
  align-items: center;
  font-family: 'Archivo', monospace;
  font-weight: 900;
  font-size: ${props => props.$size}px;
  color: ${props => props.$color};
  overflow: hidden;
  height: 1.2em;
  line-height: 1.2em;
  
  .symbol {
    margin-right: 2px;
  }

  .digit-container {
    display: inline-block;
    position: relative;
    height: 1.2em;
    width: 1.1ch;
    text-align: center;
    overflow: hidden;
  }

  .digit-strip {
    display: flex;
    flex-direction: column;
    transition: transform 1.5s cubic-bezier(0.16, 1, 0.3, 1);
  }

  .digit-item {
    height: 1.2em;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

interface RollingPriceProps {
  price: number;
  size?: number;
  color?: string;
  showSymbol?: boolean;
}

export default function RollingPrice({ price, size = 16, color = '#111111', showSymbol = true }: RollingPriceProps) {
  const [mounted, setMounted] = useState(false);
  const priceStr = Math.round(price).toString();
  const digits = priceStr.split('');

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <DigitWrapper $size={size} $color={color}>
      {showSymbol && <span className="symbol">₹</span>}
      {digits.map((digit, i) => {
        const targetDigit = parseInt(digit, 10);
        return (
          <span key={i} className="digit-container">
            <span 
              className="digit-strip"
              style={{ 
                transform: mounted ? `translateY(-${targetDigit * 1.2}em)` : 'translateY(0)',
                transitionDelay: `${i * 0.1}s` 
              }}
            >
              {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => (
                <span key={num} className="digit-item">{num}</span>
              ))}
            </span>
          </span>
        );
      })}
    </DigitWrapper>
  );
}
