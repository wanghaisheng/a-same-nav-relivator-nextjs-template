import { sqliteTable, text, integer, real } from "drizzle-orm/sqlite-core";
import { createTimestampWithDefault } from "./utils";

export const courseItems = sqliteTable("course_items", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
  price: real("price").notNull(),
  quantity: integer("quantity").notNull().default(0),
  image: text("image"),
  category: text("category"),
  slug: text("slug"),
  // COURSE特有字段
  duration: integer("duration"),            // 课程时长(分钟)
  level: text("level"),                     // 难度级别 (如: "初级, 中级, 高级")
  certification: integer("certification", { mode: "boolean" }), // 是否提供证书
  // 通用时间戳字段
  createdAt: createTimestampWithDefault("created_at"),
  updatedAt: createTimestampWithDefault("updated_at")
});

export type CourseItem = typeof courseItems.$inferSelect;
export type NewCourseItem = typeof courseItems.$inferInsert;
