// In the browser, call through Next.js proxy (/api/...) to avoid CORS.
// On the server (SSR/build), call the backend directly.
const API_BASE =
  typeof window !== 'undefined'
    ? '/api'
    : process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';

export type ApiError = {
  statusCode: number;
  message: string | string[];
  error?: string;
};

// ─────────────────────────────────────────────────────────────────────────────
// Storage key sets
// Customer session  → cesto_access_token / cesto_refresh_token / cesto_user_id
// Admin session     → cesto_admin_access_token / cesto_admin_refresh_token / cesto_admin_user_id
// They are completely independent — admin login never touches customer tokens.
// ─────────────────────────────────────────────────────────────────────────────
const CUSTOMER_KEYS = {
  access:  'cesto_access_token',
  refresh: 'cesto_refresh_token',
  userId:  'cesto_user_id',
} as const;

const ADMIN_KEYS = {
  access:  'cesto_admin_access_token',
  refresh: 'cesto_admin_refresh_token',
  userId:  'cesto_admin_user_id',
} as const;

type KeySet = typeof CUSTOMER_KEYS | typeof ADMIN_KEYS;

class ApiClient {
  private baseUrl: string;
  private keys: KeySet;

  constructor(baseUrl: string, keys: KeySet = CUSTOMER_KEYS) {
    this.baseUrl = baseUrl;
    this.keys = keys;
  }

  private getTokens() {
    if (typeof window === 'undefined') return null;
    return {
      accessToken:  localStorage.getItem(this.keys.access),
      refreshToken: localStorage.getItem(this.keys.refresh),
      userId:       localStorage.getItem(this.keys.userId),
    };
  }

  private setTokens(tokens: { access_token: string; refresh_token: string }, userId?: string) {
    if (typeof window === 'undefined') return;
    localStorage.setItem(this.keys.access,  tokens.access_token);
    localStorage.setItem(this.keys.refresh, tokens.refresh_token);
    if (userId) localStorage.setItem(this.keys.userId, userId);
  }

  clearTokens() {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(this.keys.access);
    localStorage.removeItem(this.keys.refresh);
    localStorage.removeItem(this.keys.userId);
  }

  async request<T = any>(
    path: string,
    options: RequestInit = {},
    skipAuth = false
  ): Promise<T> {
    const tokens = this.getTokens();
    const url = `${this.baseUrl}${path}`;

    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...((options.headers as Record<string, string>) || {}),
    };

    if (tokens?.accessToken && !skipAuth) {
      headers['Authorization'] = `Bearer ${tokens.accessToken}`;
    }

    let response = await fetch(url, { ...options, headers });

