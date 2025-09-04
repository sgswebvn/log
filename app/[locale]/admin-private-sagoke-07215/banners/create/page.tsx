"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase"
import { uploadImage } from "@/lib/supabase-upload"
import Link from "next/link"

export default function CreateBannerPage() {
    const router = useRouter()
    const [saving, setSaving] = useState(false)
    const [uploading, setUploading] = useState(false)
    const [activeTab, setActiveTab] = useState<"vi" | "en">("vi")
    const [imagePreview, setImagePreview] = useState<string | null>(null) // State for image preview
    const [formData, setFormData] = useState({
        title_vi: "",
        title_en: "",
        description_vi: "",
        description_en: "",
        order_number: "",
        image: null as File | null,
    })

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setSaving(true)

        try {
            let image_url = ""
            if (formData.image) {
                const uploadedUrl = await uploadImage(formData.image)
                if (!uploadedUrl) throw new Error("Image upload failed")
                image_url = uploadedUrl
            }

            const { error } = await supabase.from("banners").insert([
                {
                    title_vi: formData.title_vi,
                    title_en: formData.title_en,
                    description_vi: formData.description_vi,
                    description_en: formData.description_en,
                    image_url,
                    order_number: parseInt(formData.order_number),
                    active: true,
                },
            ])

            if (error) throw error

            alert("Tạo banner thành công!")
            router.push("/vi/admin-private-sagoke-07215/banners")
        } catch (error) {
            console.error("Error creating banner:", error)
            alert("Có lỗi xảy ra khi tạo banner")
        } finally {
            setSaving(false)
        }
    }

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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

        // Show local preview immediately
        const previewUrl = URL.createObjectURL(file)
        setImagePreview(previewUrl)
        setFormData((prev) => ({ ...prev, image: file }))

        // Clean up preview URL when component unmounts or new file is selected
        return () => {
            if (previewUrl) URL.revokeObjectURL(previewUrl)
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
                <Link href="/vi/admin-private-sagoke-07215/banners" className="text-gray-500 hover:text-gray-700 transition-colors">
                    ← Quay lại
                </Link>
                <h1 className="text-2xl font-semibold text-gray-900">Thêm banner mới</h1>
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
                                <label htmlFor="title_vi" className="block text-sm font-medium text-gray-700 mb-2">
                                    Tiêu đề banner tiếng Việt *
                                </label>
                                <input
                                    type="text"
                                    id="title_vi"
                                    value={formData.title_vi}
                                    onChange={(e) => handleChange("title_vi", e.target.value)}
                                    required
                                    placeholder="Nhập tiêu đề banner..."
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
                                    placeholder="Nhập mô tả banner..."
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
                                <label htmlFor="title_en" className="block text-sm font-medium text-gray-700 mb-2">
                                    Tiêu đề banner tiếng Anh *
                                </label>
                                <input
                                    type="text"
                                    id="title_en"
                                    value={formData.title_en}
                                    onChange={(e) => handleChange("title_en", e.target.value)}
                                    required
                                    placeholder="Enter banner title..."
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
                                    placeholder="Enter banner description..."
                                    rows={3}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                                />
                            </div>
                        </div>
                    )}

                    {/* Common Fields */}
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="order_number" className="block text-sm font-medium text-gray-700 mb-2">
                                Thứ tự hiển thị *
                            </label>
                            <input
                                type="number"
                                id="order_number"
                                value={formData.order_number}
                                onChange={(e) => handleChange("order_number", e.target.value)}
                                required
                                placeholder="Nhập thứ tự (1, 2, 3...)"
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                            />
                        </div>

                        <div>
                            <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-2">
                                Hình ảnh banner *
                            </label>
                            <input
                                type="file"
                                id="image"
                                accept="image/*"
                                onChange={handleImageChange}
                                disabled={uploading}
                                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                            />
                            {uploading && <p className="text-sm text-blue-600">Đang upload...</p>}
                            {imagePreview && (
                                <div className="relative mt-4">
                                    <img
                                        src={imagePreview}
                                        alt="Preview"
                                        className="w-full h-48 object-cover rounded-lg"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setImagePreview(null)
                                            setFormData((prev) => ({ ...prev, image: null }))
                                        }}
                                        className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                                    >
                                        ✕
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-3 pt-4 border-t">
                        <button
                            type="submit"
                            disabled={saving || uploading}
                            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm font-medium"
                        >
                            {saving ? "⏳ Đang lưu..." : "💾 Tạo banner"}
                        </button>
                        <Link
                            href="/vi/admin-private-sagoke-07215/banners"
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