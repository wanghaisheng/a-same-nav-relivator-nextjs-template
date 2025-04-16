import { Card } from '@/ui/components/core/card';
import { Badge } from '@/ui/components/core/badge';
import { Button } from '@/ui/components/core/button';
import type { EbookItem } from '@/db/types';

export type EbookCardProps = {
  ebook?: EbookItem | null;
  onFavorite?: () => void;
  onDownload?: () => void;
};

export const EbookCardClient: React.FC<EbookCardProps> = ({ ebook, onFavorite, onDownload }) => {
  if (!ebook) {
    return (
      <Card className="flex flex-col h-full items-center justify-center text-gray-400 min-h-40">
        未找到电子书信息
      </Card>
    );
  }
  return (
    <Card className="flex flex-col h-full">
      {/* 封面 */}
      {ebook.image ? (
        <img
          src={ebook.image}
          alt={ebook.name || '未命名电子书'}
          className="w-full h-40 object-cover rounded-t"
        />
      ) : (
        <div className="w-full h-40 bg-gray-100 flex items-center justify-center text-gray-400">
          未找到封面
        </div>
      )}
      <div className="flex-1 flex flex-col p-4">
        <div className="flex items-center gap-2 mb-2">
          {ebook.category && <Badge>{ebook.category}</Badge>}
        </div>
        <p className="text-xs text-gray-600 flex-1 line-clamp-3 mb-2">
          {ebook.description || '电子书描述未找到'}
        </p>
        <div className="flex gap-2 mt-auto">
          {onFavorite && (
            <Button variant="secondary" onClick={onFavorite}>
              收藏
            </Button>
          )}
          {onDownload && (
            <Button onClick={onDownload}>下载</Button>
          )}
        </div>
      </div>
    </Card>
  );
};
