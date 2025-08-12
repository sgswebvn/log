"use client"

import Header from "@/components/Header"
import Footer from "@/components/Footer"
import Breadcrumbs from "@/components/breadcrumbs"
import Link from "next/link"
import Image from "next/image"
import { useLocale, useTranslations } from "next-intl"
import { useMemo, useState } from "react"

type Item = {
  id: string
  title: string
  date: string
  categoryKey: "nep" | "promotion" | "exhibition" | "media" | "industry" | "videos"
  img?: string
  excerpt?: string
  type: "video" | "article"
  videoId?: string
}

const DATA: Item[] = [
  {
    id: "1",
    title: "Sagoke mở rộng dịch vụ tại Châu Âu...",
    date: "2025-07-25",
    categoryKey: "nep",
    img: "/cross-border-train-event.png",
    excerpt: "Sagoke đẩy mạnh dịch vụ tại Châu Âu.",
    type: "article",
  },
  {
    id: "2",
    title: "Đoàn ASEAN thăm Tập đoàn Sagoke...",
    date: "2025-07-23",
    categoryKey: "promotion",
    img: "/exhibition-event.png",
    excerpt: "Hành lang logistics khu vực.",
    type: "article",
  },
  {
    id: "3",
    title: "Diễn đàn Kết nối Vận tải Toàn cầu 2025",
    date: "2025-07-01",
    categoryKey: "exhibition",
    img: "/china-europe-freight.png",
    excerpt: "Thúc đẩy hợp tác đường sắt Á-Âu.",
    type: "article",
  },
  {
    id: "v1",
    title: "Video giới thiệu: Sagoke Express",
    date: "2025-06-10",
    categoryKey: "videos",
    type: "video",
    videoId: "ysz5S6PUM-U",
  },
  {
    id: "v2",
    title: "Tuyến Xian-Moscow nổi bật",
    date: "2025-06-01",
    categoryKey: "videos",
    type: "video",
    videoId: "jNQXAC9IVRw",
  },
]

const TAB_KEYS = ["all", "nep", "promotion", "exhibition", "media", "industry", "videos"] as const
type TabKey = (typeof TAB_KEYS)[number]

export default function NewsPage() {
  const t = useTranslations("newsPage")
  const locale = useLocale()
  const [tab, setTab] = useState<TabKey>("all")

  const items = useMemo(() => {
    if (tab === "all") return DATA
    if (tab === "videos") return DATA.filter((d) => d.type === "video")
    return DATA.filter((d) => d.categoryKey === tab)
  }, [tab])

  return (
    <div className="bg-gray-50">
      <Header />

      {/* Hero Banner */}
      <section className="relative h-64 md:h-80 flex items-center justify-center bg-gradient-to-r from-blue-900/90 to-blue-700/90">
        <Image src="/news-media-collage.png" alt="News banner" fill className="object-cover -z-10" />
        <div className="text-center text-white px-4">
          <h1 className="text-2xl md:text-4xl font-bold mb-4">{t("title")}</h1>
          <Breadcrumbs items={[{ label: t("breadcrumb") }]} />
        </div>
      </section>

      <main className="container mx-auto px-4 py-8 md:py-16">
        <div className="mb-6 md:mb-8">
          <p className="text-gray-600 mb-4 md:mb-6 text-sm md:text-base">{t("desc")}</p>
          <div className="flex flex-wrap gap-2 md:gap-3">
            {TAB_KEYS.map((k) => (
              <button
                key={k}
                onClick={() => setTab(k)}
                className={`px-3 md:px-4 py-2 text-xs md:text-sm rounded-full border transition-colors ${
                  tab === k ? "bg-blue-600 text-white border-blue-600" : "bg-white hover:bg-gray-50 border-gray-200"
                }`}
              >
                {t(`tabs.${k}`)}
              </button>
            ))}
          </div>
        </div>

        <div className="grid gap-4 md:gap-6">
          {items.map((item) =>
            item.type === "video" ? (
              <article key={item.id} className="bg-white rounded-xl border p-4 md:p-6 shadow-sm">
                <div className="aspect-video w-full rounded-lg overflow-hidden bg-black mb-3 md:mb-4">
                  <iframe
                    className="w-full h-full"
                    src={`https://www.youtube.com/embed/${item.videoId}`}
                    title={item.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                </div>
                <h3 className="text-lg md:text-xl font-semibold mb-2">{item.title}</h3>
                <div className="text-xs md:text-sm text-gray-500">
                  {new Date(item.date).toLocaleDateString(locale === "vi" ? "vi-VN" : "en-US")}
                </div>
              </article>
            ) : (
              <article
                key={item.id}
                className="bg-white rounded-xl border p-4 md:p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <Link href={`/${locale}/news/${item.id}`} className="flex flex-col md:flex-row gap-4 md:gap-6">
                  <div className="relative w-full md:w-48 h-32 flex-shrink-0 rounded-lg overflow-hidden">
                    <Image src={item.img || "/placeholder.svg"} alt={item.title} fill className="object-cover" />
                  </div>
                  <div className="flex-1">
                    <div className="text-xs md:text-sm text-blue-600 font-medium mb-2">
                      {t(`tabs.${item.categoryKey}`)} •{" "}
                      {new Date(item.date).toLocaleDateString(locale === "vi" ? "vi-VN" : "en-US")}
                    </div>
                    <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-2 md:mb-3">{item.title}</h3>
                    <p className="text-sm md:text-base text-gray-600 line-clamp-2">{item.excerpt}</p>
                  </div>
                </Link>
              </article>
            ),
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}
