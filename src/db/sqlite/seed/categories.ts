import { categories } from '../schema/categories';
import { sqliteDb as db } from "../index";
import { nanoid } from 'nanoid';

export async function seedCategories() {
  // 可根据实际业务扩充
  const testCategories = [
    {
      id: nanoid(),
      name: '编程',
      image: '/images/categories/programming.jpg',
      description: '编程与开发类电子书',
      locale: 'zh', 
    },
    {
      id: nanoid(),
      name: '设计',
      image: '/images/categories/design.jpg',
      description: '设计相关电子书',
      locale: 'zh',
    },
    {
      id: nanoid(),
      name: '商业',
      image: '/images/categories/business.jpg',
      description: '商业与管理类电子书',
      locale: 'zh',
    },
    {
      id: nanoid(),
      name: '文学',
      image: '/images/categories/literature.jpg',
      description: '文学与艺术类电子书',
      locale: 'zh',
    },
    // 可在此扩展英文等多语言分类
    {
      id: nanoid(),
      name: 'Programming',
      image: '/images/categories/programming.jpg',
      description: 'Programming and development ebooks',
      locale: 'en',
    },
    {
      id: nanoid(),
      name: 'Design',
      image: '/images/categories/design.jpg',
      description: 'Design related ebooks',
      locale: 'en',
    },
    {
      id: nanoid(),
      name: 'Business',
      image: '/images/categories/business.jpg',
      description: 'Business and management ebooks',
      locale: 'en',
    },
    {
      id: nanoid(),
      name: 'Literature',
      image: '/images/categories/literature.jpg',
      description: 'Literature and art ebooks',
      locale: 'en',
    },
  ];
  await db.delete(categories);
  await db.insert(categories).values(testCategories);
}
