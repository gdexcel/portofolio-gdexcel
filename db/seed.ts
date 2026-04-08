import 'dotenv/config';
import { db } from '../config/db';
import { categories } from './schema';

async function seed() {
  await db.insert(categories).values([
    { name: 'Content Creator', slug: 'content-creator' },
    { name: 'Web Developer', slug: 'web-developer' },
  ]);

  console.log('✅ Categories seeded');
}

seed();
