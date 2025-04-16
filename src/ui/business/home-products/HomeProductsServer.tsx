import { itemsService } from '@/services';
import { HomeProductsClient } from './HomeProductsClient';

export async function HomeProductsServer() {
  const products = await itemsService.getAll();
  return <HomeProductsClient products={products} />;
}
