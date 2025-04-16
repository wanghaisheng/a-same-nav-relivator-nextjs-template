import { EbookDetailPageClient } from './EbookDetailPageClient';
import type { EbookItem } from '@/db/types';

interface EbookDetailPageServerProps {
  ebook: EbookItem;
  locale?: string;
}

export async function EbookDetailPageServer({ ebook, locale }: EbookDetailPageServerProps) {
  // 只做数据补全，不做 i18n 处理
  const normalizedEbook = {
    ...ebook,
    // description/name/author 字段的兜底交给客户端用 t 处理
  };

  return <EbookDetailPageClient ebook={normalizedEbook} />;
}