'use client';
import { useTranslations } from 'next-intl';
import type { EbookItem } from '@/db/types';

interface EbookDetailPageClientProps {
  ebook: EbookItem;
}

export function EbookDetailPageClient({ ebook }: EbookDetailPageClientProps) {
  const t = useTranslations('EbookDetailPage');

  return (
    <main className="max-w-3xl mx-auto py-8 space-y-8">
      <h1 className="text-3xl font-bold mb-4">
        {t('title', { name: ebook.name || t('unknownName') })}
      </h1>
      {/* 详情区块，可复用原有 EbookDetailSections 等 */}
      {/* <EbookDetailSections {...ebook} /> */}
      <div className="text-gray-800 whitespace-pre-wrap">
        {ebook.description || t('noDescription')}
      </div>
      <div className="text-gray-600">
        <span>{t('author')}: {ebook.author || t('unknownAuthor')}</span>
      </div>
      {/* 其它区块如 NewsAndActivities、OfficialLinks 可继续复用 */}
    </main>
  );
}
