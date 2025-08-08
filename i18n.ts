import { notFound } from 'next/navigation';
import { getRequestConfig } from 'next-intl/server';

const locales = ['en', 'vi'] as const;

export default getRequestConfig(async ({ requestLocale }) => {
  const locale = await requestLocale;
  return {
    messages: (await import(`./messages/${locale}.json`)).default
  };
});
