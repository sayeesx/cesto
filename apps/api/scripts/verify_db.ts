import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import * as dotenv from 'dotenv';

dotenv.config();

const connectionString = process.env.DATABASE_URL;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function run() {
  console.log('--- Database Connectivity Verification ---');
  try {
    const userCount = await prisma.user.count();
    const productCount = await prisma.product.count();
    const categoryCount = await prisma.category.count();
    const orderCount = await prisma.order.count();
    
    console.log(`[PASS] Connected to DB successfully.`);
    console.log(`Users: ${userCount}`);
    console.log(`Products: ${productCount}`);
    console.log(`Categories: ${categoryCount}`);
    console.log(`Orders: ${orderCount}`);

    const adminUser = await prisma.user.findFirst({ where: { email: 'admin@cesto.in' } });
    if (!adminUser) {
      console.error('[FAIL] Admin user admin@cesto.in not found. Ensure seeding was completely processed.');
      process.exit(1);
    } else {
      console.log('[PASS] Admin user verified.');
    }

    if (productCount < 30) {
      console.error(`[FAIL] Found ${productCount} products. Expected at least 30 from the seed script.`);
      process.exit(1);
    } else {
      console.log('[PASS] At least 30 products verified.');
    }

    console.log('\n✅ Database Connectivity & State Passed.');
    process.exit(0);
  } catch (error) {
    console.error('\n❌ Database Connectivity Failed:', error.message);
    process.exit(1);
  }
}

run();
