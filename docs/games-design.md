# 游戏（Games）数据与服务设计方案

## 一、数据表设计（game_items）

### 主要字段
- `id`: 主键，唯一标识
- `name`: 游戏名称
- `description`: 游戏简介
- `price`: 价格
- `quantity`: 库存
- `image`: 封面图片
- `category`: 分类
- `slug`: 路由标识
- `locale`: 语言标识，支持多语言
- `gameGenre`: 游戏类型（如 RPG、益智、动作等）
- `multiplayer`: 是否支持多人
- `gameMode`: 游戏模式（单人、多人、合作等）
- `isFeatured`: 是否推荐/置顶（建议新增，支持 Featured 分区）
- `viewCount`: 浏览量（用于热门排序）
- `salesCount`: 销量（用于热门排序）
- `rating`: 评分（用于热门排序）
- `createdAt`: 创建时间（用于新游排序）
- `updatedAt`: 更新时间（用于最近更新排序）

### 推荐新增字段
```ts
isFeatured: integer('is_featured', { mode: 'boolean' }).notNull().default(0) // 是否推荐
```

## 二、服务层设计

### 通用查询方法
```ts
async function getGames({ locale, isFeatured, sortBy, limit, genre }) {
  // 支持多条件组合筛选
}
```

### Section 查询示例
- **Featured Games**: `getGames({ isFeatured: true, locale, limit: 6 })`
- **New Games**: `getGames({ locale, sortBy: 'createdAt', limit: 10 })`
- **Popular Games**: `getGames({ locale, sortBy: 'viewCount', limit: 10 })`
- **Recently Updated**: `getGames({ locale, sortBy: 'updatedAt', limit: 10 })`
- **By Genre**: `getGames({ locale, genre: 'RPG', limit: 10 })`

### 复合 Section 支持
- 服务层可并发多次调用，前端按 section 渲染。
- 支持 locale 过滤，保证国际化体验。

## 三、迁移与维护建议
- 新增字段需写迁移脚本，历史数据补默认值。
- 服务层参数设计应灵活扩展，便于未来增加更多筛选/排序方式。

## 四、前端与 UI 建议
- 按 section 并发请求，渲染不同分区。
- 各 section 组件复用，提升开发效率。

---
如需具体 schema、服务层代码或迁移脚本示例，请查阅 `src/db/sqlite/schema/game_items.ts` 和 `src/services/gamesService.ts`，或联系开发负责人。
