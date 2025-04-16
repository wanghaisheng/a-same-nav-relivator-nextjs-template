import { ProductGallery } from '@/ui/registry/components/product-gallery/ProductGallery';
import { ProductInfoSection } from '@/ui/registry/components/product-info-section/ProductInfoSection';
import { ProductTabs } from '@/ui/registry/components/product-tabs/ProductTabs';
import { ProductActions } from '@/ui/registry/components/product-actions/ProductActions';
import { ProductMeta } from '@/ui/registry/components/product-meta/ProductMeta';
import { useTranslations } from 'next-intl';
import type { Product } from '@/db/sqlite/schema/products';

interface ProductDetailPageClientProps {
  product: Product;
  t?: ReturnType<typeof useTranslations> | any;
}

export function ProductDetailPageClient({ product, t }: ProductDetailPageClientProps) {
  const tClient = t || useTranslations('ProductDetailPage');
  if (!product) return null;

  // 只用主图 image 字段
  const images = product.image ? [product.image] : [];
  // 用分类作为标签示例
  const tags = product.category ? [product.category] : [];
  const rating = typeof product.rating === 'number' ? product.rating : undefined;
  // 用 inStock 作为库存信息
  const stock = typeof product.inStock === 'boolean' ? (product.inStock ? 1 : 0) : undefined;
  // 详情区块
  const details = product.features || product.specs || undefined;

  return (
    <main className="max-w-5xl mx-auto py-8 space-y-8">
      {/* 图片轮播区块 */}
      <ProductGallery images={images} productName={product.name || ''} t={tClient} />
      {/* 产品基础信息区块 */}
      <ProductInfoSection name={product.name || ''} description={product.description || undefined} price={product.price} tags={tags} t={tClient} />
      {/* 产品 meta 区块（评分、库存等） */}
      <ProductMeta rating={rating} stock={stock} t={tClient} />
      {/* 操作按钮区块 */}
      <ProductActions productId={product.id} t={tClient} />
      {/* 详情/评价等 Tab 区块 */}
      <ProductTabs description={product.description || undefined} details={details} reviews={null} t={tClient} />
    </main>
  );
}
