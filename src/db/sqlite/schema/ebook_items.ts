import { sqliteTable, text, integer, real } from "drizzle-orm/sqlite-core";
import { createTimestampWithDefault } from "./utils";

export const ebookItems = sqliteTable("ebook_items", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
  author: text("author"),
  publisher: text("publisher"),
  publishDate: text("publish_date"),
  isbn: text("isbn"),
  price: real("price").notNull(),
  originalPrice: real("original_price"),
  quantity: integer("quantity").notNull().default(0),
  image: text("image"),
  category: text("category"),
  slug: text("slug"),
  pageCount: integer("page_count"),
  format: text("format"),
  language: text("language"),
  fileUrl: text("file_url"),
  sampleUrl: text("sample_url"),
  tags: text("tags"),
  rating: real("rating"),
  salesCount: integer("sales_count").default(0),
  viewCount: integer("view_count").default(0),
  locale: text('locale').notNull(), // 新增locale字段，支持多语言
  // 通用时间戳字段
  createdAt: createTimestampWithDefault("created_at"),
  updatedAt: createTimestampWithDefault("updated_at")
});

export type EbookItem = typeof ebookItems.$inferSelect;
export type NewEbookItem = typeof ebookItems.$inferInsert;
