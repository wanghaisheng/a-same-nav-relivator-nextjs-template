import React from 'react';
import { useTranslations } from 'next-intl';

export interface GameCharactersSectionProps {
  characters?: { name: string; image?: string; description?: string }[];
}

export const GameCharactersSection: React.FC<GameCharactersSectionProps> = ({ characters }) => {
  const t = useTranslations('GameDetail');
  if (!characters || characters.length === 0) return null;
  return (
    <section className="section">
      <h2 className="text-xl font-semibold mb-4">{t('charactersTitle', { defaultMessage: 'All Characters' })}</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {characters.map((c, idx) => (
          <div key={idx} className="flex flex-col items-center">
            <img src={c.image ?? ''} alt={c.name} className="w-24 h-24 object-cover rounded-full mb-2" />
            <div className="font-bold">{c.name}</div>
            <div className="text-xs text-gray-500 text-center">{c.description}</div>
          </div>
        ))}
      </div>
    </section>
  );
};
