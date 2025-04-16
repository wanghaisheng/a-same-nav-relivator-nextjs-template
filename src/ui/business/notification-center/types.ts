// NotificationCenter 组件类型定义
export type Notification = {
  id: string;
  title?: string;
  content?: string;
  // 其他业务字段可扩展
};

export type NotificationCenterServerProps = {
  notifications?: Notification[];
};

export type NotificationCenterClientProps = {
  notifications?: Notification[];
  error?: string | null;
};
