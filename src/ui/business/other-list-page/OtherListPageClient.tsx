import React from "react";
import type { OtherCardProps } from "../other-card/types";

export type OtherListPageClientProps = {
  items: any[];
  error?: string | null;
  CardComponent?: React.FC<OtherCardProps>;
};

export function OtherListPageClient({ items, error, CardComponent }: OtherListPageClientProps) {
  if (error) {
    return <div style={{ color: 'red' }}>加载失败：{error}</div>;
  }
  if (!items || items.length === 0) {
    return <div>暂无其他类型数据</div>;
  }
  return (
    <div className="other-list-page">
      <h2>其他类型列表</h2>
      <ul>
        {items.map(item => (
          <li key={item.id}>
            {CardComponent ? <CardComponent item={item} /> : (item.name ?? '未命名项目') + (item.category ? `（${item.category}）` : '')}
          </li>
        ))}
      </ul>
    </div>
  );
}
