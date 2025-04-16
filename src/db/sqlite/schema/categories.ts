import { sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { createTimestampWithDefault } from './utils';

export const categories = sqliteTable('categories', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  image: text('image'),
  description: text('description'),
  createdAt: createTimestampWithDefault('created_at'),
  updatedAt: createTimestampWithDefault('updated_at'),
});

export type Category = typeof categories.$inferSelect;
export type NewCategory = typeof categories.$inferInsert;
