'use client';
import { useTranslations } from 'next-intl';
import type { AppItem } from '@/db/sqlite/schema/app_items';

interface AppDetailPageClientProps {
  app: AppItem;
  t?: ReturnType<typeof useTranslations> | any;
}

export function AppDetailPageClient({ app, t }: AppDetailPageClientProps) {
  const tClient = t || useTranslations('AppDetailPage');
  return (
    <main className="max-w-3xl mx-auto py-8 space-y-8">
      <h1 className="text-3xl font-bold mb-4">
        {tClient('title', { name: app.name })}
      </h1>
      <div className="text-gray-800 whitespace-pre-wrap">
        {app.description || tClient('noDescription')}
      </div>
      {/* 可继续补充作者、平台等字段国际化展示 */}
    </main>
  );
}
