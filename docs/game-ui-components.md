# 游戏详情页面UI组件设计

基于对现有代码的分析和游戏详情页面的需求，以下是游戏详情页面所需的UI组件设计方案。

## 1. 游戏预览视频/截图轮播组件

### GameMediaCarousel

这个组件将整合视频和图片展示，提供一个统一的媒体浏览体验：

```tsx
import React, { useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, Play } from 'lucide-react';
import { Button } from '~/ui/primitives/button';

interface GameMediaItem {
  type: 'image' | 'video';
  url: string;
  thumbnail?: string; // 视频缩略图
}

interface GameMediaCarouselProps {
  mediaItems: GameMediaItem[];
  title?: string;
}

export const GameMediaCarousel: React.FC<GameMediaCarouselProps> = ({ 
  mediaItems, 
  title = '游戏媒体' 
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  
  if (!mediaItems || mediaItems.length === 0) return null;
  
  const currentItem = mediaItems[currentIndex];
  
  const prevSlide = () => {
    setCurrentIndex((prev) => 
      prev === 0 ? mediaItems.length - 1 : prev - 1
    );
    setIsPlaying(false);
  };
  
  const nextSlide = () => {
    setCurrentIndex((prev) => 
      prev === mediaItems.length - 1 ? 0 : prev + 1
    );
    setIsPlaying(false);
  };
  
  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
      
      <div className="relative overflow-hidden rounded-lg bg-muted">
        {/* 主媒体展示 */}
        <div className="relative aspect-video w-full overflow-hidden">
          {currentItem.type === 'image' ? (
            <Image
              src={currentItem.url}
              alt={`游戏截图 ${currentIndex + 1}`}
              fill
              className="object-contain"
              priority
            />
          ) : (
            <>
              {!isPlaying ? (
                <>
                  <Image
                    src={currentItem.thumbnail || currentItem.url}
                    alt={`游戏视频预览 ${currentIndex + 1}`}
                    fill
                    className="object-cover"
                    priority
                  />
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="absolute inset-0 m-auto h-16 w-16 rounded-full bg-background/80 hover:bg-background/90"
                    onClick={() => setIsPlaying(true)}
                  >
                    <Play className="h-8 w-8" />
                  </Button>
                </>
              ) : (
                <video 
                  src={currentItem.url} 
                  autoPlay 
                  controls 
                  className="w-full h-full object-contain"
                  onEnded={() => setIsPlaying(false)}
                />
              )}
            </>
          )}
        </div>
        
        {/* 导航按钮 */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute left-2 top-1/2 -translate-y-1/2 bg-background/80 hover:bg-background/90 rounded-full"
          onClick={prevSlide}
        >
          <ChevronLeft className="h-6 w-6" />
        </Button>
        
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-background/80 hover:bg-background/90 rounded-full"
          onClick={nextSlide}
        >
          <ChevronRight className="h-6 w-6" />
        </Button>
      </div>
      
      {/* 缩略图预览 */}
      <div className="mt-4 grid grid-cols-6 gap-2 overflow-x-auto pb-2">
        {mediaItems.map((item, index) => (
          <button
            key={index}
            onClick={() => {
              setCurrentIndex(index);
              setIsPlaying(false);
            }}
            className={`relative aspect-video overflow-hidden rounded-md ${index === currentIndex ? 'ring-2 ring-primary' : 'opacity-70'}`}
          >
            <Image
              src={item.type === 'video' ? (item.thumbnail || item.url) : item.url}
              alt={`缩略图 ${index + 1}`}
              fill
              className="object-cover"
            />
            {item.type === 'video' && (
              <div className="absolute inset-0 flex items-center justify-center">
                <Play className="h-4 w-4 text-white" />
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};
```

## 2. 游戏模式选择器组件

### GameModeSelector

这个组件用于展示和选择不同的游戏模式（单人、多人、合作等）：

