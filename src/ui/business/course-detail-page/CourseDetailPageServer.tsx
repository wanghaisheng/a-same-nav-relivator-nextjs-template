import { notFound } from "next/navigation";
import { coursesService } from "~/services";
import { CourseDetailPageClient } from "./CourseDetailPageClient";

// 服务端组件，负责数据获取和组合客户端组件
export async function CourseDetailPageServer({ id }: { id: string }) {
  try {
    // 调用 service 层的 getByIdWithDefaults 进行数据获取和预处理
    const course = await coursesService.getByIdWithDefaults(id);
    if (!course) notFound();
    return <CourseDetailPageClient course={course} />;
  } catch (error) {
    console.error("Error fetching course:", error);
    notFound();
  }
}
