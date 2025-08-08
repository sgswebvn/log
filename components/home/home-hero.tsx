import Image from "next/image"
import { useTranslations } from "next-intl"

export default function HomeHero() {
  const t = useTranslations('home.hero')
  return (
    <section className="relative w-full h-[420px] sm:h-[520px]">
      <Image
        src="/images/home-hero.png"
        alt={t('alt')}
        fill
        priority
        className="object-cover"
      />
      <div className="absolute inset-0 bg-black/30" />
      <div className="relative container mx-auto px-4 h-full flex items-center">
        <h1 className="text-white font-extrabold leading-tight text-3xl sm:text-5xl max-w-4xl tracking-wide">
          {t('titleLine1')}<br/>
          {t('titleLine2')}<br/>
          {t('titleLine3')}
        </h1>
      </div>
    </section>
  )
}
