# 项目页面、组件与国际化设计策略

## 1. 分层架构

- **页面（Page）**：只负责数据获取、权限、SEO、页面级文案（如标题、描述），不直接渲染具体 UI。
- **Server 业务组件**：服务端数据聚合/预处理，业务逻辑集中，props 传递给 Client 组件。
- **Client 业务组件**：负责 UI 渲染、交互、状态管理，内部全部用国际化 key 渲染文案。
- **复合组件/基础组件**：最大化复用，所有标签、按钮、提示、空态均支持国际化。

## 2. 国际化（i18n）策略

- 采用 [next-intl](https://github.com/amannn/next-intl) 作为国际化方案。
- **命名规范**：
  - 页面级 namespace，如 `EbookListPage`、`AppDetailPage`、`HomePage`。
  - 组件级 key 采用 `${type}.${key}`，如 `EbookListPage.new.title`、`EbookListPage.card.button`。
  - 支持同一页面多个组件实例（如 new/trending/popular 区块），每个实例可用不同 key 前缀。
- **用法规范**：
  - 页面/Server 组件用 `getTranslations({ locale, namespace })` 获取文案。
  - Client 组件用 `useTranslations(namespace)`，所有 UI 文案都用 t('xxx')。
  - 禁止硬编码 UI 文案，所有文案必须有 i18n key。
- **JSON 结构示例**：
  ```json
  {
    "EbookListPage": {
      "title": "电子书列表",
      "new": { "title": "最新上架", "button": "马上阅读" },
      "trending": { "title": "热门推荐", "button": "加入收藏" },
      "popular": { "title": "最受欢迎", "button": "立即购买" },
      "card": { "label": "电子书", "button": "详情" }
    }
  }
  ```

## 3. 组件复用与防御式编程

- 优先复用目录结构中已有的基础/复合/业务组件。
- 组件 props 必须防御式处理 null/undefined。
- 组件标签、数据全部国际化。

## 4. 其他规范

- 样式统一复用 `src/app/globals.css`，如需扩展请集中维护。
- 组件命名、props、i18n key 均遵循 PascalCase/kebab-case 规范。

---

如需新增页面/组件/国际化 key，请严格遵循本策略，确保项目一致性、可维护性与全球化能力。