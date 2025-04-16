import { db } from "./index";
import * as schema from "./schema";
import { seed } from "./seed";
import { sql } from "drizzle-orm";

export async function init() {
  try {
    // 每次初始化时先删除现有表，确保数据库结构最新
    await db.run(sql`DROP TABLE IF EXISTS items;`);
    
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
    
    await db.run(sql`
      CREATE TABLE IF NOT EXISTS items (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        description TEXT,
        price DECIMAL(10,2) NOT NULL,
        quantity INTEGER NOT NULL DEFAULT 0,
        image TEXT,
        category TEXT,
        type TEXT DEFAULT 'OTHER',
        is_trending BOOLEAN DEFAULT FALSE,
        is_popular BOOLEAN DEFAULT FALSE,
        is_new BOOLEAN DEFAULT FALSE,
        is_featured BOOLEAN DEFAULT FALSE,
        is_best_seller BOOLEAN DEFAULT FALSE,
        rating DECIMAL(2,1),
        sales_count INTEGER DEFAULT 0,
        view_count INTEGER DEFAULT 0,
        original_price DECIMAL(10,2),
        features TEXT,
        specs TEXT,
        platform TEXT,
        version TEXT,
        min_system_requirements TEXT,
        game_genre TEXT,
        multiplayer BOOLEAN,
        game_mode TEXT,
        page_count INTEGER,
        format TEXT,
        language TEXT,
        duration INTEGER,
        level TEXT,
        certification BOOLEAN,
        framework TEXT,
        responsive BOOLEAN,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
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