import React from "react";
import { AppDetailSectionsClient } from "./AppDetailSectionsClient";
import type { AppDetailSectionsProps } from "./types";

// 服务端组件，负责数据获取和异常处理
export default async function AppDetailSectionsServer(props: AppDetailSectionsProps) {
  // TODO: 实现服务端数据获取逻辑
  let detailData = props.detailData ?? null;
  let error: string | null = null;
  try {
    // detailData = await fetchAppDetail(props.appId);
  } catch (e: any) {
    error = e.message || "未知错误";
  }
  return <AppDetailSectionsClient detailData={detailData} error={error} />;
}
