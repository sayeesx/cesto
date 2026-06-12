import * as fs from 'fs';
import * as path from 'path';
import * as dotenv from 'dotenv';
dotenv.config();

function checkEnv() {
  console.log('--- Environment Validation ---');
  let hasError = false;

  const requireEnv = (key: string) => {
    if (!process.env[key] || process.env[key] === 'testing_secret' || process.env[key] === 'testing_refresh' || process.env[key].includes('localhost')) {
      console.log(`[FAIL] ${key} is missing or uses a temporary placeholder value.`);
      hasError = true;
    } else {
      console.log(`[PASS] ${key} exists.`);
    }
  };

  const checkSkipped = (key: string, service: string) => {
    if (!process.env[key]) {
      console.log(`[SKIPPED] ${key} missing. ${service} tests will be skipped.`);
    } else {
      console.log(`[PASS] ${key} exists.`);
    }
  };

  // Critical requirements
  requireEnv('DATABASE_URL');
  requireEnv('JWT_SECRET');
  requireEnv('REFRESH_TOKEN_SECRET');

  // Optional/3rd party integration checks
  console.log('\n--- Payment Integrations ---');
  checkSkipped('RAZORPAY_KEY_ID', 'Razorpay Payment');
  checkSkipped('RAZORPAY_KEY_SECRET', 'Razorpay Payment');
  checkSkipped('RAZORPAY_WEBHOOK_SECRET', 'Razorpay Webhook');

  console.log('\n--- Storage Integrations ---');
  checkSkipped('R2_ACCOUNT_ID', 'Cloudflare R2');
  checkSkipped('R2_ACCESS_KEY_ID', 'Cloudflare R2');
  checkSkipped('R2_SECRET_ACCESS_KEY', 'Cloudflare R2');
  checkSkipped('R2_BUCKET_NAME', 'Cloudflare R2');
  checkSkipped('R2_PUBLIC_URL', 'Cloudflare R2');

  if (hasError) {
    console.error('\n❌ Environment Validation Failed. Please fix the missing or invalid variables.');
    process.exit(1);
  } else {
    console.log('\n✅ Core Environment Validation Passed.');
  }
}

checkEnv();
