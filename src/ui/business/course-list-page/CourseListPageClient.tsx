'use client';
import React, { useMemo, useState } from "react";
import type { CourseItem } from '@/db/sqlite/schema/course_items';
import type { Category } from '@/db/sqlite/schema/categories';

export interface CourseListPageClientProps {
  courses: CourseItem[];
  categories: Category[];
  t: any; // next-intl translations instance
}

export function CourseListPageClient({ courses, categories, t }: CourseListPageClientProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('');

  const categoryOptions = useMemo(() =>
    categories?.filter(Boolean).map(cat => ({
      label: cat.name || t('category.unknown'),
      value: cat.id,
    })) ?? [],
    [categories, t]
  );

  const filteredCourses = useMemo(() => {
    if (!selectedCategory) return courses;
    return courses.filter(course => course.category === selectedCategory);
  }, [courses, selectedCategory]);

  if (!courses || courses.length === 0) {
    return <div>{t('empty')}</div>;
  }

  return (
    <div>
      <h2>{t('title')}</h2>
      <p>{t('description')}</p>
      {/* 分类筛选器 */}
      {categoryOptions.length > 0 && (
        <select
          value={selectedCategory}
          onChange={e => setSelectedCategory(e.target.value)}
        >
          <option value="">{t('category.filterPlaceholder')}</option>
          {categoryOptions.map(opt => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      )}
      <ul>
        {filteredCourses.map(course => (
          <li key={course.id}>{course.name + (course.category ? `（${course.category}）` : '')}</li>
        ))}
      </ul>
    </div>
  );
}
