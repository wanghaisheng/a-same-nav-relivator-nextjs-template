'use client';

import React, { useState, useMemo } from "react";
import type { EbookItem } from '@/db/types/ebook';
import type { Category } from '@/db/sqlite/schema/categories';
import { MultiSelect } from '@/ui/components/core/multi-selector';
import { EbookCardClient } from '@/ui/business/ebook-card/EbookCardClient';
import { useTranslations } from 'next-intl';

export interface EbookListPageClientProps {
  ebooks: EbookItem[];
  categories: Category[];
  locale: string;
}

export function EbookListPageClient({ ebooks, categories, locale }: EbookListPageClientProps) {
  const t = useTranslations('EbookListPage');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  // 分类选项根据 categories schema
  const categoryOptions = useMemo(() =>
    categories?.filter(Boolean).map(cat => ({
      label: cat.name || t('category.unknown'),
      value: cat.id,
    })) ?? [],
    [categories, t]
  );

  // 过滤电子书
  const filteredEbooks = useMemo(() => {
    if (!selectedCategories.length) return ebooks;
    return ebooks.filter(eb => selectedCategories.includes(eb.category || ''));
  }, [ebooks, selectedCategories]);

  if (!ebooks || ebooks.length === 0) {
    return <div>{t('empty')}</div>;
  }

  return (
    <div className="ebook-list-page">
      <h2>{t('title')}</h2>

      {/* Category Filter */}
      {categoryOptions.length > 0 && (
        <div className="mb-4">
          <MultiSelect
            options={categoryOptions}
            onValueChange={setSelectedCategories}
            placeholder={t('category.filterPlaceholder')}
          />
        </div>
      )}

      {/* Main Ebook List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {filteredEbooks.map(ebook => (
          <EbookCardClient key={ebook.id} ebook={ebook} />
        ))}
      </div>
    </div>
  );
}
