'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
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

export default function LoginBottomSheet({ isOpen, onClose, onSuccess }: LoginBottomSheetProps) {
  const [step, setStep] = useState<Step>('phone');
  const [phoneData, setPhoneData] = useState({ countryCode: '+91', phone: '' });
  const [otpValue, setOtpValue] = useState('');
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (isOpen) {
      // Reset state when modal opens
      setStep('phone');
      setPhoneData({ countryCode: '+91', phone: '' });
      setOtpValue('');
    }
  }, [isOpen]);

  const handlePhoneSubmit = (countryCode: string, phone: string) => {
    setPhoneData({ countryCode, phone });
    setStep('otp');
  };

  const handleOtpVerified = (requiresProfile: boolean) => {
    if (requiresProfile) {
      setStep('profile');
    } else {
      setStep('success');
      setTimeout(() => {
        onClose();
        onSuccess?.();
      }, 2200);
    }
  };

  const handleProfileComplete = () => {
    setStep('success');
    setTimeout(() => {
      onClose();
      onSuccess?.();
    }, 2200);
  };

  const handleBack = () => {
    if (step === 'otp') {
      setStep('phone');
    } else if (step === 'profile') {
      setStep('otp');
    }
  };

  const handleClose = () => {
    onClose();
    // Always go home when closing login modal
    router.push('/');
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop — z-index above ProductModal (3001) */}
      <div 
        className="fixed inset-0 bg-black/50 transition-opacity"
        style={{ zIndex: 4000, backdropFilter: 'blur(2px)' }}
        onClick={handleClose}
      />

      {/* Modal - Responsive: Bottom sheet on mobile, Centered on desktop */}
      <div 
        className="fixed bg-white shadow-2xl bottom-0 left-0 right-0 rounded-t-[32px] md:bottom-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:max-w-md md:w-full md:rounded-2xl animate-slide-up"
        style={{ 
          zIndex: 4001,
          maxHeight: '75vh',
          animation: 'slideUp 0.3s ease-out'
        }}
      >
        {/* Handle Bar - Mobile only */}
        <div className="flex justify-center pt-4 pb-2 md:hidden">
          <div className="w-12 h-1.5 bg-gray-300 rounded-full" />
        </div>

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          {step !== 'phone' && step !== 'success' && step !== 'failed' && (
            <button 
              onClick={handleBack}
              type="button"
              className="p-2 -ml-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <BsArrowLeft size={20} />
            </button>
          )}
          {(step === 'phone' || step === 'success' || step === 'failed') && <div />}
          
          <h2 className="text-xl font-bold text-gray-900">
            {step === 'phone' && 'Login or Sign Up'}
            {step === 'otp' && 'Verify OTP'}
            {step === 'profile' && 'Complete Your Profile'}
            {step === 'success' && 'Welcome!'}
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

        {/* Content */}
        <div className="px-6 py-4 overflow-y-auto" style={{ maxHeight: 'calc(75vh - 100px)' }}>
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
            <div className="text-center py-4">
              <div style={{ width: 160, height: 160, margin: '0 auto' }}>
                <DotLottiePlayer
                  src="/lottie/success.lottie"
                  autoplay
                  loop={false}
                />
              </div>
              <p className="text-lg font-bold text-gray-900 -mt-2">Login Successful</p>
              <p className="text-sm text-gray-500 mt-1">Welcome back!</p>
            </div>
          )}

          {step === 'failed' && (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <BsExclamationCircleFill size={36} color="#EF4444" />
              </div>
              <p className="text-lg font-bold text-gray-900">Verification Failed</p>
              <p className="text-sm text-gray-500 mt-1 mb-6">The OTP you entered is incorrect or has expired.</p>
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
        @keyframes slideUp {
          from {
            transform: translateY(100%);
          }
          to {
            transform: translateY(0);
          }
        }
      `}</style>
    </>
  );
}
