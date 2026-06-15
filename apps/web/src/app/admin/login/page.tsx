'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { adminApiClient } from '@/lib/api-client';
import { BsShieldLock, BsArrowLeft } from 'react-icons/bs';
import { DotLottiePlayer } from '@dotlottie/react-player';

/**
 * Admin phone whitelist — add numbers here (digits only, no country code).
 * The server also enforces role=ADMIN|SUPER_ADMIN; this is a first-line
 * UX gate that prevents sending OTPs to non-admin numbers.
 */
const ADMIN_PHONE_WHITELIST: string[] = [];
// Leave empty to allow any phone number (backend enforces ADMIN role check)

type Step = 'phone' | 'otp' | 'success';

export default function AdminLoginPage() {
  const router = useRouter();
  const [step, setStep] = useState<Step>('phone');
  const [phone, setPhone] = useState('');
  const phoneLatest = useRef('');
  const [otp, setOtp] = useState(['', '', '', '']);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const phoneRef = useRef<HTMLInputElement>(null);
  const otpRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];

  // If an admin token already exists, skip the login screen
  useEffect(() => {
    const token = localStorage.getItem('cesto_admin_access_token');
    if (token) {
      window.location.href = '/admin/dashboard';
    }
  }, []);

  useEffect(() => {
    if (step === 'phone') phoneRef.current?.focus();
    if (step === 'otp') setTimeout(() => otpRefs[0].current?.focus(), 100);
  }, [step]); // eslint-disable-line react-hooks/exhaustive-deps

  const handlePhoneSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const cleaned = phoneLatest.current;
    if (cleaned.length !== 10) {
      setError('Enter a valid 10-digit phone number');
      return;
    }

    // Whitelist check — only run if whitelist has entries
    if (ADMIN_PHONE_WHITELIST.length > 0 && !ADMIN_PHONE_WHITELIST.includes(cleaned)) {
      setError('Access denied. This number is not authorised for admin access.');
      return;
    }

    setLoading(true);
    try {
      await adminApiClient.phoneStart({ countryCode: '+91', phone: phoneLatest.current });
      setPhone(cleaned);
      setStep('otp');
    } catch (err: any) {
      setError(err.message || 'Failed to send OTP. Try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleOtpChange = (index: number, value: string) => {
    if (value && !/^\d$/.test(value)) return;
    if (value.length > 1) value = value.slice(-1);

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    setError('');

    if (value && index < 3) otpRefs[index + 1].current?.focus();
    if (index === 3 && value) {
      const full = [...newOtp.slice(0, 3), value].join('');
      if (full.length === 4) setTimeout(() => handleOtpVerify(full), 100);
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      otpRefs[index - 1].current?.focus();
    }
  };

  const handleOtpPaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 4);
    if (!pasted) return;
    const newOtp = pasted.split('').concat(['', '', '', '']).slice(0, 4);
    setOtp(newOtp);
    const nextIdx = Math.min(pasted.length, 3);
    otpRefs[nextIdx].current?.focus();
    if (pasted.length === 4) setTimeout(() => handleOtpVerify(pasted), 100);
  };

  const handleOtpVerify = async (otpValue?: string) => {
    const code = otpValue || otp.join('');
    if (code.length !== 4) {
      setError('Enter the complete 4-digit OTP');
      return;
    }

    setLoading(true);
    setError('');
    try {
      const verifyRes = await adminApiClient.phoneVerify({ countryCode: '+91', phone, otp: code });

      if (!verifyRes.access_token) {
        setError('Access denied. No admin account found for this number.');
        setStep('phone');
        setOtp(['', '', '', '']);
        return;
      }

      // Verify admin role using the admin client (reads admin tokens)
      const me = await adminApiClient.getMe();
      if (me.role !== 'ADMIN' && me.role !== 'SUPER_ADMIN') {
        await adminApiClient.logout();
        setError('Access denied. This account does not have admin privileges.');
        setStep('phone');
        setOtp(['', '', '', '']);
        return;
      }

      setStep('success');
      // Use window.location for a hard navigation — router.replace can race with
      // the auth context update and land back on /admin/login
      setTimeout(() => {
        window.location.href = '/admin/dashboard';
      }, 1800);
    } catch (err: any) {
      setError(err.message || 'Invalid OTP. Try again.');
      setOtp(['', '', '', '']);
      otpRefs[0].current?.focus();
    } finally {
      setLoading(false);
    }
  };

  if (!otpRefs[0]) return null; // guard against SSR

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0f2027 0%, #1a3a3a 50%, #203a43 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px',
    }}>
      <div style={{
        background: 'white',
        borderRadius: 24,
        width: '100%',
        maxWidth: 420,
        boxShadow: '0 32px 80px rgba(0,0,0,0.4)',
        overflow: 'hidden',
      }}>
        {/* Header */}
        <div style={{
          background: 'linear-gradient(135deg, #1a3a3a 0%, #0f2027 100%)',
          padding: '32px 32px 28px',
          textAlign: 'center',
        }}>
          <div style={{
            width: 64, height: 64, borderRadius: '50%',
            background: 'rgba(255,255,255,0.1)',
            border: '2px solid rgba(255,255,255,0.2)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 16px',
          }}>
            <BsShieldLock size={28} color="white" />
          </div>
          <h1 style={{ fontSize: 22, fontWeight: 900, color: 'white', marginBottom: 4, letterSpacing: '-0.3px' }}>
            Admin Access
          </h1>
          <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.6)', fontWeight: 600 }}>
            CESTO · Restricted Area
          </p>
        </div>

        {/* Body */}
        <div style={{ padding: '32px' }}>

          {step === 'phone' && (
            <form onSubmit={handlePhoneSubmit}>
              <p style={{ fontSize: 13, color: '#5F5F5F', marginBottom: 24, lineHeight: 1.5 }}>
                Enter your registered admin phone number. Only authorised numbers can proceed.
              </p>

              <label style={{ fontSize: 11, fontWeight: 800, color: '#A9A0AE', textTransform: 'uppercase', letterSpacing: '1px', display: 'block', marginBottom: 8 }}>
                Phone Number
              </label>

              <div style={{
                display: 'flex',
                alignItems: 'stretch',
                border: '2px solid #E5E7EB',
                borderRadius: 14,
                overflow: 'hidden',
                marginBottom: 20,
                background: 'white',
              }}>
                {/* Fixed country code prefix — always visible */}
                <div style={{
                  background: '#F3F4F6',
                  padding: '0 14px',
                  minWidth: 80,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRight: '2px solid #E5E7EB',
                  flexShrink: 0,
                  gap: 6,
                }}>
                  <span style={{ fontSize: 18, lineHeight: 1 }}>🇮🇳</span>
                  <span style={{ fontSize: 14, fontWeight: 800, color: '#374151', whiteSpace: 'nowrap' }}>+91</span>
                </div>
                <input
                  ref={phoneRef}
                  type="tel"
                  inputMode="numeric"
                  placeholder="10-digit mobile"
                  value={phone}
                  onChange={(e) => {
                    const val = e.target.value.replace(/\D/g, '').slice(0, 10);
                    setPhone(val);
                    phoneLatest.current = val;
                    setError('');
                  }}
                  maxLength={10}
                  disabled={loading}
                  style={{
                    flex: 1,
                    border: 'none',
                    outline: 'none',
                    padding: '0 16px',
                    height: 52,
                    fontSize: 20,
                    fontWeight: 800,
                    letterSpacing: '3px',
                    color: '#111111',
                    background: 'transparent',
                    minWidth: 0,
                    fontFamily: 'inherit',
                  }}
                />
                {/* Live digit counter */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  paddingRight: 14,
                  flexShrink: 0,
                }}>
                  <span style={{
                    fontSize: 11,
                    fontWeight: 700,
                    color: phone.length === 10 ? '#10B981' : '#D1D5DB',
                  }}>
                    {phone.length}/10
                  </span>
                </div>
              </div>

              {error && (
                <div style={{ background: '#FEF2F2', border: '1px solid #FECACA', borderRadius: 10, padding: '10px 14px', marginBottom: 16 }}>
                  <p style={{ fontSize: 12, color: '#DC2626', fontWeight: 700 }}>🚫 {error}</p>
                </div>
              )}

              <button
                type="submit"
                disabled={loading || phone.length !== 10}
                style={{
                  width: '100%', height: 52, borderRadius: 14,
                  background: loading || phone.length !== 10
                    ? '#E5E7EB' : '#1a3a3a',
                  color: loading || phone.length !== 10
                    ? '#9CA3AF' : 'white',
                  border: 'none', cursor: loading || phone.length !== 10
                    ? 'not-allowed' : 'pointer',
                  fontSize: 14, fontWeight: 800, letterSpacing: '0.5px',
                  transition: 'all 0.2s',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                }}
              >
                {loading ? (
                  <>
                    <svg style={{ animation: 'spin 1s linear infinite', width: 18, height: 18 }} viewBox="0 0 24 24" fill="none">
                      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" opacity="0.25" />
                      <path d="M4 12a8 8 0 018-8" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                    </svg>
                    Sending OTP...
                  </>
                ) : 'Send OTP →'}
              </button>
            </form>
          )}

          {step === 'otp' && (
            <div>
              <button
                onClick={() => { setStep('phone'); setOtp(['', '', '', '']); setError(''); }}
                style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#6B7280', fontSize: 12, fontWeight: 700, marginBottom: 20, background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
              >
                <BsArrowLeft size={14} /> Back
              </button>

              <p style={{ fontSize: 13, color: '#5F5F5F', marginBottom: 24, lineHeight: 1.5 }}>
                OTP sent to <strong style={{ color: '#111111' }}>+91 {phone}</strong>
              </p>

              <label style={{ fontSize: 11, fontWeight: 800, color: '#A9A0AE', textTransform: 'uppercase', letterSpacing: '1px', display: 'block', marginBottom: 16 }}>
                Enter 4-digit OTP
              </label>

              <div style={{ display: 'flex', gap: 10, justifyContent: 'center', marginBottom: 24 }}>
                {otp.map((digit, i) => (
                  <input
                    key={i}
                    ref={otpRefs[i]}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(i, e.target.value)}
                    onKeyDown={(e) => handleOtpKeyDown(i, e)}
                    onPaste={handleOtpPaste}
                    disabled={loading}
                    style={{
                      width: 60, height: 64, textAlign: 'center',
                      fontSize: 24, fontWeight: 900, letterSpacing: '2px',
                      border: `2px solid ${digit ? '#1a3a3a' : '#E5E7EB'}`,
                      borderRadius: 14, outline: 'none', background: digit ? '#F0F7F6' : 'white',
                      transition: 'all 0.15s',
                      color: '#111111',
                    }}
                  />
                ))}
              </div>

              {error && (
                <div style={{ background: '#FEF2F2', border: '1px solid #FECACA', borderRadius: 10, padding: '10px 14px', marginBottom: 16 }}>
                  <p style={{ fontSize: 12, color: '#DC2626', fontWeight: 700 }}>🚫 {error}</p>
                </div>
              )}

              <button
                onClick={() => handleOtpVerify()}
                disabled={loading || otp.join('').length !== 4}
                style={{
                  width: '100%', height: 52, borderRadius: 14,
                  background: loading || otp.join('').length !== 4 ? '#E5E7EB' : '#1a3a3a',
                  color: loading || otp.join('').length !== 4 ? '#9CA3AF' : 'white',
                  border: 'none', cursor: loading || otp.join('').length !== 4 ? 'not-allowed' : 'pointer',
                  fontSize: 14, fontWeight: 800, transition: 'all 0.2s',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                }}
              >
                {loading ? (
                  <>
                    <svg style={{ animation: 'spin 1s linear infinite', width: 18, height: 18 }} viewBox="0 0 24 24" fill="none">
                      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" opacity="0.25" />
                      <path d="M4 12a8 8 0 018-8" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                    </svg>
                    Verifying...
                  </>
                ) : 'Verify & Login →'}
              </button>
            </div>
          )}

          {step === 'success' && (
            <div style={{ textAlign: 'center', padding: '20px 0' }}>
              <div style={{ width: 160, height: 160, margin: '0 auto' }}>
                <DotLottiePlayer
                  src="/lottie/success.lottie"
                  autoplay
                  loop={false}
                />
              </div>
              <h2 style={{ fontSize: 20, fontWeight: 900, color: '#111111', marginBottom: 8, marginTop: -8 }}>Access Granted</h2>
              <p style={{ fontSize: 13, color: '#5F5F5F' }}>Redirecting to dashboard...</p>
            </div>
          )}

          <p style={{ fontSize: 11, color: '#D1D5DB', textAlign: 'center', marginTop: 24, fontWeight: 600 }}>
            🔒 Secured admin portal · All logins are logged
          </p>
        </div>
      </div>

      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
