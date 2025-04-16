// AuthLayout 组件类型定义
export type AuthInfo = {
  title?: string;
  // 其他业务字段可扩展
};

export type AuthLayoutServerProps = {
  authInfo?: AuthInfo | null;
  children?: React.ReactNode;
};

export type AuthLayoutClientProps = {
  authInfo?: AuthInfo | null;
  error?: string | null;
  children?: React.ReactNode;
};
