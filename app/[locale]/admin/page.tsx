"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"
import Link from "next/link"

interface Stats {
  totalNews: number
  publishedNews: number
  totalCategories: number
  totalContacts: number
  newContacts: number
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats>({
    totalNews: 0,
    publishedNews: 0,
    totalCategories: 0,
    totalContacts: 0,
    newContacts: 0,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchStats()
  }, [])

  const fetchStats = async () => {
    try {
      const [newsResponse, categoriesResponse, contactsResponse] = await Promise.all([
        supabase.from("news").select("published", { count: "exact" }),
        supabase.from("news_categories").select("*", { count: "exact" }),
        supabase.from("contacts").select("status", { count: "exact" }),
      ])

      const totalNews = newsResponse.count || 0
      const publishedNews = newsResponse.data?.filter((item) => item.published).length || 0
      const totalCategories = categoriesResponse.count || 0
      const totalContacts = contactsResponse.count || 0
      const newContacts = contactsResponse.data?.filter((item) => item.status === "new").length || 0

      setStats({
        totalNews,
        publishedNews,
        totalCategories,
        totalContacts,
        newContacts,
      })
    } catch (error) {
      console.error("Error fetching stats:", error)
    } finally {
      setLoading(false)
    }
  }

  const statCards = [
    {
      title: "Tổng tin tức",
      value: stats.totalNews,
      icon: "📰",
      color: "bg-blue-500",
    },
    {
      title: "Đã xuất bản",
      value: stats.publishedNews,
      icon: "✅",
      color: "bg-green-500",
    },
    {
      title: "Danh mục",
      value: stats.totalCategories,
      icon: "📁",
      color: "bg-purple-500",
    },
    {
      title: "Liên hệ mới",
      value: stats.newContacts,
      icon: "📧",
      color: "bg-orange-500",
    },
  ]

  if (loading) {
    return (
      <div className="space-y-6">
        <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-white rounded-lg border p-6 animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-8 bg-gray-200 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
        <div className="text-sm text-gray-500">Chào mừng bạn đến với trang quản trị</div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((card, index) => (
          <div key={index} className="bg-white rounded-lg border p-6">
            <div className="flex items-center">
              <div className={`${card.color} rounded-lg p-3 mr-4`}>
                <span className="text-white text-xl">{card.icon}</span>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">{card.title}</p>
                <p className="text-2xl font-semibold text-gray-900">{card.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg border p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Thao tác nhanh</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link
            href="/admin/news/create"
            className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <span className="text-2xl mr-3">➕</span>
            <div>
              <h3 className="font-medium text-gray-900">Thêm tin tức</h3>
              <p className="text-sm text-gray-500">Tạo bài viết mới</p>
            </div>
          </Link>
          <Link
            href="/admin/categories"
            className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <span className="text-2xl mr-3">📁</span>
            <div>
              <h3 className="font-medium text-gray-900">Quản lý danh mục</h3>
              <p className="text-sm text-gray-500">Thêm/sửa danh mục</p>
            </div>
          </Link>
          <Link
            href="/admin/contacts"
            className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <span className="text-2xl mr-3">📧</span>
            <div>
              <h3 className="font-medium text-gray-900">Xem liên hệ</h3>
              <p className="text-sm text-gray-500">Phản hồi khách hàng</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  )
}
