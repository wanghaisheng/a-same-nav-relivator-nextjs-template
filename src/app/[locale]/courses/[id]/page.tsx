import { CourseDetailPageServer } from "~/ui/business/course-detail-page/CourseDetailPageServer";

export default async function Page({ params }: { params: Promise<{ id: string, locale: string }> }) {
  const { id,locale } = await params

  console.log('course detail page locale',locale)

  return <CourseDetailPageServer id={id} />;
}