"use client"

import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { useTranslations } from "next-intl"

export default function ServicesRoutes() {
  const t = useTranslations("servicesPage.routes")

  const routes = [
    {
      title: t("rail.title"),
      description: t("rail.desc"),
      image: "/xian-moscow-railway-map.png",
      features: [t("rail.feature1"), t("rail.feature2"), t("rail.feature3")],
    },
    {
      title: t("multimodal.title"),
      description: t("multimodal.desc"),
      image: "/chengdu-minsk-railway.png",
      features: [t("multimodal.feature1"), t("multimodal.feature2"), t("multimodal.feature3")],
    },
  ]

  return (
    <section id="services">
      <h2 className="text-2xl font-semibold text-gray-900 mb-8 text-center">{t("title")}</h2>

      <div className="grid md:grid-cols-2 gap-8">
        {routes.map((route, index) => (
          <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
            <div className="relative h-48">
              <Image src={route.image || "/placeholder.svg"} alt={route.title} fill className="object-cover" />
            </div>
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">{route.title}</h3>
              <p className="text-gray-600 mb-4">{route.description}</p>
              <ul className="space-y-2">
                {route.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center text-sm text-gray-700">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mr-3 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}
