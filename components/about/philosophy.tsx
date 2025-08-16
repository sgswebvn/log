"use client"

import Image from "next/image"
import { useTranslations } from "next-intl"
import { Card, CardContent } from "@/components/ui/card"
import { Target, ShieldCheck } from 'lucide-react'

export default function Philosophy() {
  const t = useTranslations('about.philosophy')

  return (
    <div>
      <h2 className="text-2xl font-semibold text-gray-900 text-center">{t('title')}</h2>
      <p className="text-gray-600 text-sm sm:text-base text-center max-w-3xl mx-auto mt-3">
        {t('intro')}
      </p>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
        <Card className="text-center">
          <CardContent className="p-6">
            <div className="mx-auto w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
              <Target className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="mt-3 font-semibold">{t('vision.title')}</h3>
            <p className="mt-2 text-sm text-gray-600">{t('vision.desc')}</p>
          </CardContent>
        </Card>

        <div className="relative aspect-[16/9] w-full overflow-hidden rounded-lg">
          <Image
            src="/placeholder-4fzhd.png"
            alt={t('centerAlt')}
            fill
            className="object-cover"
          />
        </div>

        <Card className="text-center">
          <CardContent className="p-6">
            <div className="mx-auto w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
              <ShieldCheck className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="mt-3 font-semibold">{t('mission.title')}</h3>
            <p className="mt-2 text-sm text-gray-600">{t('mission.desc')}</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
