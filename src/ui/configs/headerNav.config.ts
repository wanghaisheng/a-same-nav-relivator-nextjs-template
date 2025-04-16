// 导航项配置，支持国际化 label
export interface HeaderNavItem {
  label: string;
  href: string;
  i18nKey?: string; // 用于 next-intl 翻译 key
}

export const headerNavConfig: HeaderNavItem[] = [
  { label: '电子书', href: '/ebooks', i18nKey: 'ebooks' },
  { label: '产品', href: '/products', i18nKey: 'products' },
  { label: '游戏', href: '/games', i18nKey: 'games' },
  // 可扩展更多导航项
];
