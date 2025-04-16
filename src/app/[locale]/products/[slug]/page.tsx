import { ProductDetailPageServer } from '@/ui/business/product-detail-page/ProductDetailPageServer';
import { notFound } from 'next/navigation';
import { itemsService } from '~/services';

export default async function Page({ params, locale }: { params: { slug: string }, locale: string }) {
  // 从服务获取商品详情
  const product = await itemsService.getProductBySlug(params.slug);
  if (!product) return notFound();
  return <ProductDetailPageServer product={product} locale={locale} />;
}