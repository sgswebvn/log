"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { useLocale, useTranslations } from "next-intl"
import { supabase } from "@/lib/supabase"
import { Calendar, ArrowRight, Clock } from "lucide-react"

interface NewsItem {
  id: string
  title_vi: string
  title_en: string
  excerpt_vi: string
  excerpt_en: string
  image_url: string
  category: string
  published: boolean
  featured: boolean
  created_at: string
}

export default function HomeNewsFeatured() {
  const t = useTranslations("home.news");

  const [news, setNews] = useState<NewsItem[]>([])
  const [loading, setLoading] = useState(true)
  const locale = useLocale()

  useEffect(() => {
    fetchNews()
  }, [])

  const fetchNews = async () => {
    try {
      const { data, error } = await supabase
        .from("news")
        .select("*")
        .eq("published", true)
        .order("created_at", { ascending: false })
        .limit(7)

      if (error) throw error
      setNews(data || [])
    } catch (error) {
      console.error("Error fetching news:", error)
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    })
  }

  const getTitle = (item: NewsItem) => {
    return locale === "vi" ? item.title_vi : item.title_en
  }

  const getExcerpt = (item: NewsItem) => {
    return locale === "vi" ? item.excerpt_vi : item.excerpt_en
  }

  if (loading) {
    return (
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="w-32 h-8 bg-gray-200 rounded mx-auto mb-4 animate-pulse" />
            <div className="w-64 h-6 bg-gray-200 rounded mx-auto animate-pulse" />
          </div>
          <div className="grid lg:grid-cols-4 gap-6">
            {[...Array(7)].map((_, i) => (
              <div key={i} className={`${i === 0 ? "lg:col-span-2 lg:row-span-2" : ""} animate-pulse`}>
                <div className="bg-gray-200 aspect-video rounded-xl mb-4" />
                <div className="h-4 bg-gray-200 rounded mb-2" />
                <div className="h-4 bg-gray-200 rounded w-3/4" />
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }


  const [featuredNews, ...otherNews] = news

  return (
    <section className="py-16 md:py-20 bg-white">
      <div className="container mx-auto px-4">

        <div className="grid lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {/* Featured Article - Takes 2x2 space */}
          {featuredNews && (
            <div className="lg:col-span-2 lg:row-span-2">
              <Link href={`/${locale}/news/${featuredNews.id}`}>
                <article className="group bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 h-full">
                  <div className="relative aspect-[16/10] lg:aspect-[16/12] overflow-hidden">
                    <Image
                      src={featuredNews.image_url || "/placeholder.svg?height=400&width=600"}
                      alt={getTitle(featuredNews)}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <div className="absolute top-4 left-4">
                      <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                        {featuredNews.category}
                      </span>
                    </div>
                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <h3 className="text-xl md:text-2xl font-bold mb-2 line-clamp-2">{getTitle(featuredNews)}</h3>
                      <p className="text-white/90 mb-3 line-clamp-2">{getExcerpt(featuredNews)}</p>
                      <div className="flex items-center text-sm text-white/80">
                        <Calendar className="h-4 w-4 mr-1" />
                        {formatDate(featuredNews.created_at)}
                      </div>
                    </div>
                  </div>
                </article>
              </Link>
            </div>
          )}

          {/* Other Articles */}
          {otherNews.slice(0, 6).map((item) => (
            <div key={item.id} className="lg:col-span-1">
              <Link href={`/${locale}/news/${item.id}`}>
                <article className="group bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 h-full">
                  <div className="relative aspect-video overflow-hidden">
                    <Image
                      src={item.image_url || "/placeholder.svg?height=200&width=300"}
                      alt={getTitle(item)}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="bg-gray-900/80 text-white px-2 py-1 rounded text-xs font-medium">
                        {item.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-4">
                    <h4 className="font-semibold text-gray-900 line-clamp-2 mb-2 group-hover:text-blue-600 transition-colors">
                      {getTitle(item)}
                    </h4>
                    <p className="text-sm text-gray-600 line-clamp-2 mb-3">{getExcerpt(item)}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-xs text-gray-500">
                        <Clock className="h-3 w-3 mr-1" />
                        {formatDate(item.created_at)}
                      </div>
                      <ArrowRight className="h-4 w-4 text-blue-600 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </article>
              </Link>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <Link
            href={`/${locale}/news`}
            className="inline-flex items-center px-8 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors duration-300"
          >
            {t("more")}
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </div>
    </section>
  )
}
