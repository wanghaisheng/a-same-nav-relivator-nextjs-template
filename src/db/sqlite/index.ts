import { drizzle } from "drizzle-orm/better-sqlite3";
import Database from "better-sqlite3";
import * as schema from "./schema";

const sqlite = new Database(process.env.SQLITE_DB_PATH ?? "sqlite.db");
export const db = drizzle(sqlite, { schema });

export const sqliteDb = drizzle(sqlite); 