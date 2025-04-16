import { notFound } from "next/navigation";
import { appsService } from "@/services";
import { AppDetailPageServer } from "@/ui/business/app-detail-page/AppDetailPageServer";
import type { AppItem } from '@/db/sqlite/schema/app_items';
import { FooterClient } from "@/ui/business/footer/FooterClient";
import { HeaderClient } from "@/ui/business/header/HeaderClient";

export default async function AppDetailPage({ params }: { params: { id: string, locale: string } }) {
  const app: AppItem | null = await appsService.getById(params.id);
  if (!app) return notFound();
  return (
    <div className="flex min-h-screen flex-col">
      <HeaderClient />
      <main className="flex-1 py-10">
        <AppDetailPageServer app={app} locale={params.locale} />
      </main>
      <FooterClient />
    </div>
  );
}