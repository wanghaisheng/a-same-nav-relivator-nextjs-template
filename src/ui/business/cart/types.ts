// Cart 组件类型定义
export type CartItem = {
  id: string;
  name?: string;
  quantity?: number;
  // 其他业务字段可扩展
};

export type CartServerProps = {
  cartItems?: CartItem[];
};

export type CartClientProps = {
  cartItems?: CartItem[];
  error?: string | null;
};
