'use client';
import React from 'react';
import { ProductCardClient } from '@/ui/business/product-card/ProductCardClient';
import { useTranslations } from 'next-intl';

export function HomeProductsClient({ products }) {
  const t = useTranslations('HomePage');
  if (!products?.length) return null;
  return (
    <section className="bg-muted/50 py-12 md:py-16">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col items-center text-center">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">{t('featuredProducts')}</h2>
          <div className="mt-2 h-1 w-12 rounded-full bg-primary" />
          <p className="mt-4 max-w-2xl text-center text-muted-foreground">{t('discoverPremiumProducts')}</p>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {products.map((product) => (
            <ProductCardClient key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