    // Handle Token Refresh
    if (response.status === 401 && tokens?.refreshToken && tokens?.userId && !skipAuth) {
      const refreshedTokens = await this.refreshToken(tokens.refreshToken, tokens.userId);
      if (refreshedTokens) {
        headers['Authorization'] = `Bearer ${refreshedTokens.access_token}`;
        response = await fetch(url, { ...options, headers });
      }
    }

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw {
        statusCode: response.status,
        message: errorData.message || 'Something went wrong',
        error: errorData.error,
      } as ApiError;
    }

    if (response.status === 204) return null as any;
    return response.json();
  }

  private async refreshToken(refreshToken: string, userId: string) {
    try {
      const res = await fetch(`${this.baseUrl}/v1/auth/refresh`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refreshToken, userId }),
      });

      if (res.ok) {
        const data = await res.json();
        this.setTokens(data);
        return data;
      }
    } catch (e) {
      console.error('Failed to refresh token', e);
    }

    this.clearTokens();
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new Event('cesto_unauthorized'));
    }
    return null;
  }

  // ── Auth ──────────────────────────────────────────────────────────────────

  async login(data: any) {
    const res = await this.request('/v1/auth/login', {
      method: 'POST',
      body: JSON.stringify(data),
    }, true);

    const user = await this.request('/v1/auth/me', {
      headers: { 'Authorization': `Bearer ${res.access_token}` }
    }, true);

    this.setTokens(res, user.id);
    return { ...res, user };
  }

  async register(data: any) {
    return this.request('/v1/auth/register', {
      method: 'POST',
      body: JSON.stringify(data),
    }, true);
  }

  async logout() {
    const tokens = this.getTokens();
    if (tokens?.accessToken && tokens?.refreshToken && tokens?.userId) {
      try {
        await this.request('/v1/auth/logout', {
          method: 'POST',
          body: JSON.stringify({ refreshToken: tokens.refreshToken, userId: tokens.userId }),
        });
      } catch (e) {
        console.error('Logout error', e);
      }
    }
    this.clearTokens();
  }

  async getMe() {
    return this.request('/v1/auth/me');
  }

  // ── Phone OTP ─────────────────────────────────────────────────────────────

  async phoneStart(data: { countryCode: string; phone: string }) {
    return this.request('/v1/auth/phone/start', {
      method: 'POST',
      body: JSON.stringify(data),
    }, true);
  }

  async phoneVerify(data: { countryCode: string; phone: string; otp: string }) {
    const res = await this.request('/v1/auth/phone/verify', {
      method: 'POST',
      body: JSON.stringify(data),
    }, true);

    if (res.access_token) {
      this.setTokens({ access_token: res.access_token, refresh_token: res.refresh_token }, res.user?.id);
    }

    return res;
  }

  async phoneCompleteProfile(data: {
    countryCode: string;
    phone: string;
    otp: string;
    name: string;
    email?: string;
    age?: number;
    gender?: string;
  }) {
    const res = await this.request('/v1/auth/phone/complete-profile', {
      method: 'POST',
      body: JSON.stringify(data),
    }, true);

    if (res.access_token) {
      this.setTokens({ access_token: res.access_token, refresh_token: res.refresh_token }, res.user.id);
    }

    return res;
  }

  // ── Catalog ───────────────────────────────────────────────────────────────

  async getProducts(params?: Record<string, string>) {
    const qs = params ? '?' + new URLSearchParams(params).toString() : '';
    return this.request(`/v1/products${qs}`);
  }

  async getProduct(slug: string) {
    return this.request(`/v1/products/${slug}`);
  }

  async getCategories() {
    return this.request('/v1/categories');
  }

  // ── Cart & Checkout ───────────────────────────────────────────────────────

  async getCart() {
    const tokens = this.getTokens();
    const qs = tokens?.userId ? `?userId=${tokens.userId}` : '';
    return this.request(`/v1/cart${qs}`);
  }

  async addToCart(productId: string, quantity: number) {
    const cart = await this.getCart();
    return this.request(`/v1/cart/${cart.id}/items`, {
      method: 'POST',
      body: JSON.stringify({ productId, quantity }),
    });
  }

  async updateCartItem(itemId: string, quantity: number) {
    return this.request(`/v1/cart/items/${itemId}`, {
      method: 'PUT',
      body: JSON.stringify({ quantity }),
    });
  }

  async removeFromCart(itemId: string) {
    return this.request(`/v1/cart/items/${itemId}`, {
      method: 'DELETE',
    });
  }

  async createOrder(orderData: any) {
    return this.request('/v1/orders', {
      method: 'POST',
      body: JSON.stringify(orderData),
    });
  }

  async getOrder(orderId: string) {
    return this.request(`/v1/orders/${orderId}`);
  }

  // ── Admin ─────────────────────────────────────────────────────────────────

  async getAdminDashboard() {
    return this.request('/v1/admin/dashboard');
  }

  async adminListProducts(page = 1, search = '') {
    const qs = new URLSearchParams({ page: String(page), limit: '20', ...(search ? { search } : {}) });
    return this.request(`/v1/admin/products?${qs}`);
  }

  async adminGetProduct(id: string) {
    return this.request(`/v1/admin/products/${id}`);
  }

  async adminCreateProduct(data: any) {
    return this.request('/v1/admin/products', { method: 'POST', body: JSON.stringify(data) });
  }

  async adminUpdateProduct(id: string, data: any) {
    return this.request(`/v1/admin/products/${id}`, { method: 'PATCH', body: JSON.stringify(data) });
  }

  async adminDeleteProduct(id: string) {
    return this.request(`/v1/admin/products/${id}`, { method: 'DELETE' });
  }

  async adminListCategories() {
    return this.request('/v1/admin/categories');
  }

  async adminCreateCategory(data: any) {
    return this.request('/v1/admin/categories', { method: 'POST', body: JSON.stringify(data) });
  }

  async adminUpdateCategory(id: string, data: any) {
    return this.request(`/v1/admin/categories/${id}`, { method: 'PATCH', body: JSON.stringify(data) });
  }

  async adminDeleteCategory(id: string) {
    return this.request(`/v1/admin/categories/${id}`, { method: 'DELETE' });
  }

  async getCloudinarySignature(folder = 'cesto/products') {
    return this.request('/v1/uploads/cloudinary-sign', { method: 'POST', body: JSON.stringify({ folder }) });
  }

  async adminGetOrders(status?: string, page = 1) {
    const qs = new URLSearchParams({ page: String(page), ...(status ? { status } : {}) });
    return this.request(`/v1/admin/orders?${qs}`);
  }

  async adminUpdateOrderStatus(id: string, status: string) {
    return this.request(`/v1/admin/orders/${id}/status`, { method: 'PATCH', body: JSON.stringify({ status }) });
  }
}

// Customer-facing client — uses cesto_access_token / cesto_refresh_token / cesto_user_id
export const apiClient = new ApiClient(API_BASE, CUSTOMER_KEYS);

// Admin-only client — uses cesto_admin_* keys, never touches customer tokens
export const adminApiClient = new ApiClient(API_BASE, ADMIN_KEYS);
