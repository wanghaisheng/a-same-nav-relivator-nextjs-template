import React from "react";
import type { DashboardLayoutClientProps } from "./types";

export function DashboardLayoutClient({ user, error, children }: DashboardLayoutClientProps) {
  if (error) {
    return <div style={{ color: 'red' }}>仪表盘加载失败：{error}</div>;
  }
  return (
    <div className="dashboard-layout">
      <header>欢迎，{user?.name ?? '用户'}</header>
      <main>{children}</main>
    </div>
  );
}
