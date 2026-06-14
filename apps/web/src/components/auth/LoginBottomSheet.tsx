'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { BsX, BsArrowLeft, BsExclamationCircleFill } from 'react-icons/bs';
import PhoneNumberStep from './PhoneNumberStep';
import OtpStep from './OtpStep';
import CompleteProfileStep from './CompleteProfileStep';
import { DotLottiePlayer } from '@dotlottie/react-player';

type Step = 'phone' | 'otp' | 'profile' | 'success' | 'failed';

interface LoginBottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

// Preload the lottie file as soon as this module is imported (app start).
// This runs once globally, not per render, so the file is cached before
// the user even reaches the success screen.
if (typeof window !== 'undefined') {
  const link = document.createElement('link');
  link.rel = 'prefetch';
  link.href = '/lottie/success.lottie';
  link.as = 'fetch';
  link.crossOrigin = 'anonymous';
  document.head.appendChild(link);
}

export default function LoginBottomSheet({ isOpen, onClose, onSuccess }: LoginBottomSheetProps) {
  const [step, setStep] = useState<Step>('phone');
  const [phoneData, setPhoneData] = useState({ countryCode: '+91', phone: '' });
  const [otpValue, setOtpValue] = useState('');
  const router = useRouter();
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Clean up any pending close timer on unmount
  useEffect(() => {
    return () => {
      if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    };
  }, []);

  useEffect(() => {
    if (isOpen) {
      setStep('phone');
      setPhoneData({ countryCode: '+91', phone: '' });
      setOtpValue('');
    } else {
      // Reset after close animation
      if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    }
  }, [isOpen]);

  const triggerSuccess = () => {
    setStep('success');
    // Close after 1 second — lottie plays instantly
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    closeTimerRef.current = setTimeout(() => {
      onClose();
      onSuccess?.();
    }, 1000);
  };

  const handlePhoneSubmit = (countryCode: string, phone: string) => {
    setPhoneData({ countryCode, phone });
    setStep('otp');
  };

  const handleOtpVerified = (requiresProfile: boolean) => {
    if (requiresProfile) {
      setStep('profile');
    } else {
      triggerSuccess();
    }
  };

  const handleProfileComplete = () => {
    triggerSuccess();
  };

  const handleBack = () => {
    if (step === 'otp') setStep('phone');
    else if (step === 'profile') setStep('otp');
  };

  const handleClose = () => {
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    onClose();
    router.push('/');
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 transition-opacity"
        style={{ zIndex: 4000, backdropFilter: 'blur(2px)' }}
        onClick={handleClose}
      />

      {/* Modal — bottom sheet on mobile, centered on desktop */}
      <div
        className="fixed bg-white shadow-2xl bottom-0 left-0 right-0 rounded-t-[32px] md:bottom-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:max-w-md md:w-full md:rounded-2xl"
        style={{
          zIndex: 4001,
          maxHeight: '75vh',
          animation: 'loginSlideUp 0.3s ease-out',
        }}
      >
        {/* Handle — mobile only */}
        <div className="flex justify-center pt-4 pb-2 md:hidden">
          <div className="w-12 h-1.5 bg-gray-300 rounded-full" />
        </div>

        {/* Header — hidden on success */}
        {step !== 'success' && (
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
            {step !== 'phone' && step !== 'failed' ? (
              <button
                onClick={handleBack}
                type="button"
                className="p-2 -ml-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <BsArrowLeft size={20} />
              </button>
            ) : (
              <div />
            )}

            <h2 className="text-xl font-bold text-gray-900">
              {step === 'phone' && 'Login or Sign Up'}
              {step === 'otp' && 'Verify OTP'}
              {step === 'profile' && 'Complete Your Profile'}
              {step === 'failed' && 'Login Failed'}
            </h2>

            <button
              onClick={handleClose}
              type="button"
              className="p-2 -mr-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <BsX size={24} />
            </button>
          </div>
        )}

        {/* Content */}
        <div
          className="px-6 py-4 overflow-y-auto"
          style={{ maxHeight: step === 'success' ? 'none' : 'calc(75vh - 100px)' }}
        >
          {step === 'phone' && (
            <PhoneNumberStep onSubmit={handlePhoneSubmit} />
          )}

          {step === 'otp' && (
            <OtpStep
              countryCode={phoneData.countryCode}
              phone={phoneData.phone}
              onVerified={handleOtpVerified}
              onFailed={() => setStep('failed')}
            />
          )}

          {step === 'profile' && (
            <CompleteProfileStep
              countryCode={phoneData.countryCode}
              phone={phoneData.phone}
              otp={otpValue}
              onComplete={handleProfileComplete}
            />
          )}

          {step === 'success' && (
            <div style={{ textAlign: 'center', padding: '32px 0 28px' }}>
              <div style={{ width: 180, height: 180, margin: '0 auto' }}>
                <DotLottiePlayer
                  src="/lottie/success.lottie"
                  autoplay
                  loop={false}
                />
              </div>
              <p style={{
                fontSize: 20,
                fontWeight: 900,
                color: '#111',
                marginTop: -8,
                marginBottom: 6,
              }}>
                Login Successful
              </p>
              <p style={{ fontSize: 13, color: '#9CA3AF', fontWeight: 500 }}>
                Welcome back!
              </p>
            </div>
          )}

          {step === 'failed' && (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <BsExclamationCircleFill size={36} color="#EF4444" />
              </div>
              <p className="text-lg font-bold text-gray-900">Verification Failed</p>
              <p className="text-sm text-gray-500 mt-1 mb-6">
                The OTP you entered is incorrect or has expired.
              </p>
              <button
                onClick={() => setStep('phone')}
                className="w-full bg-[#b22153] text-white py-3 rounded-xl font-bold hover:bg-[#9a1d48] transition-all"
              >
                Try Again
              </button>
            </div>
          )}
        </div>
      </div>

      <style>{`
        @keyframes loginSlideUp {
          from { transform: translateY(100%); }
          to   { transform: translateY(0); }
        }
        @media (min-width: 768px) {
          @keyframes loginSlideUp {
            from { opacity: 0; transform: translate(-50%, -46%); }
            to   { opacity: 1; transform: translate(-50%, -50%); }
          }
        }
      `}</style>
    </>
  );
}
