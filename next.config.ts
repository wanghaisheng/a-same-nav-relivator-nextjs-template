import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const nextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      { protocol: "https", hostname: "**.githubassets.com" },
      { protocol: "https", hostname: "**.githubusercontent.com" },
      { protocol: "https", hostname: "**.googleusercontent.com" },
      { protocol: "https", hostname: "**.unsplash.com" },
      { protocol: "https", hostname: "api.github.com" },
    ],
  },
  eslint: { ignoreDuringBuilds: true },
} satisfies NextConfig;

const withNextIntl = createNextIntlPlugin(
  {
    requestConfig: './src/app/i18n/request.ts'

  }
);

export default withNextIntl(nextConfig);
