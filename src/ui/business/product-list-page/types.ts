// ProductListPage 组件类型定义
export type Product = {
  id: string;
  name?: string;
  category?: string;
  // 其他业务字段可扩展
};

export type ProductListPageProps = {
  products?: Product[];
};

export type ProductListPageClientProps = {
  products?: Product[];
  error?: string | null;
};
