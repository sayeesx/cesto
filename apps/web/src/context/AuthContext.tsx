'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { apiClient } from '@/lib/api-client';

interface User {
  id: string;
  email: string;
  name: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (data: any) => Promise<void>;
  register: (data: any) => Promise<void>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function initAuth() {
      const accessToken = localStorage.getItem('cesto_access_token');
      if (accessToken) {
        try {
          const profile = await apiClient.getMe();
          setUser(profile);
        } catch (e) {
          console.error('Auth initialization failed', e);
          // Token might be expired or invalid, apiClient will handle cleanup if refresh fails
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

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
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
