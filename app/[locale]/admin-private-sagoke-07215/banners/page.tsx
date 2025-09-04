"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"
import Link from "next/link"

interface Banner {
    id: string
    title_vi: string
    title_en: string
    description_vi: string
    description_en: string
    image_url: string
    order_number: number
    active: boolean
    created_at: string
}

export default function BannersPage() {
    const [banners, setBanners] = useState<Banner[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchBanners()
    }, [])

    const fetchBanners = async () => {
        try {
            const { data, error } = await supabase
                .from("banners")
                .select("*")
                .order("order_number", { ascending: true })

            if (error) throw error
            setBanners(data || [])
        } catch (error) {
            console.error("Error fetching banners:", error)
        } finally {
            setLoading(false)
        }
    }

    const handleDelete = async (id: string, title: string) => {
        if (!confirm(`Bạn có chắc chắn muốn xóa banner "${title}"?`)) return

        try {
            const { error } = await supabase.from("banners").delete().eq("id", id)

            if (error) throw error

            setBanners(banners.filter((banner) => banner.id !== id))
            alert("Xóa banner thành công!")
        } catch (error) {
            console.error("Error deleting banner:", error)
            alert("Có lỗi xảy ra khi xóa banner")
        }
    }

    if (loading) {
        return (
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <h1 className="text-2xl font-semibold text-gray-900">Quản lý banner</h1>
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
                    <h1 className="text-2xl font-semibold text-gray-900">Quản lý banner</h1>
                    <p className="text-gray-600">Tổng cộng {banners.length} banner</p>
                </div>
                <Link
                    href="/vi/admin-private-sagoke-07215/banners/create"
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium inline-flex items-center gap-2"
                >
                    ➕ Thêm banner
                </Link>
            </div>

            {/* Banners List */}
            <div className="bg-white rounded-lg border">
                <div className="px-6 py-4 border-b">
                    <h2 className="text-lg font-medium text-gray-900">Danh sách banner</h2>
                </div>

                {banners.length > 0 ? (
                    <div className="divide-y">
                        {banners.map((banner) => (
                            <div key={banner.id} className="px-6 py-4">
                                <div className="flex items-start justify-between">
                                    <div className="flex items-start gap-4">
                                        {banner.image_url && (
                                            <div className="relative">
                                                <img
                                                    src={banner.image_url}
                                                    alt={banner.title_vi}
                                                    className="w-24 h-24 object-cover rounded-lg"
                                                />
                                            </div>
                                        )}
                                        <div className="flex-1">
                                            <div className="flex items-center gap-3 mb-2">
                                                <h3 className="text-lg font-medium text-gray-900">{banner.title_vi}</h3>
                                                <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs font-mono">
                                                    Thứ tự: {banner.order_number}
                                                </span>
                                                {banner.active && (
                                                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-medium">
                                                        Hoạt động
                                                    </span>
                                                )}
                                            </div>

                                            <p className="text-sm text-gray-600 mb-1">🇺🇸 {banner.title_en}</p>

                                            {(banner.description_vi || banner.description_en) && (
                                                <div className="text-sm text-gray-500 space-y-1 mb-2">
                                                    {banner.description_vi && <p>🇻🇳 {banner.description_vi}</p>}
                                                    {banner.description_en && <p>🇺🇸 {banner.description_en}</p>}
                                                </div>
                                            )}

                                            <p className="text-xs text-gray-400">
                                                Tạo ngày: {new Date(banner.created_at).toLocaleDateString("vi-VN")}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-2 ml-4">
                                        <Link
                                            href={`/vi/admin-private-sagoke-07215/banners/edit/${banner.id}`}
                                            className="bg-blue-50 text-blue-700 px-3 py-1 rounded text-sm font-medium hover:bg-blue-100 transition-colors"
                                        >
                                            ✏️ Sửa
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(banner.id, banner.title_vi)}
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
                        <h3 className="text-lg font-medium text-gray-900 mb-2">Chưa có banner nào</h3>
                        <p className="text-gray-500 mb-6">Thêm banner đầu tiên để bắt đầu hiển thị trên trang chủ</p>
                        <Link
                            href="/vi/admin-private-sagoke-07215/banners/create"
                            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium inline-flex items-center gap-2"
                        >
                            Thêm banner đầu tiên
                        </Link>
                    </div>
                )}
            </div>
        </div>
    )
}