"use client"

import { useState, useEffect } from "react"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import PageBanner from "@/components/common/page-banner"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "lucide-react"
import { useParams } from "next/navigation"
import { supabase, type News, type NewsCategory } from "@/lib/supabase"
import Link from "next/link"
import Image from "next/image"
import Breadcrumbs from "@/components/breadcrumbs"
import { useTranslations } from "next-intl"

export default function NewsPage() {
  const params = useParams()
  const locale = params.locale as string

  const t = useTranslations("newsPage")
  const tBreadcrumbs = useTranslations("breadcrumbs")

  const [news, setNews] = useState<News[]>([])
  const [categories, setCategories] = useState<NewsCategory[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState("all")

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      setLoading(true)
      const [newsResult, categoriesResult] = await Promise.all([
        supabase
          .from("news")
          .select(`
            *,
            news_categories (
              id,
              name_vi,
              name_en
            )
          `)
          .eq("published", true)
          .order("created_at", { ascending: false }),
        supabase.from("news_categories").select("*").eq("active", true).order("created_at", { ascending: false }),
      ])

      if (newsResult.error) throw newsResult.error
      if (categoriesResult.error) throw categoriesResult.error

      setNews(newsResult.data || [])
      setCategories(categoriesResult.data || [])
    } catch (error) {
      console.error("Error fetching data:", error)
    } finally {
      setLoading(false)
    }
  }

  // Filter news by category
  const filteredNews =
    selectedCategory === "all" ? news : news.filter((item) => item.category_id?.toString() === selectedCategory)

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    })
  }

  const getTitle = (item: News) => {
    return locale === "vi" ? item.title_vi : item.title_en
  }

  const getExcerpt = (item: News) => {
    return locale === "vi" ? item.excerpt_vi : item.excerpt_en
  }

  const getCategoryName = (category: NewsCategory) => {
    return locale === "vi" ? category.name_vi : category.name_en
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <section className="relative h-80 md:h-96 flex items-center justify-center overflow-hidden">
        <Image src="/breakcrum.jpg" alt="1" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/70 to-black/80" />
        <div className="relative text-center text-white px-4 z-10">
          <h1 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight">{t("title")}</h1>
          <p className="text-lg md:text-xl text-blue-100 mb-6 max-w-2xl mx-auto">{t("subtitle")}</p>
          <Breadcrumbs items={[{ label: tBreadcrumbs("news") }]} />
        </div>
      </section>

      <main className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          {/* Category Tabs */}
          <div className="mb-8">
            <div className="border-b border-gray-200">
              <nav className="-mb-px flex space-x-8 overflow-x-auto">
                <button
                  onClick={() => setSelectedCategory("all")}
                  className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors ${selectedCategory === "all"
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                    }`}
                >
                  Tất cả tin tức
                </button>
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id.toString())}
                    className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors ${selectedCategory === category.id.toString()
                      ? "border-blue-500 text-blue-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                      }`}
                  >
                    {getCategoryName(category)}
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* News Grid */}
          {loading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <Card key={i} className="overflow-hidden animate-pulse border border-gray-200">
                  <div className="aspect-video bg-gray-200" />
                  <CardContent className="p-4">
                    <div className="h-4 bg-gray-200 rounded mb-2" />
                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-3" />
                    <div className="h-3 bg-gray-200 rounded w-1/2" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : filteredNews.length === 0 ? (
            <Card className="border border-gray-200">
              <CardContent className="p-12 text-center">
                <p className="text-gray-500">
                  {t("no")}
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredNews.map((item) => (
                <Card
                  key={item.id}
                  className="group overflow-hidden hover:shadow-lg transition-all duration-300 border border-gray-200"
                >
                  <Link href={`/${locale}/news/${item.id}`}>
                    <div className="relative aspect-video overflow-hidden">
                      <Image
                        src={item.image_url || "/placeholder.svg?height=200&width=400"}
                        alt={getTitle(item)}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-3 left-3">
                        <Badge className="bg-blue-600 text-white">
                          {item.news_categories ? getCategoryName(item.news_categories) : "Không có danh mục"}
                        </Badge>
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                        {getTitle(item)}
                      </h3>
                      <p className="text-sm text-gray-600 line-clamp-2 mb-3">{getExcerpt(item)}</p>
                      <div className="flex items-center text-xs text-gray-500">
                        <Calendar className="h-3 w-3 mr-1" />
                        {formatDate(item.created_at)}
                      </div>
                    </CardContent>
                  </Link>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}
