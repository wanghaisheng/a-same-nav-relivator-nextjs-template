/**
 * THIS FILE IS AUTO-GENERATED - DO NOT EDIT DIRECTLY
 *
 * To modify the schema, edit src/lib/auth.ts instead,
 * then run 'bun db:auth' to regenerate this file.
 *
 * Any direct changes to this file will be overwritten.
 */

import {
  integer,
  text,
} from "drizzle-orm/sqlite-core";
import { sqliteTable } from "drizzle-orm/sqlite-core";
import { createTimestampWithDefault } from "./utils";

export const userTable = sqliteTable("user", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: integer("email_verified", { mode: "boolean" }).notNull(),
  image: text("image"),
  createdAt: createTimestampWithDefault("created_at"),
  updatedAt: createTimestampWithDefault("updated_at"),
  twoFactorEnabled: integer("two_factor_enabled", { mode: "boolean" }),
  age: integer("age"),
  firstName: text("first_name"),
  lastName: text("last_name"),
});

export const sessionTable = sqliteTable("session", {
  id: text("id").primaryKey(),
  expiresAt: integer("expires_at", { mode: "timestamp" }).notNull(),
  token: text("token").notNull().unique(),
  createdAt: createTimestampWithDefault("created_at"),
  updatedAt: createTimestampWithDefault("updated_at"),
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  userId: text("user_id")
    .notNull()
    .references(() => userTable.id, { onDelete: "cascade" }),
});

export const accountTable = sqliteTable("account", {
  id: text("id").primaryKey(),
  accountId: text("account_id").notNull(),
  providerId: text("provider_id").notNull(),
  userId: text("user_id")
    .notNull()
    .references(() => userTable.id, { onDelete: "cascade" }),
  accessToken: text("access_token"),
  refreshToken: text("refresh_token"),
  idToken: text("id_token"),
  accessTokenExpiresAt: integer("access_token_expires_at", { mode: "timestamp" }),
  refreshTokenExpiresAt: integer("refresh_token_expires_at", { mode: "timestamp" }),
  scope: text("scope"),
  password: text("password"),
  createdAt: createTimestampWithDefault("created_at"),
  updatedAt: createTimestampWithDefault("updated_at"),
});

export const verificationTable = sqliteTable("verification", {
  id: text("id").primaryKey(),
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: integer("expires_at", { mode: "timestamp" }).notNull(),
  createdAt: integer("created_at", { mode: "timestamp" }),
  updatedAt: integer("updated_at", { mode: "timestamp" }),
});

export const twoFactorTable = sqliteTable("two_factor", {
  id: text("id").primaryKey(),
  secret: text("secret").notNull(),
  backupCodes: text("backup_codes").notNull(),
  userId: text("user_id")
    .notNull()
    .references(() => userTable.id, { onDelete: "cascade" }),
});

export const users = sqliteTable("users", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  image: text("image"),
  createdAt: createTimestampWithDefault("createdAt"),
  updatedAt: createTimestampWithDefault("updatedAt"),
});
