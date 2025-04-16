import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals-default.css";
import "./globals-minimal.css";
import "./globals-purple.css";
import "./globals-bahause.css";
import "./globals-dramatic.css";
import "./globals-Neumorphism.css";
import "./globals-skeuomorphism.css";
import { CartProvider } from "~/lib/hooks/use-cart";
import { ThemeProvider } from "~/ui/components/website/theme-provider";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "../i18n/request";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Relivator Next.js Template",
  description: "Relivator Next.js Template",
};

function getThemeClass() {
  return process.env.NEXT_PUBLIC_THEME_CSS?.replace('.css', '') || 'globals-default';
}

export default async function LocaleLayout({
  children,
  params: { locale }
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const { messages } = await getMessages(locale);

  const themeClass = getThemeClass();
  return (
    <html lang={locale} className={themeClass} suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <NextIntlClientProvider locale={locale} messages={messages}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <CartProvider>
              <div className="flex min-h-screen flex-col">{children}</div>
            </CartProvider>
          </ThemeProvider>
        </NextIntlClientProvider>
        <SpeedInsights />
      </body>
    </html>
  );
}