import { sqliteTable, text, integer, real } from "drizzle-orm/sqlite-core";
import { createTimestampWithDefault } from "./utils";

export const products = sqliteTable("products", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  price: real("price").notNull(),
  originalPrice: real("originalPrice"),
  image: text("image").notNull(),
  category: text("category").notNull(),
  rating: real("rating"),
  inStock: integer("inStock", { mode: "boolean" }).default(true),
  description: text("description"),
  features: text("features"),
  specs: text("specs"),
  createdAt: createTimestampWithDefault("createdAt"),
  updatedAt: createTimestampWithDefault("updatedAt"),
});

// Types for the products table
export type Product = typeof products.$inferSelect;
export type NewProduct = typeof products.$inferInsert;