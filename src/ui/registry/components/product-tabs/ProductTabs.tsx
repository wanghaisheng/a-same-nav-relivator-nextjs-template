"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/ui/components/core/tabs';
import { Card } from '@/ui/components/core/card';
import { useTranslations } from 'next-intl';

interface ProductTabsProps {
  description?: string;
  reviews?: React.ReactNode;
  details?: React.ReactNode;
  t?: ReturnType<typeof useTranslations> | any;
}

export function ProductTabs({ description, reviews, details, t }: ProductTabsProps) {
  const tClient = t || useTranslations('ProductDetailPage');
  return (
    <Tabs defaultValue="description" className="w-full">
      <TabsList>
        <TabsTrigger value="description">{tClient('tabs.description')}</TabsTrigger>
        <TabsTrigger value="details">{tClient('tabs.details')}</TabsTrigger>
        <TabsTrigger value="reviews">{tClient('tabs.reviews')}</TabsTrigger>
      </TabsList>
      <TabsContent value="description">
        <Card className="py-4">
          {description || tClient('noDescription')}
        </Card>
      </TabsContent>
      <TabsContent value="details">
        <Card className="py-4">
          {details || tClient('noDetails')}
        </Card>
      </TabsContent>
      <TabsContent value="reviews">
        <Card className="py-4">
          {reviews || tClient('noReviews')}
        </Card>
      </TabsContent>
    </Tabs>
  );
}
