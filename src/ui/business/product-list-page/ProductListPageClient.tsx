import React from "react";
import type { ProductListPageClientProps } from "./types";

export function ProductListPageClient({ products, error }: ProductListPageClientProps) {
  if (error) {
    return <div style={{ color: 'red' }}>加载失败：{error}</div>;
  }
  if (!products || products.length === 0) {
    return <div>暂无产品数据</div>;
  }
  return (
    <div className="product-list-page">
      <h2>产品列表</h2>
      <ul>
        {products.map(product => (
          <li key={product.id}>{product.name ?? '未命名产品'}（{product.category ?? '未知分类'}）</li>
        ))}
      </ul>
    </div>
  );
}
