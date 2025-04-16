import Image from "next/image";

export function InstructorInfo({ instructor }: { instructor: any }) {
  if (!instructor) return null;
  return (
    <div className="flex items-center gap-4">
      <Image src={instructor.avatar || "/placeholder-avatar.jpg"} alt={instructor.name} width={48} height={48} className="rounded-full" />
      <div>
        <div className="font-bold">{instructor.name}</div>
        <div className="text-sm text-muted-foreground">{instructor.bio}</div>
      </div>
    </div>
  );
}
