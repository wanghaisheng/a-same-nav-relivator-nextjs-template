import { ProductDetailPageServer } from '@/ui/business/product-detail-page/ProductDetailPageServer';
import { notFound } from 'next/navigation';
import { productsService } from '~/services';

export default async function Page({ params }: { params: Promise<{slug: string, locale: string }> }) {
  // 从服务获取商品详情
  const { slug, locale } = await params;
  
  const product = await productsService.getProductBySlug(slug);
  if (!product) return notFound();
  return <ProductDetailPageServer product={product} locale={locale} />;
}