import { db } from "./index";
import * as schema from "./schema";
import { seed } from "./seed";
import { sql } from "drizzle-orm";

export async function init() {
  try {
    // Initialize database tables
    await db.run(sql`
      CREATE TABLE IF NOT EXISTS users (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        email TEXT NOT NULL UNIQUE,
        image TEXT,
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
        updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
      );
    `);

    await db.run(sql`
      CREATE TABLE IF NOT EXISTS products (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        price DECIMAL(10,2) NOT NULL,
        originalPrice DECIMAL(10,2),
        image TEXT NOT NULL,
        category TEXT NOT NULL,
        rating DECIMAL(2,1),
        inStock BOOLEAN DEFAULT TRUE,
        description TEXT,
        features TEXT,
        specs TEXT,
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
        updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
      );
    `);

    await db.run(sql`
      CREATE TABLE IF NOT EXISTS categories (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        image TEXT NOT NULL,
        productCount INTEGER DEFAULT 0,
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
        updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Seed initial data
    await seed();

    console.log("SQLite database initialized successfully");
  } catch (error) {
    console.error("Error initializing SQLite database:", error);
    throw error;
  }
} 