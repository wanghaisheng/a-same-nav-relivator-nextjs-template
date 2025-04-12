import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const categories = sqliteTable("categories", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  image: text("image").notNull(),
  productCount: integer("productCount").default(0),
  createdAt: integer("createdAt").$defaultFn(() => Date.now()),
  updatedAt: integer("updatedAt").$defaultFn(() => Date.now()),
});

// Types for the categories table
export type Category = typeof categories.$inferSelect;
export type NewCategory = typeof categories.$inferInsert; 