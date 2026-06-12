import { PrismaClient, Role } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);

const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('🌱 Starting seeding...');

  // 1. Clean up existing data (Caution: Only for development)
  // await prisma.productCategory.deleteMany();
  // await prisma.productOccasion.deleteMany();
  // await prisma.productRelationship.deleteMany();
  // await prisma.productImage.deleteMany();
  // await prisma.product.deleteMany();
  // await prisma.category.deleteMany();
  // await prisma.occasion.deleteMany();
  // await prisma.relationship.deleteMany();
  // await prisma.user.deleteMany();

  // 2. Create Admin User
  // WARNING: admin@cesto.in is for DEVELOPMENT ONLY.
  // In production, create admin users via a secure CLI or migration, never via seed.
  const seedPassword = process.env.ADMIN_SEED_PASSWORD || (process.env.NODE_ENV === 'production' ? '' : 'admin123_dev_only');
  if (!seedPassword) {
    console.error('❌ ADMIN_SEED_PASSWORD not set. Refusing to seed admin in production.');
    process.exit(1);
  }
  const adminPassword = await bcrypt.hash(seedPassword, 12);
  const admin = await prisma.user.upsert({
    where: { email: 'admin@cesto.in' },
    update: {},
    create: {
      email: 'admin@cesto.in',
      name: 'Cesto Admin',
      passwordHash: adminPassword,
      role: Role.SUPER_ADMIN,
    },
  });
  console.log(`✅ Admin user created: ${admin.email}`);

  // 3. Create Categories
  const categoryNames = [
    'Hampers', 'Flowers', 'Bouquets', 'Cakes', 'Chocolates', 'Crafts',
    'Personalized Gifts', 'Kerala Specials', 'Corporate Gifts', 'Get Well Soon',
    'New Baby', 'Premium Gifts'
  ];

  const categories = await Promise.all(
    categoryNames.map(name =>
      prisma.category.upsert({
        where: { name },
        update: {},
        create: {
          name,
          slug: name.toLowerCase().replace(/ /g, '-'),
          isActive: true,
        },
      })
    )
  );
  console.log('✅ Categories created');

  // 4. Create Occasions
  const occasionNames = [
    'Birthday', 'Anniversary', 'Love', 'Sorry', 'Get Well Soon', 'New Baby',
    'Wedding', 'Farewell', 'Congratulations', 'Eid', 'Onam', 'Christmas',
    'Valentine’s Day', 'Mother’s Day', 'Father’s Day'
  ];

  const occasions = await Promise.all(
    occasionNames.map(name =>
      prisma.occasion.upsert({
        where: { name },
        update: {},
        create: {
          name,
          slug: name.toLowerCase().replace(/ /g, '-'),
          isActive: true,
        },
      })
    )
  );
  console.log('✅ Occasions created');

  // 5. Create Relationships
  const relationshipNames = [
    'Mother', 'Father', 'Wife', 'Husband', 'Girlfriend', 'Boyfriend',
    'Friend', 'Best Friend', 'Brother', 'Sister', 'Teacher', 'Boss',
    'Colleague', 'Parents'
  ];

  const relationships = await Promise.all(
    relationshipNames.map(name =>
      prisma.relationship.upsert({
        where: { name },
        update: {},
        create: {
          name,
          slug: name.toLowerCase().replace(/ /g, '-'),
          isActive: true,
        },
      })
    )
  );
  console.log('✅ Relationships created');

  // 6. Create 30+ Products
  const productsData = [
    { name: 'Classic Birthday Hamper', price: 1299, cat: 'Hampers', occ: 'Birthday', rel: 'Best Friend' },
    { name: 'Premium Chocolate Hamper', price: 1599, cat: 'Chocolates', occ: 'Anniversary', rel: 'Girlfriend' },
    { name: 'Kerala Snack Gift Box', price: 899, cat: 'Kerala Specials', occ: 'Onam', rel: 'Parents' },
    { name: 'Rose Bouquet', price: 599, cat: 'Flowers', occ: 'Love', rel: 'Wife' },
    { name: 'Cake and Flower Combo', price: 1899, cat: 'Cakes', occ: 'Birthday', rel: 'Sister' },
    { name: 'Sorry Gift Box', price: 999, cat: 'Hampers', occ: 'Sorry', rel: 'Boyfriend' },
    { name: 'For Mom Wellness Hamper', price: 2499, cat: 'Hampers', occ: 'Mother’s Day', rel: 'Mother' },
    { name: 'NRI Family Gift Box', price: 3499, cat: 'Premium Gifts', occ: 'Christmas', rel: 'Parents' },
    { name: 'Corporate Mini Hamper', price: 799, cat: 'Corporate Gifts', occ: 'Congratulations', rel: 'Colleague' },
    { name: 'Get Well Soon Fruit Basket', price: 1199, cat: 'Get Well Soon', occ: 'Get Well Soon', rel: 'Brother' },
    { name: 'Anniversary Luxury Box', price: 4999, cat: 'Premium Gifts', occ: 'Anniversary', rel: 'Husband' },
    { name: 'Best Friend Surprise Box', price: 1499, cat: 'Personalized Gifts', occ: 'Birthday', rel: 'Best Friend' },
    { name: 'Eid Premium Dates Hamper', price: 2199, cat: 'Kerala Specials', occ: 'Eid', rel: 'Colleague' },
    { name: 'Onam Kerala Treat Box', price: 1699, cat: 'Kerala Specials', occ: 'Onam', rel: 'Parents' },
    { name: 'New Baby Welcome Hamper', price: 2799, cat: 'New Baby', occ: 'New Baby', rel: 'Mother' },
    { name: 'Valentine Premium Rose Box', price: 2999, cat: 'Bouquets', occ: 'Valentine’s Day', rel: 'Girlfriend' },
    { name: 'Father’s Day Grooming Kit', price: 1899, cat: 'Premium Gifts', occ: 'Father’s Day', rel: 'Father' },
    { name: 'Teacher’s Appreciation Kit', price: 999, cat: 'Personalized Gifts', occ: 'Farewell', rel: 'Teacher' },
    { name: 'Boss Day Gourmet Box', price: 2599, cat: 'Corporate Gifts', occ: 'Congratulations', rel: 'Boss' },
    { name: 'Wedding Rituals Hamper', price: 5999, cat: 'Premium Gifts', occ: 'Wedding', rel: 'Friend' },
    { name: 'Personalized Photo Frame', price: 699, cat: 'Personalized Gifts', occ: 'Anniversary', rel: 'Wife' },
    { name: 'Assorted Mithai Box', price: 849, cat: 'Chocolates', occ: 'Eid', rel: 'Parents' },
    { name: 'Healthy Nut Mix Box', price: 1149, cat: 'Hampers', occ: 'Get Well Soon', rel: 'Father' },
    { name: 'Red Velvet Anniversary Cake', price: 1299, cat: 'Cakes', occ: 'Anniversary', rel: 'Husband' },
    { name: 'Succulent Plant Gift', price: 499, cat: 'Crafts', occ: 'Birthday', rel: 'Colleague' },
    { name: 'Handmade Scented Candles', price: 799, cat: 'Crafts', occ: 'Birthday', rel: 'Sister' },
    { name: 'Luxury Wine & Cheese Kit', price: 6999, cat: 'Premium Gifts', occ: 'Anniversary', rel: 'Wife' },
    { name: 'Customized Name Keychain', price: 299, cat: 'Personalized Gifts', occ: 'Birthday', rel: 'Brother' },
    { name: 'Kerala Banana Chips Pack', price: 399, cat: 'Kerala Specials', occ: 'Onam', rel: 'Colleague' },
    { name: 'Farewell Gift Platter', price: 1599, cat: 'Hampers', occ: 'Farewell', rel: 'Co-worker' },
    { name: 'Congratulations Wine Box', price: 4599, cat: 'Premium Gifts', occ: 'Congratulations', rel: 'Boss' },
    { name: 'Luxury Tea Sampler', price: 1899, cat: 'Premium Gifts', occ: 'Birthday', rel: 'Teacher' }
  ];

  for (const item of productsData) {
    const slug = item.name.toLowerCase().replace(/ /g, '-').replace(/[^a-z0-9-]/g, '');
    const category = categories.find(c => c.name === item.cat);
    const occasion = occasions.find(o => o.name === item.occ);
    const relationship = relationships.find(r => r.name === item.rel) || relationships[0];

    const product = await prisma.product.upsert({
      where: { slug },
      update: {},
      create: {
        name: item.name,
        slug,
        description: `This ${item.name} is a perfect choice for your loved ones. High quality and elegantly packed.`,
        price: item.price,
        stock: 100,
        isActive: true,
        deliveryEstimate: '2-4 hours',
        sameDayAvailable: true,
        whatsInside: 'Item list: Goodies, Love, and Care.',
        categories: {
          create: category ? [{ categoryId: category.id }] : [],
        },
        occasions: {
          create: occasion ? [{ occasionId: occasion.id }] : [],
        },
        relationships: {
          create: relationship ? [{ relationshipId: relationship.id }] : [],
        },
      },
    });

    // Add a placeholder image
    await prisma.productImage.create({
      data: {
        productId: product.id,
        url: `https://images.unsplash.com/photo-placeholder?gift-${slug}`,
        isPrimary: true,
      },
    });
  }

  console.log('✅ 30+ Products seeded');

  // 7. Create some Delivery Zones
  const zones = [
    { city: 'Kochi', area: 'Kakkanad', pincode: '682030', fee: 50 },
    { city: 'Kochi', area: 'Edappally', pincode: '682024', fee: 40 },
    { city: 'Kochi', area: 'Fort Kochi', pincode: '682001', fee: 80 },
    { city: 'Trivandrum', area: 'Kazhakkoottam', pincode: '695582', fee: 60 },
  ];

  for (const zone of zones) {
    await prisma.deliveryZone.upsert({
      where: { pincode: zone.pincode },
      update: {},
      create: {
        city: zone.city,
        area: zone.area,
        pincode: zone.pincode,
        deliveryFee: zone.fee,
        minOrder: 0,
        isActive: true,
      },
    });
  }
  console.log('✅ Delivery Zones seeded');

  // 8. Create Delivery Slots
  const slots = [
    { label: 'Morning (9 AM - 12 PM)', startTime: '09:00', endTime: '12:00', fee: 0 },
    { label: 'Afternoon (1 PM - 4 PM)', startTime: '13:00', endTime: '16:00', fee: 0 },
    { label: 'Evening (5 PM - 8 PM)', startTime: '17:00', endTime: '20:00', fee: 0 },
    { label: 'Midnight (11 PM - 12 AM)', startTime: '23:00', endTime: '00:00', fee: 250, type: 'MIDNIGHT' },
  ];

  for (const slot of slots) {
    await prisma.deliverySlot.create({
      data: {
        label: slot.label,
        startTime: slot.startTime,
        endTime: slot.endTime,
        fee: slot.fee,
        type: slot.type || 'STANDARD',
      },
    });
  }
  console.log('✅ Delivery Slots seeded');

  console.log('🚀 Seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
