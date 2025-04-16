import { testimonials } from '../schema/testimonials';
import { sqliteDb as db } from '../index';
import { sql } from 'drizzle-orm';
import { nanoid } from 'nanoid';

export async function seedTestimonials() {
  await db.run(sql`DELETE FROM testimonials`);
  const data = [
    { id: nanoid(), content: 'Great service!', authorName: 'User A', authorRole: 'customer', rating: 5 },
    { id: nanoid(), content: 'Very useful.', authorName: 'User B', authorRole: 'customer', rating: 4 }
  ];
  for (const item of data) {
    await db.insert(testimonials).values(item).run();
  }
}
