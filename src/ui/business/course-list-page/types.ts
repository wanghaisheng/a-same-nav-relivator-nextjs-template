// CourseListPage 组件类型定义
export type Course = {
  id: string;
  name?: string;
  category?: string;
  // 其他业务字段可扩展
};

export type CourseListPageProps = {
  courses?: Course[];
};

export type CourseListPageClientProps = {
  courses?: Course[];
  error?: string | null;
};
