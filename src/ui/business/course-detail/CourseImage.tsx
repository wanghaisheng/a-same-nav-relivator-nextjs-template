import Image from "next/image";
import { Button } from "@/ui/components/core/button";
import { Play } from "lucide-react";

export function CourseImage({ course }: { course: any }) {
  if (!course) return null;
  return (
    <div className="relative aspect-video overflow-hidden rounded-lg bg-muted">
      <div className="absolute inset-0 flex items-center justify-center bg-black/50">
        <Button variant="outline" size="lg" className="rounded-full bg-white/20 backdrop-blur-sm">
          <Play className="h-6 w-6 fill-white text-white" />
          <span className="ml-2 text-white">观看预览</span>
        </Button>
      </div>
      <Image
        src={course.image || "/placeholder-course.jpg"}
        alt={course.name}
        fill
        className="object-cover"
        priority
      />
    </div>
  );
}
