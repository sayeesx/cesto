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

class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  private getTokens() {
    if (typeof window === 'undefined') return null;
    return {
      accessToken: localStorage.getItem('cesto_access_token'),
      refreshToken: localStorage.getItem('cesto_refresh_token'),
      userId: localStorage.getItem('cesto_user_id'),
    };
  }

  private setTokens(tokens: { access_token: string; refresh_token: string }, userId?: string) {
    if (typeof window === 'undefined') return;
    localStorage.setItem('cesto_access_token', tokens.access_token);
    localStorage.setItem('cesto_refresh_token', tokens.refresh_token);
    if (userId) localStorage.setItem('cesto_user_id', userId);
  }

  private clearTokens() {
    if (typeof window === 'undefined') return;
    localStorage.removeItem('cesto_access_token');
    localStorage.removeItem('cesto_refresh_token');
    localStorage.removeItem('cesto_user_id');
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
        // Retry with new token
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

  // --- Auth Methods ---
  async login(data: any) {
    const res = await this.request('/v1/auth/login', {
      method: 'POST',
      body: JSON.stringify(data),
    }, true);

    // Fetch user profile to get the ID
    const user = await this.request('/v1/auth/me', {
      headers: { 'Authorization': `Bearer ${res.access_token}` }
    }, true);

    this.setTokens(res, user.id);
    return { ...res, user };
  }

  async register(data: any) {
    const res = await this.request('/v1/auth/register', {
      method: 'POST',
      body: JSON.stringify(data),
    }, true);
    
    // Auto-login or just return
    return res;
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

  // --- Phone OTP Auth Methods ---
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

    // If user exists and logged in, store tokens
    if (res.userExists && res.access_token) {
      this.setTokens({ access_token: res.access_token, refresh_token: res.refresh_token }, res.user.id);
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

    // Store tokens after successful profile creation
    if (res.access_token) {
      this.setTokens({ access_token: res.access_token, refresh_token: res.refresh_token }, res.user.id);
    }

    return res;
  }

  // --- Catalog Methods ---
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

  // --- Cart & Checkout ---
  async getCart() {
    const tokens = this.getTokens();
    const qs = tokens?.userId ? `?userId=${tokens.userId}` : '';
    return this.request(`/v1/cart${qs}`);
  }

  async addToCart(productId: string, quantity: number) {
    return this.request('/v1/cart/items', {
      method: 'POST',
      body: JSON.stringify({ productId, quantity }),
    });
  }

  async updateCartItem(itemId: string, quantity: number) {
    return this.request(`/v1/cart/items/${itemId}`, {
      method: 'PATCH',
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

  // --- Admin ---
  async getAdminDashboard() {
    return this.request('/v1/admin/dashboard');
  }
}

export const apiClient = new ApiClient(API_BASE);
