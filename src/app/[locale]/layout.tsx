import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "./globals-purple.css";
import "./globals-bahause.css";
import "./globals-dramatic.css";
import "./globals-Neumorphism.css";
import "./globals-skeuomorphism.css";
import { CartProvider } from "~/lib/hooks/use-cart";
import { ThemeProvider } from "~/ui/components/website/theme-provider";
import {notFound} from 'next/navigation';
import {routing} from '@/i18n/routing';
import {NextIntlClientProvider, hasLocale} from 'next-intl';
import { getMessages } from "../i18n/request";
import { ThemeClassProvider } from "~/ui/components/website/theme-class-provider";

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

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{locale: string}>;
}) {
  const {locale} = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  const { messages } = await getMessages(locale);
  return (
    <ThemeClassProvider lang={locale}>
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
    </ThemeClassProvider>
  );
}