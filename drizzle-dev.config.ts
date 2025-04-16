import type { Config } from "drizzle-kit";
import * as dotenv from "dotenv";

// Load environment variables based on NODE_ENV
dotenv.config({ path: ".env.development" });

export default {
  schema: "./src/db/sqlite/schema/*",
  out: "./drizzle",
  dialect: "sqlite",
  // driver: "better-sqlite3",
  dbCredentials: {
    url: "sqlite.db"
  }
} satisfies Config;
