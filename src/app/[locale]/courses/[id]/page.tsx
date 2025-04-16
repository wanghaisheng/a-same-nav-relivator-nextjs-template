import { notFound } from "next/navigation";
import { coursesService } from "@/services";
import { CourseDetailPageServer } from "@/ui/business/course-detail-page/CourseDetailPageServer";
import type { CourseItem } from '@/db/sqlite/schema/course_items';
import { FooterClient } from "@/ui/business/footer/FooterClient";
import { HeaderClient } from "@/ui/business/header/HeaderClient";

export default async function Page({ params }: { params: Promise<{ id: string, locale: string }> }) {

  const { id,locale } = await params

  const Course: CourseItem | null = await coursesService.getById(id);
  if (!Course) return notFound();
  return (
    <div className="flex min-h-screen flex-col">
      <HeaderClient />
      <main className="flex-1 py-10">
        <CourseDetailPageServer Course={Course} locale={locale} />
      </main>
      <FooterClient />
    </div>
  );
}