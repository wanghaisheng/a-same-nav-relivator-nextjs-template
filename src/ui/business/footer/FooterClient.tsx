"use client";
import React, { useRef } from "react";
import type { FooterProps } from "./types";
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';

export interface FooterNavItem {
  label: string;
  href: string;
  external?: boolean;
}

export const FooterClient: React.FC<FooterProps & { locale?: string }> = ({ copyright, locale }) => {
  const t = useTranslations('Footer', { locale });
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  const navItems: FooterNavItem[] = [
    { label: t('about', { defaultValue: '关于我们' }), href: '/about' },
    { label: t('contact', { defaultValue: '联系我们' }), href: '/contact' },
    { label: t('github', { defaultValue: 'GitHub' }), href: 'https://github.com/your-org/your-app', external: true },
    // 可扩展更多社交/外链
  ];

  return (
    <footer className="w-full py-8 border-t mt-12 bg-primary-base text-center text-sm text-muted-foreground">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="container mx-auto flex flex-col items-center gap-2"
      >
        <div>
          &copy; {new Date().getFullYear()} {t('copyright', { defaultValue: copyright ?? 'YourApp. 保留所有权利.' })}
        </div>
        <div className="flex gap-4">
          {navItems.map(item => item.external
            ? <a key={item.href} href={item.href} target="_blank" rel="noopener noreferrer" className="hover:underline">{item.label}</a>
            : <Link key={item.href} href={item.href} className="hover:underline">{item.label}</Link>
          )}
        </div>
        {/* 订阅表单、社交媒体等可按需扩展 */}
      </motion.div>
    </footer>
  );
};
