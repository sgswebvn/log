"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase"
import Link from "next/link"

export default function CreateCategoryPage() {
  const router = useRouter()
  const [saving, setSaving] = useState(false)
  const [activeTab, setActiveTab] = useState<"vi" | "en">("vi")
  const [formData, setFormData] = useState({
    name_vi: "",
    name_en: "",
    description_vi: "",
    description_en: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)

    try {
      const slug = formData.name_vi
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^\w-]/g, "")

      const { error } = await supabase.from("news_categories").insert([
        {
          ...formData,
          slug,
          active: true,
        },
      ])

      if (error) throw error

      alert("Tạo danh mục thành công!")
      router.push("/vi/admin/categories")
    } catch (error) {
      console.error("Error creating category:", error)
      alert("Có lỗi xảy ra khi tạo danh mục")
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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link href="/vi/admin/categories" className="text-gray-500 hover:text-gray-700 transition-colors">
          ← Quay lại
        </Link>
        <h1 className="text-2xl font-semibold text-gray-900">Thêm danh mục mới</h1>
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
              {saving ? "⏳ Đang lưu..." : "💾 Tạo danh mục"}
            </button>
            <Link
              href="/vi/admin/categories"
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
