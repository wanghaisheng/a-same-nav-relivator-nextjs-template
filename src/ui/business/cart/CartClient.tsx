import React from "react";
import type { CartClientProps } from "./types";

export function CartClient({ cartItems, error }: CartClientProps) {
  if (error) {
    return <div style={{ color: 'red' }}>购物车加载失败：{error}</div>;
  }
  if (!cartItems || cartItems.length === 0) {
    return <div>购物车为空</div>;
  }
  return (
    <div className="cart-list">
      <h2>购物车</h2>
      <ul>
        {cartItems.map(item => (
          <li key={item.id}>{item.name ?? '未命名商品'} × {item.quantity ?? 1}</li>
        ))}
      </ul>
    </div>
  );
}
