import React from "react";
import { DashboardLayoutClient } from "./DashboardLayoutClient";
import type { DashboardLayoutServerProps } from "./types";

// 服务端组件，负责数据获取和异常处理
export default async function DashboardLayoutServer(props: DashboardLayoutServerProps) {
  // TODO: 实现服务端数据获取逻辑
  let user = props.user ?? null;
  let error: string | null = null;
  try {
    // user = await fetchUser();
  } catch (e: any) {
    error = e.message || "未知错误";
  }
  return <DashboardLayoutClient user={user} error={error}>{props.children}</DashboardLayoutClient>;
}
