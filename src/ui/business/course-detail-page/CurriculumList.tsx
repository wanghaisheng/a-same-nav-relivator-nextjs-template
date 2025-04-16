import { CheckCircle } from "lucide-react";

export function CurriculumList({ curriculum }: { curriculum: any[] }) {
  if (!curriculum || curriculum.length === 0) return <div>暂无课程大纲</div>;
  return (
    <ul className="space-y-2">
      {curriculum.map((item, idx) => (
        <li key={idx} className="flex items-center gap-2">
          <CheckCircle className="w-4 h-4 text-primary" />
          <span>{item.title}（{item.duration} 分钟）{item.preview && <span className="ml-2 text-xs text-muted-foreground">可预览</span>}</span>
        </li>
      ))}
    </ul>
  );
}
