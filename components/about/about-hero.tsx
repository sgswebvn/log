import Image from "next/image"
import Link from "next/link"
import { ChevronRight } from 'lucide-react'
import { useTranslations, useLocale } from "next-intl"

export default function AboutHero() {
  const t = useTranslations('about.hero')
  const locale = useLocale()

  return (
    <section className="relative h-[220px] sm:h-[280px] md:h-[340px] w-full">
      <Image
        src="/images/about-hero.png"
        alt="About hero background"
        fill
        priority
        className="object-cover"
      />
      <div className="absolute inset-0 bg-black/50" />
      <div className="relative h-full container mx-auto px-4 flex flex-col justify-center text-white">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-wide">
          {t('title')}
        </h1>
        <nav className="mt-2 flex items-center text-white/80 text-xs sm:text-sm">
          <Link href={`/${locale}`} className="hover:text-white">{t('crumbs.home')}</Link>
          <ChevronRight className="mx-2 h-4 w-4" />
          <span className="hover:text-white">{t('crumbs.about')}</span>
          <ChevronRight className="mx-2 h-4 w-4" />
          <span className="text-white">{t('crumbs.aboutUs')}</span>
        </nav>
      </div>
    </section>
  )
}
