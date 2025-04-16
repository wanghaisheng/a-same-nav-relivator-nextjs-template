import { userTable, sessionTable, accountTable, verificationTable, twoFactorTable } from '../schema/users';
import { sqliteDb as db } from '../index';
import { sql } from 'drizzle-orm';

export async function seedAuth() {
  await db.run(sql`DELETE FROM ${userTable}`);
  await db.run(sql`DELETE FROM ${sessionTable}`);
  await db.run(sql`DELETE FROM ${accountTable}`);
  await db.run(sql`DELETE FROM ${verificationTable}`);
  await db.run(sql`DELETE FROM ${twoFactorTable}`);
  // 可根据需要添加种子数据
}
