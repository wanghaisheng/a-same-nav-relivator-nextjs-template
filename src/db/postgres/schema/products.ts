import { pgTable, text, numeric, boolean, timestamp, jsonb } from "drizzle-orm/pg-core";

export const products = pgTable("products", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  price: numeric("price", { precision: 10, scale: 2 }).notNull(),
  originalPrice: numeric("originalPrice", { precision: 10, scale: 2 }),
  image: text("image").notNull(),
  category: text("category").notNull(),
  rating: numeric("rating", { precision: 2, scale: 1 }),
  inStock: boolean("inStock").default(true),
  description: text("description"),
  features: jsonb("features").$type<string[]>(),
  specs: jsonb("specs").$type<Record<string, string>>(),
  createdAt: timestamp("createdAt").defaultNow(),
  updatedAt: timestamp("updatedAt").defaultNow(),
});

// Types for the products table
export type Product = typeof products.$inferSelect;
export type NewProduct = typeof products.$inferInsert; 