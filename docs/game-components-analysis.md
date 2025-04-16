# 游戏详情页面组件分析

通过分析现有代码，我们可以识别出以下游戏详情页面相关的组件和结构，这些可以用于构建完整的游戏详情页面。

## 核心组件

### 1. 游戏详情部分 (GameDetailSection)

在 `ItemDetailSections.tsx` 中已实现的游戏详情组件，包含：

- **游戏信息卡片**：显示游戏类型、多人游戏支持等基本信息
- **游戏模式展示**：展示不同的游戏模式（单人、多人、合作等）
- **使用 Gamepad2 图标**：为游戏详情部分提供视觉识别

```tsx
export const GameDetailSection: React.FC<GameItemProps> = (props) => {
  const { gameGenre, multiplayer, gameMode } = props;
  
  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold flex items-center gap-2 mb-4">
        <Gamepad2 className="h-6 w-6" />
        游戏详情
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-card rounded-lg p-6 shadow-sm">
          <h3 className="text-xl font-semibold mb-4">游戏信息</h3>
          <div className="space-y-3">
            {gameGenre && (
              <div className="flex justify-between">
                <span className="font-medium">游戏类型</span>
                <Badge variant="secondary">{gameGenre}</Badge>
              </div>
            )}
            {multiplayer !== undefined && (
              <div className="flex justify-between border-t pt-3">
                <span className="font-medium">多人游戏</span>
                <span>{multiplayer ? '支持' : '不支持'}</span>
              </div>
            )}
          </div>
        </div>
        
        {gameMode && (
          <div className="bg-card rounded-lg p-6 shadow-sm">
            <h3 className="text-xl font-semibold mb-4">游戏模式</h3>
            <div className="flex flex-wrap gap-2">
              {gameMode.split(',').map((mode) => (
                <div key={mode.trim()} className="flex items-center gap-1 bg-muted px-3 py-1 rounded-full">
                  <Users className="h-4 w-4" />
                  <span>{mode.trim()}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
```

## 可复用组件（从应用详情页面可借鉴）

### 1. 游戏截图轮播 (GameScreenshots)

可以基于 `AppScreenshots.tsx` 组件修改，用于展示游戏截图和预览视频：

- 主图片/视频展示区
- 左右导航按钮
- 缩略图预览和选择
- 支持视频和图片混合展示

### 2. 游戏系统要求 (SystemRequirementsSection)

可以复用 `AppDetailSections.tsx` 中的系统要求组件，展示游戏的最低和推荐配置：

- 处理器要求
- 内存要求
- 显卡要求
- 存储空间要求
- 操作系统要求

### 3. 游戏版本历史 (VersionHistorySection)

可以复用版本历史组件，展示游戏的更新记录：

- 版本号
- 发布日期
- 更新内容列表
- 修复的问题

### 4. 游戏统计数据 (StatisticsSection)

可以复用统计数据组件，展示游戏的用户数据：

- 下载/购买次数
- 用户评分
- 游戏时长统计
- 成就完成率

## 游戏特有组件（需要新增）

### 1. 游戏预览视频组件 (GamePreviewVideo)

```tsx
export const GamePreviewVideo: React.FC<{ videoUrl: string }> = ({ videoUrl }) => {
  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-muted">
      <video 
        src={videoUrl} 
        controls 
        poster="/game-preview-poster.jpg"
        className="w-full h-full object-cover"
      />
    </div>
  );
};
```

### 2. 游戏成就展示组件 (GameAchievements)

```tsx
interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  rarity: 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';
  completionRate: number; // 百分比
}

export const GameAchievements: React.FC<{ achievements: Achievement[] }> = ({ achievements }) => {
  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold flex items-center gap-2 mb-4">
        <Award className="h-6 w-6" />
        游戏成就
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {achievements.map((achievement) => (
          <div key={achievement.id} className="bg-card rounded-lg p-4 flex items-center gap-3">
            <div className="relative w-12 h-12 rounded-full overflow-hidden bg-muted">
              <Image src={achievement.icon} alt={achievement.name} fill className="object-cover" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold">{achievement.name}</h3>
              <p className="text-sm text-muted-foreground">{achievement.description}</p>
              <div className="flex items-center justify-between mt-1">
                <Badge variant="outline" className={`
                  ${achievement.rarity === 'common' && 'bg-slate-200'}
                  ${achievement.rarity === 'uncommon' && 'bg-green-200'}
                  ${achievement.rarity === 'rare' && 'bg-blue-200'}
                  ${achievement.rarity === 'epic' && 'bg-purple-200'}
                  ${achievement.rarity === 'legendary' && 'bg-yellow-200'}
                `}>
                  {achievement.rarity}
                </Badge>
                <span className="text-xs">{achievement.completionRate}% 玩家解锁</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
```

### 3. 游戏DLC和扩展包组件 (GameDLC)

```tsx
interface DLC {
  id: string;
  name: string;
  description: string;
  image: string;
  price: number;
  releaseDate: string;
}

export const GameDLC: React.FC<{ dlcs: DLC[] }> = ({ dlcs }) => {
  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold flex items-center gap-2 mb-4">
        <Package className="h-6 w-6" />
        DLC 和扩展包
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {dlcs.map((dlc) => (
          <div key={dlc.id} className="bg-card rounded-lg overflow-hidden shadow-sm flex flex-col md:flex-row">
            <div className="relative w-full md:w-40 h-40 bg-muted">
              <Image src={dlc.image} alt={dlc.name} fill className="object-cover" />
            </div>
            <div className="p-4 flex-1 flex flex-col">
              <h3 className="font-semibold mb-1">{dlc.name}</h3>
              <p className="text-sm text-muted-foreground mb-2 flex-1">{dlc.description}</p>
              <div className="flex items-center justify-between">
                <span className="font-bold">${dlc.price.toFixed(2)}</span>
                <Button size="sm">添加到购物车</Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
```

### 4. 游戏社区和评论组件 (GameCommunity)

```tsx
interface GameReview {
  id: string;
  userName: string;
  userAvatar: string;
  rating: number;
  content: string;
  date: string;
  playTime: number; // 小时
  helpful: number;
}

export const GameCommunity: React.FC<{ reviews: GameReview[] }> = ({ reviews }) => {
  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold flex items-center gap-2 mb-4">
        <MessageSquare className="h-6 w-6" />
        玩家评论
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
                  <h3 className="font-semibold">{review.userName}</h3>
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

## 游戏详情页面布局

游戏详情页面可以采用以下布局结构：

1. **顶部区域**：游戏标题、评分、开发者信息、价格信息
2. **主要内容区**：
   - 左侧：游戏主图/预览视频、截图轮播
   - 右侧：游戏描述、购买/下载按钮、系统要求
3. **详情标签页**：
   - 游戏特性
   - 系统要求
   - 版本历史
   - 成就系统
   - DLC和扩展包
4. **底部区域**：
   - 玩家评论
   - 相似游戏推荐

## 结论

通过分析现有代码，我们可以看到项目中已经有一些游戏相关的组件和结构，但还需要添加更多游戏特有的组件来完善游戏详情页面。上述分析提供了一个全面的游戏详情页面组件结构，可以基于现有的应用详情页面组件进行扩展和定制，以满足游戏展示的特殊需求。