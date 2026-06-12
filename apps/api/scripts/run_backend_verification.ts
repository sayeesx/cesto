import { execSync } from 'child_process';
import * as fs from 'fs';

console.log('=================================');
console.log(' CESTO BACKEND VERIFICATION SUITE');
console.log('=================================\n');

const scripts = [
  { name: 'verify_env', file: 'verify_env.ts' },
  { name: 'verify_db', file: 'verify_db.ts' },
  { name: 'test_health', file: 'test_health.ts' },
  { name: 'test_auth_flow', file: 'test_auth_flow.ts' },
  { name: 'test_rbac', file: 'test_rbac.ts' },
  { name: 'test_catalog', file: 'test_catalog.ts' },
  { name: 'test_checkout_flow', file: 'test_checkout_flow.ts' },
  { name: 'test_overselling', file: 'test_overselling.ts' },
  { name: 'test_razorpay_signature', file: 'test_razorpay_signature.ts' },
  { name: 'test_razorpay_webhook_idempotency', file: 'test_razorpay_webhook_idempotency.ts' },
  { name: 'test_r2_upload', file: 'test_r2_upload.ts' },
];

let passed = 0;
let failed = 0;
let skipped = 0;
const criticalFails: string[] = [];

for (const script of scripts) {
  console.log(`\n▶ Running ${script.name}...`);
  try {
    const tsNodeCmd = `npx ts-node -O "{\\"module\\":\\"commonjs\\"}" scripts/${script.file}`;
    const out = execSync(tsNodeCmd, { stdio: 'pipe' }).toString();
    console.log(out);
    
    if (out.includes('[SKIPPED]')) {
      skipped++;
    } else {
      passed++;
    }
  } catch (err: any) {
    if (err.stdout) console.log(err.stdout.toString());
    if (err.stderr) console.error(err.stderr.toString());
    
    failed++;
    const isCritical = ['verify_env', 'verify_db', 'test_auth_flow', 'test_checkout_flow', 'test_overselling', 'test_catalog'].includes(script.name);
    if (isCritical) criticalFails.push(script.name);
    console.log(`❌ ${script.name} FAILED.`);
  }
}

console.log('\n=================================');
console.log('   BACKEND VERIFICATION REPORT');
console.log('=================================');
console.log(`- Passed: ${passed}`);
console.log(`- Skipped: ${skipped}`);
console.log(`- Failed: ${failed}`);

if (criticalFails.length > 0) {
  console.log(`\nCRITICAL BLOCKERS DETECTED:`);
  criticalFails.forEach(f => console.log(`  - ${f}`));
  console.log('\nSafe to proceed to frontend: NO');
  process.exit(1);
} else {
  console.log('\nSafe to proceed to frontend: YES');
  process.exit(0);
}
