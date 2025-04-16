import { appsService, categoriesService } from "@/services";
import type { AppItem } from '@/db/sqlite/schema/app_items';
import type { Category } from '@/db/sqlite/schema/categories';
import { AppListPageServer } from '@/ui/business/app-list-page/AppListPageServer';
import { FooterClient } from "@/ui/business/footer/FooterClient";
import { HeaderClient } from "@/ui/business/header/HeaderClient";

export default async function AppListPage({ params }: { params: Promise<{  locale: string }> }) {
  const {  locale } = await params;

  let apps: AppItem[] = [];
  let categories: Category[] = [];
  try {
    apps = await appsService.getAll();
  } catch (error) {
    console.error("Error fetching apps:", error);
  }
  try {
    categories = await categoriesService.getAll();
  } catch (error) {
    console.error("Error fetching app categories:", error);
  }
  return (
    <div className="flex min-h-screen flex-col">
      <HeaderClient />
      <main className="flex-1 py-10">
        <AppListPageServer apps={apps} categories={categories} locale={locale} />
      </main>
      <FooterClient />
    </div>
  );
}