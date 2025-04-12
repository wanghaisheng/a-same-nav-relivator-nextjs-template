"use client";

import { Button } from "~/ui/components/button";
import { cn } from "~/lib/utils";

interface HeroProps {
  className?: string;
}

export function Hero({ className }: HeroProps) {
  return (
    <section className={cn("relative overflow-hidden bg-background py-20", className)}>
      <div className="container relative z-10 mx-auto px-4">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            发现你的下一个最爱
          </h1>
          <p className="mb-8 text-lg text-muted-foreground sm:text-xl">
            探索我们精心挑选的商品，找到最适合你的选择
          </p>
          <div className="flex justify-center gap-4">
            <Button size="lg">开始购物</Button>
            <Button size="lg" variant="outline">
              了解更多
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
} 