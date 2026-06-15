'use client';
import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { adminApiClient } from '@/lib/api-client';

interface AdminUser {
  id: string;
  name: string;
  email: string | null;
  phone: string | null;
  role: string;
}

let _cachedAdminUser: AdminUser | null = null;

export function useAdminGuard() {
  const router = useRouter();
  const verified = useRef(false);
  const [adminUser, setAdminUser] = useState<AdminUser | null>(_cachedAdminUser);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (verified.current) return;
    verified.current = true;

    if (_cachedAdminUser) {
      setAdminUser(_cachedAdminUser);
      return;
    }

    const token = typeof window !== 'undefined'
      ? localStorage.getItem('cesto_admin_access_token')
      : null;

    if (!token) {
      router.replace('/admin/login');
      return;
    }

    // Optimistically show UI, verify in background
    setLoading(false);

    adminApiClient.getMe()
      .then((me: AdminUser) => {
        if (me.role !== 'ADMIN' && me.role !== 'SUPER_ADMIN') {
          adminApiClient.clearTokens();
          _cachedAdminUser = null;
          router.replace('/admin/login');
          return;
        }
        _cachedAdminUser = me;
        setAdminUser(me);
      })
      .catch(() => {
        adminApiClient.clearTokens();
        _cachedAdminUser = null;
        router.replace('/admin/login');
      });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return { loading, adminUser };
}

export function clearAdminCache() {
  _cachedAdminUser = null;
}
