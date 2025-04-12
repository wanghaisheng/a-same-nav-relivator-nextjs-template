import type { InferSelectModel } from "drizzle-orm";
import type { DrizzleClient as PgDrizzleClient } from "drizzle-orm/postgres-js";
import type { BetterSQLite3Database } from "drizzle-orm/better-sqlite3";
import type { userTable } from "./schema";
import * as schema from "./schema";

// Define a union type for both PostgreSQL and SQLite database clients
export type DrizzleClient = PgDrizzleClient<typeof schema> | BetterSQLite3Database<typeof schema>;

export type User = InferSelectModel<typeof userTable>;