```tsx
import React from 'react';
import { Users, User, UsersRound, Trophy } from 'lucide-react';
import { Badge } from '~/ui/primitives/badge';

interface GameMode {
  id: string;
  name: string;
  type: 'singleplayer' | 'multiplayer' | 'cooperative' | 'competitive';
  playerCount?: string; // 例如: "1-4", "2-8"
  description?: string;
}

interface GameModeSelectorProps {
  modes: GameMode[];
  selectedMode?: string;
  onSelectMode?: (modeId: string) => void;
}

export const GameModeSelector: React.FC<GameModeSelectorProps> = ({ 
  modes, 
  selectedMode,
  onSelectMode 
}) => {
  if (!modes || modes.length === 0) return null;
  
  const getModeIcon = (type: string) => {
    switch (type) {
      case 'singleplayer': return <User className="h-5 w-5" />;
      case 'multiplayer': return <Users className="h-5 w-5" />;
      case 'cooperative': return <UsersRound className="h-5 w-5" />;
      case 'competitive': return <Trophy className="h-5 w-5" />;
      default: return <Users className="h-5 w-5" />;
    }
  };
  
  return (
    <div className="mt-6">
      <h3 className="text-lg font-semibold mb-3">游戏模式</h3>
      <div className="flex flex-wrap gap-3">
        {modes.map((mode) => (
          <div 
            key={mode.id}
            onClick={() => onSelectMode && onSelectMode(mode.id)}
            className={`
              flex items-center gap-2 p-3 rounded-lg border cursor-pointer transition-colors
              ${selectedMode === mode.id ? 'bg-primary/10 border-primary' : 'bg-card border-border hover:border-primary/50'}
            `}
          >
            {getModeIcon(mode.type)}
            <div>
              <div className="font-medium">{mode.name}</div>
              {mode.playerCount && (
                <div className="text-xs text-muted-foreground">{mode.playerCount} 玩家</div>
              )}
            </div>
            {mode.description && (
              <Badge variant="outline" className="ml-2">{mode.description}</Badge>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
```

## 3. 游戏系统要求组件

### GameSystemRequirements

这个组件用于展示游戏的最低和推荐系统要求：

```tsx
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '~/ui/primitives/tabs';
import { Layers, Cpu, Memory, HardDrive, Monitor } from 'lucide-react';

interface SystemRequirement {
  os: string;
  processor: string;
  memory: string;
  graphics: string;
  storage: string;
  additionalNotes?: string;
}

interface GameSystemRequirementsProps {
  minimumRequirements: SystemRequirement;
  recommendedRequirements?: SystemRequirement;
}

export const GameSystemRequirements: React.FC<GameSystemRequirementsProps> = ({ 
  minimumRequirements, 
  recommendedRequirements 
}) => {
  const [activeTab, setActiveTab] = useState('minimum');
  
  const renderRequirements = (requirements: SystemRequirement) => (
    <div className="space-y-4">
      <div className="flex items-start gap-3">
        <div className="mt-1"><Cpu className="h-5 w-5 text-muted-foreground" /></div>
        <div>
          <div className="font-medium">处理器</div>
          <div className="text-muted-foreground">{requirements.processor}</div>
        </div>
      </div>
      
      <div className="flex items-start gap-3">
        <div className="mt-1"><Memory className="h-5 w-5 text-muted-foreground" /></div>
        <div>
          <div className="font-medium">内存</div>
          <div className="text-muted-foreground">{requirements.memory}</div>
        </div>
      </div>
      
      <div className="flex items-start gap-3">
        <div className="mt-1"><Monitor className="h-5 w-5 text-muted-foreground" /></div>
        <div>
          <div className="font-medium">显卡</div>
          <div className="text-muted-foreground">{requirements.graphics}</div>
        </div>
      </div>
      
      <div className="flex items-start gap-3">
        <div className="mt-1"><HardDrive className="h-5 w-5 text-muted-foreground" /></div>
        <div>
          <div className="font-medium">存储空间</div>
          <div className="text-muted-foreground">{requirements.storage}</div>
        </div>
      </div>
      
      {requirements.additionalNotes && (
        <div className="mt-4 pt-4 border-t border-border">
          <div className="font-medium mb-1">附加说明</div>
          <div className="text-muted-foreground">{requirements.additionalNotes}</div>
        </div>
      )}
    </div>
  );
  
  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold flex items-center gap-2 mb-4">
        <Layers className="h-6 w-6" />
        系统要求
      </h2>
      
      {recommendedRequirements ? (
        <Tabs defaultValue="minimum" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="minimum">最低配置</TabsTrigger>
            <TabsTrigger value="recommended">推荐配置</TabsTrigger>
          </TabsList>
          <TabsContent value="minimum" className="bg-card rounded-lg p-6 shadow-sm">
            {renderRequirements(minimumRequirements)}
          </TabsContent>
          <TabsContent value="recommended" className="bg-card rounded-lg p-6 shadow-sm">
            {renderRequirements(recommendedRequirements)}
          </TabsContent>
        </Tabs>
      ) : (
        <div className="bg-card rounded-lg p-6 shadow-sm">
          <h3 className="text-xl font-semibold mb-4">系统要求</h3>
          {renderRequirements(minimumRequirements)}
        </div>
      )}
    </div>
  );
};
```

