"use client"

import { useState, useEffect } from "react"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import Breadcrumbs from "@/components/common/breadcrumbs"
import Image from "next/image"
import { useLocale, useTranslations } from "next-intl"
import { supabase, type News } from "@/lib/supabase"

export default function NewsDetailPage({ params }: { params: { id: string } }) {
  const locale = useLocale()
  const t = useTranslations("newsPage")
  const [news, setNews] = useState<News | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchNews()
  }, [params.id])

  const fetchNews = async () => {
    try {
      const { data, error } = await supabase.from("news").select("*").eq("id", params.id).eq("published", true).single()

      if (error) throw error
      setNews(data)
    } catch (error) {
      console.error("Error fetching news:", error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="bg-white">
        <Header />
        <div className="container mx-auto px-4 py-16 text-center">
          <div className="text-lg">Đang tải...</div>
        </div>
        <Footer />
      </div>
    )
  }

  if (!news) {
    return (
      <div className="bg-white">
        <Header />
        <div className="container mx-auto px-4 py-16 text-center">
          <div className="text-lg">Không tìm thấy bài viết</div>
        </div>
        <Footer />
      </div>
    )
  }

  const title = locale === "vi" ? news.title_vi : news.title_en
  const content = locale === "vi" ? news.content_vi : news.content_en

  return (
    <div className="bg-white">
      <Header />

      <section className="relative h-64 md:h-80 flex items-center justify-center bg-gradient-to-r from-blue-900/90 to-blue-700/90">
        <Image src={news.image_url || "/placeholder.svg"} alt={title} fill className="object-cover -z-10" />
        <div className="text-center text-white px-4">
          <h1 className="text-xl md:text-3xl font-bold mb-4 max-w-4xl">{title}</h1>
          <Breadcrumbs
            items={[{ label: t("breadcrumb"), href: `/${locale}/news` }, { label: title.substring(0, 50) + "..." }]}
          />
        </div>
      </section>

      <main className="container mx-auto px-4 py-8 md:py-16">
        <article className="max-w-4xl mx-auto">
          <div className="mb-6 text-sm text-gray-500">
            {new Date(news.created_at!).toLocaleDateString(locale === "vi" ? "vi-VN" : "en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </div>

          <div className="prose max-w-none">
            <div className="text-base md:text-lg leading-relaxed text-gray-700 whitespace-pre-line">{content}</div>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  )
}
