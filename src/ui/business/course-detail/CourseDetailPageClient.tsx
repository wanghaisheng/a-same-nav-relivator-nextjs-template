"use client";
import { HeaderClient } from "@/ui/business/header";
import { FooterClient } from "@/ui/business/footer";
import { CourseInfo } from "./CourseInfo";
import { CourseImage } from "./CourseImage";
import { CourseTabs } from "./CourseTabs";
import type { CourseItem } from "~/db/sqlite/schema/course_items";

interface CourseDetailPageClientProps {
  course: any; // 可替换为更精确的类型
}

export function CourseDetailPageClient({ course }: CourseDetailPageClientProps) {
  if (!course) return null;
  return (
    <div className="flex min-h-screen flex-col">
      <HeaderClient />
      <main className="flex-1 py-10">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <CourseImage course={course} />
            <CourseInfo course={course} />
          </div>
          <CourseTabs course={course} />
        </div>
      </main>
      <FooterClient />
    </div>
  );
}
