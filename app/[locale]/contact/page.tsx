"use client"

import type React from "react"

import Header from "@/components/Header"
import Footer from "@/components/Footer"
import Breadcrumbs from "@/components/breadcrumbs"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Mail, Phone, MapPin, Clock, Send, MessageCircle, CheckCircle } from "lucide-react"
import { useState } from "react"
import { useTranslations } from "next-intl"
import { createClient } from "@supabase/supabase-js"

// Supabase configuration
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://your-project.supabase.co"
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "your-anon-key"
const supabase = createClient(supabaseUrl, supabaseKey)

export default function ContactPage() {
  const t = useTranslations("contactPage")
  const tBreadcrumbs = useTranslations("breadcrumbs")
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    service: "",
    message: "",
  })
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<{ ok?: boolean; msg?: string }>({})

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setResult({})

    try {
      // Insert into Supabase
      const { data, error } = await supabase.from("contacts").insert([
        {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          company: formData.company,
          service: formData.service,
          message: formData.message,
          created_at: new Date().toISOString(),
        },
      ])

      if (error) throw error

      setResult({
        ok: true,
        msg: t("success"),
      })
      setFormData({ name: "", email: "", phone: "", company: "", service: "", message: "" })
    } catch (error) {
      console.error("Error:", error)
      setResult({
        ok: false,
        msg: t("error"),
      })
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  return (
    <div className="bg-gray-50">
      <Header />

      {/* Hero Banner */}
      <section className="relative h-64 md:h-80 flex items-center justify-center bg-gradient-to-r from-blue-900/90 to-blue-700/90">
        <Image src="/contact-office.png" alt="Contact hero" fill className="object-cover -z-10" />
        <div className="text-center text-white px-4">
          <h1 className="text-2xl md:text-4xl font-bold mb-4">{t("title")}</h1>
          <Breadcrumbs items={[{ label: tBreadcrumbs("contact") }]} />
        </div>
      </section>

      <main className="container mx-auto px-4 py-8 md:py-16">
        <div className="max-w-6xl mx-auto">
          {/* Intro */}
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3 md:mb-4">
              🤝 Chúng tôi luôn sẵn sàng hỗ trợ bạn
            </h2>
            <p className="text-base md:text-lg text-gray-600 max-w-3xl mx-auto px-4">{t("desc")} ✨</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-6 md:gap-8">
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <Card className="shadow-xl border-0">
                <CardContent className="p-4 md:p-8">
                  <div className="flex items-center gap-3 mb-4 md:mb-6">
                    <div className="w-10 md:w-12 h-10 md:h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                      <MessageCircle className="h-5 md:h-6 w-5 md:w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg md:text-xl font-semibold text-gray-900">💬 Gửi tin nhắn cho chúng tôi</h3>
                      <p className="text-sm md:text-base text-gray-600">Chúng tôi sẽ phản hồi trong vòng 24 giờ</p>
                    </div>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
                    <div className="grid md:grid-cols-2 gap-4 md:gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">👤 {t("fields.name")} *</label>
                        <Input
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          placeholder={t("placeholders.name")}
                          className="h-10 md:h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">📧 {t("fields.email")} *</label>
                        <Input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          placeholder="your@email.com"
                          className="h-10 md:h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4 md:gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">📱 {t("fields.phone")}</label>
                        <Input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="+84 123 456 789"
                          className="h-10 md:h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">🏢 Công ty</label>
                        <Input
                          name="company"
                          value={formData.company}
                          onChange={handleChange}
                          placeholder="Tên công ty của bạn"
                          className="h-10 md:h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">🚚 Dịch vụ quan tâm</label>
                      <select
                        name="service"
                        value={formData.service}
                        onChange={handleChange}
                        className="w-full h-10 md:h-12 border border-gray-200 rounded-md px-3 focus:border-blue-500 focus:ring-blue-500"
                      >
                        <option value="">Chọn dịch vụ</option>
                        <option value="rail">Vận tải đường sắt</option>
                        <option value="sea">Vận tải đường biển</option>
                        <option value="air">Vận tải hàng không</option>
                        <option value="multimodal">Vận tải đa phương thức</option>
                        <option value="warehousing">Kho bãi & Logistics</option>
                        <option value="customs">Dịch vụ hải quan</option>
                        <option value="other">Khác</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">💭 {t("fields.message")} *</label>
                      <Textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={5}
                        placeholder={t("placeholders.message")}
                        className="resize-none border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>

                    <Button
                      type="submit"
                      disabled={loading}
                      className="w-full h-10 md:h-12 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold shadow-lg"
                    >
                      {loading ? (
                        t("submitting")
                      ) : (
                        <>
                          <Send className="h-4 w-4 mr-2" />
                          {t("submit")}
                        </>
                      )}
                    </Button>

                    {result.msg && (
                      <div
                        className={`p-3 md:p-4 rounded-lg border ${
                          result.ok
                            ? "bg-green-50 border-green-200 text-green-700"
                            : "bg-red-50 border-red-200 text-red-700"
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          {result.ok ? <CheckCircle className="h-5 w-5" /> : "❌"}
                          <span className="text-sm md:text-base">{result.msg}</span>
                        </div>
                      </div>
                    )}
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Contact Info */}
            <div className="space-y-4 md:space-y-6">
              <Card className="shadow-xl border-0">
                <CardContent className="p-4 md:p-6">
                  <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-4">📞 {t("info.title")}</h3>
                  <div className="space-y-3 md:space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="w-8 md:w-10 h-8 md:h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <Mail className="h-4 md:h-5 w-4 md:w-5 text-blue-600" />
                      </div>
                      <div>
                        <div className="font-medium text-gray-900 text-sm md:text-base">Email</div>
                        <a
                          href="mailto:sagoke-group@gmail.com"
                          className="text-blue-600 hover:underline text-sm md:text-base"
                        >
                          sagoke-group@gmail.com
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="w-8 md:w-10 h-8 md:h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <Phone className="h-4 md:h-5 w-4 md:w-5 text-green-600" />
                      </div>
                      <div>
                        <div className="font-medium text-gray-900 text-sm md:text-base">Hotline</div>
                        <a href="tel:+84123456789" className="text-green-600 hover:underline text-sm md:text-base">
                          +84 123 456 789
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="w-8 md:w-10 h-8 md:h-10 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <MapPin className="h-4 md:h-5 w-4 md:w-5 text-red-600" />
                      </div>
                      <div>
                        <div className="font-medium text-gray-900 text-sm md:text-base">Địa chỉ</div>
                        <div className="text-gray-600 text-sm md:text-base">
                          Tầng 15, Tòa nhà ABC
                          <br />
                          123 Đường XYZ, Quận 1<br />
                          TP. Hồ Chí Minh, Việt Nam
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="w-8 md:w-10 h-8 md:h-10 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <Clock className="h-4 md:h-5 w-4 md:w-5 text-orange-600" />
                      </div>
                      <div>
                        <div className="font-medium text-gray-900 text-sm md:text-base">Giờ làm việc</div>
                        <div className="text-gray-600 text-sm md:text-base">
                          Thứ 2 - Thứ 6: 8:00 - 17:30
                          <br />
                          Thứ 7: 8:00 - 12:00
                          <br />
                          Chủ nhật: Nghỉ
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-xl border-0">
                <CardContent className="p-4 md:p-6">
                  <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-4">🌐 Kết nối với chúng tôi</h3>
                  <div className="flex gap-3 mb-4">
                    <a
                      href="#"
                      className="w-8 md:w-10 h-8 md:h-10 bg-blue-600 rounded-full flex items-center justify-center text-white hover:bg-blue-700 transition-colors"
                    >
                      <div className="text-xs font-bold">f</div>
                    </a>
                    <a
                      href="#"
                      className="w-8 md:w-10 h-8 md:h-10 bg-blue-500 rounded-full flex items-center justify-center text-white hover:bg-blue-600 transition-colors"
                    >
                      <div className="text-xs font-bold">in</div>
                    </a>
                    <a
                      href="#"
                      className="w-8 md:w-10 h-8 md:h-10 bg-red-600 rounded-full flex items-center justify-center text-white hover:bg-red-700 transition-colors"
                    >
                      <div className="text-xs font-bold">yt</div>
                    </a>
                  </div>
                  <p className="text-xs md:text-sm text-gray-600">
                    Theo dõi chúng tôi để cập nhật tin tức mới nhất về logistics và vận tải! 📱
                  </p>
                </CardContent>
              </Card>

              <Card className="shadow-xl border-0 bg-gradient-to-r from-blue-50 to-cyan-50">
                <CardContent className="p-4 md:p-6">
                  <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-2">⚡ Hỗ trợ khẩn cấp</h3>
                  <p className="text-xs md:text-sm text-gray-600 mb-3">Cần hỗ trợ gấp ngoài giờ làm việc?</p>
                  <Button className="w-full bg-red-600 hover:bg-red-700 text-sm md:text-base">
                    📞 Hotline 24/7: 1900-xxxx
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
