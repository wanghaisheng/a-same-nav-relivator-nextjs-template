import { CourseDetailPageServer } from "@/ui/business/course-detail/CourseDetailPageServer";

export default function Page({ params }: { params: { id: string } }) {
  return <CourseDetailPageServer id={params.id} />;
}