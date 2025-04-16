import React from 'react';
import { GameCardClient } from '@/ui/business/game-card/GameCardClient';
import { useTranslations } from 'next-intl';
import Link from 'next/link';

interface GameListSectionProps {
  title: string;
  games: GameItem[];
  rowCount?: number; // 显示几行
  itemsPerRow?: number; // 每行几个
  viewAllHref?: string;
}

export const GameListSection: React.FC<GameListSectionProps> = ({
  title,
  games = [],
  rowCount = 2,
  itemsPerRow = 4,
  viewAllHref
}) => {
  const t = useTranslations('GameSection');
  // 计算要展示的最大数量
  const maxVisible = rowCount * itemsPerRow;
  const visibleGames = games.slice(0, maxVisible);
  return (
    <section className="game-list-section py-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold">{title}</h2>
        {games.length > maxVisible && viewAllHref && (
          <Link href={viewAllHref} className="text-primary hover:underline text-sm">{t('viewAll')}</Link>
        )}
      </div>
      <div
        className="grid gap-4"
        style={{
          gridTemplateColumns: `repeat(auto-fit, minmax(180px, 1fr))`,
        }}
      >
        {visibleGames.map(game => (
          <GameCardClient key={game.id} game={game} />
        ))}
      </div>
    </section>
  );
};

// 响应式样式建议：
// 在 globals.css 或本地样式中配置：
// .game-list-section .grid {
//   grid-template-columns: repeat(2, minmax(0, 1fr));
// }
// @media (min-width: 640px) { .game-list-section .grid { grid-template-columns: repeat(3, minmax(0, 1fr)); } }
// @media (min-width: 1024px) { .game-list-section .grid { grid-template-columns: repeat(4, minmax(0, 1fr)); } }
// 可根据 itemsPerRow 参数动态调整，也可通过 style 属性控制。
