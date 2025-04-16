import React from "react";
import type { GameItem } from '@/db/types';
import { useTranslations } from 'next-intl';

export type GameCardProps = {
  game?: GameItem;
  onFavorite?: () => void;
  onDownload?: () => void;
};

export const GameCardClient: React.FC<GameCardProps> = ({ game, onFavorite, onDownload }) => {
  const t = useTranslations('GameCard');
  if (!game) return <div className="game-card empty">{t('noGameInfo')}</div>;
  return (
    <div className="game-card">
      <img src={game.image ?? ''} alt={game.name ?? t('game')} className="game-card-img" />
      <h3>{game.name ?? t('unnamedGame')}</h3>
      <div>{game.description ?? t('noDescription')}</div>
      <div>{t('category')}: {game.category ?? t('unknown')}</div>
      <div className="game-card-actions">
        <button onClick={onFavorite}>{t('favorite')}</button>
        <button onClick={onDownload}>{t('download')}</button>
      </div>
    </div>
  );
};
