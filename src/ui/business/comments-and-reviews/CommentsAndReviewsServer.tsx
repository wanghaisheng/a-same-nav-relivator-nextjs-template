import React from "react";
import { CommentsAndReviewsClient } from "./CommentsAndReviewsClient";
import type { CommentsAndReviewsServerProps } from "./types";

// 服务端组件，负责数据获取和异常处理
export default async function CommentsAndReviewsServer(props: CommentsAndReviewsServerProps) {
  // TODO: 实现服务端数据获取逻辑
  let comments = props.comments ?? [];
  let error: string | null = null;
  try {
    // comments = await fetchComments();
  } catch (e: any) {
    error = e.message || "未知错误";
  }
  return <CommentsAndReviewsClient comments={comments} error={error} />;
}
