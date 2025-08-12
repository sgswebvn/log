"use client"

import Header from "@/components/Header"
import Footer from "@/components/Footer"
import Breadcrumbs from "@/components/breadcrumbs"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Target, Heart } from "lucide-react"
import { useTranslations } from "next-intl"

export default function AboutPage() {
  const t = useTranslations("about")

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
    <div className="bg-white">
      <Header />

      {/* Hero Banner */}
      <section className="relative h-64 md:h-80 flex items-center justify-center bg-gradient-to-r from-blue-900/90 to-blue-700/90">
        <Image
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/www.nep-logistics.com_en_about.php-OQMrJDe5hxoKK4M7PSDkW40F1KfjBZ.png"
          alt="About hero"
          fill
          className="object-cover -z-10"
        />
        <div className="text-center text-white px-4">
          <h1 className="text-2xl md:text-4xl font-bold mb-4">{t("hero.title")}</h1>
          <Breadcrumbs items={[{ label: t("hero.crumbs.about") }]} />
        </div>
      </section>

      <main>
        {/* About Overview */}
        <section className="container mx-auto px-4 py-8 md:py-16">
          <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
            <div className="relative order-2 lg:order-1">
              <Image
                src="/team-group-photo-on-stage.png"
                alt={t("overview.imageAlt")}
                width={600}
                height={400}
                className="rounded-lg shadow-lg w-full"
              />
            </div>

            <div className="order-1 lg:order-2">
              <h2 className="text-xl md:text-3xl font-bold text-gray-900 mb-4 md:mb-6">{t("overview.heading")}</h2>
              <div className="space-y-3 md:space-y-4 text-sm md:text-base text-gray-600 leading-relaxed mb-6 md:mb-8">
                <p>{t("overview.paragraph1")}</p>
                <p>{t("overview.paragraph2")}</p>
                <p>{t("overview.paragraph3")}</p>
              </div>
              <Button className="bg-blue-600 hover:bg-blue-700 px-6 md:px-8 py-2 md:py-3 text-sm md:text-base">
                {t("overview.cta")}
              </Button>
            </div>
          </div>
        </section>

        {/* Stats Banner */}
        <section className="bg-blue-600 text-white py-8 md:py-12">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
              {stats.map((stat, i) => (
                <div key={i} className="text-center">
                  <div className="text-2xl md:text-4xl mb-2">{stat.icon}</div>
                  <div className="text-xl md:text-3xl font-bold mb-1 md:mb-2">{stat.value}</div>
                  <div className="text-xs md:text-sm text-white/90 px-2">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section className="container mx-auto px-4 py-8 md:py-16">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-8 md:mb-12">
              {t("timeline.title")}
            </h2>
            {timelineData.map((period, i) => (
              <div key={i} className="flex gap-4 md:gap-8 mb-8 md:mb-12 last:mb-0">
                <div className="flex-shrink-0 w-24 md:w-32 text-right">
                  <div className="inline-block bg-white border-2 border-gray-200 rounded-lg px-2 md:px-4 py-1 md:py-2 shadow-sm">
                    <div className="text-xs md:text-sm font-semibold text-gray-900">{period.year}</div>
                  </div>
                </div>
                <div className="flex-shrink-0 relative">
                  <div className={`w-4 md:w-6 h-4 md:h-6 rounded-full ${period.color} mt-1 md:mt-2`} />
                  {i < timelineData.length - 1 && (
                    <div className="absolute top-6 md:top-8 left-2 md:left-3 w-px h-12 md:h-16 bg-gray-200" />
                  )}
                </div>
                <div className="flex-1 pt-1">
                  <div className="bg-white border border-gray-200 rounded-lg p-4 md:p-6 shadow-sm">
                    <ul className="space-y-1 md:space-y-2">
                      {period.items.map((item, j) => (
                        <li key={j} className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-1.5 md:mt-2 flex-shrink-0" />
                          <span className="text-sm md:text-base text-gray-700">{item}</span>
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
        <section className="bg-gray-50 py-8 md:py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-3 md:mb-4">
              {t("philosophy.title")}
            </h2>
            <p className="text-center text-gray-600 max-w-3xl mx-auto mb-8 md:mb-12 text-sm md:text-base px-4">
              {t("philosophy.intro")}
            </p>

            <div className="grid lg:grid-cols-3 gap-6 md:gap-8 items-center">
              <Card className="text-center h-full">
                <CardContent className="p-6 md:p-8">
                  <div className="w-12 md:w-16 h-12 md:h-16 mx-auto mb-3 md:mb-4 bg-blue-100 rounded-full flex items-center justify-center">
                    <Target className="h-6 md:h-8 w-6 md:w-8 text-blue-600" />
                  </div>
                  <h3 className="text-lg md:text-xl font-semibold mb-3 md:mb-4">{t("philosophy.vision.title")}</h3>
                  <p className="text-sm md:text-base text-gray-600">{t("philosophy.vision.desc")}</p>
                </CardContent>
              </Card>

              <div className="relative order-first lg:order-none">
                <Image
                  src="/placeholder-4fzhd.png"
                  alt={t("philosophy.centerAlt")}
                  width={400}
                  height={300}
                  className="rounded-lg shadow-lg w-full"
                />
              </div>

              <Card className="text-center h-full">
                <CardContent className="p-6 md:p-8">
                  <div className="w-12 md:w-16 h-12 md:h-16 mx-auto mb-3 md:mb-4 bg-green-100 rounded-full flex items-center justify-center">
                    <Heart className="h-6 md:h-8 w-6 md:w-8 text-green-600" />
                  </div>
                  <h3 className="text-lg md:text-xl font-semibold mb-3 md:mb-4">{t("philosophy.mission.title")}</h3>
                  <p className="text-sm md:text-base text-gray-600">{t("philosophy.mission.desc")}</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Certifications */}
        <section className="container mx-auto px-4 py-8 md:py-16">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3 md:mb-4">{t("certs.title")}</h2>
          <p className="text-gray-600 mb-6 md:mb-8 max-w-3xl text-sm md:text-base">{t("certs.desc")}</p>

          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            {certificates.map((cert, i) => (
              <Card key={i} className="overflow-hidden hover:shadow-lg transition-shadow">
                <CardContent className="p-0">
                  <div className="relative aspect-[4/3]">
                    <Image src={cert.img || "/placeholder.svg"} alt={cert.title} fill className="object-cover" />
                  </div>
                  <div className="p-3 md:p-4">
                    <h3 className="font-semibold text-center text-xs md:text-sm">{cert.title}</h3>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Awards */}
        <section className="bg-gray-50 py-8 md:py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-3 md:mb-4">
              {t("awards.title")}
            </h2>
            <p className="text-center text-gray-600 mb-8 md:mb-12 max-w-3xl mx-auto text-sm md:text-base px-4">
              {t("awards.desc")}
            </p>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
              {awards.map((award, i) => (
                <Card key={i} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <CardContent className="p-3 md:p-4">
                    <div className="relative aspect-[4/3] mb-2 md:mb-3">
                      <Image
                        src={award.img || "/placeholder.svg"}
                        alt={award.title}
                        fill
                        className="object-cover rounded"
                      />
                    </div>
                    <h3 className="text-xs md:text-sm font-medium text-center text-gray-700">{award.title}</h3>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
