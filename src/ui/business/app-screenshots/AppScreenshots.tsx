import React from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, Play, Maximize2 } from 'lucide-react';
import { Button } from '../../primitives/button';
import { Dialog, DialogContent, DialogTrigger } from '../../primitives/dialog';
import { cn } from '../../utils';

export interface AppScreenshotsProps {
  screenshots: string[];
  title?: string;
  videoPreview?: string;
  aspectRatio?: string;
}

/**
 * 应用截图轮播组件（重构版）
 * 用于在应用详情页展示应用的截图
 */
export const AppScreenshots: React.FC<AppScreenshotsProps> = ({ 
  screenshots, 
  title = '应用截图',
  videoPreview,
  aspectRatio = 'aspect-[9/16] md:aspect-[16/9]'
}) => {
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [isFullscreen, setIsFullscreen] = React.useState(false);
  
  if (!screenshots || screenshots.length === 0) return null;

  const prevSlide = () => {
    setCurrentIndex((prev) => 
      prev === 0 ? screenshots.length - 1 : prev - 1
    );
  };
  const nextSlide = () => {
    setCurrentIndex((prev) => 
      prev === screenshots.length - 1 ? 0 : prev + 1
    );
  };
  const isVideoPreview = videoPreview && currentIndex === 0;

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
      <Dialog open={isFullscreen} onOpenChange={setIsFullscreen}>
        <div className="relative overflow-hidden rounded-lg bg-muted">
          <div className={cn("relative w-full overflow-hidden", aspectRatio)}>
            {isVideoPreview ? (
              <div className="w-full h-full flex items-center justify-center bg-black">
                <video 
                  src={videoPreview} 
                  controls 
                  className="max-h-full max-w-full" 
                />
              </div>
            ) : (
              <Image 
                src={screenshots[currentIndex]} 
                alt={`screenshot-${currentIndex}`} 
                fill 
                className="object-contain select-none" 
                sizes="(max-width: 768px) 100vw, 50vw"
                priority={currentIndex === 0}
              />
            )}
            {/* 全屏按钮 */}
            <DialogTrigger asChild>
              <Button size="icon" variant="ghost" className="absolute top-2 right-2" aria-label="全屏">
                <Maximize2 />
              </Button>
            </DialogTrigger>
            {/* 左右切换按钮 */}
            <Button size="icon" variant="ghost" className="absolute left-2 top-1/2 -translate-y-1/2" onClick={prevSlide} aria-label="上一张">
              <ChevronLeft />
            </Button>
            <Button size="icon" variant="ghost" className="absolute right-2 top-1/2 -translate-y-1/2" onClick={nextSlide} aria-label="下一张">
              <ChevronRight />
            </Button>
            {/* 视频预览入口 */}
            {videoPreview && currentIndex !== 0 && (
              <Button size="icon" variant="ghost" className="absolute left-2 bottom-2" onClick={() => setCurrentIndex(0)} aria-label="视频预览">
                <Play />
              </Button>
            )}
          </div>
        </div>
        {/* 全屏弹窗内容 */}
        <DialogContent className="w-full max-w-5xl p-2">
          <div className={cn("relative w-full h-[60vh] md:h-[70vh]", aspectRatio)}>
            {isVideoPreview ? (
              <video src={videoPreview} controls className="w-full h-full object-contain bg-black" />
            ) : (
              <Image 
                src={screenshots[currentIndex]} 
                alt={`fullscreen-screenshot-${currentIndex}`} 
                fill 
                className="object-contain select-none" 
                sizes="100vw"
                priority
              />
            )}
          </div>
        </DialogContent>
      </Dialog>
      {/* 缩略图导航 */}
      <div className="flex gap-2 mt-4 overflow-x-auto pb-2">
        {videoPreview && (
          <button
            className={cn(
              "w-16 h-16 flex items-center justify-center border rounded-md bg-black/80",
              currentIndex === 0 && 'ring-2 ring-primary'
            )}
            onClick={() => setCurrentIndex(0)}
          >
            <Play className="w-8 h-8 text-white" />
          </button>
        )}
        {screenshots.map((s, idx) => (
          <button
            key={s}
            className={cn(
              "w-16 h-16 relative border rounded-md overflow-hidden",
              currentIndex === idx + (videoPreview ? 1 : 0) && 'ring-2 ring-primary'
            )}
            onClick={() => setCurrentIndex(videoPreview ? idx + 1 : idx)}
          >
            <Image src={s} alt={`thumb-${idx}`} fill className="object-cover" />
          </button>
        ))}
      </div>
    </div>
  );
};
