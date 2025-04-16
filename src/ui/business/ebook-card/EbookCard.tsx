import { Card } from '@/ui/components/core/card';
import { Badge } from '@/ui/components/core/badge';
import { Button } from '@/ui/components/core/button';
import type { EbookCardProps } from './';
import { useTranslations } from 'next-intl';

export function EbookCard({ ebook, onFavorite, onDownload }: EbookCardProps) {
  const t = useTranslations('ebook');
  if (!ebook) return null;
  return (
    <Card className="flex flex-col h-full">
      {/* 封面 */}
      {ebook.image ? (
        <img
          src={ebook.image}
          alt={ebook.name || t('noTitle')}
          className="w-full h-40 object-cover rounded-t"
        />
      ) : (
        <div className="w-full h-40 bg-gray-100 flex items-center justify-center text-gray-400">
          {t('noCover')}
        </div>
      )}
      <div className="flex-1 flex flex-col p-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-bold text-lg">{ebook.name || t('noTitle')}</h3>
          {ebook.category && <Badge>{ebook.category}</Badge>}
        </div>
        <p className="text-xs text-gray-600 flex-1 line-clamp-3 mb-2">
          {ebook.description || t('noDescription')}
        </p>
        <div className="flex gap-2 mt-auto">
          {onFavorite && (
            <Button variant="secondary" onClick={onFavorite}>
              {t('favorite')}
            </Button>
          )}
          {onDownload && (
            <Button onClick={onDownload}>{t('download')}</Button>
          )}
        </div>
      </div>
    </Card>
  );
}
