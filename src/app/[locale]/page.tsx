import { ArrowRight, Clock, ShoppingBag, Star, Truck } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { FooterClient } from "@/ui/business/footer/FooterClient";
import { HeaderClient } from "@/ui/business/header/HeaderClient";
import { Button } from "@/ui/components/core/button";
import { HomeCategoriesServer } from '@/ui/business/home-categories/HomeCategoriesServer';
// import { HomeProductsServer } from '@/ui/business/home-products/HomeProductsServer';
// import { HomeFeaturesServer } from '@/ui/business/home-features/HomeFeaturesServer';
import { HomeTestimonialsServer } from '@/ui/business/home-testimonials/HomeTestimonialsServer';
import { HeroSectionClient } from '@/ui/business/hero/HeroSectionClient';
import { useTranslations } from 'next-intl';

export default function HomePage() {
  const t = useTranslations('HomePage');
  return (
    <>
      <HeaderClient />
      <main className="flex-1">
        <HeroSectionClient />
        <HomeCategoriesServer />
        {/* <HomeProductsServer /> */}
        {/* <HomeFeaturesServer /> */}
        <HomeTestimonialsServer />
      </main>
      <FooterClient />
    </>
  );
}
