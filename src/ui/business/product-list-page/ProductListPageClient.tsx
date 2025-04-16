import React from "react";
import type { ProductListPageClientProps } from "./types";
import { useTranslations } from 'next-intl';

export function ProductListPageClient({ products, error, locale }: ProductListPageClientProps) {
  // 使用国际化hook获取文案，传入namespace
  const t = useTranslations('ProductListPage');
  
  if (error) {
    return <div className="text-red-500 p-4">{t('error', { message: error })}</div>;
  }
  
  if (!products || products.length === 0) {
    return <div className="text-center p-8">{t('empty')}</div>;
  }
  
  return (
    <div className="product-list-page container mx-auto py-8">
      <h2 className="text-2xl font-bold mb-6">{t('title')}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map(product => (
          <div key={product.id} className="border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
            <h3 className="font-medium text-lg">{product.name ?? t('product.unnamed')}</h3>
            <p className="text-sm text-gray-600">
              {t('product.category')}: {product.category ?? t('product.unknownCategory')}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
