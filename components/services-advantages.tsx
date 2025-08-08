"use client"

import { CheckCircle2 } from 'lucide-react'
import { useTranslations } from "next-intl"

export default function ServicesAdvantages() {
  const t = useTranslations('servicesPage.advantages')
  const items = t.raw('list') as string[]
  return (
    <section id="advantages">
      <h2 className="text-lg font-semibold text-gray-900">{t('title')}</h2>
      <p className="text-gray-600 mt-2">{t('desc')}</p>
      <ul className="mt-6 space-y-3">
        {items.map((txt, i) => (
          <li key={i} className="flex gap-3">
            <CheckCircle2 className="h-5 w-5 text-blue-600 mt-[2px]" />
            <span className="text-gray-700">{txt}</span>
          </li>
        ))}
      </ul>
    </section>
  )
}
