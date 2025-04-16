import { otherItems } from '../schema/other_items';
import { sqliteDb as db } from '../index';
import { nanoid } from 'nanoid';

export async function seedOtherItems() {
  await db.delete(otherItems);
  const data = [
    {
      id: nanoid(),
      name: '随手记',
      description: '简洁的记账工具',
      price: 0,
      quantity: 10000,
      image: '/images/others/note.png',
      category: '工具',
      slug: 'note-zh',
      locale: 'zh',
    },
    {
      id: nanoid(),
      name: 'Quick Note',
      description: 'A simple note-taking tool',
      price: 0,
      quantity: 10000,
      image: '/images/others/note.png',
      category: 'Tool',
      slug: 'note',
      locale: 'en',
    }
  ];
  for (const item of data) {
    await db.insert(otherItems).values(item).run();
  }
}
