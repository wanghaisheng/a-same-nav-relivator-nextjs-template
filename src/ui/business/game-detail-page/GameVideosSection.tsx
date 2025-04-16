import React from 'react';
import { useTranslations } from 'next-intl';

export interface GameVideosSectionProps {
  videos?: { title: string; thumbnail?: string; url: string }[];
}

export const GameVideosSection: React.FC<GameVideosSectionProps> = ({ videos }) => {
  const t = useTranslations('GameDetail');
  if (!videos || videos.length === 0) return null;
  return (
    <section className="section">
      <h2 className="text-xl font-semibold mb-4 text-purple-800">{t('videosTitle', { defaultMessage: 'Featured Videos' })}</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {videos.map((v, idx) => (
          <a key={idx} href={v.url} target="_blank" rel="noopener noreferrer" className="block group">
            <img src={v.thumbnail ?? ''} alt={v.title} className="w-full h-40 object-cover rounded mb-2 group-hover:opacity-80 transition" />
            <div className="text-center font-medium">{v.title}</div>
          </a>
        ))}
      </div>
    </section>
  );
};
