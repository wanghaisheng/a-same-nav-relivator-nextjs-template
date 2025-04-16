import React from "react";
import { gamesService } from "../../../services";
import { GameCardClient } from "../game-card";
import type { ItemTypeValue } from "../../../db/sqlite/schema/game_items";
import { GameListPageClient } from "./GameListPageClient";
import { getTranslations } from 'next-intl/server';

export interface GameListPageServerProps {
  locale?: string;
}

export default async function GameListPageServer({ locale = 'zh' }: GameListPageServerProps) {
  let games = [];
  let error: string | null = null;
  const t = await getTranslations({ locale, namespace: 'GameListPage' });
  
  try {
    games = (await gamesService.getAll()).filter(game => game.type === "GAME" as ItemTypeValue);
  } catch (e: any) {
    error = e.message || t('loadFailed');
  }
  return <GameListPageClient games={games} error={error} CardComponent={GameCardClient} t={t} />;
}
