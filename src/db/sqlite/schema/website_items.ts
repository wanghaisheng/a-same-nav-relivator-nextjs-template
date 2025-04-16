import { sqliteTable, text, integer, real } from "drizzle-orm/sqlite-core";
import { createTimestampWithDefault } from "./utils";

export const websiteItems = sqliteTable("website_items", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
  price: real("price").notNull(),
  quantity: integer("quantity").notNull().default(0),
  image: text("image"),
  category: text("category"),
  slug: text("slug"),
  locale: text('locale').notNull(), // 新增locale字段，支持多语言
  // WEBSITE特有字段
  framework: text("framework"),             // 使用的框架 (如: "React, Vue, Angular")
  responsive: integer("responsive", { mode: "boolean" }), // 是否响应式
  // 通用时间戳字段
  createdAt: createTimestampWithDefault("created_at"),
  updatedAt: createTimestampWithDefault("updated_at")
});

export type WebsiteItem = typeof websiteItems.$inferSelect;
export type NewWebsiteItem = typeof websiteItems.$inferInsert;
