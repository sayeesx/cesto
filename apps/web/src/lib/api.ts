const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';

type FetchOptions = RequestInit & {
  token?: string;
};

async function apiFetch<T = any>(path: string, options: FetchOptions = {}): Promise<T> {
  const { token, headers, ...rest } = options;

  const res = await fetch(`${API_BASE}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...headers,
    },
    ...rest,
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({ message: 'Network error' }));
    throw new Error(error.message || `API Error ${res.status}`);
  }

  return res.json();
}

// =========== Auth ===========
export const api = {
  auth: {
    register: (data: { email: string; password: string; name?: string }) =>
      apiFetch('/v1/auth/register', { method: 'POST', body: JSON.stringify(data) }),
    login: (data: { email: string; password: string }) =>
      apiFetch('/v1/auth/login', { method: 'POST', body: JSON.stringify(data) }),
  },
  products: {
    list: (params?: Record<string, string>) => {
      const qs = params ? '?' + new URLSearchParams(params).toString() : '';
      return apiFetch(`/v1/products${qs}`);
    },
    get: (slug: string) => apiFetch(`/v1/products/${slug}`),
  },
  categories: {
    list: () => apiFetch('/v1/categories'),
    get: (slug: string) => apiFetch(`/v1/categories/${slug}`),
  },
  cart: {
    get: (userId?: string, session?: string) => {
      const qs = userId ? `userId=${userId}` : `session=${session}`;
      return apiFetch(`/v1/cart?${qs}`);
    },
    addItem: (cartId: string, data: { productId: string; quantity: number }, token?: string) =>
      apiFetch(`/v1/cart/${cartId}/items`, { method: 'POST', body: JSON.stringify(data), token }),
    removeItem: (itemId: string, token?: string) =>
      apiFetch(`/v1/cart/items/${itemId}`, { method: 'DELETE', token }),
  },
  orders: {
    create: (data: any, token: string) =>
      apiFetch('/v1/orders', { method: 'POST', body: JSON.stringify(data), token }),
    get: (id: string, token: string) => apiFetch(`/v1/orders/${id}`, { token }),
  },
  payments: {
    createOrder: (orderId: string, token: string) =>
      apiFetch('/v1/payments/create-order', { method: 'POST', body: JSON.stringify({ orderId }), token }),
    verify: (data: any, token: string) =>
      apiFetch('/v1/payments/verify', { method: 'POST', body: JSON.stringify(data), token }),
  },
  admin: {
    dashboard: (token: string) => apiFetch('/v1/admin/dashboard', { token }),
    orders: (token: string, status?: string) => {
      const qs = status ? `?status=${status}` : '';
      return apiFetch(`/v1/admin/orders${qs}`, { token });
    },
  },
};
