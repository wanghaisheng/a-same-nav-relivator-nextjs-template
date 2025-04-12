"use client";

import { Category } from "~/db/schema/types";
import { cn } from "~/lib/utils";
import Link from "next/link";
import Image from "next/image";

interface CategoriesProps {
  categories: Category[];
  className?: string;
}

export function Categories({ categories, className }: CategoriesProps) {
  return (
    <section className={cn("py-12 bg-muted/50", className)}>
      <div className="container mx-auto px-4">
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold tracking-tight">商品分类</h2>
          <p className="mt-2 text-muted-foreground">
            浏览我们的商品分类
          </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/categories/${category.id}`}
              className="group rounded-lg border bg-card p-6 text-card-foreground shadow-sm transition-all hover:shadow-md"
            >
              <div className="mb-4 aspect-square overflow-hidden rounded-lg">
                <Image
                  src={category.image}
                  alt={category.name}
                  width={400}
                  height={400}
                  className="h-full w-full object-cover transition-transform group-hover:scale-105"
                />
              </div>
              <h3 className="mb-2 font-medium">{category.name}</h3>
              <p className="text-sm text-muted-foreground">
                {category.productCount} 个商品
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
} 