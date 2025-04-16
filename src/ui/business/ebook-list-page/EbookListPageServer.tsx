import React from "react";
import type { EbookItem } from "@/db/types";
import type { Category } from "@/db/sqlite/schema/categories";
import { EbookListPageClient } from '@/ui/business/ebook-list-page/EbookListPageClient';

export interface EbookListPageServerProps {
  ebooks: EbookItem[];
  categories: Category[];
  locale: string;
}

export async function EbookListPageServer({ ebooks, categories, locale }: EbookListPageServerProps) {
  // 补全空态、分类、标题等文案
  return (
    <EbookListPageClient
      ebooks={ebooks}
      categories={categories}
      locale={locale}
    />
  );
}
