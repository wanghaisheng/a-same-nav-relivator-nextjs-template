import { ArrowRight, Clock, Truck } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

import { Button } from '~/ui/primitives/button';

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-muted/50 via-muted/25 to-background py-24 md:py-32">
      <div className="absolute inset-0 bg-grid-black/[0.02] bg-[length:20px_20px]" />
      <div className="container relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-12">
          <div className="flex flex-col justify-center space-y-6">
            <div className="space-y-4">
              <div className="inline-flex items-center rounded-lg bg-primary/10 px-3 py-1 text-sm font-semibold text-primary">
                新品上市
              </div>
              <h1 className="text-4xl font-bold tracking-tighter text-foreground sm:text-5xl md:text-6xl lg:leading-[1.1]">
                您的科技产品
                <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                  一站式购物平台
                </span>
              </h1>
              <p className="max-w-[700px] text-lg text-muted-foreground md:text-xl">
                发现优质产品，享受优惠价格，快速配送和卓越的客户服务。
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link href="/items">
                <Button size="lg" className="h-12 gap-1.5 px-8">
                  立即购物 <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/showcase">
                <Button variant="outline" size="lg" className="h-12 px-8">
                  查看展示
                </Button>
              </Link>
            </div>
            <div className="flex flex-wrap gap-5 text-sm text-muted-foreground">
              <div className="flex items-center gap-1.5">
                <Truck className="h-5 w-5 text-primary/70" />
                <span>满50元包邮</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="h-5 w-5 text-primary/70" />
                <span>7x24小时客服支持</span>
              </div>
            </div>
          </div>
          <div className="relative mx-auto hidden aspect-square w-full max-w-md overflow-hidden rounded-xl border lg:block">
            <div className="absolute inset-0 z-10 bg-gradient-to-tr from-primary/20 via-transparent to-transparent" />
            <Image
              src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
              alt="购物体验"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      </div>
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
    </section>
  );
} 