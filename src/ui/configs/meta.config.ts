import zhMessages from '@/app/messages/zh.json';
import enMessages from '@/app/messages/en.json';

/**
 * 从多语言 messages 文件读取页面 meta 信息，统一维护。
 * @param pageKey 如 'GameListPage'、'ProductListPage' 等
 * @param locale 'zh' | 'en'
 */
export function getPageMeta(pageKey: string, locale: string): { title: string; description: string } {
  let messages: any = zhMessages;
  if (locale === 'en') messages = enMessages;
  const meta = messages[pageKey];
  if (!meta) return { title: '', description: '' };
  return {
    title: meta.title || '',
    description: meta.description || ''
  };
}
