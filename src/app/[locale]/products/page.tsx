import  ProductListPageServer  from '@/ui/business/product-list-page/ProductListPageServer';
import { itemsService } from '~/services';

export default async function Page() {
  // 获取所有产品数据
  const products = await itemsService.getAll();
  // 传递给服务端业务组件
  return <ProductListPageServer products={products} />;
}