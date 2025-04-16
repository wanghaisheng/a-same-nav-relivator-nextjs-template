import React from "react";
import { CartClient } from "./CartClient";
import type { CartServerProps } from "./types";

// 服务端组件，负责数据获取和异常处理
export default async function CartServer(props: CartServerProps) {
  // TODO: 实现服务端数据获取逻辑
  let cartItems = props.cartItems ?? [];
  let error: string | null = null;
  try {
    // cartItems = await fetchCartItems();
  } catch (e: any) {
    error = e.message || "未知错误";
  }
  return <CartClient cartItems={cartItems} error={error} />;
}
