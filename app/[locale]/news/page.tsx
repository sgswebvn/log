"use client"

import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Breadcrumbs from '@/components/breadcrumbs'
import Link from 'next/link'
import Image from 'next/image'
import { useLocale, useTranslations } from 'next-intl'
import { useMemo, useState } from 'react'

type Item = {
  id: string
  title: string
  date: string
  categoryKey: 'nep'|'promotion'|'exhibition'|'media'|'industry'|'videos'
  img?: string
  excerpt?: string
  type: "video" | "article"
  videoId?: string
}

const DATA: Item[] = [
  { id: '1', title: 'The China-Europe Railway Express...', date: '2025-07-25', categoryKey: 'nep', img: '/cross-border-train-event.png', excerpt: 'Sagoke deepens services in Europe.', type: 'article' },
  { id: '2', title: 'ASEAN Trade Promotion Council Delegation Visits Sagoke Group...', date: '2025-07-23', categoryKey: 'promotion', img: '/exhibition-event.png', excerpt: 'Regional logistics corridors.', type: 'article' },
  { id: '3', title: 'Global Transport Connectivity Forum 2025', date: '2025-07-01', categoryKey: 'exhibition', img: '/china-europe-freight.png', excerpt: 'Promoting Europe-Asia rail cooperation.', type: 'article' },
  { id: 'v1', title: 'Corporate Video: Sagoke Express Overview', date: '2025-06-10', categoryKey: 'videos', type: 'video', videoId: 'ysz5S6PUM-U' },
  { id: 'v2', title: 'Route Highlight: Xi’an–Moscow', date: '2025-06-01', categoryKey: 'videos', type: 'video', videoId: 'jNQXAC9IVRw' }
]

const TAB_KEYS = ['all','nep','promotion','exhibition','media','industry','videos'] as const
type TabKey = typeof TAB_KEYS[number]

export default function NewsPage() {
  const t = useTranslations('newsPage')
  const locale = useLocale()
  const [tab, setTab] = useState<TabKey>('all')

  const items = useMemo(() => {
    if (tab === 'all') return DATA
    if (tab === 'videos') return DATA.filter(d => d.type === 'video')
    return DATA.filter(d => d.categoryKey === tab)
  }, [tab])

  return (
    <div className="bg-gray-50 min-h-screen">
      <Header />
      <Breadcrumbs />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-semibold text-gray-900">{t('title').replace('NEP', 'Sagoke')}</h1>
        <p className="text-gray-600 mt-2">{t('desc').replace('NEP', 'Sagoke')}</p>

        <div className="mt-6 overflow-x-auto">
          <div className="flex gap-4 min-w-max">
            {TAB_KEYS.map((k) => (
              <button
                key={k}
                onClick={() => setTab(k)}
                className={`px-3 py-2 text-sm rounded-full border transition-colors ${tab===k?'bg-blue-600 text-white border-blue-600 shadow-sm':'bg-white hover:bg-gray-50'}`}
              >
                {t(`tabs.${k}`)}
              </button>
            ))}
          </div>
        </div>

        {/* Articles or Videos */}
        <div className="mt-6 space-y-6">
          {items.map(item => (
            item.type === 'video' ? (
              <article key={item.id} className="rounded-xl border bg-white p-4 shadow-sm">
                <div className="aspect-video w-full rounded-lg overflow-hidden bg-black">
                  <iframe
                    className="w-full h-full"
                    src={`https://www.youtube.com/embed/${item.videoId}`}
                    title={item.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                </div>
                <h3 className="mt-3 font-semibold">{item.title}</h3>
                <div className="text-xs text-gray-500">{new Date(item.date).toLocaleDateString(locale==='vi'?'vi-VN':'en-US')}</div>
              </article>
            ) : (
              <article key={item.id} className="rounded-xl border bg-white p-4 hover:shadow-lg hover:border-blue-200 transition-all">
                <Link href={`/${locale}/news/${item.id}`} className="flex gap-4">
                  <div className="relative w-40 h-24 flex-shrink-0 rounded-md overflow-hidden hidden sm:block">
                    <Image src={item.img || "/placeholder.svg"} alt={item.title} fill className="object-cover" />
                  </div>
                  <div>
                    <div className="text-xs text-blue-600 font-medium">{t(`tabs.${item.categoryKey}`)} · {new Date(item.date).toLocaleDateString(locale==='vi'?'vi-VN':'en-US')}</div>
                    <h3 className="mt-1 font-semibold text-gray-900">{item.title}</h3>
                    <p className="text-sm text-gray-600 mt-1 line-clamp-2">{item.excerpt}</p>
                  </div>
                </Link>
              </article>
            )
          ))}
        </div>
      </main>
      <Footer />
    </div>
  )
}
