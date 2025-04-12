"use client";

import { LucideIcon } from "lucide-react";
import { Feature } from "~/db/schema/types";
import { cn } from "~/lib/utils";

interface FeaturesProps {
  features: Feature[];
  className?: string;
}

export function Features({ features, className }: FeaturesProps) {
  return (
    <div className={cn("grid gap-6 sm:grid-cols-2 lg:grid-cols-3", className)}>
      {features.map((feature) => {
        const Icon = feature.icon as LucideIcon;
        return (
          <div
            key={feature.id}
            className="rounded-lg border bg-card p-6 text-card-foreground shadow-sm"
          >
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
              <Icon className="h-6 w-6 text-primary" />
            </div>
            <h3 className="mb-2 text-lg font-medium">{feature.title}</h3>
            <p className="text-muted-foreground">{feature.description}</p>
          </div>
        );
      })}
    </div>
  );
} 