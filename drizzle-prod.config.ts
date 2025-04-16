import type { Config } from "drizzle-kit";
import * as dotenv from "dotenv";

// Load environment variables based on NODE_ENV


export default {
  schema:  "./src/db/postgres/schema/*",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
        url: process.env.DATABASE_URL ?? "postgresql://postgres:postgres@localhost:5432/relivator"
      }
} satisfies Config;
