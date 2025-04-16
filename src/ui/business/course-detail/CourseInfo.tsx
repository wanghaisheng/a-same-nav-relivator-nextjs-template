import { Badge } from "@/ui/components/core/badge";
import { Star, Clock, FileText } from "lucide-react";

export function CourseInfo({ course }: { course: any }) {
  if (!course) return null;
  const discountPercentage = course.originalPrice
    ? Math.round(((course.originalPrice - course.price) / course.originalPrice) * 100)
    : 0;
  return (
    <div className="flex flex-col">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">{course.name}</h1>
        <div className="mt-2 flex items-center gap-2">
          <div className="flex items-center">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={`star-${course.id}-position-${i + 1}`}
                className={`h-5 w-5 ${
                  i < Math.floor(course.rating || 0)
                    ? "fill-primary text-primary"
                    : i < (course.rating || 0)
                      ? "fill-primary/50 text-primary"
                      : "text-muted-foreground"
                }`}
              />
            ))}
          </div>
          <span className="text-sm text-muted-foreground">({course.rating})</span>
          <span className="text-sm text-muted-foreground">· {course.students} 名学生</span>
        </div>
      </div>
      <div className="mb-6">
        <div className="flex flex-wrap gap-2 mb-2">
          <Badge variant="outline" className="text-sm">{course.category || "未分类"}</Badge>
          <Badge variant="secondary" className="text-sm">{course.level || "初级"}</Badge>
          {course.certification && (
            <Badge variant="secondary" className="text-sm">提供证书</Badge>
          )}
        </div>
        <div className="mt-2 flex items-center gap-2">
          <span className="text-3xl font-bold">￥{course.price?.toFixed(2)}</span>
          {course.originalPrice ? (
            <span className="text-xl text-muted-foreground line-through">￥{course.originalPrice?.toFixed(2)}</span>
          ) : null}
          {discountPercentage > 0 && (
            <span className="ml-2 rounded-full bg-red-500 px-2 py-1 text-xs font-bold text-white">
              -{discountPercentage}%
            </span>
          )}
        </div>
      </div>
      <p className="mb-6 text-muted-foreground">{course.description || "暂无课程简介"}</p>
      <div className="mb-6 flex flex-wrap gap-4">
        <div className="flex items-center gap-2">
          <Clock className="h-5 w-5 text-muted-foreground" />
          <span>{course.duration || 0} 分钟</span>
        </div>
        <div className="flex items-center gap-2">
          <FileText className="h-5 w-5 text-muted-foreground" />
          <span>{course.curriculum?.length || 0} 个章节</span>
        </div>
      </div>
    </div>
  );
}
