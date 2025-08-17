"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { supabase } from "@/lib/supabase"

interface NewsItem {
  id: string
  title_vi: string
  title_en: string
  content_vi: string
  content_en: string
  image_url: string
  published: boolean
  created_at: string
  category_id: string
  news_categories: { name_vi: string; name_en: string } | null
}

export default function NewsPage() {
  const [news, setNews] = useState<NewsItem[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<"all" | "draft" | "published">("all")

  useEffect(() => {
    fetchNews()
  }, [])

  const fetchNews = async () => {
    try {
      const { data, error } = await supabase
        .from("news")
        .select(`
          *,
          news_categories (name_vi, name_en)
        `)
        .order("created_at", { ascending: false })

      if (error) throw error
      setNews(data || [])
    } catch (error) {
      console.error("Error fetching news:", error)
    } finally {
      setLoading(false)
    }
  }

  const deleteNews = async (id: string) => {
    if (!confirm("Bạn có chắc chắn muốn xóa tin tức này?")) return

    try {
      const { error } = await supabase.from("news").delete().eq("id", id)

      if (error) throw error

      setNews(news.filter((item) => item.id !== id))
      alert("Xóa tin tức thành công!")
    } catch (error) {
      console.error("Error deleting news:", error)
      alert("Có lỗi xảy ra khi xóa tin tức")
    }
  }

  const filteredNews = news.filter((item) => {
    const matchesSearch =
      item.title_vi.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.title_en.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus =
      statusFilter === "all" ||
      (statusFilter === "published" && item.published) ||
      (statusFilter === "draft" && !item.published)
    return matchesSearch && matchesStatus
  })

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-gray-900">Quản lý tin tức</h1>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="bg-white rounded-lg border p-4 animate-pulse">
              <div className="h-32 bg-gray-200 rounded mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-semibold text-gray-900">Quản lý tin tức</h1>
        <Link
          href="/admin-private-sagoke-07215/news/create"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
        >
          ➕ Thêm tin tức
        </Link>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-lg border">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Tìm kiếm tin tức..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as any)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          >
            <option value="all">Tất cả trạng thái</option>
            <option value="published">Đã xuất bản</option>
            <option value="draft">Nháp</option>
          </select>
        </div>
      </div>

      {/* News Grid */}
      {filteredNews.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredNews.map((item) => (
            <div key={item.id} className="bg-white rounded-lg border overflow-hidden">
              {item.image_url && (
                <img
                  src={item.image_url || "/placeholder.svg"}
                  alt={item.title_vi}
                  className="w-full h-32 object-cover"
                />
              )}
              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <span
                    className={`px-2 py-1 text-xs rounded-full ${item.published ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                      }`}
                  >
                    {item.published ? "Đã xuất bản" : "Nháp"}
                  </span>
                  {item.news_categories && (
                    <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                      {item.news_categories.name_vi}
                    </span>
                  )}
                </div>

                <h3 className="font-medium text-gray-900 line-clamp-2 mb-2 text-sm">{item.title_vi}</h3>

                <p className="text-xs text-gray-500 mb-3">{new Date(item.created_at).toLocaleDateString("vi-VN")}</p>

                <div className="flex gap-2">
                  <Link
                    href={`/admin-private-sagoke-07215/news/edit/${item.id}`}
                    className="flex-1 bg-blue-50 text-blue-700 px-3 py-2 rounded text-xs font-medium hover:bg-blue-100 transition-colors text-center"
                  >
                    ✏️ Sửa
                  </Link>
                  <button
                    onClick={() => deleteNews(item.id)}
                    className="flex-1 bg-red-50 text-red-700 px-3 py-2 rounded text-xs font-medium hover:bg-red-100 transition-colors"
                  >
                    🗑️ Xóa
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-lg border p-8 text-center">
          <div className="text-4xl mb-4">📰</div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Chưa có tin tức nào</h3>
          <p className="text-gray-500 mb-4">Bắt đầu tạo tin tức đầu tiên của bạn</p>
          <Link
            href="/admin-private-sagoke-07215/news/create"
            className="inline-block bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
          >
            Thêm tin tức
          </Link>
        </div>
      )}
    </div>
  )
}
