"use client"

import Header from "@/components/Header"
import Footer from "@/components/Footer"
import Breadcrumbs from "@/components/common/breadcrumbs"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Target, Heart } from "lucide-react"
import { useTranslations } from "next-intl"

export default function AboutPage() {
  const t = useTranslations("about")
  const tBreadcrumbs = useTranslations("breadcrumbs")

  const stats = [
    { icon: "👥", value: "23+", label: t("stats.years") },
    { icon: "🌍", value: "66", label: t("stats.countries") },
    { icon: "📍", value: "320", label: t("stats.projects") },
    { icon: "📦", value: "4586+", label: t("stats.square") },
  ]

  const timelineData = [
    {
      year: "2002 - 2005",
      color: "bg-blue-600",
      items: t.raw("timeline.y2002_2005") as string[],
    },
    {
      year: "2006 - 2010",
      color: "bg-yellow-500",
      items: t.raw("timeline.y2006_2010") as string[],
    },
    {
      year: "2011 - 2015",
      color: "bg-pink-500",
      items: t.raw("timeline.y2011_2015") as string[],
    },
    {
      year: "2016 - 2020",
      color: "bg-indigo-600",
      items: t.raw("timeline.y2016_2020") as string[],
    },
    {
      year: "2021 - 2024",
      color: "bg-green-600",
      items: t.raw("timeline.y2021_2024") as string[],
    },
  ]

  const certificates = [
    { img: "/iso9001-certificate.png", title: t("certs.cert1") },
    { img: "/certificate-management-concept.png", title: t("certs.cert2") },
    { img: "/placeholder-6e8qr.png", title: t("certs.cert3") },
  ]

  const awards = [
    { img: "/logistics-excellence-award.png", title: t("awards.award1") },
    { img: "/innovation-award.png", title: t("awards.award2") },
    { img: "/placeholder-uylxn.png", title: t("awards.award3") },
    { img: "/placeholder-dyh5t.png", title: t("awards.award4") },
    { img: "/customer-satisfaction-award.png", title: t("awards.award5") },
    { img: "/placeholder-382vf.png", title: t("awards.award6") },
  ]

  return (
    <div className="bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 min-h-screen">
      <Header />

      {/* Hero Banner with Background Image */}
      <section className="relative h-80 md:h-96 flex items-center justify-center overflow-hidden">
        <Image src="/breakcrum.jpg" alt="About hero background" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/70 to-black/80" />
        <div className="relative text-center text-white px-4 z-10">
          <h1 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight">{t("hero.title")}</h1>
          <p className="text-lg md:text-xl text-blue-100 mb-6 max-w-2xl mx-auto">
            {t("hero.subtitle")}

          </p>
          <Breadcrumbs items={[{ label: tBreadcrumbs("about") }]} />
        </div>
      </section>

      <main>
        {/* About Overview */}
        <section className="container mx-auto px-4 py-12 md:py-20">
          <div className="grid lg:grid-cols-2 gap-12 md:gap-16 items-center">
            <div className="relative order-2 lg:order-1">
              <Image
                src="/team-group-photo-on-stage.png"
                alt={t("overview.imageAlt")}
                width={600}
                height={400}
                className="rounded-3xl shadow-2xl w-full"
              />
            </div>

            <div className="order-1 lg:order-2">

              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">{t("overview.heading")}</h2>
              <div className="space-y-4 text-gray-600 leading-relaxed mb-8">
                <p className="text-lg">{t("overview.paragraph1")}</p>
                <p>{t("overview.paragraph2")}</p>
                <p>{t("overview.paragraph3")}</p>
              </div>
              <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                {t("overview.cta")}
              </Button>
            </div>
          </div>
        </section>

        {/* Stats Banner */}
        <section className="bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 text-white py-12 md:py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {stats.map((stat, i) => (
                <div key={i} className="text-center">
                  <div className="text-4xl md:text-5xl mb-3">{stat.icon}</div>
                  <div className="text-2xl md:text-4xl font-bold mb-2">{stat.value}</div>
                  <div className="text-sm md:text-base text-blue-100 px-2">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section className="container mx-auto px-4 py-12 md:py-20">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12 md:mb-16">
              {t("timeline.title")}
            </h2>
            {timelineData.map((period, i) => (
              <div key={i} className="flex gap-8 mb-12 last:mb-0">
                <div className="flex-shrink-0 w-32 text-right">
                  <div className="inline-block bg-white border-2 border-gray-200 rounded-xl px-4 py-2 shadow-lg">
                    <div className="text-sm font-bold text-gray-900">{period.year}</div>
                  </div>
                </div>
                <div className="flex-shrink-0 relative">
                  <div className={`w-6 h-6 rounded-full ${period.color} mt-2 shadow-lg`} />
                  {i < timelineData.length - 1 && <div className="absolute top-8 left-3 w-px h-16 bg-gray-200" />}
                </div>
                <div className="flex-1 pt-1">
                  <div className="bg-white/80 backdrop-blur-sm border border-gray-200 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
                    <ul className="space-y-2">
                      {period.items.map((item, j) => (
                        <li key={j} className="flex items-start gap-3">
                          <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0" />
                          <span className="text-gray-700 leading-relaxed">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Philosophy */}
        <section className="py-12 md:py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-4">{t("philosophy.title")}</h2>
            <p className="text-center text-gray-600 max-w-3xl mx-auto mb-12 text-lg px-4">{t("philosophy.intro")}</p>

            <div className="grid lg:grid-cols-3 gap-8 items-center">
              <Card className="text-center h-full backdrop-blur-sm bg-white/80 shadow-xl border-0 rounded-3xl hover:shadow-2xl transition-all duration-500">
                <CardContent className="p-8">
                  <div className="w-16 h-16 mx-auto mb-4 bg-blue-100 rounded-2xl flex items-center justify-center">
                    <Target className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-bold mb-4">{t("philosophy.vision.title")}</h3>
                  <p className="text-gray-600 leading-relaxed">{t("philosophy.vision.desc")}</p>
                </CardContent>
              </Card>

              <div className="relative order-first lg:order-none">
                <Image
                  src="/placeholder-4fzhd.png"
                  alt={t("philosophy.centerAlt")}
                  width={400}
                  height={300}
                  className="rounded-3xl shadow-2xl w-full"
                />
              </div>

              <Card className="text-center h-full backdrop-blur-sm bg-white/80 shadow-xl border-0 rounded-3xl hover:shadow-2xl transition-all duration-500">
                <CardContent className="p-8">
                  <div className="w-16 h-16 mx-auto mb-4 bg-green-100 rounded-2xl flex items-center justify-center">
                    <Heart className="h-8 w-8 text-green-600" />
                  </div>
                  <h3 className="text-xl font-bold mb-4">{t("philosophy.mission.title")}</h3>
                  <p className="text-gray-600 leading-relaxed">{t("philosophy.mission.desc")}</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Certifications */}
        <section className="container mx-auto px-4 py-12 md:py-20">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{t("certs.title")}</h2>
          <p className="text-gray-600 mb-12 max-w-3xl text-lg">{t("certs.desc")}</p>

          <div className="grid md:grid-cols-3 gap-8">
            {certificates.map((cert, i) => (
              <Card
                key={i}
                className="overflow-hidden backdrop-blur-sm bg-white/80 shadow-xl border-0 rounded-3xl hover:shadow-2xl transition-all duration-500"
              >
                <CardContent className="p-0">
                  <div className="relative aspect-[4/3]">
                    <Image src={cert.img || "/placeholder.svg"} alt={cert.title} fill className="object-cover" />
                  </div>
                  <div className="p-6">
                    <h3 className="font-semibold text-center">{cert.title}</h3>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>


      </main>

      <Footer />
    </div>
  )
}
