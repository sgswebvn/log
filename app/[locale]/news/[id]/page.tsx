"use client"

import { useState, useEffect } from "react"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import Breadcrumbs from "@/components/common/breadcrumbs"
import Image from "next/image"
import { useLocale, useTranslations } from "next-intl"
import { supabase, type News } from "@/lib/supabase"
import dynamic from "next/dynamic"

// Dynamically import ReactQuill for read-only mode
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false })
import "react-quill/dist/quill.snow.css"

interface Category {
  id: string
  name_vi: string
  name_en: string
}

export default function NewsDetailPage({ params }: { params: { id: string } }) {
  const locale = useLocale()
  const t = useTranslations("newsPage")
  const [news, setNews] = useState<News | null>(null)
  const [category, setCategory] = useState<Category | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchNews()
  }, [params.id])

  const fetchNews = async () => {
    try {
      const { data: newsData, error: newsError } = await supabase
        .from("news")
        .select("*")
        .eq("id", params.id)
        .eq("published", true)
        .single()

      if (newsError) throw newsError

      if (newsData?.category_id) {
        const { data: categoryData, error: categoryError } = await supabase
          .from("news_categories")
          .select("*")
          .eq("id", newsData.category_id)
          .single()

        if (categoryError) throw categoryError
        setCategory(categoryData)
      }

      setNews(newsData)
    } catch (error) {
      console.error("Error fetching news:", error)
    } finally {
      setLoading(false)
    }
  }

  // Hàm ước tính thời gian đọc dựa trên số từ
  const estimateReadingTime = (content: string) => {
    const words = content.replace(/<[^>]+>/g, "").split(/\s+/).length
    const minutes = Math.ceil(words / 200) // Giả định tốc độ đọc 200 từ/phút
    return minutes
  }

  if (loading) {
    return (
      <div className="bg-gray-50 min-h-screen">
        <Header />
        <div className="container mx-auto px-4 py-16 text-center">
          <div className="text-lg text-gray-700">Đang tải...</div>
        </div>
        <Footer />
      </div>
    )
  }

  if (!news) {
    return (
      <div className="bg-gray-50 min-h-screen">
        <Header />
        <div className="container mx-auto px-4 py-16 text-center">
          <div className="text-lg text-gray-700">Không tìm thấy bài viết</div>
        </div>
        <Footer />
      </div>
    )
  }

  const title = locale === "vi" ? news.title_vi : news.title_en
  const excerpt = locale === "vi" ? news.excerpt_vi : news.excerpt_en
  const content = locale === "vi" ? news.content_vi : news.content_en
  const categoryName = category ? (locale === "vi" ? category.name_vi : category.name_en) : ""
  const readingTime = estimateReadingTime(content)

  return (
    <div className="bg-gray-50 min-h-screen">
      <Header />

      <section className="relative h-80 md:h-96 flex items-center justify-center bg-gradient-to-r from-blue-900/80 to-blue-700/80">
        <Image
          src={news.image_url || "/placeholder.svg"}
          alt={title}
          fill
          className="object-cover -z-10 rounded-b-lg"
          priority
        />
        <div className="text-center text-white px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 max-w-5xl mx-auto leading-tight">{title}</h1>
          <Breadcrumbs
            items={[
              { label: t("breadcrumb"), href: `/${locale}/news` },
              { label: title.length > 50 ? title.substring(0, 50) + "..." : title },
            ]}
          />
        </div>
      </section>

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <article className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-6 md:p-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-sm text-gray-600 mb-6">
            <div className="flex items-center gap-4">
              <span>
                {" "}
                {new Date(news.created_at!).toLocaleDateString(locale === "vi" ? "vi-VN" : "en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>

            </div>
            {categoryName && (
              <div className="mt-3 sm:mt-0">
                <span className="inline-flex items-center px-2 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
                  {categoryName}
                </span>
              </div>
            )}
          </div>

          {excerpt && (
            <div className="mb-8 text-base md:text-lg text-gray-700 italic bg-gray-100 p-4 rounded-lg">
              {excerpt}
            </div>
          )}

          <div className="prose prose-lg max-w-none text-gray-800">
            <ReactQuill
              theme="snow"
              value={content}
              readOnly
              modules={{ toolbar: false }}
              className="bg-transparent border-none"
            />
          </div>


        </article>
      </main>

      <Footer />
    </div>
  )
}