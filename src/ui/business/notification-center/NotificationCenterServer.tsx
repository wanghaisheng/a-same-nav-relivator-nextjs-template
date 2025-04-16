import React from "react";
import { NotificationCenterClient } from "./NotificationCenterClient";
import type { NotificationCenterServerProps } from "./types";

// 服务端组件，负责数据获取和异常处理
export default async function NotificationCenterServer(props: NotificationCenterServerProps) {
  // TODO: 实现服务端数据获取逻辑
  let notifications = props.notifications ?? [];
  let error: string | null = null;
  try {
    // notifications = await fetchNotifications();
  } catch (e: any) {
    error = e.message || "未知错误";
  }
  return <NotificationCenterClient notifications={notifications} error={error} />;
}
