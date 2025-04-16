"use client";
import React from "react";
import { useTranslations } from 'next-intl';

export interface FeatureItem {
  icon?: React.ReactNode;
  title?: string | null;
  description?: string | null;
}

export interface FeaturesProps {
  features?: FeatureItem[] | null;
  className?: string;
}

export function Features({ features, className }: FeaturesProps) {
  const t = useTranslations('Features');
  if (!features || features.length === 0) {
    return <div className={className}>{t('empty')}</div>;
  }
  return (
    <section className={className}>
      <h2 className="text-xl font-bold mb-4">{t('title')}</h2>
      <ul className="grid gap-4">
        {features.map((f, idx) => (
          <li key={idx} className="flex items-start gap-2">
            {f.icon && <span className="mt-1">{f.icon}</span>}
            <div>
              <div className="font-semibold">{f.title || t('unknownTitle')}</div>
              <div className="text-gray-600 text-sm">{f.description || t('noDescription')}</div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
