import {NextIntlClientProvider} from 'next-intl';
import {getMessages} from 'next-intl/server';
import { Inter } from 'next/font/google'
import SideButtons from '@/components/side-buttons'

const inter = Inter({ subsets: ['latin'] })

export function generateStaticParams() {
  return [{ locale: 'vi' }, { locale: 'en' }]
}

export default async function LocaleLayout({
  children,
  params: {locale}
}: {
  children: React.ReactNode;
  params: {locale: string};
}) {
  const messages = await getMessages();
  return (
    <html lang={locale}>
      <body className={inter.className}>
        <NextIntlClientProvider messages={messages}>
          {children}
          <SideButtons />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
