const fs = require('fs');
const crypto = require('crypto');

const now = new Date().toISOString();

// Helpers
const id = () => crypto.randomUUID();
const mkString = str => str ? `'${str.replace(/'/g, "''")}'` : 'null';

// Data Arrays
const categories = [
  'Hampers', 'Flowers', 'Bouquets', 'Cakes', 'Chocolates', 'Crafts',
  'Personalized Gifts', 'Kerala Specials', 'Corporate Gifts', 'Get Well Soon',
  'New Baby', 'Premium Gifts'
].map(name => ({ id: id(), name, slug: name.toLowerCase().replace(/ /g, '-'), isActive: true }));

const occasions = [
  'Birthday', 'Anniversary', 'Love', 'Sorry', 'Get Well Soon', 'New Baby',
  'Wedding', 'Farewell', 'Congratulations', 'Eid', 'Onam', 'Christmas',
  'Valentine’s Day', 'Mother’s Day', 'Father’s Day'
].map(name => ({ id: id(), name, slug: name.toLowerCase().replace(/ /g, '-'), isActive: true }));

const relationships = [
  'Mother', 'Father', 'Wife', 'Husband', 'Girlfriend', 'Boyfriend',
  'Friend', 'Best Friend', 'Brother', 'Sister', 'Teacher', 'Boss',
  'Colleague', 'Parents'
].map(name => ({ id: id(), name, slug: name.toLowerCase().replace(/ /g, '-'), isActive: true }));

// Products
const productNames = [
  'Classic Birthday Hamper', 'Premium Chocolate Hamper', 'Kerala Snack Gift Box',
  'Rose Bouquet', 'Cake and Flower Combo', 'Sorry Gift Box', 'For Mom Wellness Hamper',
  'NRI Family Gift Box', 'Corporate Mini Hamper', 'Get Well Soon Fruit Basket',
  'Romantic Love Hamper', 'Teddy Bear & Choco Combo', 'Personalized Photo Mug',
  'Handcrafted Wood Art', 'Onam Special Kit', 'Valentine Premium Rose Box',
  'Father’s Day Grooming Kit', 'Baby Care Essentials Box', 'Farewell Memory Book',
  'Anniversary Gold Gift Box'
];

const products = productNames.map((name, i) => ({
  id: id(),
  name,
  slug: name.toLowerCase().replace(/ /g, '-').replace(/[^a-z0-9-]/g, '') + '-' + i,
  description: `Amazing ${name} for your loved ones. Carefully curated.`,
  price: 499 + Math.floor(Math.random() * 2000),
  stock: 50,
  isActive: true,
  deliveryEstimate: 'Same day'
}));

// Build SQL
let sql = '';

const insertSql = (table, rows) => {
  if (rows.length === 0) return;
  const keys = Object.keys(rows[0]);
  const values = rows.map(row => 
    '(' + keys.map(k => typeof row[k] === 'string' ? mkString(row[k]) : row[k]).join(', ') + 
    ', ' + mkString(now) + ')'
  ).join(',\n');
  
  // NOTE: Category, Occasion, Relationship has updatedAt except some. Wait.
  // We specify exact keys!
  const keysSql = keys.map(k => `"${k}"`).join(', ');
  let ts = `"${table}" = 'Product' ? '"updatedAt"' : ''`; // manual override

  if (['Category', 'Product'].includes(table)) {
    sql += `INSERT INTO "${table}" (${keysSql}, "updatedAt") VALUES \n${values};\n\n`;
  } else {
    // occasion and relationship don't have updatedAt
    const valuesNoTs = rows.map(row => 
      '(' + keys.map(k => typeof row[k] === 'string' ? mkString(row[k]) : row[k]).join(', ') + ')'
    ).join(',\n');
    sql += `INSERT INTO "${table}" (${keysSql}) VALUES \n${valuesNoTs};\n\n`;
  }
};

insertSql('Category', categories);
insertSql('Occasion', occasions);
insertSql('Relationship', relationships);
insertSql('Product', products);

// Also tie products to categories randomly
const pcs = [];
products.forEach(p => {
  pcs.push({ productId: p.id, categoryId: categories[Math.floor(Math.random() * categories.length)].id });
});

let pcsValues = pcs.map(row => `('${row.productId}', '${row.categoryId}')`).join(',\n');
sql += `INSERT INTO "ProductCategory" ("productId", "categoryId") VALUES \n${pcsValues};\n\n`;

// Write to seed.sql
fs.writeFileSync('seed.sql', sql);
console.log('Generated seed.sql');
