"use client";

import { Testimonial } from "~/db/schema/types";
import { Star } from "lucide-react";

interface TestimonialsProps {
  testimonials: Testimonial[];
}

export function Testimonials({ testimonials }: TestimonialsProps) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {testimonials.map((testimonial) => (
        <div
          key={testimonial.id}
          className="rounded-lg border bg-card p-6 text-card-foreground shadow-sm"
        >
          <div className="mb-4 flex items-center">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={`star-${testimonial.id}-${i}`}
                className="h-4 w-4 fill-yellow-400 text-yellow-400"
              />
            ))}
          </div>
          <p className="mb-4 text-muted-foreground">{testimonial.content}</p>
          <div className="flex items-center">
            <div className="mr-4 h-10 w-10 overflow-hidden rounded-full">
              <img
                src={testimonial.authorAvatar}
                alt={testimonial.authorName}
                className="h-full w-full object-cover"
              />
            </div>
            <div>
              <h4 className="font-medium">{testimonial.authorName}</h4>
              <p className="text-sm text-muted-foreground">{testimonial.authorRole}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
} 