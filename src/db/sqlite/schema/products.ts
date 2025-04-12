import { sqliteTable, text, integer, real } from "drizzle-orm/sqlite-core";

export const products = sqliteTable("products", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  price: real("price").notNull(),
  originalPrice: real("originalPrice"),
  image: text("image").notNull(),
  category: text("category").notNull(),
  rating: real("rating"),
  inStock: integer("inStock", { mode: "boolean" }).default(true),
  description: text("description"),
  features: text("features"),
  specs: text("specs"),
  createdAt: integer("createdAt").$defaultFn(() => Date.now()),
  updatedAt: integer("updatedAt").$defaultFn(() => Date.now()),
});

// Types for the products table
export type Product = typeof products.$inferSelect;
export type NewProduct = typeof products.$inferInsert; 