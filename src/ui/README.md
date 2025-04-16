# UI 组件库

样式复用src\app\globals.css，如必须增加样式，请在globals.css中增加。

使用防御式编程，特别是组件数据中字段为null时的处理。

组件中的标签和数据要支持国际化

组件优先复用 directory_structure.txt 中罗列的的所有组件，根据关键词查找可复用组件，如果不存在，再考虑新增



基于 Next.js 的现代化 UI 组件库，采用分层架构设计，支持服务端组件与客户端组件协作开发模式。

## 组件分类与设计原则

### 1. 基础组件 (components)

基础组件是最小粒度的 UI 元素，无业务逻辑，可在任何场景复用。

**设计原则**：
- 仅包含样式和最基础交互，无业务逻辑
- 保持高度可复用性和一致性
- 完整的 TypeScript 类型定义
- 支持自定义样式扩展

**示例组件**：Button、Input、Card、Tabs、Modal、Drawer、Badge、Checkbox 等

### 2. 复合组件 (registry/components)

复合组件由多个基础组件组合而成，提供特定交互模式或展示效果，但不包含业务逻辑。

**设计原则**：
- 组合多个基础组件，实现特定交互模式
- 保持与基础组件风格一致
- 提供丰富的配置选项
- 无业务数据依赖

**示例组件**：Accordion、Carousel、SpotlightCards、Form、ImageReveal 等

```tsx
import { Accordion } from '@/ui/registry/components/accordion';
import { Carousel } from '@/ui/registry/components/carousel';
```

### 3. 业务组件 (business)

业务组件基于基础组件和复合组件组装而成，包含特定业务逻辑和数据处理。

**设计原则**：
- 基于基础组件和复合组件构建
- 包含特定业务逻辑和数据处理
- 客户端组件与服务端组件分离
- 明确的数据流和状态管理

**示例组件**：AppCard、ProductListPage、CartClient、HeaderClient 等

```tsx
import { AppCardClient } from '@/ui/business/app-card';
import { HeaderClient } from '@/ui/business/header';
```

## 目录结构

详见 [UI 组件库目录结构说明](./directory_structure.txt)

> 每个目录/文件后均附有简要说明，便于查阅和维护。
> 如需了解具体组件 props、用法示例、设计思路，请查阅对应子目录下的源码注释。

## 开发规范

### 组件命名规范

- 基础组件：使用 PascalCase，如 `Button.tsx`
- 复合组件：使用 kebab-case 目录 + PascalCase 文件，如 `spotlight-cards/SpotlightCards.tsx`
- 业务组件：
  - 客户端组件：使用 ComponentNameClient.tsx，如 `HeaderClient.tsx`
  - 服务端组件：使用 ComponentNameServer.tsx，如 `AppListPageServer.tsx`

### 客户端与服务端组件协作

组件分为服务端组件和客户端组件，充分利用 Next.js 的 RSC 架构：

- 服务端组件负责数据获取，将数据传递给客户端组件
- 客户端组件负责交互和状态管理
- 尽可能将应用分解为服务端和客户端组件的组合，优化性能和用户体验

```tsx
// 服务端组件示例 (AppListPageServer.tsx)
export async function AppListPageServer() {
  // 数据获取
  const apps = await fetchApps();
  
  // 渲染，传递数据给客户端组件
  return <AppListPageClient apps={apps} />;
}

// 客户端组件示例 (AppListPageClient.tsx)
'use client';

export function AppListPageClient({ apps }) {
  // 状态管理和交互
  const [filteredApps, setFilteredApps] = useState(apps);
  
  // 渲染 UI
  return (
    <div>
      {/* 过滤器和交互元素 */}
      <AppFilter onFilter={handleFilter} />
      
      {/* 应用列表 */}
      <div className="grid">
        {filteredApps.map(app => (
          <AppCard key={app.id} app={app} />
        ))}
      </div>
    </div>
  );
}
```

## 使用指南

### 导入组件

```tsx
// 导入基础组件
import { Button } from '@/ui/components/core/button';
import { Input } from '@/ui/components/core/input';

// 导入复合组件
import { Accordion } from '@/ui/registry/components/accordion';
import { SpotlightCards } from '@/ui/registry/components/spotlight-cards';

// 导入业务组件
import { HeaderClient } from '@/ui/business/header';
import { FooterClient } from '@/ui/business/footer';
```

### 组件文档和示例

每个组件目录下提供了演示示例，可以参考 `registry/components` 目录下的实现。
