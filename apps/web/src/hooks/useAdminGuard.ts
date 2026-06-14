'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { adminApiClient } from '@/lib/api-client';

interface AdminUser {
  id: string;
  name: string;
  email: string | null;
  phone: string | null;
  role: string;
}

// Module-level cache: verified admin user survives client-side navigation
let _cachedAdminUser: AdminUser | null = null;

export function useAdminGuard() {
  const router = useRouter();
  const [adminUser, setAdminUser] = useState<AdminUser | null>(_cachedAdminUser);
  // Start as NOT loading if we already have a cached user
  const [loading, setLoading] = useState(_cachedAdminUser === null);

  useEffect(() => {
    // Already verified — instant
    if (_cachedAdminUser) {
      setAdminUser(_cachedAdminUser);
      setLoading(false);
      return;
    }

    const token = typeof window !== 'undefined'
      ? localStorage.getItem('cesto_admin_access_token')
      : null;

    if (!token) {
      // No token at all — redirect immediately, don't wait
      router.replace('/admin/login');
      return;
    }

    // Token exists — verify it with a short timeout so we don't hang forever
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 6000);

    adminApiClient.getMe()
      .then((me: AdminUser) => {
        clearTimeout(timer);
        if (me.role !== 'ADMIN' && me.role !== 'SUPER_ADMIN') {
          adminApiClient.clearTokens();
          _cachedAdminUser = null;
          router.replace('/admin/login');
          return;
        }
        _cachedAdminUser = me;
        setAdminUser(me);
        setLoading(false);
      })
      .catch(() => {
        clearTimeout(timer);
        adminApiClient.clearTokens();
        _cachedAdminUser = null;
        router.replace('/admin/login');
      });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return { loading, adminUser };
}

/** Call this on logout to invalidate the in-memory cache */
export function clearAdminCache() {
  _cachedAdminUser = null;
}
