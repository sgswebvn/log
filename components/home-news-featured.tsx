"use client"

import Image from "next/image"
import Link from "next/link"
import { useLocale } from "next-intl"
import { SlideInLeft, FadeUp } from "@/components/in-view"

type NewsItem = { id: string; img: string; title: string; summary: string; date: string; type?: "video" | "article" }

const NEWS: NewsItem[] = [
  { id: '1', img: "/cross-border-train-event.png", title: "The China-Europe Railway Express cross-border e-commerce train has arrived in Budapest...", summary: "NEP Logistics deepens services and presence.", date: "2025-07-25" },
  { id: '2', img: "/china-europe-freight.png", title: "Global Transport Connectivity Forum 2025", summary: "NEP joins the global forum.", date: "2025-07-21" },
  { id: '3', img: "/exhibition-event.png", title: "Mid-Year Review Conference", summary: "Conference and team bonding.", date: "2025-07-15" },
  { id: '4', img: "/placeholder-yk79n.png", title: "12 Days Extreme Cross-border!", summary: "First special line for Asia-Europe corridor.", date: "2025-07-01" }
]

export default function HomeNews() {
  const locale = useLocale()
  const [featured, ...rest] = NEWS
  return (
    <SlideInLeft>
      <div className="grid gap-6 md:grid-cols-3 auto-rows-[1fr]">
        <Link href={`/${locale}/news/${featured.id}`} className="md:col-span-2 rounded-lg border bg-white hover:shadow-xl transition-all overflow-hidden group">
          <div className="relative w-full h-72">
            <Image src={featured.img || "/placeholder.svg"} alt={featured.title} fill className="object-cover group-hover:scale-[1.02] transition-transform" />
          </div>
          <div className="p-4">
            <h3 className="text-xl font-semibold text-gray-900 line-clamp-2 group-hover:text-blue-700 transition-colors">{featured.title}</h3>
            <p className="text-sm text-gray-600 mt-2 line-clamp-2">{featured.summary}</p>
            <div className="mt-3 text-xs text-gray-500">{new Date(featured.date).toLocaleDateString(locale==='vi'?'vi-VN':'en-US')}</div>
          </div>
        </Link>
        {rest.map((n) => (
          <FadeUp key={n.id}>
            <Link href={`/${locale}/news/${n.id}`} className="rounded-lg border bg-white hover:border-blue-600 hover:shadow-md transition-all overflow-hidden group">
              <div className="relative w-full h-44">
                <Image src={n.img || "/placeholder.svg"} alt={n.title} fill className="object-cover group-hover:scale-[1.02] transition-transform" />
              </div>
              <div className="p-4">
                <h4 className="font-semibold text-gray-900 line-clamp-2 group-hover:text-blue-700">{n.title}</h4>
                <p className="text-sm text-gray-600 mt-2 line-clamp-2">{n.summary}</p>
                <div className="mt-3 text-xs text-gray-500">{new Date(n.date).toLocaleDateString(locale==='vi'?'vi-VN':'en-US')}</div>
              </div>
            </Link>
          </FadeUp>
        ))}
      </div>
    </SlideInLeft>
  )
}
