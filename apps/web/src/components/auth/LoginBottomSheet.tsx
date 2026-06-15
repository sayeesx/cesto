'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { BsX, BsArrowLeft, BsExclamationCircleFill } from 'react-icons/bs';
import PhoneNumberStep from './PhoneNumberStep';
import OtpStep from './OtpStep';
import CompleteProfileStep from './CompleteProfileStep';
import { DotLottiePlayer } from '@dotlottie/react-player';

type Step = 'phone' | 'otp' | 'profile' | 'success';

interface LoginBottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

// Prefetch lottie once when this module loads so it's cached before success screen
if (typeof window !== 'undefined' && !(window as any).__lottiePrefetched) {
  (window as any).__lottiePrefetched = true;
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
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Cleanup on unmount
  useEffect(() => () => { if (closeTimer.current) clearTimeout(closeTimer.current); }, []);

  useEffect(() => {
    if (isOpen) {
      setStep('phone');
      setPhoneData({ countryCode: '+91', phone: '' });
      setOtpValue('');
    }
  }, [isOpen]);

  const triggerSuccess = () => {
    setStep('success');
    // Fallback: auto-close after 4s if lottie complete event never fires
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => {
      onClose();
      onSuccess?.();
    }, 4000);
  };

  // Called when the lottie animation finishes playing
  const onLottieComplete = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => {
      onClose();
      onSuccess?.();
    }, 1000); // 1s pause after animation ends, then close
  };

  const handlePhoneSubmit = (countryCode: string, phone: string) => {
    setPhoneData({ countryCode, phone });
    setStep('otp');
  };

  const handleOtpVerified = (requiresProfile: boolean) => {
    if (requiresProfile) setStep('profile');
    else triggerSuccess();
  };

  const handleProfileComplete = () => triggerSuccess();

  const handleBack = () => {
    if (step === 'otp') setStep('phone');
    else if (step === 'profile') setStep('otp');
  };

  const handleClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    onClose();
    router.push('/');
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50"
        style={{ zIndex: 4000, backdropFilter: 'blur(2px)' }}
        onClick={step === 'success' ? undefined : handleClose}
      />

      {/* Sheet / modal */}
      <div
        className="fixed bg-white shadow-2xl bottom-0 left-0 right-0 rounded-t-[32px] md:bottom-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:max-w-md md:w-full md:rounded-2xl"
        style={{ zIndex: 4001, maxHeight: '85vh', animation: 'loginSlideUp 0.3s ease-out' }}
      >
        {/* Handle — mobile only */}
        <div className="flex justify-center pt-4 pb-2 md:hidden">
          <div className="w-12 h-1.5 bg-gray-200 rounded-full" />
        </div>

        {/* Header — hidden during success */}
        {step !== 'success' && (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 20px 12px', borderBottom: '1px solid #F3F4F6' }}>
            {step !== 'phone' ? (
              <button onClick={handleBack} type="button" style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 8, borderRadius: '50%', display: 'flex', color: '#111' }}>
                <BsArrowLeft size={20} />
              </button>
            ) : <div style={{ width: 36 }} />}

            <h2 style={{ fontSize: 17, fontWeight: 900, color: '#111', margin: 0 }}>
              {step === 'phone' && 'Login or Sign Up'}
              {step === 'otp' && 'Verify OTP'}
              {step === 'profile' && 'Complete Profile'}
            </h2>

            <button onClick={handleClose} type="button" style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 8, borderRadius: '50%', display: 'flex', color: '#111' }}>
              <BsX size={22} />
            </button>
          </div>
        )}

        {/* Content */}
        <div style={{ padding: step === 'success' ? 0 : '8px 20px 20px', overflowY: 'auto', maxHeight: step === 'success' ? 'none' : 'calc(85vh - 120px)' }}>

          {step === 'phone' && <PhoneNumberStep onSubmit={handlePhoneSubmit} />}

          {step === 'otp' && (
            <OtpStep
              countryCode={phoneData.countryCode}
              phone={phoneData.phone}
              onVerified={handleOtpVerified}
              onGoBack={() => setStep('phone')}
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

          {/* ── SUCCESS — Lottie animation then auto-close ── */}
          {step === 'success' && (
            <div style={{
              textAlign: 'center',
              padding: '28px 24px 36px',
              background: '#fff',
              borderRadius: '0 0 32px 32px',
            }}>
              <div style={{ width: 180, height: 180, margin: '0 auto 4px' }}>
                <DotLottiePlayer
                  src="/lottie/success.lottie"
                  autoplay
                  loop={false}
                  onEvent={(event) => { if (event === 'complete') onLottieComplete(); }}
                  style={{ width: '100%', height: '100%' }}
                />
              </div>
              <p style={{ fontSize: 22, fontWeight: 900, color: '#111', margin: '0 0 6px', letterSpacing: '-0.3px' }}>
                Welcome!
              </p>
              <p style={{ fontSize: 13, color: '#9CA3AF', fontWeight: 500 }}>
                You&apos;re logged in successfully
              </p>
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
            from { opacity: 0; transform: translate(-50%, -48%); }
            to   { opacity: 1; transform: translate(-50%, -50%); }
          }
        }
      `}</style>
    </>
  );
}
