import { getTranslations } from 'next-intl/server';
import { AppDetailPageClient } from './AppDetailPageClient';
import type { AppItem } from '@/db/sqlite/schema/app_items';

interface AppDetailPageServerProps {
  app: AppItem;
  locale?: string;
}

export async function AppDetailPageServer({ app, locale }: AppDetailPageServerProps) {
  const t = await getTranslations({ locale: locale || 'zh', namespace: 'AppDetailPage' });
  const normalizedApp = {
    ...app,
    description: app.description ?? t('noDescription'),
    name: app.name || t('unknownName'),
    // 可按需补全其它字段
  };
  return <AppDetailPageClient app={normalizedApp} t={t} />;
}
