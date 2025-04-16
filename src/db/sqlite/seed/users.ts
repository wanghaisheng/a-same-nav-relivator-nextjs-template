import { users } from '../schema/users';
import { sqliteDb as db } from '../index';
import { sql } from 'drizzle-orm';
import { nanoid } from 'nanoid';

export async function seedUsers() {
  await db.run(sql`DELETE FROM users`);
  const data = [
    { id: nanoid(), name: 'Admin User', email: 'admin@example.com', image: '/images/avatars/admin.png' }
  ];
  for (const item of data) {
    await db.insert(users).values(item).run();
  }
}
