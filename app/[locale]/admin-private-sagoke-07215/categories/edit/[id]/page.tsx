"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase"
import Link from "next/link"

interface Category {
  id: string
  name_vi: string
  name_en: string
  description_vi: string
  description_en: string
  slug: string
  active: boolean
}

export default function EditCategoryPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [category, setCategory] = useState<Category | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [activeTab, setActiveTab] = useState<"vi" | "en">("vi")
  const [formData, setFormData] = useState({
    name_vi: "",
    name_en: "",
    description_vi: "",
    description_en: "",
  })

  useEffect(() => {
    fetchCategory()
  }, [params.id])

  const fetchCategory = async () => {
    try {
      const { data, error } = await supabase.from("news_categories").select("*").eq("id", params.id).single()

      if (error) throw error

      setCategory(data)
      setFormData({
        name_vi: data.name_vi,
        name_en: data.name_en,
        description_vi: data.description_vi || "",
        description_en: data.description_en || "",
      })
    } catch (error) {
      console.error("Error fetching category:", error)
      alert("Không tìm thấy danh mục")
      router.push("/vi/admin-private-sagoke-07215/categories")
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)

    try {
      const slug = formData.name_vi
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^\w-]/g, "")

      const { error } = await supabase
        .from("news_categories")
        .update({
          ...formData,
          slug,
          updated_at: new Date().toISOString(),
        })
        .eq("id", params.id)

      if (error) throw error

      alert("Cập nhật danh mục thành công!")
      router.push("/vi/admin-private-sagoke-07215/categories")
    } catch (error) {
      console.error("Error updating category:", error)
      alert("Có lỗi xảy ra khi cập nhật danh mục")
    } finally {
      setSaving(false)
    }
  }

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <div className="h-6 w-20 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-8 w-48 bg-gray-200 rounded animate-pulse"></div>
        </div>
        <div className="bg-white rounded-lg border p-6">
          <div className="space-y-4">
            <div className="h-4 bg-gray-200 rounded w-1/4 animate-pulse"></div>
            <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded w-1/4 animate-pulse"></div>
            <div className="h-20 bg-gray-200 rounded animate-pulse"></div>
          </div>
        </div>
      </div>
    )
  }

  if (!category) {
    return (
      <div className="text-center py-12">
        <div className="text-4xl mb-4">❌</div>
        <h2 className="text-xl font-medium text-gray-900 mb-2">Không tìm thấy danh mục</h2>
        <Link href="/vi/admin-private-sagoke-07215/categories" className="text-blue-600 hover:text-blue-700 transition-colors">
          ← Quay lại danh sách
        </Link>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link href="/vi/admin-private-sagoke-07215/categories" className="text-gray-500 hover:text-gray-700 transition-colors">
          ← Quay lại
        </Link>
        <h1 className="text-2xl font-semibold text-gray-900">Chỉnh sửa danh mục</h1>
      </div>

      {/* Form */}
      <div className="bg-white rounded-lg border p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
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
                <label htmlFor="name_vi" className="block text-sm font-medium text-gray-700 mb-2">
                  Tên danh mục tiếng Việt *
                </label>
                <input
                  type="text"
                  id="name_vi"
                  value={formData.name_vi}
                  onChange={(e) => handleChange("name_vi", e.target.value)}
                  required
                  placeholder="Nhập tên danh mục..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                />
              </div>

              <div>
                <label htmlFor="description_vi" className="block text-sm font-medium text-gray-700 mb-2">
                  Mô tả tiếng Việt
                </label>
                <textarea
                  id="description_vi"
                  value={formData.description_vi}
                  onChange={(e) => handleChange("description_vi", e.target.value)}
                  placeholder="Nhập mô tả danh mục..."
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                />
              </div>
            </div>
          )}

          {/* English Content */}
          {activeTab === "en" && (
            <div className="space-y-4">
              <div>
                <label htmlFor="name_en" className="block text-sm font-medium text-gray-700 mb-2">
                  Tên danh mục tiếng Anh *
                </label>
                <input
                  type="text"
                  id="name_en"
                  value={formData.name_en}
                  onChange={(e) => handleChange("name_en", e.target.value)}
                  required
                  placeholder="Enter category name..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                />
              </div>

              <div>
                <label htmlFor="description_en" className="block text-sm font-medium text-gray-700 mb-2">
                  Mô tả tiếng Anh
                </label>
                <textarea
                  id="description_en"
                  value={formData.description_en}
                  onChange={(e) => handleChange("description_en", e.target.value)}
                  placeholder="Enter category description..."
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                />
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-3 pt-4 border-t">
            <button
              type="submit"
              disabled={saving}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm font-medium"
            >
              {saving ? "⏳ Đang cập nhật..." : "💾 Cập nhật danh mục"}
            </button>
            <Link
              href="/vi/admin-private-sagoke-07215/categories"
              className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium"
            >
              Hủy
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}
