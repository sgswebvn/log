"use client"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useTranslations } from "next-intl"

export default function TrackingBar() {
  const t = useTranslations('home.track')
  return (
    <section className="bg-[#2f66cf]">
      <div className="container mx-auto px-4 py-4 flex flex-col md:flex-row gap-3 md:items-center">
        <p className="text-white/95 text-sm md:text-base md:flex-1">{t('label')}</p>
        <div className="flex w-full md:w-auto gap-2">
          <Input placeholder={t('placeholder')} className="bg-white text-gray-800" />
          <Button className="bg-[#ffb400] hover:bg-[#ffa000] text-black font-semibold">{t('button')}</Button>
        </div>
      </div>
    </section>
  )
}
