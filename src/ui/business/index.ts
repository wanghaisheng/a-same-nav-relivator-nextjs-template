/**
 * 业务组件（business）统一导出
 * 
 * 这些组件封装特定业务场景的 UI 和逻辑，通常由服务端组件和客户端组件组合而成。
 * 业务组件只依赖 primitives 和 composites 组件，不直接依赖旧组件。
 */

// 业务组件
export { default as HomeBuyMeCoffe } from './home-buyme-coffe';

// 后续添加的业务组件
// export { default as AppDetailSections } from './app-detail-sections';
// export { default as AppListPage } from './app-list-page';
// export { default as ProductCard } from './product-card';
// export { default as CommentSection } from './comment-section';

// 类型导出
// export type { AppDetailSectionsProps } from './app-detail-sections';
// 其他类型导出...
