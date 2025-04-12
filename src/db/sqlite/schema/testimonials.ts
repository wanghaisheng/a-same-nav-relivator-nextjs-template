import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const testimonials = sqliteTable("testimonials", {
  id: text("id").primaryKey(),
  content: text("content").notNull(),
  authorName: text("author_name").notNull(),
  authorRole: text("author_role").notNull(),
  authorAvatar: text("author_avatar"),
  rating: integer("rating").notNull().default(5),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull().default(new Date()),
  updatedAt: integer("updated_at", { mode: "timestamp" }).notNull().default(new Date()),
}); 