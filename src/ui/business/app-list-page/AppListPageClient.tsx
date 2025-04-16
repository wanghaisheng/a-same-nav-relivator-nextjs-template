"use client";
import React, { useState, useMemo } from "react";
import type { AppItem } from '@/db/sqlite/schema/app_items';
import type { Category } from '@/db/sqlite/schema/categories';
import { MultiSelect } from '@/ui/components/core/multi-selector';
import { useTranslations } from 'next-intl';

export interface AppListPageClientProps {
  apps: AppItem[];
  categories: Category[];
}

export function AppListPageClient({ apps, categories }: AppListPageClientProps) {
  const t = useTranslations('AppListPage');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const categoryOptions = useMemo(() =>
    categories?.filter(Boolean).map(cat => ({
      label: cat.name || t('category.unknown'),
      value: cat.id,
    })) ?? [],
    [categories, t]
  );

  const filteredApps = useMemo(() => {
    if (!selectedCategories.length) return apps;
    return apps.filter(app => selectedCategories.includes(app.category || ''));
  }, [apps, selectedCategories]);

  if (!apps || apps.length === 0) {
    return <div>{t('empty')}</div>;
  }

  return (
    <div className="app-list-page">
      <h2>{t('title')}</h2>
      {/* 分类筛选器 */}
      {categoryOptions.length > 0 && (
        <div className="mb-4">
          <MultiSelect
            options={categoryOptions}
            onValueChange={setSelectedCategories}
            placeholder={t('category.filterPlaceholder')}
          />
        </div>
      )}
      {/* 主应用列表 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {filteredApps.map(app => (
          <div key={app.id} className="border rounded p-4 bg-white shadow">
            <div className="font-bold text-lg mb-2">{app.name}</div>
            <div className="text-sm text-gray-500">{app.category || t('category.unknown')}</div>
            {/* 可根据需要补充更多 app 信息 */}
          </div>
        ))}
      </div>
    </div>
  );
}
