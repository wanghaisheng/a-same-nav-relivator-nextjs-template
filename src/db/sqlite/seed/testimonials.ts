import { testimonials } from '../schema/testimonials';
import { sqliteDb as db } from '../index';
import { sql } from 'drizzle-orm';
import { nanoid } from 'nanoid';

export async function seedTestimonials() {
  await db.run(sql`DELETE FROM testimonials`);
  const data = [
    { id: nanoid(), content: 'Great service!', authorName: 'User A', authorRole: 'customer', rating: 5, locale: 'en' },
    { id: nanoid(), content: 'Very useful.', authorName: 'User B', authorRole: 'customer', rating: 4, locale: 'en' },
    { id: nanoid(), content: '服务很棒！', authorName: '用户甲', authorRole: '客户', rating: 5, locale: 'zh' },
    { id: nanoid(), content: '非常实用。', authorName: '用户乙', authorRole: '客户', rating: 4, locale: 'zh' },
  ];
  for (const item of data) {
    await db.insert(testimonials).values(item).run();
  }
}
