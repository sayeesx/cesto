import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import * as dotenv from 'dotenv';

dotenv.config();

async function run() {
  console.log('=== DATABASE ROLE & RLS DIAGNOSTIC ===\n');

  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    console.error('[FATAL] DATABASE_URL is not set.');
    process.exit(1);
  }

  // Mask password for display
  const masked = connectionString.replace(/:([^@]+)@/, ':****@');
  console.log(`[INFO] Connection: ${masked}\n`);

  // --- Raw pg Pool diagnostic ---
  const pool = new Pool({ connectionString });

  try {
    const roleResult = await pool.query('SELECT current_user, session_user, current_database()');
    console.log('[ROLE] current_user:', roleResult.rows[0].current_user);
    console.log('[ROLE] session_user:', roleResult.rows[0].session_user);
    console.log('[ROLE] current_database:', roleResult.rows[0].current_database);
  } catch (e: any) {
    console.error('[FAIL] Role query failed:', e.message);
  }

  try {
    const settingResult = await pool.query("SELECT current_setting('role', true) as role_setting");
    console.log('[ROLE] current_setting(role):', settingResult.rows[0].role_setting || '(empty/default)');
  } catch (e: any) {
    console.error('[FAIL] Role setting query failed:', e.message);
  }

  // --- Check RLS status for critical tables ---
  const criticalTables = [
    'User', 'RefreshToken', 'Order', 'OrderItem',
    'Product', 'Cart', 'CartItem', 'Payment',
    'InventoryMovement', 'OrderStatusHistory', 'AuditLog',
    'Category', 'DeliverySlot', 'DeliveryZone'
  ];

  console.log('\n--- RLS STATUS ---');
  try {
    const rlsResult = await pool.query(`
      SELECT tablename, rowsecurity
      FROM pg_tables
      WHERE schemaname = 'public'
      ORDER BY tablename
    `);

    for (const row of rlsResult.rows) {
      const marker = criticalTables.includes(row.tablename)
        ? (row.rowsecurity ? '🔒 RLS ON' : '🔓 RLS OFF')
        : (row.rowsecurity ? '  RLS ON' : '  RLS OFF');
      console.log(`  ${marker}  ${row.tablename}`);
    }
  } catch (e: any) {
    console.error('[FAIL] RLS status query failed:', e.message);
  }

  // --- Check RLS policies ---
  console.log('\n--- RLS POLICIES ---');
  try {
    const policyResult = await pool.query(`
      SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual
      FROM pg_policies
      WHERE schemaname = 'public'
      ORDER BY tablename, policyname
    `);

    if (policyResult.rows.length === 0) {
      console.log('  (No policies found)');
    } else {
      for (const row of policyResult.rows) {
        console.log(`  ${row.tablename}: "${row.policyname}" [${row.permissive}] roles=${row.roles} cmd=${row.cmd} qual=${row.qual}`);
      }
    }
  } catch (e: any) {
    console.error('[FAIL] Policy query failed:', e.message);
  }

  // --- Test write operations on critical tables ---
  console.log('\n--- WRITE TESTS ---');

  const adapter = new PrismaPg(new Pool({ connectionString }));
  const prisma = new PrismaClient({ adapter });

  // Test 1: User write
  try {
    const testEmail = `diag_${Date.now()}@test.cesto.in`;
    const user = await prisma.user.create({
      data: {
        email: testEmail,
        passwordHash: 'diagnostic_hash_not_real',
        name: 'Diagnostic User',
      },
    });
    console.log(`[PASS] User.create succeeded: ${user.id}`);
    await prisma.user.delete({ where: { id: user.id } });
    console.log('[PASS] User.delete succeeded (cleanup)');
  } catch (e: any) {
    console.error(`[FAIL] User.create/delete failed: ${e.message}`);
    if (e.code) console.error(`       Prisma error code: ${e.code}`);
  }

  // Test 2: Product write
  try {
    const product = await prisma.product.create({
      data: {
        name: 'Diagnostic Product',
        slug: `diag-product-${Date.now()}`,
        price: 100,
        stock: 10,
      },
    });
    console.log(`[PASS] Product.create succeeded: ${product.id}`);
    await prisma.product.delete({ where: { id: product.id } });
    console.log('[PASS] Product.delete succeeded (cleanup)');
  } catch (e: any) {
    console.error(`[FAIL] Product.create/delete failed: ${e.message}`);
    if (e.code) console.error(`       Prisma error code: ${e.code}`);
  }

  // Test 3: Cart write  
  try {
    const cart = await prisma.cart.create({
      data: { session: `diag_session_${Date.now()}` },
    });
    console.log(`[PASS] Cart.create succeeded: ${cart.id}`);
    await prisma.cart.delete({ where: { id: cart.id } });
    console.log('[PASS] Cart.delete succeeded (cleanup)');
  } catch (e: any) {
    console.error(`[FAIL] Cart.create/delete failed: ${e.message}`);
    if (e.code) console.error(`       Prisma error code: ${e.code}`);
  }

  // Test 4: SELECT 1 (health check simulation)
  try {
    const result = await prisma.$queryRaw`SELECT 1 as ok`;
    console.log(`[PASS] $queryRaw SELECT 1 succeeded`);
  } catch (e: any) {
    console.error(`[FAIL] $queryRaw SELECT 1 failed: ${e.message}`);
  }

  await prisma.$disconnect();
  await pool.end();

  console.log('\n=== DIAGNOSTIC COMPLETE ===');
}

run().catch(e => { console.error(e); process.exit(1); });
