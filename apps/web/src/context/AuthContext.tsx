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

  // Fetch and set the user profile. Called on mount and whenever the api-client
  // fires cesto_token_refreshed (silent refresh succeeded but AuthContext didn't know).
  const loadUser = useCallback(async () => {
    const accessToken = localStorage.getItem('cesto_access_token');
    if (!accessToken) {
      setLoading(false);
      return;
    }

    try {
      // No race-with-timeout here: the api-client already handles the 401 → refresh
      // cycle internally. If the access token is expired it will be silently refreshed
      // before getMe() resolves. We just wait for the result.
      const profile = await apiClient.getMe();

      if (!profile) {
        setLoading(false);
        return;
      }

      if (profile.role === 'ADMIN' || profile.role === 'SUPER_ADMIN') {
        // Admin token accidentally stored in customer slot — clear it
        apiClient.clearTokens();
        setUser(null);
      } else {
        setUser(profile);
      }
    } catch (e: any) {
      // Only clear tokens on genuine auth failures (401/403).
      // Network errors and 5xx keep tokens so user recovers on next load.
      if (e?.statusCode === 401 || e?.statusCode === 403) {
        apiClient.clearTokens();
        setUser(null);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadUser();

    // api-client fires this after every successful silent token refresh so
    // AuthContext can re-hydrate user state without forcing a full page reload.
    const handleTokenRefreshed = () => {
      loadUser();
    };

    // api-client fires this when the refresh token itself is rejected (session
    // truly expired or revoked).
    const handleUnauthorized = () => {
      setUser(null);
      setLoading(false);
    };

    window.addEventListener('cesto_token_refreshed', handleTokenRefreshed);
    window.addEventListener('cesto_unauthorized', handleUnauthorized);
    return () => {
      window.removeEventListener('cesto_token_refreshed', handleTokenRefreshed);
      window.removeEventListener('cesto_unauthorized', handleUnauthorized);
    };
  }, [loadUser]);

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
    try {
      const profile = await apiClient.getMe();
      setUser(profile);
    } catch (e) {
      console.error('Failed to fetch user profile', e);
    }

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
