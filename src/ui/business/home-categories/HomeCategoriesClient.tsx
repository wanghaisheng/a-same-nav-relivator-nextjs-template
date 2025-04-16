'use client';
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

export function HomeCategoriesClient({ categories }) {
  const t = useTranslations('HomePage');
  if (!categories?.length) return null;
  return (
    <section className="py-12 md:py-16">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col items-center text-center">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">{t('shopByCategory')}</h2>
          <div className="mt-2 h-1 w-12 rounded-full bg-primary" />
          <p className="mt-4 max-w-2xl text-center text-muted-foreground">{t('findPerfectDevice')}</p>
        </div>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
          {categories.map((category) => (
            <Link key={category.name} href={`/products?category=${category.name.toLowerCase()}`} className="group relative flex flex-col overflow-hidden rounded-lg border bg-card transition-all duration-200 hover:shadow-md">
              <div className="relative aspect-[4/3] overflow-hidden">
                <div className="absolute inset-0 z-10 bg-gradient-to-t from-background/80 to-transparent" />
                <Image src={category.image} alt={category.name} fill className="object-cover transition duration-300 group-hover:scale-105" />
              </div>
              <div className="relative z-20 -mt-6 p-4">
                <div className="mb-1 text-lg font-medium">{category.name}</div>
                <p className="text-sm text-muted-foreground">{category.productCount} {t('products')}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
