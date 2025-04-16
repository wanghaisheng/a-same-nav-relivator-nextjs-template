import { sql } from 'drizzle-orm';
import { sqliteDb as db } from './index';
import { ebookItems } from './schema/ebook_items';
import { products } from './schema/products';
import { users } from './schema/users';
import { categories } from './schema/categories';
import { testimonials } from './schema/testimonials';

import { seedEbooks } from "./seed/ebooks";
import { seedProducts } from "./seed/products";
import { seedUsers } from "./seed/users";
import { seedTestimonials } from "./seed/testimonials";
import { seedAuth } from "./seed/auth";
import { seedCategories } from "./seed/categories";

export async function clean() {
  console.log('Cleaning all tables...');
  // 按外键依赖顺序清空表（先子表后父表）
  await db.run(sql`DELETE FROM ebook_items`);
  await db.run(sql`DELETE FROM products`);
  await db.run(sql`DELETE FROM users`);
  await db.run(sql`DELETE FROM categories`);
  await db.run(sql`DELETE FROM testimonials`);
  console.log('All tables cleaned.');
}

export async function seed() {
  try {
    await clean();
    console.log("Seeding categories...");
    await seedCategories();
    console.log("Seeding ebooks...");
    await seedEbooks();
    console.log("Seeding products...");
    await seedProducts();
    console.log("Seeding users...");
    await seedUsers();
    console.log("Seeding testimonials...");
    await seedTestimonials();
    console.log("Seeding auth...");
    await seedAuth();
    console.log("Database seeded successfully");
  } catch (error) {
    console.error("Seed error:", error);
  }
}

console.log("Starting database seeding...");
seed();
