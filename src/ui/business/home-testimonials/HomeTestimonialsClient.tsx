'use client';
import React from 'react';
import { Testimonials } from '@/ui/business/testimonials/Testimonials';
import { useTranslations } from 'next-intl';

export function HomeTestimonialsClient({ testimonials }) {
  const t = useTranslations('HomePage');
  if (!testimonials?.length) return null;
  return (
    <section className="py-12 md:py-16">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col items-center text-center">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">{t('whatCustomersSay')}</h2>
          <div className="mt-2 h-1 w-12 rounded-full bg-primary" />
        </div>
        <Testimonials testimonials={testimonials} />
      </div>
    </section>
  );
}
