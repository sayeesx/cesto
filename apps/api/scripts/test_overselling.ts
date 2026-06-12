import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import * as dotenv from 'dotenv';

dotenv.config();

const connectionString = process.env.DATABASE_URL;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function runOversellTest() {
  console.log('--- Starting Concurrent Checkout / Overselling Test ---');

  // 1. Create two test users
  const user1 = await prisma.user.create({
    data: {
      email: `oversell.user1.${Date.now()}@test.com`,
      passwordHash: 'test_hash_not_real',
      name: 'Oversell User 1',
    },
  });
  const user2 = await prisma.user.create({
    data: {
      email: `oversell.user2.${Date.now()}@test.com`,
      passwordHash: 'test_hash_not_real',
      name: 'Oversell User 2',
    },
  });

  // 2. Create test product with Stock = 1
  const product = await prisma.product.create({
    data: {
      name: 'Test Limited Product',
      slug: `test-product-${Date.now()}`,
      price: 100,
      stock: 1,
      reservedStock: 0,
      isActive: true,
    },
  });
  console.log(`[Setup] Created Product ${product.id} with Stock = 1`);

  // 3. Create two separate carts, each with 1 unit of the same product
  const cart1 = await prisma.cart.create({
    data: {
      userId: user1.id,
      session: `session1_${Date.now()}`,
      items: { create: [{ productId: product.id, quantity: 1 }] },
    },
  });
  const cart2 = await prisma.cart.create({
    data: {
      userId: user2.id,
      session: `session2_${Date.now()}`,
      items: { create: [{ productId: product.id, quantity: 1 }] },
    },
  });
  console.log(`[Setup] Created Cart1=${cart1.id}, Cart2=${cart2.id}`);

  // 4. Import OrdersService and AuditService  
  // @ts-ignore
  const { OrdersService } = await import('../src/modules/orders/orders.service');
  // @ts-ignore
  const { AuditService } = await import('../src/modules/audit/audit.service');
  const audit = new AuditService(prisma as any);
  const ordersService = new OrdersService(prisma as any, audit);

  // 5. Fire two concurrent checkout requests
  console.log('[Test] Triggering two simultaneous checkouts for the same 1-stock product...');

  const [req1, req2] = await Promise.allSettled([
    ordersService.createOrder({
      userId: user1.id,
      cartId: cart1.id,
      recipientName: 'User 1',
      recipientPhone: '9999999991',
      deliveryAddress: { city: 'Kochi', pincode: '682030' },
      deliveryDate: new Date(),
    }),
    ordersService.createOrder({
      userId: user2.id,
      cartId: cart2.id,
      recipientName: 'User 2',
      recipientPhone: '9999999992',
      deliveryAddress: { city: 'Kochi', pincode: '682030' },
      deliveryDate: new Date(),
    }),
  ]);

  const successes = [req1, req2].filter(r => r.status === 'fulfilled');
  const failures = [req1, req2].filter(r => r.status === 'rejected');

  console.log(`[Result] Successes: ${successes.length}, Failures: ${failures.length}`);

  if (req1.status === 'fulfilled') console.log('  ✅ Request 1 Succeeded. Order:', (req1 as any).value.orderNumber);
  else console.log('  ❌ Request 1 Failed:', (req1 as any).reason?.message);

  if (req2.status === 'fulfilled') console.log('  ✅ Request 2 Succeeded. Order:', (req2 as any).value.orderNumber);
  else console.log('  ❌ Request 2 Failed:', (req2 as any).reason?.message);

  // 6. Verify Final Stock State
  const finalProduct = await prisma.product.findUnique({ where: { id: product.id } });
  console.log(`[Verification] Final Stock: ${finalProduct?.stock}`);
  console.log(`[Verification] Final Reserved Stock: ${finalProduct?.reservedStock}`);

  let testPassed = false;

  if (successes.length === 1 && failures.length === 1) {
    if (finalProduct?.stock === 0 && finalProduct?.reservedStock === 1) {
      console.log('🎉 RESULT: SUCCESS! Exactly one order succeeded, overselling prevented.');
      testPassed = true;
    } else {
      console.log('💀 RESULT: FAILURE! Stock state is inconsistent.');
    }
  } else if (successes.length === 0) {
    console.log('💀 RESULT: FAILURE! Both requests failed. Check cart/order service logic.');
  } else if (successes.length === 2) {
    console.log('💀 RESULT: FAILURE! Both requests succeeded — OVERSELLING occurred!');
  }

  // 7. Cleanup (best effort)
  try {
    // Delete order items, orders, cart items, carts, then product and users
    await prisma.orderItem.deleteMany({ where: { product: { id: product.id } } });
    await prisma.inventoryMovement.deleteMany({ where: { productId: product.id } });
    await prisma.order.deleteMany({ where: { userId: { in: [user1.id, user2.id] } } });
    await prisma.cartItem.deleteMany({ where: { cartId: { in: [cart1.id, cart2.id] } } });
    await prisma.cart.deleteMany({ where: { id: { in: [cart1.id, cart2.id] } } });
    await prisma.product.delete({ where: { id: product.id } });
    await prisma.refreshToken.deleteMany({ where: { userId: { in: [user1.id, user2.id] } } });
    await prisma.user.deleteMany({ where: { id: { in: [user1.id, user2.id] } } });
    console.log('[Cleanup] Test data removed.');
  } catch (e: any) {
    console.log('[Cleanup] Partial cleanup:', e.message?.substring(0, 100));
  }

  await prisma.$disconnect();
  await pool.end();

  if (!testPassed) process.exit(1);
}

runOversellTest().catch(e => { console.error(e); process.exit(1); });
