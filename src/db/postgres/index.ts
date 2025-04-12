import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

const connectionString = process.env.DATABASE_URL ?? "postgresql://postgres:postgres@localhost:5432/relivator";
const client = postgres(connectionString);
export const postgresDb = drizzle(client); 