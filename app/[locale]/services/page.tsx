"use client"

import Header from "@/components/Header"
import Footer from "@/components/Footer"
import Breadcrumbs from "@/components/common/breadcrumbs"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Train,
  Ship,
  Plane,
  Truck,
  Package,
  FileText,
  Clock,
  Shield,
  Award,
  Users,
  Globe,
  CheckCircle,
  Phone,
  Mail,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useParams } from "next/navigation"
import { useTranslations } from "next-intl"

export default function ServicesPage() {
  const params = useParams()
  const locale = params.locale as string
  const t = useTranslations("services")
  const tBreadcrumbs = useTranslations("breadcrumbs")
  const tCommon = useTranslations("common")
  const tServicesPage = useTranslations("servicesPage")

  const railService = {
    id: "rail",
    titleKey: "items.rail.title",
    descriptionKey: "items.rail.description",
    icon: Train,
    image: "/images/banner2.jpg",
    features: [
      "items.rail.features.departures",
      "items.rail.features.transit",
      "items.rail.features.delivery",
    ],
  }

  const seaFreightService = {
    id: "sea",
    titleKey: "items.seaFreight.title",
    descriptionKey: "items.seaFreight.description",
    icon: Ship,
    image: "/images/banner5.jpg",
    features: [
      "items.seaFreight.features.container",
      "items.seaFreight.features.bulk",
      "items.seaFreight.features.project",
    ],
  }

  const airLogisticsService = {
    id: "air",
    titleKey: "items.airLogistics.title",
    descriptionKey: "items.airLogistics.description",
    icon: Plane,
    image: "/images/air.png",
    features: [
      "items.airLogistics.features.express",
      "items.airLogistics.features.charter",
      "items.airLogistics.features.dangerous",
    ],
  }

  const roadService = {
    id: "road",
    titleKey: "items.road.title",
    descriptionKey: "items.road.description",
    icon: Truck,
    image: "/images/bo.png",
    features: [
      "items.road.features.trucks",
      "items.road.features.container",
      "items.road.features.specialized",
    ],
  }

  const warehousingService = {
    id: "warehouse",
    titleKey: "items.warehousing.title",
    descriptionKey: "items.warehousing.description",
    icon: Package,
    image: "/images/kho.png",
    features: [
      "items.warehousing.features.modern",
      "items.warehousing.features.wms",
      "items.warehousing.features.crossDocking",
    ],
  }

  const customsService = {
    id: "customs",
    titleKey: "items.customs.title",
    descriptionKey: "items.customs.description",
    icon: FileText,
    image: "/images/banner0.jpg",
    features: [
      "items.customs.features.declaration",
      "items.customs.features.taxConsultation",
      "items.customs.features.permit",
    ],
  }

  const services = [
    railService,
    seaFreightService,
    airLogisticsService,
    roadService,
    warehousingService,
    customsService,
  ]

  const yearsStat = {
    icon: "👥",
    valueKey: "stats.years",
    labelKey: "stats.years",
  }

  const containersStat = {
    icon: "📦",
    valueKey: "stats.containers",
    labelKey: "stats.containers",
  }

  const countriesStat = {
    icon: "🌍",
    valueKey: "stats.countries",
    labelKey: "stats.countries",
  }

  const onTimeStat = {
    icon: "⏰",
    valueKey: "stats.onTime",
    labelKey: "stats.onTime",
  }

  const stats = [yearsStat, containersStat, countriesStat, onTimeStat]

  const globalNetworkAdvantage = {
    icon: Globe,
    titleKey: "advantages.globalNetwork.title",
    descriptionKey: "advantages.globalNetwork.description",
  }

  const onTimeDeliveryAdvantage = {
    icon: Clock,
    titleKey: "advantages.onTimeDelivery.title",
    descriptionKey: "advantages.onTimeDelivery.description",
  }

  const absoluteSafetyAdvantage = {
    icon: Shield,
    titleKey: "advantages.absoluteSafety.title",
    descriptionKey: "advantages.absoluteSafety.description",
  }

  const isoQualityAdvantage = {
    icon: Award,
    titleKey: "advantages.isoQuality.title",
    descriptionKey: "advantages.isoQuality.description",
  }

  const expertTeamAdvantage = {
    icon: Users,
    titleKey: "advantages.expertTeam.title",
    descriptionKey: "advantages.expertTeam.description",
  }

  const competitivePricingAdvantage = {
    icon: CheckCircle,
    titleKey: "advantages.competitivePricing.title",
    descriptionKey: "advantages.competitivePricing.description",
  }

  const advantages = [
    globalNetworkAdvantage,
    onTimeDeliveryAdvantage,
    absoluteSafetyAdvantage,
    isoQualityAdvantage,
    expertTeamAdvantage,
    competitivePricingAdvantage,
  ]

  return (
    <div className="bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 min-h-screen">
      <Header />

      <section className="relative h-80 md:h-96 flex items-center justify-center overflow-hidden">
        <Image src="/breakcrum.jpg" alt={tServicesPage("hero.alt")} fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/70 to-black/80" />
        <div className="relative text-center text-white px-4 z-10">
          <h1 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight">{t("title")}</h1>
          <p className="text-lg md:text-xl text-blue-100 mb-6 max-w-2xl mx-auto">{t("subtitle")}</p>
          <Breadcrumbs items={[{ label: tBreadcrumbs("services") }]} />
        </div>
      </section>

      <main>
        <section className="container mx-auto px-4 py-12 md:py-20">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-lg text-gray-600 leading-relaxed">{t("overview.description")}</p>
          </div>
        </section>

        <section className="container mx-auto px-4 py-12 md:py-20">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => {
              const IconComponent = service.icon
              return (
                <Card
                  key={service.id}
                  className="overflow-hidden backdrop-blur-sm bg-white/80 shadow-xl border-0 rounded-3xl hover:shadow-2xl transition-all duration-500"
                >
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={service.image || "/placeholder.svg"}
                      alt={t(service.titleKey)}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-4 left-4">
                      <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center shadow-md">
                        <IconComponent className="h-6 w-6 text-blue-600" />
                      </div>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{t(service.titleKey)}</h3>
                    <p className="text-gray-600 mb-4 leading-relaxed">{t(service.descriptionKey)}</p>
                    <div className="mb-4">
                      <h4 className="font-semibold text-gray-900 mb-2">{t("items.mainFeatures")}</h4>
                      <ul className="space-y-2">
                        {service.features.map((feature, idx) => (
                          <li key={idx} className="flex items-start gap-3">
                            <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0" />
                            <span className="text-gray-600 leading-relaxed">{t(feature)}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </section>

        <section className="bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 text-white py-12 md:py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h3 className="text-2xl md:text-3xl font-bold mb-4">{t("stats.title")}</h3>
              <p className="text-blue-100 text-lg">{t("stats.desc")}</p>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {stats.map((stat, i) => (
                <div key={i} className="text-center">
                  <div className="text-4xl md:text-5xl mb-3">{stat.icon}</div>
                  <div className="text-2xl md:text-4xl font-bold mb-2">{t(stat.valueKey)}</div>
                  <div className="text-sm md:text-base text-blue-100 px-2">{t(stat.labelKey)}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="container mx-auto px-4 py-12 md:py-20">
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{tServicesPage("advantages.title")}</h3>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">{tServicesPage("advantages.desc")}</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {advantages.map((advantage, index) => {
              const IconComponent = advantage.icon
              return (
                <Card
                  key={index}
                  className="text-center backdrop-blur-sm bg-white/80 shadow-xl border-0 rounded-3xl hover:shadow-2xl transition-all duration-500"
                >
                  <CardContent className="p-6">
                    <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <IconComponent className="h-8 w-8 text-blue-600" />
                    </div>
                    <h4 className="text-lg font-bold text-gray-900 mb-2">{t(advantage.titleKey)}</h4>
                    <p className="text-gray-600 leading-relaxed">{t(advantage.descriptionKey)}</p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </section>

        <section className="container mx-auto px-4 py-12 md:py-20">
          <div className="text-center">
            <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{tServicesPage("cta.title")}</h3>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">{tServicesPage("cta.desc")}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href={`/${locale}/contact`}>
                <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                  <Mail className="h-5 w-5 mr-2" />
                  {t("cta.button")}
                </Button>
              </Link>
              <Button
                variant="outline"
                className="px-8 py-3 bg-white/80 backdrop-blur-sm border-gray-200 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
              >
                <Phone className="h-5 w-5 mr-2" />
                {tCommon("contactInfo.phone")}
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}