const API_URL = 'http://127.0.0.1:4000/api/v1';

async function request(path: string, method: string = 'GET', body?: any, token?: string) {
  const headers: any = { 'Content-Type': 'application/json' };
  if (token) headers['Authorization'] = `Bearer ${token}`;
  
  const res = await fetch(`${API_URL}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });
  
  const data = await res.json().catch(() => ({}));
  return { status: res.status, data };
}

async function run() {
  console.log('--- Auth Flow E2E Test ---');

  const email = `test.user.${Date.now()}@cesto.in`;
  const password = 'TestPassword123!';
  let userId: string;

  // 1. Register Customer
  let res = await request('/auth/register', 'POST', { email, password, name: 'Test Customer' });
  if (res.status === 201) {
    console.log('[PASS] Customer registered');
  } else { 
    console.error('[FAIL] Registration:', res.status, res.data); 
    process.exit(1); 
  }

  // 2. Login Customer
  res = await request('/auth/login', 'POST', { email, password });
  let accessToken = res.data?.access_token;
  let refreshToken = res.data?.refresh_token; 
  
  if (res.status === 200 && accessToken) {
    console.log('[PASS] Customer logged in');
  } else { 
    console.error('[FAIL] Login:', res.status, res.data); 
    process.exit(1); 
  }

  // 3. Get Current User
  res = await request('/auth/me', 'GET', undefined, accessToken);
  if (res.status === 200 && res.data?.email === email) {
    console.log('[PASS] Get current user');
    userId = res.data.id;
  } else { 
    console.error('[FAIL] Get current user:', res.status, res.data); 
    process.exit(1); 
  }

  // 4. Refresh Token Logic
  res = await request('/auth/refresh', 'POST', { refreshToken, userId });
  const newAccessToken = res.data?.access_token;
  const newRefreshToken = res.data?.refresh_token;

  if (res.status === 200 && newAccessToken && newRefreshToken !== refreshToken) {
    console.log('[PASS] Token refreshed successfully with rotation.');
  } else {
    console.error('[FAIL] Token refresh rotation failed:', res.status, res.data);
    process.exit(1);
  }

  // 5. Reuse old refresh token (Should Fail)
  res = await request('/auth/refresh', 'POST', { refreshToken, userId });
  if (res.status === 401 || res.status === 403) {
    console.log('[PASS] Reusing old refresh token denied.');
  } else {
    console.error('[FAIL] Old refresh token was accepted status:', res.status);
    process.exit(1);
  }

  // 6. Logout
  res = await request('/auth/logout', 'POST', { refreshToken: newRefreshToken, userId }, newAccessToken);
  if (res.status === 200) console.log('[PASS] User logged out explicitly.');
  else { console.error('[FAIL] Logout failed:', res.status); process.exit(1); }

  // 7. Reuse post-logout refresh token (Should Fail)
  res = await request('/auth/refresh', 'POST', { refreshToken: newRefreshToken, userId });
  if (res.status === 401 || res.status === 403) {
    console.log('[PASS] Access using logged out token denied.');
  } else {
    console.error('[FAIL] Logged out refresh token was accepted status:', res.status);
    process.exit(1);
  }

  console.log('\n✅ Auth Flow E2E Passed.');
}

run().catch(e => { console.error(e); process.exit(1); });
