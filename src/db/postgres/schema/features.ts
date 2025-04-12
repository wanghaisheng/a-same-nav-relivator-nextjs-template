import { pgTable, text, timestamp } from "drizzle-orm/pg-core";

export const features = pgTable("features", {
  id: text("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  icon: text("icon"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

// Types for the features table
export type Feature = typeof features.$inferSelect;
export type NewFeature = typeof features.$inferInsert;