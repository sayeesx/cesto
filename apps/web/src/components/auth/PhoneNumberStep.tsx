'use client';

import React, { useState, useRef, useEffect } from 'react';
import { getCountries, getCountryCallingCode, isValidPhoneNumber } from 'libphonenumber-js';
import { apiClient } from '@/lib/api-client';
import * as flags from 'country-flag-icons/react/3x2';

interface PhoneNumberStepProps {
  onSubmit: (countryCode: string, phone: string) => void;
}

// Get all countries with their data
const getAllCountries = () => {
  const countries = getCountries();
  return countries.map(code => {
    try {
      const callingCode = getCountryCallingCode(code);
      return {
        code,
        callingCode: `+${callingCode}`,
        name: new Intl.DisplayNames(['en'], { type: 'region' }).of(code) || code,
      };
    } catch {
      return null;
    }
  }).filter((c): c is NonNullable<typeof c> => c !== null);
};

const COUNTRY_DATA = getAllCountries();

// Get national number length for country
const getNationalNumberLength = (countryCode: string): number => {
  const lengths: Record<string, number> = {
    'IN': 10, 'US': 10, 'CA': 10, 'GB': 10, 'AU': 9, 
    'SG': 8, 'AE': 9, 'SA': 9, 'QA': 8, 'KW': 8,
    'BH': 8, 'OM': 8, 'JO': 9, 'LB': 8, 'EG': 10,
    'PK': 10, 'BD': 10, 'LK': 9, 'NP': 10, 'MY': 9,
    'TH': 9, 'ID': 10, 'PH': 10, 'VN': 9, 'CN': 11,
    'JP': 10, 'KR': 10, 'HK': 8, 'TW': 9, 'DE': 10,
    'FR': 9, 'IT': 10, 'ES': 9, 'NL': 9, 'BE': 9,
    'CH': 9, 'AT': 10, 'SE': 9, 'NO': 8, 'DK': 8,
    'FI': 9, 'PL': 9, 'RU': 10, 'TR': 10, 'BR': 11,
    'MX': 10, 'AR': 10, 'CL': 9, 'CO': 10, 'PE': 9,
    'ZA': 9, 'KE': 9, 'NG': 10, 'GH': 9, 'NZ': 9,
  };
  return lengths[countryCode] || 10;
};

export default function PhoneNumberStep({ onSubmit }: PhoneNumberStepProps) {
  const [selectedCountry, setSelectedCountry] = useState('IN');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const phoneInputRef = useRef<HTMLInputElement | null>(null);

  const numDigits = getNationalNumberLength(selectedCountry);
  const countryCallingCode = COUNTRY_DATA.find(c => c.code === selectedCountry)?.callingCode || '+91';

  useEffect(() => {
    if (phoneInputRef.current) {
      setTimeout(() => phoneInputRef.current?.focus(), 100);
    }
  }, []);

  const filteredCountries = COUNTRY_DATA.filter(country => 
    country.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    country.callingCode.includes(searchQuery) ||
    country.code.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCountrySelect = (countryCode: string) => {
    setSelectedCountry(countryCode);
    setSearchOpen(false);
    setSearchQuery('');
    setPhone('');
    setError('');
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '');
    if (value.length <= numDigits) {
      setPhone(value);
      setError('');
    }
  };

  const validatePhone = (): boolean => {
    if (!phone || phone.length < numDigits) {
      setError('Please enter complete phone number');
      return false;
    }

    try {
      const fullNumber = `${countryCallingCode}${phone}`;
      const isValid = isValidPhoneNumber(fullNumber, selectedCountry as any);
      
      if (!isValid) {
        setError('Invalid phone number');
        return false;
      }

      return true;
    } catch (err) {
      setError('Invalid phone number');
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validatePhone()) return;

    setLoading(true);
    setError('');

    try {
      console.log('Sending OTP to:', { countryCode: countryCallingCode, phone });
      await apiClient.phoneStart({ countryCode: countryCallingCode, phone });
      onSubmit(countryCallingCode, phone);
    } catch (err: any) {
      console.error('Phone start error:', err);
      setError(err.message || 'Failed to send code');
    } finally {
      setLoading(false);
    }
  };

  const selectedCountryData = COUNTRY_DATA.find(c => c.code === selectedCountry);
  const FlagComponent = (flags as any)[selectedCountry];

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Country Selector with Flag */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Country</label>
        <div className="relative">
          <button
            type="button"
            onClick={() => setSearchOpen(!searchOpen)}
            className="w-full px-4 py-3 rounded-xl border-2 border-gray-400 focus:outline-none focus:ring-2 focus:ring-[#b22153]/30 focus:border-[#b22153] bg-white font-medium text-left flex items-center justify-between hover:border-gray-500 transition-colors"
          >
            <div className="flex items-center gap-3">
              {FlagComponent && (
                <FlagComponent className="w-6 h-4 rounded" style={{ objectFit: 'cover' }} />
              )}
              <span>{selectedCountryData?.name} ({selectedCountryData?.callingCode})</span>
            </div>
            <svg width="12" height="8" viewBox="0 0 12 8" fill="none" className={`transition-transform ${searchOpen ? 'rotate-180' : ''}`}>
              <path d="M1 1L6 6L11 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>

          {searchOpen && (
            <>
              <div 
                className="fixed inset-0 z-40" 
                onClick={() => setSearchOpen(false)}
              />
              <div className="absolute z-50 w-full mt-2 bg-white border-2 border-gray-300 rounded-xl shadow-xl max-h-80 overflow-hidden">
                <div className="p-3 border-b-2 border-gray-200 sticky top-0 bg-white">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search country..."
                    className="w-full px-3 py-2 border-2 border-gray-400 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#b22153]/30 focus:border-[#b22153]"
                    autoFocus
                    onClick={(e) => e.stopPropagation()}
                  />
                </div>
                <div className="overflow-y-auto max-h-64">
                  {filteredCountries.map((country) => {
                    const CountryFlag = (flags as any)[country.code];
                    return (
                      <button
                        key={country.code}
                        type="button"
                        onClick={() => handleCountrySelect(country.code)}
                        className="w-full px-4 py-2.5 text-left hover:bg-gray-100 text-sm flex items-center justify-between transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          {CountryFlag && (
                            <CountryFlag className="w-6 h-4 rounded" style={{ objectFit: 'cover' }} />
                          )}
                          <span>{country.name}</span>
                        </div>
                        <span className="text-gray-500 font-mono text-xs">{country.callingCode}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Phone Number Single Input */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
        <input
          ref={phoneInputRef}
          type="tel"
          inputMode="numeric"
          value={phone}
          onChange={handlePhoneChange}
          placeholder={`${'0'.repeat(numDigits)}`}
          disabled={loading}
          maxLength={numDigits}
          className="w-full px-4 py-4 text-2xl font-black border-[3px] border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#b22153]/40 focus:border-[#b22153] transition-all hover:border-gray-400 tracking-widest text-center"
        />
      </div>

      <button
        type="submit"
        disabled={loading || phone.length < numDigits}
        className="w-full bg-[#b22153] text-white py-4 rounded-xl font-bold text-lg hover:bg-[#9a1d48] active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100 shadow-lg shadow-[#b22153]/20 flex items-center justify-center gap-2"
      >
        {loading && (
          <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        )}
        {loading ? 'Checking...' : 'Continue'}
      </button>

      {error && (
        <p className="text-red-600 text-sm text-center font-medium -mt-2">{error}</p>
      )}

      <p className="text-xs text-gray-500 text-center">
        By continuing, you agree to Cesto's Terms of Service and Privacy Policy
      </p>
    </form>
  );
}
