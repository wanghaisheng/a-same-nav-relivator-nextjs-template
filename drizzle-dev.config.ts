import type { Config } from "drizzle-kit";
import * as dotenv from "dotenv";

// Load environment variables based on NODE_ENV
dotenv.config({ path: ".env.development" });

export default {
  schema: "./src/db/sqlite/schema/*",
  out: "./drizzle",
  driver: "better-sqlite",
  dbCredentials: {
    url: "sqlite.db"
  }
} satisfies Config;
