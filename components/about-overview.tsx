"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { useTranslations } from "next-intl"

export default function AboutOverview() {
  const t = useTranslations('about.overview')

  return (
    <div className="py-10 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
      <div className="relative aspect-[16/11] w-full overflow-hidden rounded-lg">
        <Image
          src="/team-group-photo-on-stage.png"
          alt={t('imageAlt')}
          fill
          className="object-cover"
        />
      </div>
      <div>
        <h2 className="text-xl sm:text-2xl font-semibold text-gray-900">
          {t('heading')}
        </h2>
        <p className="mt-3 text-sm sm:text-base text-gray-600 leading-relaxed">
          {t('paragraph1')}
        </p>
        <p className="mt-3 text-sm sm:text-base text-gray-600 leading-relaxed">
          {t('paragraph2')}
        </p>
        <Button className="mt-6 bg-blue-600 hover:bg-blue-700">
          {t('cta')}
        </Button>
      </div>
    </div>
  )
}
