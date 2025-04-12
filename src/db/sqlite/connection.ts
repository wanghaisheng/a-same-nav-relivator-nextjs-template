import { drizzle } from 'drizzle-orm/better-sqlite3';
import { sql } from 'drizzle-orm';
import Database from 'better-sqlite3';
import * as schema from '../schema';

// Create SQLite database connection
const sqlite = new Database('sqlite.db');
export const db = drizzle(sqlite, { schema });

// Initialize database with tables if they don't exist
export async function initializeDatabase() {
  try {
    // Create tables if they don't exist
    await db.run(sql`
      CREATE TABLE IF NOT EXISTS items (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        price REAL NOT NULL,
        original_price REAL,
        image TEXT NOT NULL,
        category TEXT NOT NULL,
        rating REAL,
        in_stock INTEGER DEFAULT 1,
        description TEXT,
        features TEXT,
        specs TEXT,
        created_at INTEGER DEFAULT (unixepoch()),
        updated_at INTEGER DEFAULT (unixepoch())
      );

      CREATE TABLE IF NOT EXISTS categories (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        image TEXT NOT NULL,
        product_count INTEGER DEFAULT 0,
        created_at INTEGER DEFAULT (unixepoch()),
        updated_at INTEGER DEFAULT (unixepoch())
      );

      CREATE TABLE IF NOT EXISTS testimonials (
        id TEXT PRIMARY KEY,
        content TEXT NOT NULL,
        author_name TEXT NOT NULL,
        author_role TEXT NOT NULL,
        author_avatar TEXT NOT NULL,
        rating INTEGER NOT NULL,
        created_at INTEGER DEFAULT (unixepoch()),
        updated_at INTEGER DEFAULT (unixepoch())
      );

      CREATE TABLE IF NOT EXISTS features (
        id TEXT PRIMARY KEY,
        title TEXT NOT NULL,
        description TEXT NOT NULL,
        icon TEXT NOT NULL,
        "order" INTEGER NOT NULL,
        created_at INTEGER DEFAULT (unixepoch()),
        updated_at INTEGER DEFAULT (unixepoch())
      );
    `);
    console.log('Database initialized successfully');
  } catch (error) {
    console.error('Error initializing database:', error);
    throw error;
  }
} 