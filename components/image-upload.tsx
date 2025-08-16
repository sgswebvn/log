"use client"

import type React from "react"

import { useState, useRef } from "react"
import { uploadImage } from "@/lib/supabase-upload"
import { Button } from "./button"
import { X, Upload, ImageIcon } from "lucide-react"

interface ImageUploadProps {
  value?: string
  onChange: (url: string) => void
  onRemove: () => void
  disabled?: boolean
}

export function ImageUpload({ value, onChange, onRemove, disabled }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Validate file type
    if (!file.type.startsWith("image/")) {
      alert("Vui lòng chọn file hình ảnh")
      return
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert("File quá lớn. Vui lòng chọn file nhỏ hơn 5MB")
      return
    }

    setUploading(true)
    try {
      const url = await uploadImage(file)
      if (url) {
        onChange(url)
      } else {
        alert("Có lỗi xảy ra khi upload hình ảnh")
      }
    } catch (error) {
      console.error("Upload error:", error)
      alert("Có lỗi xảy ra khi upload hình ảnh")
    } finally {
      setUploading(false)
      // Reset input
      if (fileInputRef.current) {
        fileInputRef.current.value = ""
      }
    }
  }

  return (
    <div className="space-y-4">
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
        disabled={disabled || uploading}
      />

      {value ? (
        <div className="relative">
          <img src={value || "/placeholder.svg"} alt="Preview" className="w-full h-48 object-cover rounded-lg border" />
          <button
            type="button"
            onClick={onRemove}
            disabled={disabled}
            className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      ) : (
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
          <ImageIcon className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <p className="text-gray-500 mb-4">Chưa có hình ảnh</p>
          <Button
            type="button"
            variant="outline"
            onClick={() => fileInputRef.current?.click()}
            disabled={disabled || uploading}
          >
            <Upload className="h-4 w-4 mr-2" />
            {uploading ? "Đang upload..." : "Chọn hình ảnh"}
          </Button>
        </div>
      )}

      <p className="text-xs text-gray-500">Hỗ trợ: JPG, PNG, GIF. Tối đa 5MB.</p>
    </div>
  )
}
