import { appItems } from '../schema/app_items';
import { sqliteDb as db } from '../index';
import { nanoid } from 'nanoid';

export async function seedAppItems() {
  await db.delete(appItems);
  const data = [
    {
      id: nanoid(),
      name: 'Todo Master',
      description: 'A simple and efficient todo list app.',
      price: 0,
      quantity: 10000,
      image: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80',
      category: 'Productivity',
      slug: 'todo-master',
      locale: 'en',
      platform: 'iOS, Android, Web',
      version: '2.1.0',
      minSystemRequirements: 'iOS 12/Android 8/Web',
    },
    {
      id: nanoid(),
      name: '待办大师',
      description: '简单高效的待办事项应用。',
      price: 0,
      quantity: 10000,
      image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=400&q=80',
      category: '效率',
      slug: 'todo-master-zh',
      locale: 'zh',
      platform: 'iOS, Android, Web',
      version: '2.1.0',
      minSystemRequirements: 'iOS 12/Android 8/Web',
    }
  ];
  for (const item of data) {
    await db.insert(appItems).values(item).run();
  }
}
