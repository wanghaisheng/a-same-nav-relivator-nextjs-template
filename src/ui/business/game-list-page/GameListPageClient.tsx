import React from "react";
import type { GameCardProps } from "../game-card/types";

export type GameListPageClientProps = {
  games: any[];
  error?: string | null;
  CardComponent?: React.FC<GameCardProps>;
};

export function GameListPageClient({ games, error, CardComponent }: GameListPageClientProps) {
  if (error) {
    return <div style={{ color: 'red' }}>加载失败：{error}</div>;
  }
  if (!games || games.length === 0) {
    return <div>暂无游戏数据</div>;
  }
  return (
    <div className="game-list-page">
      <h2>游戏列表</h2>
      <ul>
        {games.map(game => (
          <li key={game.id}>
            {CardComponent ? <CardComponent game={game} /> : (game.name ?? '未命名游戏') + (game.category ? `（${game.category}）` : '')}
          </li>
        ))}
      </ul>
    </div>
  );
}
