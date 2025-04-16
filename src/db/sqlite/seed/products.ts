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
      image: 'https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=400&q=80',
      category: 'Electronics',
      rating: 4.5,
      inStock: true,
      description: 'Latest smartphone with advanced features',
      features: JSON.stringify(['5G', '128GB Storage', '12MP Camera']),
      specs: JSON.stringify({ 'Screen': '6.1"', 'Battery': '4000mAh' }),
      slug: 'smartphone-x',
      locale: 'en',
    },
    {
      id: nanoid(),
      name: '智能手机 X',
      price: 6999.99,
      originalPrice: 7999.99,
      image: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80',
      category: '电子产品',
      rating: 4.5,
      inStock: true,
      description: '最新款智能手机，功能强大',
      features: JSON.stringify(['5G', '128GB 存储', '1200万像素摄像头']),
      specs: JSON.stringify({ '屏幕': '6.1英寸', '电池': '4000毫安时' }),
      slug: 'smartphone-x-zh',
      locale: 'zh',
    }
  ];
  for (const item of data) {
    await db.insert(products).values(item).run();
  }
}
