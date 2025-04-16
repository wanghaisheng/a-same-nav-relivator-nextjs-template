import { sqliteTable, text, integer, real } from "drizzle-orm/sqlite-core";
import { createTimestampWithDefault } from "./utils";

export const appItems = sqliteTable("app_items", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
  price: real("price").notNull(),
  quantity: integer("quantity").notNull().default(0),
  image: text("image"),
  category: text("category"),
  slug: text("slug"),
  locale: text('locale').notNull(), // 新增locale字段，支持多语言
  // APP/TOOL特有字段
  platform: text("platform"),                // 平台兼容性 (如: "iOS, Android, Web")
  version: text("version"),                  // 版本信息
  minSystemRequirements: text("min_system_requirements"), // 最低系统要求
  // 通用时间戳字段
  createdAt: createTimestampWithDefault("created_at"),
  updatedAt: createTimestampWithDefault("updated_at")
});

export type AppItem = typeof appItems.$inferSelect;
export type NewAppItem = typeof appItems.$inferInsert;
