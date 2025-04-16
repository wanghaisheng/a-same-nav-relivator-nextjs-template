import React from "react";

function getThemeClass() {
  return process.env.NEXT_PUBLIC_THEME_CSS?.replace('.css', '') || 'globals';
}

export const ThemeClassProvider = ({
  children,
  lang
}: {
  children: React.ReactNode;
  lang: string;
}) => {
  const themeClass = getThemeClass();
  return (
    <html lang={lang} className={themeClass} suppressHydrationWarning>
      {children}
    </html>
  );
};