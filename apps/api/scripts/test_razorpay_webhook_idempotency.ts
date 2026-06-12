import * as crypto from 'crypto';

const API_URL = 'http://127.0.0.1:4000/api/v1';

async function request(path: string, method: string = 'GET', body?: any, headers?: any) {
  const res = await fetch(`${API_URL}${path}`, {
    method,
    headers: { 'Content-Type': 'application/json', ...headers },
    body: body ? JSON.stringify(body) : undefined,
  });
  return { status: res.status, data: await res.json().catch(() => ({})) };
}

async function run() {
  console.log('--- Razorpay Webhook Idempotency & Signature ---');

  if (!process.env.RAZORPAY_WEBHOOK_SECRET) {
    console.log('[SKIPPED] RAZORPAY_WEBHOOK_SECRET is missing. Skipping tests.');
    process.exit(0);
  }

  const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET;
  
  // Fake payload
  const fakePayload = {
    event: 'payment.captured',
    payload: { payment: { entity: { id: 'pay_test123', order_id: 'order_test123', method: 'card' } } }
  };
  const rawBody = JSON.stringify(fakePayload);
  
  const signature = crypto.createHmac('sha256', webhookSecret).update(rawBody).digest('hex');
  const badSignature = crypto.createHmac('sha256', webhookSecret).update(rawBody + 'bad').digest('hex');
  const eventId = `evt_${Date.now()}`;

  // 1. Invalid Signature
  let res = await request('/payments/webhook', 'POST', fakePayload, { 
    'x-razorpay-signature': badSignature,
    'x-razorpay-event-id': eventId
  });
  if (res.status === 400 || res.status === 401) {
    console.log('[PASS] Invalid signature rejected.');
  } else {
    console.error(`[FAIL] Bad signature was accepted! Status: ${res.status}`);
    process.exit(1);
  }

  // 2. Valid Signature (First run)
  res = await request('/payments/webhook', 'POST', fakePayload, { 
    'x-razorpay-signature': signature,
    'x-razorpay-event-id': eventId
  });
  if (res.status === 200 || res.status === 201) {
    console.log('[PASS] Valid webhook cleanly processed.');
  } else {
    console.error(`[FAIL] Valid webhook failed to process. Status: ${res.status}`);
    process.exit(1);
  }

  // 3. Valid Signature (Second run - Idempotency)
  res = await request('/payments/webhook', 'POST', fakePayload, { 
    'x-razorpay-signature': signature,
    'x-razorpay-event-id': eventId
  });
  
  if ((res.status === 200 || res.status === 201) && res.data?.status === 'already_processed') {
    console.log('[PASS] Idempotency confirmed. Second webhook was safely ignored.');
  } else {
    console.error(`[FAIL] Second webhook did not return idempotent flag or failed. ${res.status} => ${JSON.stringify(res.data)}`);
    process.exit(1);
  }

  console.log('\n✅ Razorpay Signature & Idempotency Passed');
}

run().catch(e => { console.error(e); process.exit(1); });
