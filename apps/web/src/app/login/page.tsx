'use client';

import React, { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

function LoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { isAuthenticated, openLoginModal, login } = useAuth();
  const [isAdmin, setIsAdmin] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const adminParam = searchParams?.get('admin');
    if (adminParam === 'true') {
      setIsAdmin(true);
    }
  }, [searchParams]);

  useEffect(() => {
    if (isAuthenticated && !isAdmin) {
      router.push('/account');
    } else if (isAuthenticated && isAdmin) {
      router.push('/admin/dashboard');
    } else if (!isAdmin) {
      // Regular customer login - use phone OTP modal
      openLoginModal(() => {
        router.push('/account');
      });
      router.push('/');
    }
  }, [isAuthenticated, isAdmin, openLoginModal, router]);

  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      await login({ email, password });
      router.push('/admin/dashboard');
    } catch (err: any) {
      setError(err.message || 'Invalid admin credentials');
    } finally {
      setLoading(false);
    }
  };

  // Admin login form
  if (isAdmin && !isAuthenticated) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen px-4 bg-gray-50">
        <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl border border-gray-200">
          <div className="text-center mb-8">
            <div className="inline-block bg-[#1a3a3a] text-white px-4 py-2 rounded-lg mb-4">
              <span className="text-xs font-bold uppercase tracking-wider">Admin Portal</span>
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Admin Login</h1>
            <p className="text-gray-500 text-sm mt-2">Access restricted to administrators only</p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-xl text-sm border border-red-100">
              {error}
            </div>
          )}

          <form onSubmit={handleAdminLogin} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Admin Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#1a3a3a]/20 focus:border-[#1a3a3a]"
                placeholder="admin@cesto.com"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#1a3a3a]/20 focus:border-[#1a3a3a]"
                placeholder="••••••••"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#1a3a3a] text-white py-4 rounded-xl font-bold text-lg hover:bg-[#122828] active:scale-[0.98] transition-all disabled:opacity-50 disabled:active:scale-100 shadow-lg"
            >
              {loading ? 'Signing in...' : 'Admin Sign In'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <button 
              onClick={() => router.push('/')}
              className="text-sm text-gray-500 hover:text-gray-700"
            >
              ← Back to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Loading or redirecting for regular users
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#b22153] mx-auto"></div>
        <p className="mt-4 text-gray-600">Redirecting...</p>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#b22153] mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    }>
      <LoginContent />
    </Suspense>
  );
}
