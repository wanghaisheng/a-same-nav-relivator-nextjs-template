import { sql } from "drizzle-orm";
import {
  sqliteTable,
  text, // Use text directly from sqlite-core
  real,
  integer, // Use integer directly from sqlite-core
  blob,
  SQLiteTableFn // Keep the correct Table function type
} from "drizzle-orm/sqlite-core";

// --- Core Table Creation ---

// Use sqliteTable directly and type it correctly
export const createTable: SQLiteTableFn = sqliteTable;

// --- Column Type Helpers (SQLite specific) ---

export const createText = (name: string, options?: any) =>
  text(name, options); // Directly use SQLite's text

export const createDecimal = (name: string) => // Note: SQLite's REAL doesn't take precision/scale like PG decimal
  real(name); // Directly use SQLite's real

export const createBoolean = (name: string) =>
  integer(name, { mode: "boolean" }); // Directly use SQLite's integer-boolean

// Using integer with 'timestamp_s' mode for Unix epoch seconds
export const createTimestamp = (name: string) =>
  integer(name, { mode: "timestamp_ms" });

export const createJson = <T>(name: string) =>
  // Using blob with json mode, as in the original SQLite branch
  blob(name, { mode: "json" }).$type<T>();
  // Alternatively, you could use text:
  // text(name, { mode: "json" }).$type<T>();

export const createInteger = (name: string) =>
  integer(name); // Directly use SQLite's integer

// --- Default Value Helpers (SQLite specific) ---

// Provides SQL for the current Unix timestamp (seconds) for SQLite defaults
export const nowDefault = () =>
  // Use strftime for seconds since epoch, suitable for integer timestamp columns
  sql`(strftime('%s', 'now'))`;
  // If you preferred ISO8601 strings (use with text columns): sql`(CURRENT_TIMESTAMP)`

// Helper for timestamp columns with a database default value
export const createTimestampWithDefault = (name: string) => {
  // Use integer with Unix timestamp (seconds) and a DATABASE default
  return integer(name, { mode: "timestamp_ms" })
    .notNull()
    .default(nowDefault()); // Use the SQLite-specific default SQL
};

// Example of how you might use these:
/*
import * as schemaHelpers from './schema-helpers'; // Assuming you save the above as schema-helpers.ts

export const users = schemaHelpers.createTable('users', {
  id: schemaHelpers.createInteger('id').primaryKey(),
  name: schemaHelpers.createText('name').notNull(),
  email: schemaHelpers.createText('email').unique(),
  balance: schemaHelpers.createDecimal('balance').default(0.0),
  isAdmin: schemaHelpers.createBoolean('is_admin').default(false),
  jsonData: schemaHelpers.createJson<any>('json_data'),
  createdAt: schemaHelpers.createTimestampWithDefault('created_at'),
  updatedAt: schemaHelpers.createTimestamp('updated_at'), // No default here
});
*/