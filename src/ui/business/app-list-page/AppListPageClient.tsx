'use client';
import React, { useMemo, useState } from "react";
import type { AppItem } from '@/db/sqlite/schema/app_items';
import type { Category } from '@/db/sqlite/schema/categories';

// 客户端组件，负责渲染与交互
export interface AppListPageClientProps {
  apps: AppItem[];
  categories: Category[];
  t: any; // next-intl translations instance
}

export function AppListPageClient({ apps, categories, t }: AppListPageClientProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('');

  const categoryOptions = useMemo(() =>
    categories?.filter(Boolean).map(cat => ({
      label: cat.name || t('category.unknown'),
      value: cat.id,
    })) ?? [],
    [categories, t]
  );

  const filteredApps = useMemo(() => {
    if (!selectedCategory) return apps;
    return apps.filter(app => app.category === selectedCategory);
  }, [apps, selectedCategory]);

  if (!apps || apps.length === 0) {
    return <div>{t('empty')}</div>;
  }

  return (
    <div>
      <h2>{t('title')}</h2>
      {/* 分类筛选器 */}
      {categoryOptions.length > 0 && (
        <select
          value={selectedCategory}
          onChange={e => setSelectedCategory(e.target.value)}
        >
          <option value="">{t('category.filterPlaceholder')}</option>
          {categoryOptions.map(opt => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      )}
      <ul>
        {filteredApps.map(app => (
          <li key={app.id}>{app.name + (app.category ? `（${app.category}）` : '')}</li>
        ))}
      </ul>
    </div>
  );
}
