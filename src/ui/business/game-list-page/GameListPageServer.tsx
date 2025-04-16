import React from "react";
import { gamesService } from "../../../services";
import { GameCardClient } from "../game-card";
import type { ItemTypeValue } from "../../../db/sqlite/schema/items";
import { GameListPageClient } from "./GameListPageClient";

export default async function GameListPageServer() {
  let games = [];
  let error: string | null = null;
  try {
    games = (await gamesService.getAll()).filter(game => game.type === "GAME" as ItemTypeValue);
  } catch (e: any) {
    error = e.message || "未知错误";
  }
  return <GameListPageClient games={games} error={error} CardComponent={GameCardClient} />;
}
