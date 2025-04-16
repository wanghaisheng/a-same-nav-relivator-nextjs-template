import { Badge } from '@/ui/components/core/badge';
import { useTranslations } from 'next-intl';

interface ProductMetaProps {
  rating?: number;
  sales?: number;
  stock?: number;
  t?: ReturnType<typeof useTranslations> | any;
}

export function ProductMeta({ rating, sales, stock, t }: ProductMetaProps) {
  const tClient = t || useTranslations('ProductDetailPage');
  return (
    <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
      {rating !== undefined && (
        <span>{tClient('meta.rating', { rating })}</span>
      )}
      {sales !== undefined && (
        <span>{tClient('meta.sales', { sales })}</span>
      )}
      {stock !== undefined && (
        <Badge color={stock > 0 ? 'success' : 'danger'}>
          {stock > 0 ? tClient('meta.inStock') : tClient('meta.outOfStock')}
        </Badge>
      )}
    </div>
  );
}
