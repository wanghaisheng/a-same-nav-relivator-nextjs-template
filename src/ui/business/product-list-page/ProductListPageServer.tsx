import React from "react";
import { ProductListPageClient } from "./ProductListPageClient";
import type { ProductListPageProps } from "./types";
import { getTranslations } from 'next-intl/server';

// 服务端组件，负责数据获取和异常处理
export default async function ProductListPageServer(props: ProductListPageProps) {

  // 获取国际化翻译函数
  const t = await getTranslations({ locale: props.locale || 'zh', namespace: 'ProductListPage' });
  
  // 处理传入的产品数据
  let products = props.products ?? [];
  let error: string | null = null;
  
  try {
    // 数据预处理：确保所有产品数据格式一致
    products = products.map(product => ({
      ...product,
      // 确保价格是数字类型
      price: typeof product.price === 'string' ? parseFloat(product.price) : product.price,
      // 处理可能的JSON字符串
      features: typeof product.features === 'string' ? 
        JSON.parse(product.features) : product.features,
      specs: typeof product.specs === 'string' ? 
        JSON.parse(product.specs) : product.specs
    }));
  } catch (e: any) {
    console.error('产品数据处理错误:', e);
    error = e.message || t('unknownError');
  }
  
  return <ProductListPageClient products={products} error={error} locale={props.locale} />;
}
