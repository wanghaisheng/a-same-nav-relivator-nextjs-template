"use client";
import React from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "@/ui/components/core/dialog";

interface ProductGalleryProps {
  images: string[];
  productName: string;
  t: (key: string, params?: Record<string, any>) => string;
}

export function ProductGallery({ images = [], productName = '', t }: ProductGalleryProps) {
  const [currentIndex, setCurrentIndex] = React.useState(0);
  if (!images.length) return null;
  if (images.length === 1) {
    return (
      <div className="relative aspect-square overflow-hidden rounded-lg bg-muted">
        <Image src={images[0]} alt={productName} fill className="object-cover" priority />
      </div>
    );
  }
  const prevSlide = () => setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  const nextSlide = () => setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  return (
    <div className="relative aspect-square overflow-hidden rounded-lg bg-muted">
      <Image
        src={images[currentIndex]}
        alt={`${productName} - ${t('gallery.imageAlt', { index: currentIndex + 1 })}`}
        fill
        className="object-cover transition-opacity duration-500"
        priority
      />
      {/* 缩略图预览 */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
        {images.map((_, index) => (
          <button
            key={`thumb-${index}`}
            className={`h-2 w-2 rounded-full ${index === currentIndex ? 'bg-primary' : 'bg-muted-foreground/50'}`}
            onClick={() => setCurrentIndex(index)}
            aria-label={t('gallery.thumbnail', { index: index + 1 })}
          />
        ))}
      </div>
      {/* 导航按钮 */}
      <button
        className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-background/80 p-2 text-foreground shadow-sm hover:bg-background"
        onClick={prevSlide}
        aria-label={t('gallery.prev')}
      >
        <ChevronLeft className="h-5 w-5" />
      </button>
      <button
        className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-background/80 p-2 text-foreground shadow-sm hover:bg-background"
        onClick={nextSlide}
        aria-label={t('gallery.next')}
      >
        <ChevronRight className="h-5 w-5" />
      </button>
      {/* 全屏查看按钮 */}
      <Dialog>
        <DialogTrigger asChild>
          <button
            className="absolute right-2 top-2 rounded-full bg-background/80 p-2 text-foreground shadow-sm hover:bg-background"
            aria-label={t('gallery.fullscreen')}
          >
            <span className="sr-only">{t('gallery.fullscreen')}</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
              <polyline points="15 3 21 3 21 9"></polyline>
              <polyline points="9 21 3 21 3 15"></polyline>
              <line x1="21" y1="3" x2="14" y2="10"></line>
              <line x1="3" y1="21" x2="10" y2="14"></line>
            </svg>
          </button>
        </DialogTrigger>
        <DialogContent className="max-w-4xl">
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg">
            <Image
              src={images[currentIndex]}
              alt={`${productName} - ${t('gallery.imageAlt', { index: currentIndex + 1 })}`}
              fill
              className="object-contain"
              priority
            />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
