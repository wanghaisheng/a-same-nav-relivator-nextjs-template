import { sqliteTable, text, integer, real } from "drizzle-orm/sqlite-core";
import { createTimestampWithDefault } from "./utils";

export const gameItems = sqliteTable("game_items", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
  price: real("price").notNull(),
  quantity: integer("quantity").notNull().default(0),
  image: text("image"),
  category: text("category"),
  slug: text("slug"),
  locale: text('locale').notNull(), // 新增locale字段，支持多语言
  tags: text("tags"), // 新增tags标签字段，支持逗号分隔的字符串
  // GAME特有字段
  gameGenre: text("game_genre"),            // 游戏类别
  multiplayer: integer("multiplayer", { mode: "boolean" }), // 是否支持多人
  gameMode: text("game_mode"),              // 游戏模式 (如: "单人, 多人, 合作")
  // 通用时间戳字段
  createdAt: createTimestampWithDefault("created_at"),
  updatedAt: createTimestampWithDefault("updated_at")
});

export type GameItem = typeof gameItems.$inferSelect;
export type NewGameItem = typeof gameItems.$inferInsert;
