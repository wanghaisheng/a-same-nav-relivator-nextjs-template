import { getTranslations } from 'next-intl/server';
import { ProductDetailPageClient } from './ProductDetailPageClient';
import type { Product } from '@/db/sqlite/schema/products';

interface ProductDetailPageServerProps {
  product: Product;
  locale?: string;
}

export async function ProductDetailPageServer({ product, locale }: ProductDetailPageServerProps) {
  const t = await getTranslations({ locale: locale || 'zh', namespace: 'ProductDetailPage' });
  const normalizedProduct = {
    ...product,
    description: product.description ?? t('noDescription'),
    name: product.name || t('unknownName'),
    // 可按需补全其它字段
  };
  return <ProductDetailPageClient product={normalizedProduct} t={t} />;
}
