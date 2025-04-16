import React from "react";
import type { CommentsAndReviewsClientProps } from "./types";
import { useTranslations } from 'next-intl';

export function CommentsAndReviewsClient({ comments, error }: CommentsAndReviewsClientProps) {
  const t = useTranslations('CommentsAndReviews');
  if (error) {
    return <div style={{ color: 'red' }}>{t('loadFailed')}: {error}</div>;
  }
  if (!comments || comments.length === 0) {
    return <div>{t('noComments')}</div>;
  }
  return (
    <div className="comments-and-reviews">
      <h2>{t('commentsAndReviews')}</h2>
      <ul>
        {comments.map(comment => (
          <li key={comment.id}>
            <strong>{comment.author ?? t('anonymousUser')}：</strong>
            {comment.content ?? t('noContent')}
          </li>
        ))}
      </ul>
    </div>
  );
}
