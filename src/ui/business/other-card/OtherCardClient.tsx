import React from "react";
import type { OtherItem } from '@/db/types';
import { useTranslations } from 'next-intl';

export type OtherCardProps = {
  item?: OtherItem;
  onFavorite?: () => void;
  onDownload?: () => void;
};

export const OtherCardClient: React.FC<OtherCardProps> = ({ item, onFavorite, onDownload }) => {
  const t = useTranslations('OtherCard');
  if (!item) return <div className="other-card empty">{t('noInfo')}</div>;
  return (
    <div className="other-card">
      <img src={item.image ?? ''} alt={item.name ?? t('item')} className="other-card-img" />
      <h3>{item.name ?? t('unnamedItem')}</h3>
      <div>{item.description ?? t('noDescription')}</div>
      <div>{t('category')}: {item.category ?? t('unknown')}</div>
      <div className="other-card-actions">
        <button onClick={onFavorite}>{t('favorite')}</button>
        <button onClick={onDownload}>{t('download')}</button>
      </div>
    </div>
  );
};
