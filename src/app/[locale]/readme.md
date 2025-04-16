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
- **注意事项（Next.js 15 及 next-intl 新规范）**：
  - 在 page.tsx、layout.tsx 等页面和布局组件中获取 `params` 时，必须使用 Promise+await 的异步方式，避免同步解构导致的错误。
  - 推荐写法：
    ```tsx
    // 正确做法
    export default async function AppListPage({ params }: { params: Promise<{  locale: string }> }) {
  const {  locale } = await params;
    ```

## 国际化（i18n）实现与最佳实践（2025年4月修订）

### 1. Provider 配置
- 所有页面和组件均被 `NextIntlClientProvider` 包裹，`locale` 和 `messages` 由 layout.tsx 统一传递。
- 参考 `src/app/[locale]/layout.tsx`：
  ```tsx
  <NextIntlClientProvider locale={locale} messages={messages}>
    {/* your app */}
  </NextIntlClientProvider>
  ```
- 只要组件在 Provider 下，`useTranslations()` 会自动获取当前语言，无需 props 额外传递 locale。

### 2. useTranslations 用法
- 推荐写法：
  ```tsx
  const t = useTranslations('Header');
  // 自动感知当前 locale
  ```
- 不需要、也不建议传递 locale 参数。如果传递多余参数，TS 会报错。

### 3. locale 获取与路由
- 项目采用 Next.js App Router 的 [locale] 路由模式，locale 由路由和 layout.tsx 自动管理。
- 页面 props 推荐异步获取：
  ```tsx
  export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    // ...
  }
  ```

### 4. 组件开发规范
- 组件内部一律用 `useTranslations` 获取文案，不允许硬编码字符串。
- 组件 props 不需要传递 locale，除非有极特殊嵌套场景。
- 业务组件、基础组件均应支持国际化与防御式编程。

### 5. layout.tsx 参考实现
- 已严格对标 [next-intl 官方文档](https://next-intl.dev/docs/getting-started/app-router/with-i18n-routing)，见 `src/app/[locale]/layout.tsx`。
- Provider 嵌套顺序合理，locale/messages 只需在顶层 Provider 设置一次。

---
> 只要遵循上述规范，所有页面与组件都能自动国际化，无需手动传递 locale。遇到国际化问题优先检查 Provider 包裹与 useTranslations 用法。

## 3. 组件复用与防御式编程

- 优先复用目录结构中已有的基础/复合/业务组件。
- 组件 props 必须防御式处理 null/undefined。
- 组件标签、数据全部国际化。

## 4. 样式与主题管理（组件化最佳实践）

- **主题 CSS 变量配置**：
  - 在 `.env.development` 中通过 `NEXT_PUBLIC_THEME_CSS` 环境变量配置当前主题 CSS 文件（如 `globals.css`、`globals-purple.css` 等），便于灵活切换主题。
  - 配置方法：
    ```env
    NEXT_PUBLIC_THEME_CSS="globals.css"
    ```
  - 如需切换主题，只需将该变量值改为对应的 CSS 文件名（如 `globals-purple.css`），无需修改代码。
- **ThemeClassProvider 组件**：
  - 主题相关逻辑已抽离为 `ThemeClassProvider` 组件（位于 `src/ui/components/website/theme-class-provider.tsx`），统一管理 `<html>` 标签的 `className` 和 `lang` 属性。
  - 使用方式：在 `layout.tsx` 中用 `<ThemeClassProvider lang={locale}>...</ThemeClassProvider>` 包裹页面内容，自动根据环境变量设置主题 class。
  - 示例：
    ```tsx
    import ThemeClassProvider from 'src/ui/components/website/theme-class-provider';
    export default function RootLayout({ children, params }) {
      const { locale } = params;
      return (
        <ThemeClassProvider lang={locale}>
          {children}
        </ThemeClassProvider>
      );
    }
    ```
- **最佳实践**：
  - 所有全局样式文件集中于 `src/app/`，如需扩展主题请新增 CSS 并通过环境变量切换。
  - 组件样式优先采用 CSS 变量和主题 class，避免硬编码。
  - 主题切换和样式组件化应通过环境变量和 ThemeClassProvider 实现，禁止直接在组件中硬编码主题。
  - 文档和代码需同步更新，确保团队成员了解主题切换和样式组件化方案。

## 5. 电子书模块（ebooks）国际化实现说明

- **页面 locale 获取与传递**：
  - `src/app/[locale]/ebooks/page.tsx` 通过 `params` 异步获取 `locale`，并作为 props 传递给业务组件。
  - 推荐写法：
    ```tsx
    export default async function EbookListPage({ params }: { params: Promise<{  locale: string }> }) {
      const { locale } = await params;
      // ...
      return <EbookListPageServer ebooks={ebooks} categories={categories} locale={locale} />;
    }
    ```
- **数据与 UI 分离**：
  - 页面只负责数据获取与异常处理，不直接渲染 UI。
  - UI 渲染、文案国际化全部由 `EbookListPageServer` 及其下游组件完成。
- **国际化适配建议**：
  - 若电子书/分类数据含多语言内容，建议后端/服务层支持 locale 参数，前端据此传递 locale 获取对应语言数据。
  - HeaderClient、FooterClient 等业务组件如需国际化，建议支持 locale 透传或通过 context 获取。
- **文案国际化**：
  - `EbookListPageServer` 及其下游所有 UI 组件，需通过 `useTranslations(namespace)` 或等价 hooks 获取文案，禁止硬编码。
  - 参考 i18n key 命名规范与 JSON 结构。
- **注意事项**：
  - 保证所有 props、数据、标签均支持国际化与防御式编程。
  - 组件优先复用已有基础/复合/业务组件。

---
> 电子书模块国际化实现严格遵循本 readme 总体策略，具体见 `src/app/[locale]/ebooks/page.tsx` 及相关业务组件源码。

如需新增页面/组件/国际化 key，请严格遵循本策略，确保项目一致性、可维护性与全球化能力。