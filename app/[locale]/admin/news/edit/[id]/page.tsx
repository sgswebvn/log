"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { supabase } from "@/lib/supabase"
import { uploadImage } from "@/lib/supabase-upload"

interface Category {
  id: string
  name_vi: string
  name_en: string
}

export default function EditNewsPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [initialLoading, setInitialLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<"vi" | "en">("vi")
  const [formData, setFormData] = useState({
    title_vi: "",
    title_en: "",
    content_vi: "",
    content_en: "",
    excerpt_vi: "",
    excerpt_en: "",
    image_url: "",
    category_id: "",
    published: false,
  })

  useEffect(() => {
    fetchData()
  }, [params.id])

  const fetchData = async () => {
    try {
      const [newsResponse, categoriesResponse] = await Promise.all([
        supabase.from("news").select("*").eq("id", params.id).single(),
        supabase.from("news_categories").select("*").order("name_vi"),
      ])

      if (newsResponse.error) throw newsResponse.error
      if (categoriesResponse.error) throw categoriesResponse.error

      const news = newsResponse.data
      setFormData({
        title_vi: news.title_vi || "",
        title_en: news.title_en || "",
        content_vi: news.content_vi || "",
        content_en: news.content_en || "",
        excerpt_vi: news.excerpt_vi || "",
        excerpt_en: news.excerpt_en || "",
        image_url: news.image_url || "",
        category_id: news.category_id || "",
        published: news.published || false,
      })

      setCategories(categoriesResponse.data || [])
    } catch (error) {
      console.error("Error fetching data:", error)
      alert("Không tìm thấy tin tức")
      router.push("/admin/news")
    } finally {
      setInitialLoading(false)
    }
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (!file.type.startsWith("image/")) {
      alert("Vui lòng chọn file hình ảnh")
      return
    }

    if (file.size > 5 * 1024 * 1024) {
      alert("File quá lớn. Vui lòng chọn file nhỏ hơn 5MB")
      return
    }

    setUploading(true)
    try {
      const url = await uploadImage(file)
      if (url) {
        setFormData({ ...formData, image_url: url })
      } else {
        alert("Có lỗi xảy ra khi upload hình ảnh")
      }
    } catch (error) {
      console.error("Upload error:", error)
      alert("Có lỗi xảy ra khi upload hình ảnh")
    } finally {
      setUploading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const { error } = await supabase
        .from("news")
        .update({
          ...formData,
          category_id: formData.category_id || null,
          updated_at: new Date().toISOString(),
        })
        .eq("id", params.id)

      if (error) throw error

      alert("Cập nhật tin tức thành công!")
      router.push("/admin/news")
    } catch (error) {
      console.error("Error updating news:", error)
      alert("Có lỗi xảy ra khi cập nhật tin tức")
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    })
  }

  if (initialLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <div className="h-6 w-20 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-8 w-48 bg-gray-200 rounded animate-pulse"></div>
        </div>
        <div className="bg-white rounded-lg border p-6">
          <div className="space-y-6">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i}>
                <div className="h-4 w-24 bg-gray-200 rounded mb-2 animate-pulse"></div>
                <div className="h-10 w-full bg-gray-200 rounded animate-pulse"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link href="/admin/news" className="text-gray-600 hover:text-gray-900">
          ← Quay lại
        </Link>
        <h1 className="text-2xl font-semibold text-gray-900">Chỉnh sửa tin tức</h1>
      </div>

      {/* Form */}
      <div className="bg-white rounded-lg border">
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Language Tabs */}
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              <button
                type="button"
                onClick={() => setActiveTab("vi")}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${activeTab === "vi"
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
              >
                🇻🇳 Tiếng Việt
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("en")}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${activeTab === "en"
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
              >
                🇺🇸 Tiếng Anh
              </button>
            </nav>
          </div>

          {/* Vietnamese Content */}
          {activeTab === "vi" && (
            <div className="space-y-4">
              <div>
                <label htmlFor="title_vi" className="block text-sm font-medium text-gray-700 mb-2">
                  Tiêu đề tiếng Việt *
                </label>
                <input
                  type="text"
                  id="title_vi"
                  name="title_vi"
                  value={formData.title_vi}
                  onChange={handleChange}
                  required
                  placeholder="Nhập tiêu đề tiếng Việt..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label htmlFor="excerpt_vi" className="block text-sm font-medium text-gray-700 mb-2">
                  Tóm tắt tiếng Việt
                </label>
                <textarea
                  id="excerpt_vi"
                  name="excerpt_vi"
                  value={formData.excerpt_vi}
                  onChange={handleChange}
                  rows={3}
                  placeholder="Nhập tóm tắt tiếng Việt..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label htmlFor="content_vi" className="block text-sm font-medium text-gray-700 mb-2">
                  Nội dung tiếng Việt *
                </label>
                <textarea
                  id="content_vi"
                  name="content_vi"
                  value={formData.content_vi}
                  onChange={handleChange}
                  required
                  rows={10}
                  placeholder="Nhập nội dung tiếng Việt..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          )}

          {/* English Content */}
          {activeTab === "en" && (
            <div className="space-y-4">
              <div>
                <label htmlFor="title_en" className="block text-sm font-medium text-gray-700 mb-2">
                  Tiêu đề tiếng Anh *
                </label>
                <input
                  type="text"
                  id="title_en"
                  name="title_en"
                  value={formData.title_en}
                  onChange={handleChange}
                  required
                  placeholder="Enter English title..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label htmlFor="excerpt_en" className="block text-sm font-medium text-gray-700 mb-2">
                  Tóm tắt tiếng Anh
                </label>
                <textarea
                  id="excerpt_en"
                  name="excerpt_en"
                  value={formData.excerpt_en}
                  onChange={handleChange}
                  rows={3}
                  placeholder="Enter English excerpt..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label htmlFor="content_en" className="block text-sm font-medium text-gray-700 mb-2">
                  Nội dung tiếng Anh *
                </label>
                <textarea
                  id="content_en"
                  name="content_en"
                  value={formData.content_en}
                  onChange={handleChange}
                  required
                  rows={10}
                  placeholder="Enter English content..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          )}

          {/* Category */}
          <div>
            <label htmlFor="category_id" className="block text-sm font-medium text-gray-700 mb-2">
              Danh mục
            </label>
            <select
              id="category_id"
              name="category_id"
              value={formData.category_id}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Chọn danh mục...</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name_vi}
                </option>
              ))}
            </select>
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Hình ảnh</label>
            <div className="space-y-4">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                disabled={uploading}
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              />
              {uploading && <p className="text-sm text-blue-600">Đang upload...</p>}
              {formData.image_url && (
                <div className="relative">
                  <img
                    src={formData.image_url || "/placeholder.svg"}
                    alt="Preview"
                    className="w-full h-48 object-cover rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, image_url: "" })}
                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                  >
                    ✕
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Published Status */}
          <div className="flex items-center">
            <input
              type="checkbox"
              id="published"
              name="published"
              checked={formData.published}
              onChange={handleChange}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="published" className="ml-2 block text-sm text-gray-900">
              Xuất bản
            </label>
          </div>

          {/* Actions */}
          <div className="flex gap-4 pt-4 border-t">
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors font-medium"
            >
              {loading ? "Đang cập nhật..." : "💾 Cập nhật"}
            </button>
            <Link
              href="/admin/news"
              className="bg-gray-100 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-200 transition-colors font-medium"
            >
              Hủy
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}
