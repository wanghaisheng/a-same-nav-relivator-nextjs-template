import { coursesService, categoriesService } from "~/services/";
import { CourseListPageServer } from "~/ui/business/course-list-page/CourseListPageServer";
import { FooterClient } from "~/ui/business/footer/FooterClient";
import { HeaderClient } from "~/ui/business/header/HeaderClient";
import { CourseItem } from "~/db/sqlite/schema/course_items";
import { Category } from "~/db/sqlite/schema/categories";

export default async function CoursesPage({ params: { locale } }: { params: { locale: string } }) {
  let courses: CourseItem[] = [];
  let categories: Category[] = [];
  try {
    const coursesData = await coursesService.getAll();
    courses = coursesData.map(course => ({
      ...course,
      features: course.features ? JSON.parse(course.features as string) : [],
      specs: course.specs ? JSON.parse(course.specs as string) : {},
      originalPrice: course.originalPrice || null
    }));
  } catch (error) {
    console.error("Error fetching courses:", error);
  }
  try {
    const categoriesData = await categoriesService.getAll();
    categories = [
      {
        id: "all",
        name: "All",
        description: null,
        image: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      ...categoriesData
    ];
  } catch (error) {
    console.error("Error fetching course categories:", error);
    categories = [
      {
        id: "all",
        name: "All",
        description: null,
        image: null,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];
  }
  return (
    <div className="flex min-h-screen flex-col">
      <HeaderClient />
      <main className="flex-1 py-10">
        <CourseListPageServer courses={courses} categories={categories} locale={locale} />
      </main>
      <FooterClient />
    </div>
  );
}