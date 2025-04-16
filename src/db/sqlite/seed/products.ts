import { products } from '../schema/products';
import { sqliteDb as db } from '../index';
import { sql } from 'drizzle-orm';
import { nanoid } from 'nanoid';

export async function seedProducts() {
  // 清空表
  await db.run(sql`DELETE FROM products`);
  // 示例种子数据
  const data = [
    {
      id: nanoid(),
      name: 'Smartphone X',
      price: 999.99,
      originalPrice: 1099.99,
      image: '/images/products/smartphone.jpg',
      category: 'Electronics',
      rating: 4.5,
      inStock: true,
      description: 'Latest smartphone with advanced features',
      features: JSON.stringify(['5G', '128GB Storage', '12MP Camera']),
      specs: JSON.stringify({ 'Screen': '6.1"', 'Battery': '4000mAh' }),
      slug: 'smartphone-x'
    }
  ];
  for (const item of data) {
    await db.insert(products).values(item).run();
  }
}
