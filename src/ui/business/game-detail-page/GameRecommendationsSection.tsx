import React from 'react';
import { useTranslations } from 'next-intl';

export interface GameRecommendationsSectionProps {
  recommendations?: { id: string; name: string; image?: string; link?: string }[];
}

export const GameRecommendationsSection: React.FC<GameRecommendationsSectionProps> = ({ recommendations }) => {
  const t = useTranslations('GameDetail');
  if (!recommendations || recommendations.length === 0) return null;
  return (
    <section className="section">
      <h2 className="text-xl font-semibold mb-4 text-purple-800">{t('recommendationsTitle', { defaultMessage: 'Game Recommendations' })}</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {recommendations.map((rec) => (
          <a key={rec.id} href={rec.link} className="block group">
            <img src={rec.image ?? ''} alt={rec.name} className="w-full h-32 object-cover rounded mb-2 group-hover:opacity-80 transition" />
            <div className="text-center font-medium">{rec.name}</div>
          </a>
        ))}
      </div>
    </section>
  );
};
