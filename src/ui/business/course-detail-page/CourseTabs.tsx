import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/ui/components/core/tabs";
import { InstructorInfo } from "./InstructorInfo";
import { CurriculumList } from "./CurriculumList";

export function CourseTabs({ course }: { course: any }) {
  if (!course) return null;
  return (
    <Tabs defaultValue="intro" className="mt-10">
      <TabsList>
        <TabsTrigger value="intro">课程介绍</TabsTrigger>
        <TabsTrigger value="curriculum">课程大纲</TabsTrigger>
        <TabsTrigger value="instructor">讲师信息</TabsTrigger>
      </TabsList>
      <TabsContent value="intro">
        <div>{course.description || "暂无课程简介"}</div>
      </TabsContent>
      <TabsContent value="curriculum">
        <CurriculumList curriculum={course.curriculum || []} />
      </TabsContent>
      <TabsContent value="instructor">
        <InstructorInfo instructor={course.instructor} />
      </TabsContent>
    </Tabs>
  );
}
