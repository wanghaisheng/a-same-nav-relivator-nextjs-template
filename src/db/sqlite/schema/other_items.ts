import { sqliteTable, text, integer, real } from "drizzle-orm/sqlite-core";
import { createTimestampWithDefault } from "./utils";

export const otherItems = sqliteTable("other_items", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
  price: real("price").notNull(),
  quantity: integer("quantity").notNull().default(0),
  image: text("image"),
  category: text("category"),
  slug: text("slug"),
  // 通用时间戳字段
  createdAt: createTimestampWithDefault("created_at"),
  updatedAt: createTimestampWithDefault("updated_at")
});

export type OtherItem = typeof otherItems.$inferSelect;
export type NewOtherItem = typeof otherItems.$inferInsert;
