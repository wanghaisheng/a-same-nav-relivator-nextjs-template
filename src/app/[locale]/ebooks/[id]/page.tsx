import { EbookDetailPageServer } from '@/ui/business/ebook-detail-page/EbookDetailPageServer';
import { ebooksService } from '~/services';
import { notFound } from 'next/navigation';

export default async function Page({ params, locale }: { params: { id: string }, locale: string }) {

  const ebook = await ebooksService.getById(params.id);
  if (!ebook) return notFound();
  return <EbookDetailPageServer ebook={ebook} locale={locale} />;
}