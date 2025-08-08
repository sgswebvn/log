import Image from "next/image"
import { useTranslations, useLocale } from "next-intl"
import Link from "next/link"

export default function ServicesHero() {
  const t = useTranslations('servicesPage.hero')
  const locale = useLocale()
  const tabs = ['overview', 'services', 'advantages', 'contact']
  return (
    <section>
      <div className="relative h-[240px] sm:h-[320px] md:h-[380px]">
        <Image src="/images/services-hero.png" alt={t('alt')} fill priority className="object-cover" />
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative container mx-auto px-4 h-full flex items-end pb-6">
          <h1 className="text-white text-2xl sm:text-3xl font-semibold">{t('title')}</h1>
        </div>
      </div>

      <div className="border-b">
        <div className="container mx-auto px-4">
          <nav className="flex gap-6 overflow-x-auto py-3 text-sm">
            {tabs.map((k, i) => (
              <Link key={i} href={`/${locale}/services#${k}`} className={i===0 ? "text-blue-600 font-medium border-b-2 border-blue-600 pb-2" : "text-gray-600 hover:text-gray-900 pb-2"}>
                {t(`tabs.${k}`)}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </section>
  )
}
