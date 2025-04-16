"use client";
import React from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import ThemeSwitch from "@/ui/components/website/theme-switch";
import MobileHeader from "@/ui/components/website/moibile-header";
import GitHubButton from "@/registry/components/github-repo-btn";

export interface HeaderNavItem {
  label: string;
  href: string;
}

export const HeaderClient: React.FC = () => {
  const t = useTranslations("Header");
  const navItems: HeaderNavItem[] = [
    { label: t('ebooks', { defaultValue: '电子书' }), href: '/ebooks' },
    { label: t('products', { defaultValue: '产品' }), href: '/products' },
    // 可扩展更多导航项
  ];
  return (
    <header className="w-full fixed z-20 top-0 left-0 pt-1.5 xl:px-0 px-2 bg-primary-base border-b">
      <div className="lg:container p-1 h-full relative mx-auto flex justify-between rounded-lg items-center border bg-primary-base">
        <MobileHeader classname="xl:hidden block" />
        <Link href="/" className="relative xl:flex hidden items-center gap-2 dark:bg-black bg-gray-100 p-2 rounded-md">
          <span className="font-bold text-xl">{t('logo', { defaultValue: 'YourApp' })}</span>
        </Link>
        <nav className="flex gap-4 items-center">
          {navItems.map(item => (
            <Link key={item.href} href={item.href} className="hover:underline">{item.label}</Link>
          ))}
          <ThemeSwitch />
          <GitHubButton repoUrl="https://github.com/your-org/your-app" />
        </nav>
      </div>
    </header>
  );
};
