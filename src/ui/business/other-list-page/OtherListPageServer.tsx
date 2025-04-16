import React from "react";
import { itemsService } from "../../../services";
import { OtherCardClient } from "../other-card";
import type { ItemTypeValue } from "../../../db/sqlite/schema/items";
import { OtherListPageClient } from "./OtherListPageClient";

export default async function OtherListPageServer() {
  let items = [];
  let error: string | null = null;
  try {
    items = (await itemsService.getByType("OTHER" as ItemTypeValue));
  } catch (e: any) {
    error = e.message || "未知错误";
  }
  return <OtherListPageClient items={items} error={error} CardComponent={OtherCardClient} />;
}
