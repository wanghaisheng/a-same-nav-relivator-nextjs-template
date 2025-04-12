import * as sqliteSchema from './sqlite/schema';
import * as postgresSchema from './postgres/schema';
import { SQLiteTable } from 'drizzle-orm/sqlite-core';
import { PgTable } from 'drizzle-orm/pg-core';

const env = process.env.NEXT_PUBLIC_DATABASE_ENV;

const getSchema = () => {
  switch (env) {
    case 'postgres':
      return postgresSchema;
    case 'sqlite':
    default:
      return sqliteSchema;
  }
};

export const schema = getSchema();
export const {
  users,
  products,
  categories,
  items
} = schema as {
  users: SQLiteTable | PgTable;
  products: SQLiteTable | PgTable;
  categories: SQLiteTable | PgTable;
  items: SQLiteTable | PgTable;
}; 