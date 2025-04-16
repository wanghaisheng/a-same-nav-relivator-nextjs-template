# 项目结构说明

## 目录结构

```
├── .github/                # GitHub配置文件
├── .vscode/               # VS Code配置
├── addons/                # 项目插件
├── dist/                  # 编译输出目录
│   ├── index.js           # 编译后的主入口文件
│   ├── init.js            # 初始化脚本
│   ├── schema/            # 编译后的数据库模式
│   └── seed.js            # 数据库种子文件
├── docs/                  # 项目文档
├── public/                # 静态资源
├── src/                   # 源代码
│   ├── app/               # Next.js应用目录
│   │   ├── api/           # API路由
│   │   ├── auth/          # 认证相关页面
│   │   ├── dashboard/     # 仪表盘页面
│   │   ├── items/         # 商品相关页面
│   │   ├── products/      # 产品相关页面
│   │   ├── profile/       # 用户资料页面
│   │   ├── showcase/      # 展示页面
│   │   ├── submit-tool/   # 工具提交页面
│   │   ├── globals*.css   # 全局样式文件
│   │   ├── layout.tsx     # 布局组件
│   │   └── page.tsx       # 首页组件
│   ├── components/        # 共享组件
│   ├── db/                # 数据库相关
│   │   ├── postgres/      # PostgreSQL相关
│   │   │   ├── schema/    # PostgreSQL数据库模式
│   │   │   └── ...        # 其他PostgreSQL文件
│   │   ├── sqlite/        # SQLite相关
│   │   │   ├── schema/    # SQLite数据库模式
│   │   │   └── ...        # 其他SQLite文件
│   │   └── tests/         # 数据库测试
│   ├── lib/               # 工具库
│   ├── services/          # 服务层
│   ├── tests/             # 测试文件
│   └── ui/                # UI组件
│       ├── components/    # UI组件
│       └── primitives/    # 基础UI组件
├── .env.development       # 开发环境变量
├── .env.example           # 环境变量示例
├── .env.production        # 生产环境变量
├── .gitignore             # Git忽略文件
├── biome.json             # Biome配置
├── bun.lock               # Bun锁定文件
├── components.json        # 组件配置
├── drizzle*.config.ts     # Drizzle配置文件
├── eslint.config.js       # ESLint配置
├── knip.json              # Knip配置
├── next.config.ts         # Next.js配置
├── package.json           # 包管理配置
├── postcss.config.js      # PostCSS配置
├── sqlite.db              # SQLite数据库文件
└── tsconfig.json          # TypeScript配置
```

## 关键目录和文件说明

### 文档目录 (`docs/`)

包含项目文档：

- `custom-css.md`: 自定义CSS指南
- `database-implementation-progress.md`: 数据库实现进度
- `develop-guide.md`: 开发指南
- `hub-docs.md`: Hub文档
- `payment-integration.md`: 支付集成文档
- `project-structure.md`: 项目结构说明

### 源代码目录 (`src/`)

#### 应用目录 (`src/app/`)

基于Next.js的App Router结构：

- `api/`: API路由，处理HTTP请求
- `auth/`: 认证相关页面，包括登录、注册等
- `dashboard/`: 用户仪表盘页面
- `items/`: 商品相关页面，包括列表和详情
- `products/`: 产品相关页面，专注于电子商务功能
- `profile/`: 用户资料页面
- `showcase/`: 功能展示页面
- `submit-tool/`: 工具提交页面
- `globals*.css`: 多种主题的全局样式文件
- `layout.tsx`: 应用布局组件
- `page.tsx`: 首页组件

#### 组件目录 (`src/components/`)

共享业务组件：

- `Categories.tsx`: 分类组件
- `DatabaseInitializer.tsx`: 数据库初始化组件
- `ErrorMessage.tsx`: 错误消息组件
- `FeaturedItems.tsx`: 特色商品组件
- `Features.tsx`: 特性组件
- `Hero.tsx`: 首页英雄区组件
- `LoadingSpinner.tsx`: 加载指示器组件
- `ProductSection.tsx`: 产品区域组件
- `SubmitToolForm.tsx`: 工具提交表单
- `Testimonials.tsx`: 用户评价组件

