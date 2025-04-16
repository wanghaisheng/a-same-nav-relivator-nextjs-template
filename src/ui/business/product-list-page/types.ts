// ProductListPage 组件类型定义
import { Product } from '@/db/types';

export type ProductListPageProps = {
  products?: Product[];
  locale?: string;
};

export type ProductListPageClientProps = {
  products?: Product[];
  error?: string | null;
  locale?: string;
};
