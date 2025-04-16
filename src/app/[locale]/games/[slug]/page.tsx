import { gamesService } from '@/services';
import { GameDetailPageSection } from '@/ui/business/game-detail-page/GameDetailPageServer';
import { HeaderClient } from '@/ui/business/header/HeaderClient';
import { FooterClient } from '@/ui/business/footer/FooterClient';
import { GameCardClient } from '@/ui/business/game-card';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Game Detail',
  description: 'Game detail page',
};

export default async function GameDetailPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params;
  // 通过 slug 查询游戏详情
  const games = await gamesService.getAll(locale);
  const game = games.find(g => g.slug === slug);
  if (!game) {
    notFound();
  }
  return (
    <div className="flex min-h-screen flex-col">
      <HeaderClient />
      <main className="flex-1 py-10">
        {/* 复用 GameCardClient 作为详情展示，或后续可扩展专用详情组件 */}
        <div className="max-w-2xl mx-auto">
          <GameCardClient game={game} />
        </div>
      </main>
      <FooterClient />
    </div>
  );
}
