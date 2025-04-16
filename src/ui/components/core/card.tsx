import React from 'react';
import type { ReactNode } from 'react';

// 基础 Card 组件，支持样式扩展和防御式编程
export interface CardProps {
  children?: ReactNode;
  className?: string;
  // 允许传递其他属性
  [key: string]: any;
}

/**
 * Card 基础组件
 * @description 最小粒度的卡片容器，支持自定义样式和内容
 */
export function Card({ children, className = '', ...rest }: CardProps) {
  return (
    <div className={`ui-card ${className}`.trim()} {...rest}>
      {children}
    </div>
  );
}

// 默认样式请在 src/app/globals.css 中维护
