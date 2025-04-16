import React from "react";
import { getTranslations } from 'next-intl/server';
import { AppListPageClient } from "./AppListPageClient";
import type { AppItem } from "@/db/sqlite/schema/app_items";
import type { Category } from "@/db/sqlite/schema/categories";

export interface AppListPageServerProps {
  apps: AppItem[];
  categories: Category[];
  locale: string;
}

export async function AppListPageServer({ apps, categories, locale }: AppListPageServerProps) {
  const t = await getTranslations({ locale, namespace: 'AppListPage' });
  return (
    <AppListPageClient apps={apps} categories={categories} t={t} />
  );
}
