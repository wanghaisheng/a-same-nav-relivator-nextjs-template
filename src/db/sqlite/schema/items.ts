import { sqliteTable, text, integer, real } from "drizzle-orm/sqlite-core";

export const items = sqliteTable("items", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
  price: real("price").notNull(),
  quantity: integer("quantity").notNull().default(0),
  image: text("image"),
  category: text("category"),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull().default(new Date()),
  updatedAt: integer("updated_at", { mode: "timestamp" }).notNull().default(new Date()),
}); 