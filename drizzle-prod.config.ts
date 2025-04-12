import type { Config } from "drizzle-kit";
import * as dotenv from "dotenv";

// Load environment variables based on NODE_ENV


export default {
  schema:  "./src/db/postgres/schema/*",
  out: "./drizzle",
  driver: "pg",
  dbCredentials: {
        connectionString: process.env.DATABASE_URL ?? "postgresql://postgres:postgres@localhost:5432/relivator"
      }
} satisfies Config;
