import React from "react";
import { AuthLayoutClient } from "./AuthLayoutClient";
import type { AuthLayoutServerProps } from "./types";

// 服务端组件，负责数据获取和异常处理
export default async function AuthLayoutServer(props: AuthLayoutServerProps) {
  // TODO: 实现服务端数据获取逻辑
  let authInfo = props.authInfo ?? null;
  let error: string | null = null;
  try {
    // authInfo = await fetchAuthInfo();
  } catch (e: any) {
    error = e.message || "未知错误";
  }
  return <AuthLayoutClient authInfo={authInfo} error={error}>{props.children}</AuthLayoutClient>;
}
