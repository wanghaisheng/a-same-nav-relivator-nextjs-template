import React from "react";
import type { AuthLayoutClientProps } from "./types";

export function AuthLayoutClient({ authInfo, error, children }: AuthLayoutClientProps) {
  if (error) {
    return <div style={{ color: 'red' }}>认证区加载失败：{error}</div>;
  }
  return (
    <div className="auth-layout">
      <header>{authInfo?.title ?? '认证区'}</header>
      <main>{children}</main>
    </div>
  );
}
