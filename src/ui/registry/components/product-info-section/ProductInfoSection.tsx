import { Badge } from '@/ui/components/core/badge';
import { useTranslations } from 'next-intl';

interface ProductInfoSectionProps {
  name?: string;
  description?: string;
  price?: number | string;
  tags?: string[];
  t?: ReturnType<typeof useTranslations> | any;
}

export function ProductInfoSection({ name, description, price, tags, t }: ProductInfoSectionProps) {
  const tClient = t || useTranslations('ProductDetailPage');
  return (
    <section className="space-y-2">
      <h1 className="text-2xl font-bold">{name || tClient('unknownName')}</h1>
      <div className="text-gray-800 whitespace-pre-wrap">{description || tClient('noDescription')}</div>
      {price && <div className="text-lg text-primary font-semibold">{tClient('price', { price })}</div>}
      {tags && tags.length > 0 && (
        <div className="flex flex-wrap gap-2 pt-2">
          {tags.map((tag) => (
            <Badge key={tag}>{tag}</Badge>
          ))}
        </div>
      )}
    </section>
  );
}
