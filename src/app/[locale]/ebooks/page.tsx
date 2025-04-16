import { ebooksService, categoriesService } from "@/services";
import type { EbookItem } from '@/db/types';
import type { Category } from '@/db/sqlite/schema/categories';
import { EbookListPageServer } from '@/ui/business/ebook-list-page/EbookListPageServer';
import { HeaderClient } from "@/ui/business/header/HeaderClient";
import { FooterClient } from "@/ui/business/footer/FooterClient";

// 页面只负责数据获取和 notFound，不做 UI 渲染

export default async function EbookListPage({ params }: { params: Promise<{  locale: string }> }) {
    const {  locale } = await params;

  let ebooks: EbookItem[] = [];
  let categories: Category[] = [];
  try {
    ebooks = await ebooksService.getAll(locale);
  } catch (error) {
    console.error("Error fetching ebooks:", error);
  }
  try {
    categories = await categoriesService.getAll(locale);
  } catch (error) {
    console.error("Error fetching ebook categories:", error);
  }
  return (
    <div className="flex min-h-screen flex-col">
      <HeaderClient  />
      <main className="flex-1 py-10">
        <EbookListPageServer ebooks={ebooks} categories={categories} locale={locale} />;
      </main>
      <FooterClient />
    </div>
  );

}
