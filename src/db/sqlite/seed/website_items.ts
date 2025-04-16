import { websiteItems } from '../schema/website_items';
import { sqliteDb as db } from '../index';
import { nanoid } from 'nanoid';

export async function seedWebsiteItems() {
  await db.delete(websiteItems);
  const data = [
    {
      id: nanoid(),
      name: 'Personal Blog',
      description: 'A modern responsive blog built with Next.js.',
      image: '/images/websites/personal-blog.png',
      category: 'Blog',
      slug: 'personal-blog',
      locale: 'en',
      framework: 'Next.js',
      responsive: 1,
      url: 'https://blog.example.com',
    },
    {
      id: nanoid(),
      name: '个人博客',
      description: '基于 Next.js 的现代响应式博客。',
      image: '/images/websites/personal-blog.png',
      category: '博客',
      slug: 'personal-blog-zh',
      locale: 'zh',
      framework: 'Next.js',
      responsive: 1,
      url: 'https://blog.example.com/zh',
    }
  ];
  for (const item of data) {
    await db.insert(websiteItems).values(item).run();
  }
}