#### 数据库目录 (`src/db/`)

数据库相关代码：

- `postgres/`: PostgreSQL数据库代码
  - `schema/`: 数据库表定义
  - `connection.ts`: 数据库连接
  - `init.ts`: 数据库初始化
  - `seed.ts`: 数据库种子数据
- `sqlite/`: SQLite数据库代码
  - `schema/`: 数据库表定义
  - `connection.ts`: 数据库连接
  - `init.ts`: 数据库初始化
  - `seed.ts`: 数据库种子数据
- `tests/`: 数据库测试代码

#### 服务层 (`src/services/`)

业务逻辑服务：

- `index.ts`: 服务导出
- `services.postgres.ts`: PostgreSQL服务实现
- `services.sqlite.ts`: SQLite服务实现
- `auth.postgres.ts`: PostgreSQL认证服务
- `auth.sqlite.ts`: SQLite认证服务

#### UI组件 (`src/ui/`)

- `components/`: 复合UI组件
  - `cart.tsx`: 购物车组件
  - `header.tsx`: 页头组件
  - `product-card.tsx`: 产品卡片组件
  - `theme-toggle.tsx`: 主题切换组件
- `primitives/`: 基础UI组件
  - `button.tsx`: 按钮组件
  - `card.tsx`: 卡片组件
  - `dropdown-menu.tsx`: 下拉菜单组件

### 环境配置文件

- `.env.development`: 开发环境变量
- `.env.example`: 环境变量示例
- `.env.production`: 生产环境变量

## 数据库架构

项目支持两种数据库：

1. **SQLite** (开发环境)
2. **PostgreSQL** (生产环境)

通过环境变量`NEXT_PUBLIC_DATABASE_ENV`切换。

### 主要数据表

- **items**: 商品表
  - id: 唯一标识符
  - name: 商品名称
  - description: 商品描述
  - price: 价格
  - quantity: 库存数量
  - image: 图片URL
  - category: 分类
  - isTrending/isPopular/isNew/isFeatured/isBestSeller: 商品标记
  - rating: 评分
  - salesCount/viewCount: 销售和查看计数
  - createdAt/updatedAt: 时间戳

- **categories**: 分类表
  - id: 唯一标识符
  - name: 分类名称
  - description: 分类描述
  - image: 图片URL

- **testimonials**: 用户评价表
  - id: 唯一标识符
  - name: 用户名
  - role: 用户角色
  - content: 评价内容
  - rating: 评分
  - image: 用户头像

- **features**: 特性表
  - id: 唯一标识符
  - title: 特性标题
  - description: 特性描述
  - icon: 图标

## 服务层实现

服务层提供数据访问和业务逻辑：

- **itemsService**: 商品服务
  - getAll(): 获取所有商品
  - getById(id): 获取单个商品
  - create(data): 创建商品
  - update(id, data): 更新商品
  - delete(id): 删除商品
  - getTrending/getPopular/getNew/getFeatured/getBestSellers/getBestRated(): 获取特定类型商品

- **categoriesService**: 分类服务
- **testimonialsService**: 评价服务
- **featuresService**: 特性服务

## 开发指南

### 环境设置

1. 克隆仓库
2. 安装依赖: `npm install`
3. 设置环境变量
   - 复制`.env.example`为`.env.development`
   - 设置`NEXT_PUBLIC_DATABASE_ENV`

### 数据库开发

1. 在适当的`schema`目录中定义表
2. 更新`seed.ts`添加测试数据
3. 运行`npm run db:push`应用更改

### 添加新功能

1. 更新数据库模式
2. 在`services.postgres.ts`和`services.sqlite.ts`中实现功能
3. 创建或更新API路由
4. 实现前端组件

## 部署

### 开发环境

```bash
npm run dev
```

### 生产环境

```bash
npm run build
npm start
```

### 环境变量

生产环境需要设置：

- `DATABASE_URL`: PostgreSQL连接字符串
- `NEXT_PUBLIC_DATABASE_ENV`: 设置为`postgres`