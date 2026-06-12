const BASE_URL = 'http://127.0.0.1:4000/api';

async function request(path: string, method: string = 'GET') {
  const res = await fetch(`${BASE_URL}${path}`, { method });
  return { status: res.status, data: await res.json().catch(() => ({})) };
}

async function run() {
  console.log('--- Health Endpoints Verification ---');
  let hasFailed = false;

  const testPath = async (p: string, expectedDb?: boolean) => {
    try {
      const res = await request(p);
      if (res.status === 200) {
        if (expectedDb && res.data?.db !== 'connected') {
          console.error(`[FAIL] ${p} connected but DB is disconnected.`, res.data);
          hasFailed = true;
        } else {
          console.log(`[PASS] ${p} responded: ${JSON.stringify(res.data)}`);
        }
      } else {
        console.error(`[FAIL] ${p} returned ${res.status}`);
        hasFailed = true;
      }
    } catch (e: any) {
      console.error(`[FAIL] ${p} unreachable: ${e.cause?.code || e.message}`);
      hasFailed = true;
    }
  };

  await testPath('/health');
  await testPath('/health/db', true);
  await testPath('/health/redis');

  if (hasFailed) process.exit(1);
  console.log('\n✅ Health Tests Passed.');
}

run().catch(e => { console.error(e); process.exit(1); });
