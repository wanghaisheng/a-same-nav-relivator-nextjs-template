// CommentsAndReviews 组件类型定义
export type Comment = {
  id: string;
  author?: string;
  content?: string;
  // 其他业务字段可扩展
};

export type CommentsAndReviewsServerProps = {
  comments?: Comment[];
};

export type CommentsAndReviewsClientProps = {
  comments?: Comment[];
  error?: string | null;
};
