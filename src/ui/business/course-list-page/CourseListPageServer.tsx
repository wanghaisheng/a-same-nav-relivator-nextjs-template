import React from "react";
import { getTranslations } from 'next-intl/server';
import { CourseListPageClient } from "./CourseListPageClient";
import type { CourseItem } from "@/db/sqlite/schema/course_items";
import type { Category } from "@/db/sqlite/schema/categories";

export interface CourseListPageServerProps {
  courses: CourseItem[];
  categories: Category[];
  locale: string;
}

export async function CourseListPageServer({ courses, categories, locale }: CourseListPageServerProps) {
  const t = await getTranslations({ locale, namespace: 'CourseListPage' });
  return (
    <CourseListPageClient courses={courses} categories={categories} t={t} />
  );
}
