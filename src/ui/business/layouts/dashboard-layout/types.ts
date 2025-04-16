// DashboardLayout 组件类型定义
export type User = {
  id: string;
  name?: string;
  // 其他业务字段可扩展
};

export type DashboardLayoutServerProps = {
  user?: User | null;
  children?: React.ReactNode;
};

export type DashboardLayoutClientProps = {
  user?: User | null;
  error?: string | null;
  children?: React.ReactNode;
};
