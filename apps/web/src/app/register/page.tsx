'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

export default function RegisterPage() {
  const router = useRouter();
  const { isAuthenticated, openLoginModal } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      // Already logged in, redirect to account
      router.push('/account');
    } else {
      // Open login modal (which now handles signup too) and redirect to home
      openLoginModal(() => {
        router.push('/account');
      });
      
      // Also redirect to home immediately
      router.push('/');
    }
  }, [isAuthenticated, openLoginModal, router]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#b22153] mx-auto"></div>
        <p className="mt-4 text-gray-600">Redirecting...</p>
      </div>
    </div>
  );
}
