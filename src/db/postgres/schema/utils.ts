import { sql } from "drizzle-orm";
import { 
  pgTable, 
  text, 
  decimal, 
  boolean, 
  timestamp, 
  jsonb, 
  integer,
  PgTableFn 
} from "drizzle-orm/pg-core";
import { 
  sqliteTable, 
  text as sqliteText, 
  real, 
  integer as sqliteInteger,
  blob,
  SQLiteTableFn
} from "drizzle-orm/sqlite-core";

const isDevelopment = process.env.NODE_ENV === "development";

// Helper function to create a table based on the environment
export const createTable = (isDevelopment ? sqliteTable : pgTable) as unknown as PgTableFn;

// Helper functions for column types
export const createText = (name: string, options?: any) => 
  isDevelopment ? sqliteText(name, options) : text(name, options);

export const createDecimal = (name: string, options?: { precision: number; scale: number }) =>
  isDevelopment ? real(name) : decimal(name, options);

export const createBoolean = (name: string) =>
  isDevelopment ? sqliteInteger(name, { mode: "boolean" }) : boolean(name);

export const createTimestamp = (name: string) =>
  isDevelopment ? sqliteText(name) : timestamp(name);

export const createJson = <T>(name: string) =>
  isDevelopment 
    ? blob(name, { mode: "json" }).$type<T>()
    : jsonb(name).$type<T>();

export const createInteger = (name: string) =>
  isDevelopment ? sqliteInteger(name) : integer(name);

export const nowDefault = () =>
  isDevelopment 
    ? sql`DATETIME('now')` 
    : sql`NOW()`; 