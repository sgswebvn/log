"use client"

import { useEffect, useState } from "react"
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
  created_at: string
}

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchCategories()
  }, [])

  const fetchCategories = async () => {
    try {
      const { data, error } = await supabase
        .from("news_categories")
        .select("*")
        .order("created_at", { ascending: false })

      if (error) throw error
      setCategories(data || [])
    } catch (error) {
      console.error("Error fetching categories:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Bạn có chắc chắn muốn xóa danh mục "${name}"?`)) return

    try {
      const { error } = await supabase.from("news_categories").delete().eq("id", id)

      if (error) throw error

      setCategories(categories.filter((cat) => cat.id !== id))
      alert("Xóa danh mục thành công!")
    } catch (error) {
      console.error("Error deleting category:", error)
      alert("Có lỗi xảy ra khi xóa danh mục")
    }
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-gray-900">Quản lý danh mục</h1>
          <div className="h-10 w-32 bg-gray-200 rounded animate-pulse"></div>
        </div>
        <div className="bg-white rounded-lg border">
          <div className="px-6 py-4 border-b">
            <div className="h-6 bg-gray-200 rounded w-1/4 animate-pulse"></div>
          </div>
          <div className="divide-y">
            {[1, 2, 3].map((i) => (
              <div key={i} className="px-6 py-4">
                <div className="h-4 bg-gray-200 rounded w-1/3 mb-2 animate-pulse"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2 animate-pulse"></div>
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
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Quản lý danh mục</h1>
          <p className="text-gray-600">Tổng cộng {categories.length} danh mục</p>
        </div>
        <Link
          href="/vi/admin-private-sagoke-07215/categories/create"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium inline-flex items-center gap-2"
        >
          ➕ Thêm danh mục
        </Link>
      </div>

      {/* Categories List */}
      <div className="bg-white rounded-lg border">
        <div className="px-6 py-4 border-b">
          <h2 className="text-lg font-medium text-gray-900">Danh sách danh mục</h2>
        </div>

        {categories.length > 0 ? (
          <div className="divide-y">
            {categories.map((category) => (
              <div key={category.id} className="px-6 py-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-medium text-gray-900">{category.name_vi}</h3>
                      <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs font-mono">
                        {category.slug}
                      </span>
                      {category.active && (
                        <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-medium">
                          Hoạt động
                        </span>
                      )}
                    </div>

                    <p className="text-sm text-gray-600 mb-1">🇺🇸 {category.name_en}</p>

                    {(category.description_vi || category.description_en) && (
                      <div className="text-sm text-gray-500 space-y-1 mb-2">
                        {category.description_vi && <p>🇻🇳 {category.description_vi}</p>}
                        {category.description_en && <p>🇺🇸 {category.description_en}</p>}
                      </div>
                    )}

                    <p className="text-xs text-gray-400">
                      Tạo ngày: {new Date(category.created_at).toLocaleDateString("vi-VN")}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 ml-4">
                    <Link
                      href={`/vi/admin-private-sagoke-07215/categories/edit/${category.id}`}
                      className="bg-blue-50 text-blue-700 px-3 py-1 rounded text-sm font-medium hover:bg-blue-100 transition-colors"
                    >
                      ✏️ Sửa
                    </Link>
                    <button
                      onClick={() => handleDelete(category.id, category.name_vi)}
                      className="bg-red-50 text-red-700 px-3 py-1 rounded text-sm font-medium hover:bg-red-100 transition-colors"
                    >
                      🗑️ Xóa
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="px-6 py-12 text-center">
            <div className="text-4xl mb-4">📁</div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Chưa có danh mục nào</h3>
            <p className="text-gray-500 mb-6">Thêm danh mục đầu tiên để bắt đầu phân loại tin tức</p>
            <Link
              href="/vi/admin-private-sagoke-07215/categories/create"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium inline-flex items-center gap-2"
            >
              Thêm danh mục đầu tiên
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
