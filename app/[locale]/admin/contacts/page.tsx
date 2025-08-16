"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"

interface Contact {
  id: number
  name: string
  email: string
  phone?: string
  company?: string
  service?: string
  message: string
  status: "new" | "processing" | "completed"
  created_at: string
  updated_at: string
}

export default function ContactsPage() {
  const [contacts, setContacts] = useState<Contact[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null)
  const [statusFilter, setStatusFilter] = useState<"all" | "new" | "processing" | "completed">("all")

  useEffect(() => {
    fetchContacts()
  }, [])

  const fetchContacts = async () => {
    try {
      const { data, error } = await supabase.from("contacts").select("*").order("created_at", { ascending: false })

      if (error) throw error
      setContacts(data || [])
    } catch (error) {
      console.error("Error fetching contacts:", error)
    } finally {
      setLoading(false)
    }
  }

  const updateStatus = async (id: number, status: Contact["status"]) => {
    try {
      const { error } = await supabase
        .from("contacts")
        .update({ status, updated_at: new Date().toISOString() })
        .eq("id", id)

      if (error) throw error

      setContacts(contacts.map((contact) => (contact.id === id ? { ...contact, status } : contact)))
      if (selectedContact && selectedContact.id === id) {
        setSelectedContact({ ...selectedContact, status })
      }
      alert("Cập nhật trạng thái thành công!")
    } catch (error) {
      console.error("Error updating status:", error)
      alert("Có lỗi xảy ra khi cập nhật trạng thái")
    }
  }

  const deleteContact = async (id: number) => {
    if (!confirm("Bạn có chắc chắn muốn xóa liên hệ này?")) return

    try {
      const { error } = await supabase.from("contacts").delete().eq("id", id)

      if (error) throw error

      setContacts(contacts.filter((contact) => contact.id !== id))
      if (selectedContact && selectedContact.id === id) {
        setSelectedContact(null)
      }
      alert("Xóa liên hệ thành công!")
    } catch (error) {
      console.error("Error deleting contact:", error)
      alert("Có lỗi xảy ra khi xóa liên hệ")
    }
  }

  const getStatusColor = (status: Contact["status"]) => {
    switch (status) {
      case "new":
        return "bg-red-100 text-red-800"
      case "processing":
        return "bg-yellow-100 text-yellow-800"
      case "completed":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusText = (status: Contact["status"]) => {
    switch (status) {
      case "new":
        return "Mới"
      case "processing":
        return "Đang xử lý"
      case "completed":
        return "Hoàn thành"
      default:
        return "Không xác định"
    }
  }

  const filteredContacts = contacts.filter((contact) => {
    return statusFilter === "all" || contact.status === statusFilter
  })

  if (loading) {
    return (
      <div className="space-y-6">
        <h1 className="text-2xl font-semibold text-gray-900">Quản lý liên hệ</h1>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg border p-4 animate-pulse">
              <div className="space-y-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-16 bg-gray-200 rounded"></div>
                ))}
              </div>
            </div>
          </div>
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg border p-6 animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
              <div className="space-y-3">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="h-4 bg-gray-200 rounded"></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Quản lý liên hệ</h1>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value as any)}
          className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
        >
          <option value="all">Tất cả trạng thái</option>
          <option value="new">Mới</option>
          <option value="processing">Đang xử lý</option>
          <option value="completed">Hoàn thành</option>
        </select>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Contacts List */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg border">
            <div className="px-4 py-3 border-b">
              <h2 className="font-medium text-gray-900">Danh sách liên hệ ({filteredContacts.length})</h2>
            </div>
            <div className="max-h-96 overflow-y-auto">
              {filteredContacts.length > 0 ? (
                <div className="divide-y">
                  {filteredContacts.map((contact) => (
                    <div
                      key={contact.id}
                      onClick={() => setSelectedContact(contact)}
                      className={`p-4 cursor-pointer hover:bg-gray-50 transition-colors ${selectedContact?.id === contact.id ? "bg-blue-50 border-r-2 border-blue-500" : ""
                        }`}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-medium text-gray-900 text-sm">{contact.name}</h3>
                        <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(contact.status)}`}>
                          {getStatusText(contact.status)}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-1">{contact.email}</p>
                      <p className="text-xs text-gray-500">
                        {new Date(contact.created_at).toLocaleDateString("vi-VN")}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-8 text-center">
                  <div className="text-4xl mb-4">📧</div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Chưa có liên hệ nào</h3>
                  <p className="text-gray-500">Các liên hệ từ khách hàng sẽ hiển thị ở đây</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Contact Detail */}
        <div className="lg:col-span-2">
          {selectedContact ? (
            <div className="bg-white rounded-lg border">
              <div className="px-6 py-4 border-b flex items-center justify-between">
                <h2 className="text-lg font-medium text-gray-900">Chi tiết liên hệ</h2>
                <div className="flex gap-2">
                  <select
                    value={selectedContact.status}
                    onChange={(e) => updateStatus(selectedContact.id, e.target.value as Contact["status"])}
                    className="px-3 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="new">Mới</option>
                    <option value="processing">Đang xử lý</option>
                    <option value="completed">Hoàn thành</option>
                  </select>
                  <button
                    onClick={() => deleteContact(selectedContact.id)}
                    className="bg-red-50 text-red-700 px-3 py-1 rounded text-sm font-medium hover:bg-red-100 transition-colors"
                  >
                    🗑️ Xóa
                  </button>
                </div>
              </div>

              <div className="p-6 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Họ tên</label>
                    <p className="text-gray-900">{selectedContact.name}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <p className="text-gray-900">{selectedContact.email}</p>
                  </div>
                  {selectedContact.phone && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Số điện thoại</label>
                      <p className="text-gray-900">{selectedContact.phone}</p>
                    </div>
                  )}
                  {selectedContact.company && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Công ty</label>
                      <p className="text-gray-900">{selectedContact.company}</p>
                    </div>
                  )}
                  {selectedContact.service && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Dịch vụ quan tâm</label>
                      <p className="text-gray-900">{selectedContact.service}</p>
                    </div>
                  )}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Trạng thái</label>
                    <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(selectedContact.status)}`}>
                      {getStatusText(selectedContact.status)}
                    </span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Tin nhắn</label>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-gray-900 whitespace-pre-wrap">{selectedContact.message}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-500">
                  <div>
                    <label className="block font-medium mb-1">Ngày tạo</label>
                    <p>{new Date(selectedContact.created_at).toLocaleString("vi-VN")}</p>
                  </div>
                  <div>
                    <label className="block font-medium mb-1">Cập nhật lần cuối</label>
                    <p>{new Date(selectedContact.updated_at).toLocaleString("vi-VN")}</p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-lg border p-12 text-center">
              <div className="text-6xl mb-4">📧</div>
              <h3 className="text-xl font-medium text-gray-900 mb-2">Chọn một liên hệ</h3>
              <p className="text-gray-500">Chọn một liên hệ từ danh sách bên trái để xem chi tiết</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
