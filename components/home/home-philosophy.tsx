import Image from "next/image"
import { useTranslations } from "next-intl"

export default function HomePhilosophy() {
  const t = useTranslations('home.philosophy')

  return (
    <div className="relative overflow-hidden rounded-xl bg-white">
      <div className="px-6 md:px-10 py-10">
        <h2 className="text-xl md:text-2xl font-bold text-gray-900">{t('title')}</h2>
        <p className="text-sm md:text-base text-gray-600 mt-2 max-w-4xl">{t('desc')}</p>
      </div>
    </div>
  )
}
