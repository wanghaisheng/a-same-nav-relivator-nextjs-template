'use client';

import React from "react";
import type { AppItem } from '@/db/types/app';

export interface AppDetailSectionsClientProps {
  detailData: AppItem | null;
  error?: string | null;
}

export function AppDetailSectionsClient({ detailData, error }: AppDetailSectionsClientProps) {
  if (error) {
    return <div style={{ color: 'red' }}>加载失败：{error}</div>;
  }
  if (!detailData) {
    return <div>暂无应用详情</div>;
  }
  // 可根据 detailData 渲染多个业务区块
  return (
    <div className="app-detail-sections">
      <h2>{detailData?.name ?? '未命名应用'}</h2>
      <div>平台：{detailData.platform ?? '未知'}</div>
      <div>版本：{detailData.version ?? '未知'}</div>
      <div>最低系统要求：{detailData.minSystemRequirements ?? '未知'}</div>
      {/* 其他区块可继续扩展 */}
      {/* ... */}
    </div>
  );
}
