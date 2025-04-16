import { ebooksService, categoriesService } from "@/services";
import type { EbookItem } from '@/db/types/ebook';
import type { Category } from '@/db/sqlite/schema/categories';
import { EbookListPageServer } from '@/ui/business/ebook-list-page/EbookListPageServer';

// 页面只负责数据获取和 notFound，不做 UI 渲染
export default async function EbookListPage({ params: { locale } }: { params: { locale: string } }) {
  let ebooks: EbookItem[] = [];
  let categories: Category[] = [];
  try {
    ebooks = await ebooksService.getAll();
  } catch (error) {
    console.error("Error fetching ebooks:", error);
  }
  try {
    categories = await categoriesService.getAll();
  } catch (error) {
    console.error("Error fetching ebook categories:", error);
  }
  return <EbookListPageServer ebooks={ebooks} categories={categories} locale={locale} />;
}
