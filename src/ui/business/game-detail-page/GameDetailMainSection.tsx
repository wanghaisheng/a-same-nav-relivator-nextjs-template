import React from 'react';
import type { GameItem } from '@/db/sqlite/schema/game_items';
import { useTranslations } from 'next-intl';

interface GameDetailMainSectionProps {
  game?: GameItem | null;
}

export const GameDetailMainSection: React.FC<GameDetailMainSectionProps> = ({ game }) => {
  const t = useTranslations('GameDetail');
  if (!game) return null;
  return (
    <section className="section">
      <div className="flex flex-col md:flex-row gap-6 items-center">
        <img
          src={game.image ?? ''}
          alt={game.name ?? t('game')}
          className="w-64 h-64 object-cover rounded shadow"
        />
        <div className="flex-1">
          <h1 className="text-2xl font-bold mb-2">{game.name ?? t('unnamedGame')}</h1>
          <div className="mb-2 text-gray-500">{game.category ?? t('unknownCategory')}</div>
          <div className="mb-4">{game.description ?? t('noDescription')}</div>
          {/* 试玩/进入游戏按钮，可根据实际需求扩展 */}
          {game.slug && (
            <a
              href={game.slug.startsWith('http') ? game.slug : undefined}
              className="inline-block bg-primary text-white px-4 py-2 rounded hover:bg-primary/80 transition"
              target="_blank"
              rel="noopener noreferrer"
            >
              {t('playNow')}
            </a>
          )}
        </div>
      </div>
    </section>
  );
};
