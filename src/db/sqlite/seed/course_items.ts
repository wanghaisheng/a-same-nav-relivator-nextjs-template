import { courseItems } from '../schema/course_items';
import { sqliteDb as db } from '../index';
import { nanoid } from 'nanoid';

export async function seedCourseItems() {
  await db.delete(courseItems);
  const data = [
    {
      id: nanoid(),
      name: 'React 入门课程',
      description: '零基础掌握 React 开发。',
      price: 199,
      quantity: 500,
      image: '/images/courses/react-course.png',
      category: '前端开发',
      slug: 'react-course-zh',
      locale: 'zh',
      duration: 600,
      level: '初级',
      instructor: '王老师',
      syllabus: 'JSX,组件,状态管理',
    },
    {
      id: nanoid(),
      name: 'React Fundamentals',
      description: 'Master React development from scratch.',
      price: 29,
      quantity: 500,
      image: '/images/courses/react-course.png',
      category: 'Frontend',
      slug: 'react-course',
      locale: 'en',
      duration: 600,
      level: 'Beginner',
      instructor: 'Mr. Wang',
      syllabus: 'JSX,Components,State Management',
    }
  ];
  for (const item of data) {
    await db.insert(courseItems).values(item).run();
  }
}
