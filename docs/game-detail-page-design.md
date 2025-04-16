# 游戏详情页面设计方案

基于对现有代码的分析和游戏详情页面的需求，以下是完整的游戏详情页面设计方案，包括页面布局和所有必要的组件。

## 页面整体布局

游戏详情页面采用响应式设计，主要分为以下几个部分：

1. **顶部区域**：包含导航栏、返回按钮、游戏标题和基本信息
2. **主要内容区**：分为左侧和右侧两栏
   - 左侧：游戏媒体展示（预览视频/截图轮播）
   - 右侧：游戏信息卡片、价格信息、购买按钮
3. **详情内容区**：包含多个部分
   - 游戏描述
   - 游戏模式选择器
   - 游戏特性列表
   - 系统要求
   - 游戏成就
   - DLC和扩展包
4. **底部区域**：
   - 用户评论
   - 相似游戏推荐

## 页面组件结构

```jsx
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
          {/* 游戏媒体轮播 */}
          <GameMediaCarousel mediaItems={game.mediaItems} />
          
          {/* 游戏描述 */}
          <div className="bg-card rounded-lg p-6 shadow-sm">
            <h2 className="text-2xl font-bold mb-4">游戏简介</h2>
            <p className="text-muted-foreground whitespace-pre-line">{game.description}</p>
          </div>
          
          {/* 游戏模式选择器 */}
          <GameModeSelector modes={game.gameModes} />
          
          {/* 游戏特性列表 */}
          <div className="mt-8">
            <h2 className="text-2xl font-bold mb-4">游戏特性</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {game.features.map((feature, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="mt-1 h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-primary font-bold">{index + 1}</span>
                  </div>
                  <div>
                    <h3 className="font-semibold">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* 系统要求 */}
          <GameSystemRequirements 
            minimumRequirements={game.minimumRequirements}
            recommendedRequirements={game.recommendedRequirements}
          />
          
          {/* 游戏成就 */}
          <GameAchievements achievements={game.achievements} />
          
          {/* DLC和扩展包 */}
          <GameDLC dlcs={game.dlcs} />
        </div>
        
        {/* 右侧区域 */}
        <div className="space-y-8">
          {/* 价格信息和购买按钮 */}
          <div className="bg-card rounded-lg p-6 shadow-sm sticky top-4">
            <div className="mb-4">
              {game.discount > 0 && (
                <div className="bg-red-500 text-white text-sm font-bold px-3 py-1 rounded-full inline-block mb-2">
                  -{game.discount}%
                </div>
              )}
              <div className="flex items-center gap-2">
                {game.originalPrice && game.discount > 0 && (
                  <span className="text-lg text-muted-foreground line-through">
                    ${game.originalPrice.toFixed(2)}
                  </span>
                )}
                <span className="text-3xl font-bold">
                  {game.price > 0 ? `$${game.price.toFixed(2)}` : '免费'}
                </span>
              </div>
            </div>
            
            <Button className="w-full mb-3" size="lg">
              立即购买
            </Button>
            <Button variant="outline" className="w-full">
              添加到愿望清单
            </Button>
            
            {game.releaseDate && new Date(game.releaseDate) > new Date() && (
              <div className="mt-4 text-center">
                <p className="text-sm text-muted-foreground">预计发布日期</p>
                <p className="font-semibold">{game.releaseDate}</p>
              </div>
            )}
          </div>
          
          {/* 游戏信息卡片 */}
          <GameInfoCard 
            releaseDate={game.releaseDate}
            developer={game.developer}
            publisher={game.publisher}
            genres={game.genres}
            languages={game.languages}
            platforms={game.platforms}
          />
          
          {/* 相似游戏推荐（小卡片） */}
          <div className="bg-card rounded-lg p-6 shadow-sm">
            <h3 className="text-xl font-semibold mb-4">你可能也喜欢</h3>
            <div className="space-y-4">
              {game.similarGames.slice(0, 3).map((similarGame) => (
                <Link key={similarGame.id} href={`/games/${similarGame.id}`} className="flex items-center gap-3 group">
                  <div className="relative w-16 h-16 rounded-md overflow-hidden bg-muted">
                    <Image
                      src={similarGame.image}
                      alt={similarGame.name}
                      fill
                      className="object-cover transition-transform group-hover:scale-105"
                    />
                  </div>
                  <div>
                    <h4 className="font-medium group-hover:text-primary transition-colors">{similarGame.name}</h4>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center">
                        <Star className="h-3 w-3 fill-primary text-primary" />
                        <span className="text-xs ml-1">{similarGame.rating.toFixed(1)}</span>
                      </div>
                      <span className="text-sm font-semibold">
                        {similarGame.price > 0 ? `$${similarGame.price.toFixed(2)}` : '免费'}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* 用户评论 */}
      <GameReviews reviews={game.reviews} />
      
      {/* 相似游戏推荐（大卡片） */}
      <SimilarGames games={game.similarGames} />
    </div>
  </main>
  <Footer />
</div>
```

