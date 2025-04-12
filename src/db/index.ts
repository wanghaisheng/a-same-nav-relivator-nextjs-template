import "dotenv/config";
import * as schema from "./schema";
import { type DrizzleClient } from "./types";

// Import database drivers at the top level
import { drizzle as drizzlePostgres } from "drizzle-orm/postgres-js";
import { drizzle as drizzleSqlite } from "drizzle-orm/better-sqlite3";
import postgres from "postgres";
import Database from "better-sqlite3";

// Determine database environment
const dbEnv = process.env.NEXT_PUBLIC_DATABASE_ENV || 'sqlite';

// Initialize database based on environment
let db: DrizzleClient;

if (dbEnv === 'postgres') {
  // PostgreSQL connection
  /**
   * Caches the database connection in development to
   * prevent creating a new connection on every HMR update.
   */
  type DbConnection = ReturnType<typeof postgres>;
  const globalForDb = globalThis as unknown as {
    pgConn?: DbConnection;
  };
  
  const conn: DbConnection =
    globalForDb.pgConn ?? postgres(process.env.DATABASE_URL ?? "");
  
  if (process.env.NODE_ENV !== "production") {
    globalForDb.pgConn = conn;
  }
  
  // PostgreSQL database connection instance
  db = drizzlePostgres(conn, { schema, logger: false });
} else {
  // SQLite connection (default)
  const globalForDb = globalThis as unknown as {
    sqliteConn?: Database.Database;
  };
  
  const conn = globalForDb.sqliteConn ?? new Database("sqlite.db");
  
  if (process.env.NODE_ENV !== "production") {
    globalForDb.sqliteConn = conn;
  }
  
  // SQLite database connection instance
  db = drizzleSqlite(conn, { schema, logger: false });
}

// Export the database instance
export { db };
