"use client";

import { Item } from "~/db/schema/types";
import { cn } from "~/lib/utils";
import Link from "next/link";

interface FeaturedItemsProps {
  items: Item[];
  className?: string;
}

export function FeaturedItems({ items, className }: FeaturedItemsProps) {
  return (
    <section className={cn("py-12", className)}>
      <div className="container mx-auto px-4">
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold tracking-tight">特色商品</h2>
          <p className="mt-2 text-muted-foreground">
            探索我们最受欢迎的商品
          </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <Link
              key={item.id}
              href={`/items/${item.id}`}
              className="group rounded-lg border bg-card p-4 text-card-foreground shadow-sm transition-all hover:shadow-md"
            >
              <div className="mb-4 aspect-square overflow-hidden rounded-lg">
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-full w-full object-cover transition-transform group-hover:scale-105"
                />
              </div>
              <h3 className="mb-2 font-medium">{item.name}</h3>
              <p className="mb-2 text-sm text-muted-foreground">
                {item.description}
              </p>
              <p className="font-medium text-primary">¥{item.price}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
} 