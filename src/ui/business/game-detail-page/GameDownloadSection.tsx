import React from 'react';
import { useTranslations } from 'next-intl';

export interface GameDownloadSectionProps {
  downloads?: { method: string; description?: string; link?: string }[];
}

export const GameDownloadSection: React.FC<GameDownloadSectionProps> = ({ downloads }) => {
  const t = useTranslations('GameDetail');
  if (!downloads || downloads.length === 0) return null;
  return (
    <section className="section">
      <h2 className="text-xl font-semibold mb-4">{t('downloadTitle', { defaultMessage: 'How to Download' })}</h2>
      <ul className="space-y-2">
        {downloads.map((d, idx) => (
          <li key={idx}>
            <span className="font-bold">{d.method}</span>: {d.description}
            {d.link && (
              <a href={d.link} className="ml-2 text-primary underline" target="_blank" rel="noopener noreferrer">
                {t('downloadLink', { defaultMessage: 'Download' })}
              </a>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
};
