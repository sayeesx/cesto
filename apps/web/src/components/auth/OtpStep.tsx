'use client';

import React, { useState, useRef, useEffect } from 'react';
import { apiClient } from '@/lib/api-client';

interface OtpStepProps {
  countryCode: string;
  phone: string;
  onVerified: (requiresProfile: boolean) => void;
}

export default function OtpStep({ countryCode, phone, onVerified }: OtpStepProps) {
  const [otp, setOtp] = useState(['', '', '', '']);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const inputRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];

  useEffect(() => {
    // Auto-focus first input
    inputRefs[0].current?.focus();
  }, []);

  const handleChange = (index: number, value: string) => {
    // Only allow single digit
    if (value.length > 1) {
      value = value.slice(-1);
    }

    // Only allow digits
    if (value && !/^\d$/.test(value)) {
      return;
    }

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    setError('');

    // Auto-focus next input
    if (value && index < 3) {
      inputRefs[index + 1].current?.focus();
    }

    // Auto-submit when all 4 digits are entered
    if (index === 3 && value) {
      const fullOtp = [...newOtp.slice(0, 3), value].join('');
      if (fullOtp.length === 4) {
        setTimeout(() => handleVerify(fullOtp), 100);
      }
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      // Move to previous input on backspace if current is empty
      inputRefs[index - 1].current?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 4);
    
    if (pastedData) {
      const newOtp = pastedData.split('').concat(['', '', '', '']).slice(0, 4);
      setOtp(newOtp);
      
      // Focus last filled input or first empty
      const nextIndex = Math.min(pastedData.length, 3);
      inputRefs[nextIndex].current?.focus();

      // Auto-submit if complete
      if (pastedData.length === 4) {
        setTimeout(() => handleVerify(pastedData), 100);
      }
    }
  };

  const handleVerify = async (otpValue?: string) => {
    const otpToVerify = otpValue || otp.join('');
    
    if (otpToVerify.length !== 4) {
      setError('Please enter the complete 4-digit OTP');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const result = await apiClient.phoneVerify({
        countryCode,
        phone,
        otp: otpToVerify,
      });

      if (result.userExists) {
        // Existing user - logged in successfully
        onVerified(false);
      } else {
        // New user - needs to complete profile
        onVerified(true);
      }
    } catch (err: any) {
      setError(err.message || 'Invalid OTP. Please try again.');
      setOtp(['', '', '', '']);
      inputRefs[0].current?.focus();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <p className="text-gray-600 text-sm mb-6">
        Enter the 4-digit code sent to{' '}
        <span className="font-semibold text-gray-900">
          {countryCode} {phone}
        </span>
      </p>

      {/* OTP Input Boxes */}
      <div className="flex gap-3 justify-center">
        {otp.map((digit, index) => (
          <input
            key={index}
            ref={inputRefs[index]}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={digit}
            onChange={(e) => handleChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            onPaste={handlePaste}
            className="w-16 h-16 text-center text-2xl font-bold border-2 border-gray-400 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#b22153]/40 focus:border-[#b22153] transition-all hover:border-gray-500"
            disabled={loading}
          />
        ))}
      </div>

      <button
        onClick={() => handleVerify()}
        disabled={loading || otp.join('').length !== 4}
        className="w-full bg-[#b22153] text-white py-4 rounded-xl font-bold text-lg hover:bg-[#9a1d48] active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100 shadow-lg shadow-[#b22153]/20 flex items-center justify-center gap-2"
      >
        {loading && (
          <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        )}
        {loading ? 'Verifying...' : 'Verify Code'}
      </button>

      {error && (
        <p className="text-red-600 text-sm text-center -mt-2">{error}</p>
      )}

      <button
        type="button"
        className="w-full text-gray-500 text-sm hover:text-gray-700 py-2"
        disabled={loading}
      >
        Didn't receive code? <span className="text-[#b22153] font-semibold">Resend</span>
      </button>
    </div>
  );
}
