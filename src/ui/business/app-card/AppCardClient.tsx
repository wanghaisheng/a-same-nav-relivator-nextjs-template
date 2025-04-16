import React from "react";
import type { AppItem } from '@/db/types';
import { useTranslations } from 'next-intl';

export type AppCardProps = {
  app?: AppItem;
  onFavorite?: () => void;
  onDownload?: () => void;
};

export const AppCardClient: React.FC<AppCardProps> = ({ app, onFavorite, onDownload }) => {
  const t = useTranslations('AppCard');
  if (!app) return <div className="app-card empty">{t('noAppInfo')}</div>;
  return (
    <div className="app-card">
      <img src={app.image ?? ''} alt={app.name ?? t('app')}
        className="app-card-img" />
      <h3>{app.name ?? t('unnamedApp')}</h3>
      <div>{app.description ?? t('noDescription')}</div>
      <div>{t('category')}: {app.category ?? t('unknown')}</div>
      <div className="app-card-actions">
        <button onClick={onFavorite}>{t('favorite')}</button>
        <button onClick={onDownload}>{t('download')}</button>
      </div>
    </div>
  );
};
