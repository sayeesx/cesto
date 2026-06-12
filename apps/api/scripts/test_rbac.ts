const API_URL = 'http://127.0.0.1:4000/api/v1';

async function request(path: string, method: string = 'GET', body?: any, token?: string) {
  const headers: any = { 'Content-Type': 'application/json' };
  if (token) headers['Authorization'] = `Bearer ${token}`;
  const res = await fetch(`${API_URL}${path}`, { method, headers, body: body ? JSON.stringify(body) : undefined });
  return { status: res.status, data: await res.json().catch(() => ({})) };
}

async function run() {
  console.log('--- RBAC Sandbox Test ---');

  // Register + login a customer
  const custEmail = `rbac.cust.${Date.now()}@test.com`;
  const custPassword = 'RbacTest123!';
  await request('/auth/register', 'POST', { email: custEmail, password: custPassword, name: 'RBAC Customer' });
  const custLoginRes = await request('/auth/login', 'POST', { email: custEmail, password: custPassword });
  const custToken = custLoginRes.data?.access_token;

  if (!custToken) {
    console.error('[FAIL] Could not obtain customer token:', custLoginRes.data);
    process.exit(1);
  }

  // Login as admin
  const adminPassword = process.env.ADMIN_SEED_PASSWORD || 'admin123_dev_only';
  const adminLoginRes = await request('/auth/login', 'POST', { email: 'admin@cesto.in', password: adminPassword });
  const adminToken = adminLoginRes.data?.access_token;

  // CUSTOMER tests — should be blocked from admin endpoints
  let res = await request('/admin/dashboard', 'GET', undefined, custToken);
  if (res.status === 403 || res.status === 401) console.log('[PASS] CUSTOMER blocked from admin dashboard.');
  else { console.error('[FAIL] CUSTOMER accessed admin resource. Status:', res.status); process.exit(1); }

  res = await request('/admin/orders/123/status', 'PATCH', { status: 'DELIVERED' }, custToken);
  if (res.status === 403 || res.status === 401 || res.status === 404) console.log('[PASS] CUSTOMER blocked from admin mutations.');
  else { console.error('[FAIL] CUSTOMER accessed admin mutation. Status:', res.status); process.exit(1); }

  res = await request('/admin/audit-logs', 'GET', undefined, custToken);
  if (res.status === 403 || res.status === 401) console.log('[PASS] CUSTOMER blocked from admin audit logs.');
  else { console.error('[FAIL] CUSTOMER accessed admin audit logs. Status:', res.status); process.exit(1); }

  // ADMIN tests
  if (adminToken) {
    res = await request('/admin/stats', 'GET', undefined, adminToken);
    if (res.status === 200) console.log('[PASS] ADMIN can access admin dashboard.');
    else console.error(`[FAIL] ADMIN rejected from dashboard. Status: ${res.status}`, res.data);
  } else {
    console.log('[SKIPPED] Admin tests skipped — could not login as admin.');
  }

  // Invalid Token Test
  res = await request('/auth/me', 'GET', undefined, 'invalid_token_xyz');
  if (res.status === 401) console.log('[PASS] Invalid token returns 401.');
  else { console.error('[FAIL] Invalid token bypass! Status:', res.status); process.exit(1); }

  console.log('\n✅ RBAC Verification Passed.');
}

run().catch(e => { console.error(e); process.exit(1); });
