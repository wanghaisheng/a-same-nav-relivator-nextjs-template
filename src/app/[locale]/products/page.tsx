import ProductListPageServer from '@/ui/business/product-list-page/ProductListPageServer';
import { productsService } from '~/services';

export default async function ProductListPage({ params }: { params: Promise<{  locale: string }> }) {
  const {  locale } = await params;

  // 获取所有产品数据
  const products = await productsService.getAll();
  // 传递给服务端业务组件
  return <ProductListPageServer products={products} locale={locale}/>;
}