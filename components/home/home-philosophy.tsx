import Image from "next/image"
import { useTranslations } from "next-intl"

export default function HomePhilosophy() {
  const t = useTranslations('home.philosophy')

  return (
    <div className="container relative overflow-hidden rounded-xl bg-white">
      <div className="pt-8 pb-8">
        <h2 className="text-xl md:text-2xl font-bold text-gray-900">{t('title')}</h2>
        <p className="text-sm md:text-base text-gray-600 mt-2 max-w-4xl">{t('desc')}</p>
      </div>
    </div>
  )
}
