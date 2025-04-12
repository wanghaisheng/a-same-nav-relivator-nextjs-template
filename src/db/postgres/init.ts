import { db } from "./index";
import * as schema from "./schema";
import { seed } from "./seed";
import { sql } from "drizzle-orm";

export async function init() {
  try {
    // Initialize database tables
    await db.execute(sql`
      CREATE TABLE IF NOT EXISTS users (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        email TEXT NOT NULL UNIQUE,
        image TEXT,
        createdAt TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `);

    await db.execute(sql`
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
        features JSONB,
        specs JSONB,
        createdAt TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `);

    await db.execute(sql`
      CREATE TABLE IF NOT EXISTS categories (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        image TEXT NOT NULL,
        productCount INTEGER DEFAULT 0,
        createdAt TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Seed initial data
    await seed();

    console.log("PostgreSQL database initialized successfully");
  } catch (error) {
    console.error("Error initializing PostgreSQL database:", error);
    throw error;
  }
} 