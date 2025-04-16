import { gamesService } from '@/services';
import { GameListSection } from '@/ui/business/game-section/GameListSection';
import { notFound } from 'next/navigation';
import { getPageMeta } from '@/ui/configs/meta.config';
import { HeaderClient } from '@/ui/business/header/HeaderClient';
import { FooterClient } from '@/ui/business/footer/FooterClient';

export async function generateMetadata({ params }: { params: { locale: string } }) {
  const { locale } = await params;
  // 统一从 messages 读取 meta，页面 key 建议为 GameListPage
  const meta = getPageMeta('GameListPage', locale);
  return {
    title: meta.title,
    description: meta.description,
  };
}

export default async function GamesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  // 可根据业务实际调整分区和筛选逻辑
  const [featured, popular, recent, all] = await Promise.all([
    gamesService.getAll(locale, undefined), // 可扩展为 getFeatured
    gamesService.getAll(locale), // 可扩展为 getPopular
    gamesService.getAll(locale), // 可扩展为 getRecent
    gamesService.getAll(locale),
  ]);
  // 默认展示全部游戏列表
  if (!all || all.length === 0) {
    notFound();
  }
  return (
    <div className="flex min-h-screen flex-col">
      <HeaderClient />
      <main className="flex-1 py-10">
        <GameListSection title="Featured Games" games={featured} />
        <GameListSection title="Popular Games" games={popular} />
        <GameListSection title="Recently Updated" games={recent} />
        <GameListSection title="All Games" games={all} />
      </main>
      <FooterClient />
    </div>
  );
}
