import { EbookDetailPageServer } from '@/ui/business/ebook-detail-page/EbookDetailPageServer';
import { ebooksService } from '~/services';
import { notFound } from 'next/navigation';
export default async function Page({ params }: { params: Promise<{ id: string, locale: string }> }) {
  const { id, locale } = await params;
  console.log('ebook detail page locale',locale)
  console.log('ebook detail page id',id)
  const ebook = await ebooksService.getById(id);
  if (!ebook) return notFound();
  return <EbookDetailPageServer ebook={ebook} locale={locale} />;
}
