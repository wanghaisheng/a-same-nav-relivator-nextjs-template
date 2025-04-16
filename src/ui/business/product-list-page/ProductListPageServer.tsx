import React from "react";
import { ProductListPageClient } from "./ProductListPageClient";
import type { ProductListPageProps } from "./types";

// 服务端组件，负责数据获取和异常处理
export default async function ProductListPageServer(props: ProductListPageProps) {
  // TODO: 实现服务端数据获取逻辑
  let products = props.products ?? [];
  let error: string | null = null;
  try {
    // products = await fetchProducts();
  } catch (e: any) {
    error = e.message || "未知错误";
  }
  return <ProductListPageClient products={products} error={error} />;
}
