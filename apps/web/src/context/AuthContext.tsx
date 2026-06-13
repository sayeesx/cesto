'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { apiClient } from '@/lib/api-client';
import LoginBottomSheet from '@/components/auth/LoginBottomSheet';

interface User {
  id: string;
  email: string | null;
  name: string;
  phone: string | null;
  role: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (data: any) => Promise<void>;
  register: (data: any) => Promise<void>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
  openLoginModal: (onSuccess?: () => void) => void;
  closeLoginModal: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [loginSuccessCallback, setLoginSuccessCallback] = useState<(() => void) | undefined>();

  useEffect(() => {
    async function initAuth() {
      const accessToken = localStorage.getItem('cesto_access_token');
      if (accessToken) {
        try {
          // Timeout after 5s — never block the page indefinitely
          const profilePromise = apiClient.getMe();
          const timeoutPromise = new Promise<null>((_, reject) =>
            setTimeout(() => reject(new Error('Auth timeout')), 5000)
          );
          const profile = await Promise.race([profilePromise, timeoutPromise]);
          if (profile) setUser(profile as any);
        } catch (e) {
          // Token expired, network issue, or timeout — just continue unauthenticated
          localStorage.removeItem('cesto_access_token');
          localStorage.removeItem('cesto_refresh_token');
          localStorage.removeItem('cesto_user_id');
        }
      }
      setLoading(false);
    }

    initAuth();

    // Listen for unauthorized events from api-client
    const handleUnauthorized = () => {
      setUser(null);
    };

    window.addEventListener('cesto_unauthorized', handleUnauthorized);
    return () => window.removeEventListener('cesto_unauthorized', handleUnauthorized);
  }, []);

  const login = async (data: any) => {
    const res = await apiClient.login(data);
    setUser(res.user);
  };

  const register = async (data: any) => {
    await apiClient.register(data);
  };

  const logout = async () => {
    await apiClient.logout();
    setUser(null);
  };

  const openLoginModal = useCallback((onSuccess?: () => void) => {
    setLoginSuccessCallback(() => onSuccess);
    setLoginModalOpen(true);
  }, []);

  const closeLoginModal = () => {
    setLoginModalOpen(false);
    setLoginSuccessCallback(undefined);
  };

  const handleLoginSuccess = async () => {
    // Refresh user profile
    try {
      const profile = await apiClient.getMe();
      setUser(profile);
    } catch (e) {
      console.error('Failed to fetch user profile', e);
    }

    // Call success callback if provided
    if (loginSuccessCallback) {
      loginSuccessCallback();
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        logout,
        isAuthenticated: !!user,
        openLoginModal,
        closeLoginModal,
      }}
    >
      {children}
      <LoginBottomSheet 
        isOpen={loginModalOpen}
        onClose={closeLoginModal}
        onSuccess={handleLoginSuccess}
      />
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
