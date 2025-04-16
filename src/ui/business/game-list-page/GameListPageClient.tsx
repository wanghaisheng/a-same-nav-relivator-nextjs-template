'use client';
import React from "react";
import type { GameCardProps } from "../game-card/types";

export type GameListPageClientProps = {
  games: any[];
  error?: string | null;
  CardComponent?: React.FC<GameCardProps>;
  t: any; // next-intl translations instance
};

export function GameListPageClient({ games, error, CardComponent, t }: GameListPageClientProps) {
  if (error) {
    return <div style={{ color: 'red' }}>{t('loadFailed')}: {error}</div>;
  }
  if (!games || games.length === 0) {
    return <div>{t('noGames')}</div>;
  }
  return (
    <div className="game-list-page">
      <h2>{t('title')}</h2>
      <ul>
        {games.map(game => (
          <li key={game.id}>
            {CardComponent ? <CardComponent game={game} /> : (game.name ?? t('unnamedGame')) + (game.category ? `（${game.category}）` : '')}
          </li>
        ))}
      </ul>
    </div>
  );

}