## 4. 游戏成就组件

### GameAchievements

这个组件用于展示游戏的成就系统：

```tsx
import React from 'react';
import Image from 'next/image';
import { Award } from 'lucide-react';
import { Badge } from '~/ui/primitives/badge';

interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  rarity: 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';
  completionRate: number; // 百分比
  unlocked?: boolean;
}

interface GameAchievementsProps {
  achievements: Achievement[];
  title?: string;
  showUnlockStatus?: boolean;
}

export const GameAchievements: React.FC<GameAchievementsProps> = ({ 
  achievements, 
  title = '游戏成就',
  showUnlockStatus = false
}) => {
  if (!achievements || achievements.length === 0) return null;
  
  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'bg-slate-200 text-slate-800';
      case 'uncommon': return 'bg-green-200 text-green-800';
      case 'rare': return 'bg-blue-200 text-blue-800';
      case 'epic': return 'bg-purple-200 text-purple-800';
      case 'legendary': return 'bg-yellow-200 text-yellow-800';
      default: return 'bg-slate-200 text-slate-800';
    }
  };
  
  const getRarityText = (rarity: string) => {
    switch (rarity) {
      case 'common': return '普通';
      case 'uncommon': return '不常见';
      case 'rare': return '稀有';
      case 'epic': return '史诗';
      case 'legendary': return '传说';
      default: return '普通';
    }
  };
  
  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold flex items-center gap-2 mb-4">
        <Award className="h-6 w-6" />
        {title}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {achievements.map((achievement) => (
          <div 
            key={achievement.id} 
            className={`bg-card rounded-lg p-4 flex items-center gap-3 ${showUnlockStatus && !achievement.unlocked ? 'opacity-60' : ''}`}
          >
            <div className="relative w-12 h-12 rounded-full overflow-hidden bg-muted">
              <Image 
                src={achievement.icon} 
                alt={achievement.name} 
                fill 
                className={`object-cover ${showUnlockStatus && !achievement.unlocked ? 'grayscale' : ''}`} 
              />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold">{achievement.name}</h3>
              <p className="text-sm text-muted-foreground">{achievement.description}</p>
              <div className="flex items-center justify-between mt-1">
                <Badge variant="outline" className={getRarityColor(achievement.rarity)}>
                  {getRarityText(achievement.rarity)}
                </Badge>
                <span className="text-xs">
                  {showUnlockStatus 
                    ? (achievement.unlocked ? '已解锁' : '未解锁') 
                    : `${achievement.completionRate}% 玩家解锁`}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
```

## 5. 游戏评论组件

### GameReviews

这个组件用于展示游戏的用户评论：

