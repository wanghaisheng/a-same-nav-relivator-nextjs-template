import { pgTable, text, integer, timestamp } from "drizzle-orm/pg-core";

export const categories = pgTable("categories", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  image: text("image").notNull(),
  productCount: integer("product_count").default(0),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Types for the categories table
export type Category = typeof categories.$inferSelect;
export type NewCategory = typeof categories.$inferInsert; 