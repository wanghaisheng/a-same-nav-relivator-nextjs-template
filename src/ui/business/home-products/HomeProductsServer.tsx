import { productsService } from '@/services';
import { HomeProductsClient } from './HomeProductsClient';

export async function HomeProductsServer() {
  const products = await productsService.getAll();
  return <HomeProductsClient products={products} />;
}
