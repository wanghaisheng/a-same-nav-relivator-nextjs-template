import React from "react";
import type { Testimonial } from "@/db/sqlite/schema/testimonials";
import { Avatar } from "@/ui/components/core/avatar";
import { Badge } from "@/ui/components/core/badge";

interface TestimonialsProps {
  testimonials: Testimonial[];
  title?: string;
}

export const Testimonials: React.FC<TestimonialsProps> = ({ testimonials, title }) => {
  if (!testimonials || testimonials.length === 0) {
    return null;
  }

  return (
    <section className="py-8">
      {title && <h2 className="text-2xl font-bold mb-6">{title}</h2>}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {testimonials.map((t) => (
          <div
            key={t.id}
            className="bg-white rounded-lg shadow p-6 flex flex-col items-center text-center dark:bg-neutral-900"
          >
            <Avatar src={t.authorAvatar || undefined} alt={t.authorName} size="lg" className="mb-4" />
            <p className="text-gray-700 dark:text-gray-200 mb-3">{t.content}</p>
            <div className="font-semibold mb-1">{t.authorName}</div>
            <div className="text-sm text-gray-500 mb-2">{t.authorRole}</div>
            <Badge>{t.rating} ★</Badge>
          </div>
        ))}
      </div>
    </section>
  );
};