```tsx
import React from 'react';
import Image from 'next/image';
import { Star, ThumbsUp, MessageSquare } from 'lucide-react';
import { Button } from '~/ui/primitives/button';

interface GameReview {
  id: string;
  userName: string;
  userAvatar: string;
  rating: number;
  content: string;
  date: string;
  playTime: number; // 小时
  helpful: number;
  verified?: boolean;
}

interface GameReviewsProps {
  reviews: GameReview[];
  title?: string;
}

export const GameReviews: React.FC<GameReviewsProps> = ({ 
  reviews, 
  title = '玩家评论' 
}) => {
  if (!reviews || reviews.length === 0) return null;
  
  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold flex items-center gap-2 mb-4">
        <MessageSquare className="h-6 w-6" />
        {title}
      </h2>
      <div className="space-y-6">
        {reviews.map((review) => (
          <div key={review.id} className="bg-card rounded-lg p-6 shadow-sm">
            <div className="flex items-start gap-4">
              <div className="relative w-10 h-10 rounded-full overflow-hidden bg-muted">
                <Image src={review.userAvatar} alt={review.userName} fill className="object-cover" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold">{review.userName}</h3>
                    {review.verified && (
                      <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full">已验证购买</span>
                    )}
                  </div>
                  <span className="text-sm text-muted-foreground">{review.date}</span>
                </div>
                <div className="flex items-center gap-2 mt-1">
                  <div className="flex">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${i < review.rating ? "fill-primary text-primary" : "text-muted-foreground"}`}
                      />
                    ))}
                  </div>
                  <span className="text-xs text-muted-foreground">游戏时间: {review.playTime} 小时</span>
                </div>
                <p className="mt-2">{review.content}</p>
                <div className="flex items-center gap-2 mt-2">
                  <Button variant="ghost" size="sm" className="h-8 px-2">
                    <ThumbsUp className="h-4 w-4 mr-1" /> 有帮助 ({review.helpful})
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
```

## 6. 相似游戏推荐组件

### SimilarGames

这个组件用于展示相似游戏推荐：

```tsx
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Star } from 'lucide-react';

interface Game {
  id: string;
  name: string;
  image: string;
  price: number;
  rating?: number;
  discount?: number; // 折扣百分比
}

interface SimilarGamesProps {
  games: Game[];
  title?: string;
}

