import { categoriesService } from '@/services';
import { HomeCategoriesClient } from './HomeCategoriesClient';

export async function HomeCategoriesServer() {
  const categories = await categoriesService.getAll();
  return <HomeCategoriesClient categories={categories} />;
}
