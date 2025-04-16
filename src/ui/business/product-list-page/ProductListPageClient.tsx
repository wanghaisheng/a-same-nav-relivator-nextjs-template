'use client';
import React from "react";
import type { ProductListPageClientProps } from "./types";
import { useTranslations } from 'next-intl';
import { ProductCardClient } from "@/ui/business/product-card/ProductCardClient";
import { Button } from "@/ui/components/core/button";
import { HeaderClient } from "@/ui/business/header/HeaderClient";
import { FooterClient } from "@/ui/business/footer/FooterClient";

export function ProductListPageClient({ products, error, locale }: ProductListPageClientProps) {
  const t = useTranslations('ProductListPage');
  const [selectedCategory, setSelectedCategory] = React.useState('All');

  // 获取所有分类
  const categories = React.useMemo(() => {
    const cats = products?.map(p => p.category).filter(Boolean) || [];
    return ['All', ...Array.from(new Set(cats))];
  }, [products]);

  // 分类筛选
  const filteredProducts = React.useMemo(() => {
    if (!products) return [];
    return selectedCategory === 'All'
      ? products
      : products.filter(p => p.category === selectedCategory);
  }, [products, selectedCategory]);

  // 加入购物车
  const handleAddToCart = (productId: string) => {
    if (!products) return;
    const product = products.find(p => p.id === productId);
    if (product) {
      // 这里假设有 addItem 方法可用，实际项目中可通过 context 或 props 传递
      // addItem(product);
      alert(t('addedToCart', { name: product.name }));
    }
  };

  // 加入心愿单
  const handleAddToWishlist = (productId: string) => {
    if (!products) return;
    const product = products.find(p => p.id === productId);
    if (product) {
      // 这里假设有 addToWishlist 方法可用，实际项目中可通过 context 或 props 传递
      // addToWishlist(product);
      alert(t('addedToWishlist', { name: product.name }));
    }
  };

  if (error) {
    return <div className="text-red-500 p-4">{t('error', { message: error })}</div>;
  }

  if (!products || products.length === 0) {
    return <div className="text-center p-8">{t('empty')}</div>;
  }

  return (
    <div className="flex min-h-screen flex-col">
      <HeaderClient />
      <main className="flex-1 py-10">
        <div className="container px-4 md:px-6">
          <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">{t('title')}</h1>
              <p className="mt-1 text-lg text-muted-foreground">{t('subtitle')}</p>
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map(category => (
                <Button
                  key={category}
                  variant={category === selectedCategory ? "default" : "outline"}
                  size="sm"
                  className="rounded-full"
                  onClick={() => setSelectedCategory(category)}
                >
                  {t(`category.${category}`, { default: category })}
                </Button>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {filteredProducts.map(product => (
              <ProductCardClient
                key={product.id}
                product={product}
                onAddToCart={handleAddToCart}
                onAddToWishlist={handleAddToWishlist}
              />
            ))}
          </div>
          {filteredProducts.length === 0 && (
            <div className="mt-8 text-center">
              <p className="text-muted-foreground">{t('noProductsInCategory')}</p>
            </div>
          )}
          <div className="mt-12 flex items-center justify-center">
            <Button variant="outline" className="mr-2" disabled>{t('pagination.prev')}</Button>
            <Button variant="outline" className="mx-1" aria-current="page">1</Button>
            <Button variant="outline" className="mx-1" disabled>2</Button>
            <Button variant="outline" className="mx-1" disabled>3</Button>
            <Button variant="outline" className="ml-2" disabled>{t('pagination.next')}</Button>
          </div>
        </div>
      </main>
      <FooterClient />
    </div>
  );
}
