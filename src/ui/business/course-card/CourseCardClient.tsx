import React from "react";
import type { CourseItem } from '@/db/types';
import { useTranslations } from 'next-intl';

export type CourseCardProps = {
  course?: CourseItem;
  onFavorite?: () => void;
  onDownload?: () => void;
};

export const CourseCardClient: React.FC<CourseCardProps> = ({ course, onFavorite, onDownload }) => {
  const t = useTranslations('CourseCard');
  if (!course) return <div className="course-card empty">{t('noCourseInfo')}</div>;
  return (
    <div className="course-card">
      <img src={course.image ?? ''} alt={course.name ?? t('course')} className="course-card-img" />
      <h3>{course.name ?? t('unnamedCourse')}</h3>
      <div>{course.description ?? t('noDescription')}</div>
      <div>{t('category')}: {course.category ?? t('unknown')}</div>
      <div className="course-card-actions">
        <button onClick={onFavorite}>{t('favorite')}</button>
        <button onClick={onDownload}>{t('download')}</button>
      </div>
    </div>
  );
};
