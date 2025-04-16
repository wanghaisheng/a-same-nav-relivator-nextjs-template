import React from "react";
import { AppListPageClient } from "./AppListPageClient";
import type { AppItem } from "@/db/sqlite/schema/app_items";
import type { Category } from "@/db/sqlite/schema/categories";

export interface AppListPageServerProps {
  apps: AppItem[];
  categories: Category[];
  locale: string;
}

export async function AppListPageServer({ apps, categories, locale }: AppListPageServerProps) {
  return (
    <AppListPageClient apps={apps} categories={categories} />
  );
}
