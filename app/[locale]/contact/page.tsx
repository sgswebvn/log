"use client"

import type React from "react"
import { useState } from "react"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  CheckCircle,
  Users,
  Globe,
  Award,
  Truck,
  Building,
  MessageCircle,
} from "lucide-react"
import { useTranslations } from "next-intl"
import { useParams } from "next/navigation"
import { supabase } from "@/lib/supabase"
import FadeInUp from "@/components/fade-in-up"
import SlideInLeft from "@/components/slide-in-left"
import SlideInRight from "@/components/slide-in-right"

export default function ContactPage() {
  const params = useParams()
  const locale = params.locale as string
  const t = useTranslations("contactPage")
  const tServices = useTranslations("services")
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    service: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const { error } = await supabase.from("contacts").insert({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        company: formData.company,
        service: formData.service,
        message: formData.message,
        status: "new",
      })

      if (error) throw error

      setIsSubmitted(true)
      setFormData({
        name: "",
        email: "",
        phone: "",
        company: "",
        service: "",
        message: "",
      })
    } catch (error) {
      console.error("Error submitting form:", error)
    } finally {
      setIsSubmitting(false)
    }
  }


  const emailContact = {
    icon: Mail,
    titleKey: "contactMethods.email.title",
    infoKey: "contactMethods.email.info",
    descriptionKey: "contactMethods.email.description",
    color: "from-green-500 to-green-600",
    action: "mailto:ops@sagoke-group.com",
  }


  const contactMethods = [emailContact]

  const customersStat = {
    icon: Users,
    valueKey: "stats.customers.value",
    labelKey: "stats.customers.label",
  }

  const countriesStat = {
    icon: Globe,
    valueKey: "stats.countries.value",
    labelKey: "stats.countries.label",
  }

  const experienceStat = {
    icon: Award,
    valueKey: "stats.experience.value",
    labelKey: "stats.experience.label",
  }

  const shipmentsStat = {
    icon: Truck,
    valueKey: "stats.shipments.value",
    labelKey: "stats.shipments.label",
  }

  const stats = [customersStat, countriesStat, experienceStat, shipmentsStat]

  const globalNetworkReason = {
    key: "whyChooseUs.globalNetwork",
  }

  const trackingReason = {
    key: "whyChooseUs.tracking",
  }

  const expertTeamReason = {
    key: "whyChooseUs.expertTeam",
  }

  const pricingReason = {
    key: "whyChooseUs.pricing",
  }

  const supportReason = {
    key: "whyChooseUs.support",
  }

  const insuranceReason = {
    key: "whyChooseUs.insurance",
  }

  const whyChooseUs = [
    globalNetworkReason,
    trackingReason,
    expertTeamReason,
    pricingReason,
    supportReason,
    insuranceReason,
  ]

  return (
    <div className="bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 min-h-screen pt-20">
      <Header />
      <br />
      <br />
      {/* Hero Section */}
      <section className="relative h-80 md:h-96 flex items-center justify-center overflow-hidden">
        <img src="/contact-hero.jpg" alt="" className="object-cover" />


        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/70 to-black/80" />
        <div className="relative text-center text-white px-4 z-10">
          <FadeInUp>
            <h1 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight">{t("title")}</h1>
            <p className="text-lg md:text-xl text-blue-100 mb-6 max-w-2xl mx-auto">{t("desc")}</p>
            <div className="flex flex-wrap justify-center gap-4">
              {contactMethods.map((method, index) => (
                <a
                  key={index}
                  href={method.action}
                  className="flex items-center gap-3 bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full hover:bg-white/20 transition-all duration-300"
                >
                  <method.icon className="h-5 w-5" />
                  <span className="font-medium">{t(method.infoKey)}</span>
                </a>
              ))}
            </div>
          </FadeInUp>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <FadeInUp>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 bg-blue-100 rounded-2xl flex items-center justify-center">
                    <stat.icon className="h-8 w-8 text-blue-600" />
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-2">{t(stat.valueKey)}</div>
                  <div className="text-gray-600">{t(stat.labelKey)}</div>
                </div>
              ))}
            </div>
          </FadeInUp>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <SlideInLeft>
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">{t("form.title")}</h2>
                <p className="text-gray-600 mb-8">{t("form.desc")}</p>

                {isSubmitted ? (
                  <div className="bg-green-50 border border-green-200 rounded-2xl p-8 text-center">
                    <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                    <h3 className="text-2xl font-bold text-green-800 mb-2">{t("form.success.title")}</h3>
                    <p className="text-green-600">{t("form.success.desc")}</p>
                    <Button
                      onClick={() => setIsSubmitted(false)}
                      className="mt-6 bg-green-600 hover:bg-green-700 rounded-xl"
                    >
                      {t("form.success.button")}
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">{t("fields.name")}</label>
                        <div className="relative">
                          <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                          <Input
                            type="text"
                            required
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            placeholder={t("placeholders.name")}
                            className="pl-10 h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500 rounded-xl placeholder:text-gray-400"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">{t("fields.email")}</label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                          <Input
                            type="email"
                            required
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            placeholder={t("placeholders.email")}
                            className="pl-10 h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500 rounded-xl placeholder:text-gray-400"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">{t("fields.phone")}</label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                          <Input
                            type="tel"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            placeholder={t("placeholders.phone")}
                            className="pl-10 h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500 rounded-xl placeholder:text-gray-400"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">{t("fields.company")}</label>
                        <div className="relative">
                          <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                          <Input
                            type="text"
                            value={formData.company}
                            onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                            placeholder={t("placeholders.company")}
                            className="pl-10 h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500 rounded-xl placeholder:text-gray-400"
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">{t("fields.service")}</label>
                      <select
                        value={formData.service}
                        onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                        className="w-full h-12 px-4 border border-gray-200 rounded-xl focus:border-blue-500 focus:ring-blue-500 placeholder:text-gray-400"
                      >
                        <option value="">{t("placeholders.service")}</option>
                        <option value="rail">{tServices("items.rail.title")}</option>
                        <option value="seaFreight">{tServices("items.seaFreight.title")}</option>
                        <option value="airLogistics">{tServices("items.airLogistics.title")}</option>
                        <option value="road">{tServices("items.road.title")}</option>
                        <option value="warehousing">{tServices("items.warehousing.title")}</option>
                        <option value="customs">{tServices("items.customs.title")}</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">{t("fields.message")}</label>
                      <Textarea
                        required
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder={t("placeholders.message")}
                        rows={6}
                        className="border-gray-200 focus:border-blue-500 focus:ring-blue-500 rounded-xl placeholder:text-gray-400"
                      />
                    </div>

                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-lg font-semibold rounded-xl"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                          {t("submitting")}
                        </>
                      ) : (
                        <>
                          <Send className="h-5 w-5 mr-2" />
                          {t("submit")}
                        </>
                      )}
                    </Button>
                  </form>
                )}
              </div>
            </SlideInLeft>

            {/* Contact Info & Why Choose Us */}
            <SlideInRight>
              <div className="space-y-8">
                {/* Contact Methods */}
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">{t("info.title")}</h3>
                  <div className="space-y-4">
                    {contactMethods.map((method, index) => (
                      <Card
                        key={index}
                        className="border-0 shadow-xl backdrop-blur-sm bg-white/80 rounded-3xl hover:shadow-2xl transition-all duration-300"
                      >
                        <CardContent className="p-6">
                          <div className="flex items-center gap-4">
                            <div
                              className={`w-12 h-12 rounded-xl bg-gradient-to-r ${method.color} flex items-center justify-center`}
                            >
                              <method.icon className="h-6 w-6 text-white" />
                            </div>
                            <div className="flex-1">
                              <h4 className="font-bold text-gray-900">{t(method.titleKey)}</h4>
                              <p className="text-blue-600 font-semibold">{t(method.infoKey)}</p>
                              <p className="text-sm text-gray-600">{t(method.descriptionKey)}</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>

                {/* Office Info */}
                <Card className="border-0 shadow-xl backdrop-blur-sm bg-white/80 rounded-3xl">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-orange-500 to-red-500 flex items-center justify-center">
                        <MapPin className="h-6 w-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold text-gray-900 mb-2">{t("office.title")}</h4>
                        <p className="text-gray-700 mb-2">{t("office.address")}</p>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Clock className="h-4 w-4" />
                          <span>{t("office.hours")}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Why Choose Us */}
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">{t("whyChooseUs.title")}</h3>
                  <div className="space-y-3">
                    {whyChooseUs.map((reason, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                        <span className="text-gray-700">{t(reason.key)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </SlideInRight>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}