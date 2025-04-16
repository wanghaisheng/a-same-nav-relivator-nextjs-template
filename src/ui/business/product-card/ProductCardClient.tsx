import React from "react";
import type { Product } from '@/db/types';
import { useTranslations } from 'next-intl';

export type ProductCardProps = {
  product?: Product;
};

export const ProductCardClient: React.FC<ProductCardProps> = ({ product }) => {
  const t = useTranslations('ProductCard');
  if (!product) {
    return <div className="product-card empty">{t('noProductInfo')}</div>;
  }
  return (
    <div className="product-card">
      <h3>{product.name ?? t('unnamedProduct')}</h3>
      <div>{t('category')}: {product.category ?? t('unknownCategory')}</div>
      <div>{t('price')}: {product.price != null ? `¥${product.price}` : t('unknown')}</div>
    </div>
  );
};
