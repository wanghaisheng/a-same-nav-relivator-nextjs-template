import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { createTimestampWithDefault } from "./utils";

export const testimonials = sqliteTable("testimonials", {
  id: text("id").primaryKey(),
  content: text("content").notNull(),
  authorName: text("author_name").notNull(),
  authorRole: text("author_role").notNull(),
  authorAvatar: text("author_avatar"),
  rating: integer("rating").notNull().default(5),
  locale: text('locale').notNull(), // 新增locale字段，支持多语言
  createdAt: createTimestampWithDefault("created_at"),
  updatedAt: createTimestampWithDefault("updated_at"),
});

// Types for the testimonials table
export type Testimonial = typeof testimonials.$inferSelect;
export type NewTestimonial = typeof testimonials.$inferInsert;