## 核心组件详情

### 1. 游戏媒体轮播 (GameMediaCarousel)

这个组件用于展示游戏的预览视频和截图，支持轮播功能：

- 支持视频和图片混合展示
- 提供缩略图导航
- 视频播放控制
- 响应式设计，适应不同屏幕尺寸

### 2. 游戏模式选择器 (GameModeSelector)

这个组件用于展示和选择不同的游戏模式：

- 单人模式
- 多人模式
- 合作模式
- 竞技模式
- 显示每种模式支持的玩家数量

### 3. 游戏系统要求 (GameSystemRequirements)

这个组件用于展示游戏的系统要求：

- 最低配置和推荐配置切换
- 处理器、内存、显卡、存储空间等要求
- 清晰的图标和布局

### 4. 游戏成就 (GameAchievements)

这个组件用于展示游戏的成就系统：

- 成就图标、名称和描述
- 成就稀有度和解锁率
- 网格布局，响应式设计

### 5. 游戏DLC和扩展包 (GameDLC)

这个组件用于展示游戏的DLC和扩展包：

- DLC图片、名称和描述
- 价格和购买按钮
- 发布日期信息

### 6. 游戏评论 (GameReviews)

这个组件用于展示游戏的用户评论：

- 用户头像和名称
- 评分和游戏时间
- 评论内容和有用度
- 已验证购买标记

### 7. 游戏信息卡片 (GameInfoCard)

这个组件用于展示游戏的基本信息：

- 发布日期
- 开发商和发行商
- 游戏类型
- 支持平台
- 支持语言

### 8. 相似游戏推荐 (SimilarGames)

这个组件用于展示相似游戏推荐：

- 游戏缩略图、名称和价格
- 评分信息
- 折扣标记
- 网格布局，响应式设计

## 移动端适配

游戏详情页面在移动端上的布局调整：

1. 单列布局，所有内容垂直排列
2. 游戏媒体轮播占满屏幕宽度
3. 价格信息和购买按钮固定在屏幕底部
4. 缩略图导航改为点状指示器
5. 游戏特性和系统要求改为单列显示

## 交互效果

1. **视频预览**：点击播放按钮开始播放，视频结束后显示缩略图
2. **截图浏览**：支持左右滑动和点击缩略图切换
3. **系统要求**：点击切换最低配置和推荐配置
4. **购买按钮**：悬停效果和点击动画
5. **相似游戏**：悬停时轻微放大效果

## 数据结构

游戏详情页面所需的数据结构示例：

```typescript
interface Game {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  discount?: number; // 折扣百分比
  image: string;
  rating: number;
  releaseDate: string;
  developer: string;
  publisher: string;
  genres: string[];
  platforms: string[];
  languages: string[];
  features: Array<{
    title: string;
    description: string;
  }>;
  minimumRequirements: SystemRequirement;
  recommendedRequirements?: SystemRequirement;
  mediaItems: Array<{
    type: 'image' | 'video';
    url: string;
    thumbnail?: string;
  }>;
  gameModes: Array<{
    id: string;
    name: string;
    type: 'singleplayer' | 'multiplayer' | 'cooperative' | 'competitive';
    playerCount?: string;
    description?: string;
  }>;
  achievements: Achievement[];
  dlcs: DLC[];
  reviews: GameReview[];
  similarGames: SimilarGame[];
}
```

## 结论

这个游戏详情页面设计方案提供了一个全面的游戏展示体验，包含了游戏的所有关键信息和功能。通过复用现有的组件结构并添加游戏特有的组件，可以快速实现一个功能完善、视觉吸引人的游戏详情页面。

设计注重用户体验，提供清晰的信息层次和直观的交互方式，同时保持与整体设计系统的一致性。响应式设计确保在不同设备上都能提供良好的浏览体验。