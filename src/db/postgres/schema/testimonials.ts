import { pgTable, text, integer, timestamp } from "drizzle-orm/pg-core";

export const testimonials = pgTable("testimonials", {
  id: text("id").primaryKey(),
  content: text("content").notNull(),
  authorName: text("author_name").notNull(),
  authorRole: text("author_role").notNull(),
  authorAvatar: text("author_avatar").notNull(),
  rating: integer("rating").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

// Types for the testimonials table
export type Testimonial = typeof testimonials.$inferSelect;
export type NewTestimonial = typeof testimonials.$inferInsert;