export const SimilarGames: React.FC<SimilarGamesProps> = ({ 
  games, 
  title = '相似游戏' 
}) => {
  if (!games || games.length === 0) return null;
  
  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {games.map((game) => (
          <Link key={game.id} href={`/games/${game.id}`} className="group">
            <div className="bg-card rounded-lg overflow-hidden shadow-sm transition-all group-hover:shadow-md">
              <div className="relative aspect-[3/4] overflow-hidden bg-muted">
                <Image
                  src={game.image}
                  alt={game.name}
                  fill
                  className="object-cover transition-transform group-hover:scale-105"
                />
                {game.discount && game.discount > 0 && (
                  <div className="absolute left-2 top-2 rounded-full bg-red-500 px-2 py-1 text-xs font-bold text-white">
                    -{game.discount}%
                  </div>
                )}
              </div>
              <div className="p-3">
                <h3 className="font-medium text-sm truncate">{game.name}</h3>
                <div className="flex items-center justify-between mt-1">
                  {game.rating && (
                    <div className="flex items-center">
                      <Star className="h-3 w-3 fill-primary text-primary" />
                      <span className="text-xs ml-1">{game.rating.toFixed(1)}</span>
                    </div>
                  )}
                  <span className="font-semibold text-sm">
                    {game.price > 0 ? `$${game.price.toFixed(2)}` : '免费'}
                  </span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
```

## 7. 游戏信息卡片组件

### GameInfoCard

这个组件用于展示游戏的基本信息：

```tsx
import React from 'react';
import { Calendar, User, Tag, Globe } from 'lucide-react';
import { Badge } from '~/ui/primitives/badge';

interface GameInfoCardProps {
  releaseDate?: string;
  developer?: string;
  publisher?: string;
  genres?: string[];
  languages?: string[];
  platforms?: string[];
}

export const GameInfoCard: React.FC<GameInfoCardProps> = ({
  releaseDate,
  developer,
  publisher,
  genres,
  languages,
  platforms
}) => {
  return (
    <div className="bg-card rounded-lg p-6 shadow-sm">
      <h3 className="text-xl font-semibold mb-4">游戏信息</h3>
      <div className="space-y-4">
        {releaseDate && (
          <div className="flex items-center gap-3">
            <Calendar className="h-5 w-5 text-muted-foreground" />
            <div>
              <div className="text-sm text-muted-foreground">发布日期</div>
              <div>{releaseDate}</div>
            </div>
          </div>
        )}
        
        {developer && (
          <div className="flex items-center gap-3 pt-3 border-t">
            <User className="h-5 w-5 text-muted-foreground" />
            <div>
              <div className="text-sm text-muted-foreground">开发商</div>
              <div>{developer}</div>
            </div>
          </div>
        )}
        
        {publisher && publisher !== developer && (
          <div className="flex items-center gap-3 pt-3 border-t">
            <User className="h-5 w-5 text-muted-foreground" />
            <div>
              <div className="text-sm text-muted-foreground">发行商</div>
              <div>{publisher}</div>
            </div>
          </div>
        )}
        
        {genres && genres.length > 0 && (
          <div className="flex items-start gap-3 pt-3 border-t">
            <Tag className="h-5 w-5 text-muted-foreground mt-1" />
            <div>
              <div className="text-sm text-muted-foreground">游戏类型</div>
              <div className="flex flex-wrap gap-2 mt-1">
                {genres.map((genre) => (
                  <Badge key={genre} variant="secondary">{genre}</Badge>
                ))}
              </div>
            </div>
          </div>
        )}
        
        {platforms && platforms.length > 0 && (
          <div className="flex items-start gap-3 pt-3 border-t">
            <div className="text-muted-foreground mt-1">💻</div>
            <div>
              <div className="text-sm text-muted-foreground">支持平台</div>
              <div className="flex flex-wrap gap-2 mt-1">
                {platforms.map((platform) => (
                  <Badge key={platform} variant="outline">{platform}</Badge>
                ))}
              </div>
            </div>
          </div>
        )}
        
        {languages && languages.length > 0 && (
          <div className="flex items-start gap-3 pt-3 border-t">
            <Globe className="h-5 w-5 text-muted-foreground mt-1" />
            <div>
              <div className="text-sm text-muted-foreground">支持语言</div>
              <div className="flex flex-wrap gap-2 mt-1">
                {languages.map((language) => (
                  <Badge key={language} variant="outline">{language}</Badge>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
```

## 游戏详情页面布局

以下是游戏详情页面的建议布局：

```tsx
// 游戏详情页面布局示例
<div className="flex min-h-screen flex-col">
  <Header />
  <main className="flex-1 py-10">
    <div className="container px-4 md:px-6">
      {/* 返回按钮 */}
      <Link href="/games">
        <Button variant="ghost" className="mb-6">
          ← 返回游戏列表
        </Button>
      </Link>

      {/* 游戏标题和基本信息 */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold">{game.name}</h1>
        <div className="flex items-center gap-4 mt-2">
          <div className="flex items-center">
            {/* 评分星星 */}
            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`h-5 w-5 ${i < Math.floor(game.rating || 0) ? "fill-primary text-primary" : "text-muted-foreground"}`}
                />
              ))}
              <span className="ml-1 text-muted-foreground">({game.rating})</span>
            </div>
          </div>
          
          {/* 游戏类型标签 */}
          {game.genres && game.genres.map(genre => (
            <Badge key={genre} variant="secondary">{genre}</Badge>
          ))}
        </div>
      </div>

      {/* 主要内容区 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* 左侧和中间区域 */}
        <div className="lg:col-span-2 space-y-8">
          {/* 游戏媒体轮播