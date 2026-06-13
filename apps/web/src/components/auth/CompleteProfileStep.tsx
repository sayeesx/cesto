'use client';

import React, { useState } from 'react';
import { apiClient } from '@/lib/api-client';

interface CompleteProfileStepProps {
  countryCode: string;
  phone: string;
  otp: string;
  onComplete: () => void;
}

const GENDERS = [
  { value: 'MALE', label: 'Male' },
  { value: 'FEMALE', label: 'Female' },
  { value: 'OTHER', label: 'Other' },
  { value: 'PREFER_NOT_TO_SAY', label: 'Prefer not to say' },
];

export default function CompleteProfileStep({ 
  countryCode, 
  phone, 
  otp, 
  onComplete 
}: CompleteProfileStepProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim()) {
      setError('Name is required');
      return;
    }

    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Invalid email address');
      return;
    }

    if (age && (parseInt(age) < 13 || parseInt(age) > 120)) {
      setError('Age must be between 13 and 120');
      return;
    }

    setLoading(true);
    setError('');

    try {
      await apiClient.phoneCompleteProfile({
        countryCode,
        phone,
        otp: otp || '1234', // Fallback to hardcoded OTP
        name: name.trim(),
        email: email.trim() || undefined,
        age: age ? parseInt(age) : undefined,
        gender: gender || undefined,
      });

      onComplete();
    } catch (err: any) {
      setError(err.message || 'Failed to create profile. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <p className="text-gray-600 text-sm mb-4">
        Welcome! Please complete your profile to continue.
      </p>

      {/* Name - Required */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Full Name <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            setError('');
          }}
          className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#b22153]/20 focus:border-[#b22153] transition-all"
          placeholder="John Doe"
          required
        />
      </div>

      {/* Email - Optional */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Email Address <span className="text-gray-400 text-xs">(Optional)</span>
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setError('');
          }}
          className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#b22153]/20 focus:border-[#b22153] transition-all"
          placeholder="john@example.com"
        />
      </div>

      {/* Age - Optional */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Age <span className="text-gray-400 text-xs">(Optional)</span>
        </label>
        <input
          type="number"
          value={age}
          onChange={(e) => {
            setAge(e.target.value);
            setError('');
          }}
          className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#b22153]/20 focus:border-[#b22153] transition-all"
          placeholder="25"
          min="13"
          max="120"
        />
      </div>

      {/* Gender - Optional */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Gender <span className="text-gray-400 text-xs">(Optional)</span>
        </label>
        <div className="relative">
          <select
            value={gender}
            onChange={(e) => {
              setGender(e.target.value);
              setError('');
            }}
            className="w-full px-4 py-3 pr-10 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#b22153]/20 focus:border-[#b22153] appearance-none bg-white transition-all"
          >
            <option value="">Select gender</option>
            {GENDERS.map((g) => (
              <option key={g.value} value={g.value}>
                {g.label}
              </option>
            ))}
          </select>
          <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
            <svg width="12" height="8" viewBox="0 0 12 8" fill="none">
              <path d="M1 1L6 6L11 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </div>
        </div>
      </div>

      <button
        type="submit"
        disabled={loading || !name.trim()}
        className="w-full bg-[#1a3a3a] text-white py-4 rounded-xl font-bold text-lg hover:bg-[#122828] active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100 shadow-lg shadow-[#1a3a3a]/20 flex items-center justify-center gap-2"
      >
        {loading && (
          <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        )}
        {loading ? 'Saving...' : 'Complete Profile'}
      </button>

      {error && (
        <p className="text-red-600 text-sm text-center -mt-2">{error}</p>
      )}
    </form>
  );
}
