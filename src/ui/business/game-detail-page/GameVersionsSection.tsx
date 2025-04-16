import React from 'react';
import { useTranslations } from 'next-intl';

export interface GameVersionsSectionProps {
  versions?: { title: string; description?: string }[];
}

export const GameVersionsSection: React.FC<GameVersionsSectionProps> = ({ versions }) => {
  const t = useTranslations('GameDetail');
  if (!versions || versions.length === 0) return null;
  return (
    <section className="section">
      <h2 className="text-xl font-semibold mb-4 text-purple-800">{t('versionsTitle', { defaultMessage: 'Game Versions' })}</h2>
      <ul className="space-y-2">
        {versions.map((v, idx) => (
          <li key={idx}>
            <div className="font-bold">{v.title}</div>
            <div className="text-gray-600 text-sm">{v.description}</div>
          </li>
        ))}
      </ul>
    </section>
  );
};
