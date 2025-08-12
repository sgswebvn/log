"use client"

import Header from "@/components/Header"
import Footer from "@/components/Footer"
import Breadcrumbs from "@/components/breadcrumbs"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { CheckCircle2 } from "lucide-react"
import { useTranslations } from "next-intl"

export default function ServicesPage() {
  const t = useTranslations("servicesPage")

  return (
    <div className="bg-white">
      <Header />

      {/* Hero Banner */}
      <section className="relative h-64 md:h-80 flex items-center justify-center bg-gradient-to-r from-blue-900/90 to-blue-700/90">
        <Image src="/images/services-hero.png" alt={t("hero.alt")} fill className="object-cover -z-10" />
        <div className="text-center text-white px-4">
          <h1 className="text-2xl md:text-4xl font-bold mb-4">{t("hero.title")}</h1>
          <Breadcrumbs items={[{ label: t("hero.breadcrumb") }]} />
        </div>
      </section>

      <main>
        {/* Services Overview */}
        <section className="container mx-auto px-4 py-8 md:py-16">
          <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
            <div className="order-2 lg:order-1">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3 md:mb-4">SAGOKE EXPRESS</h2>
              <h3 className="text-lg md:text-xl text-blue-600 font-medium mb-4 md:mb-6">{t("overview.subtitle")}</h3>
              <div className="space-y-3 md:space-y-4 text-sm md:text-base text-gray-600 leading-relaxed mb-6 md:mb-8">
                <p>{t("overview.p1")}</p>
                <p>{t("overview.p2")}</p>
                <p>{t("overview.p3")}</p>
              </div>
              <Button className="bg-blue-600 hover:bg-blue-700 px-6 md:px-8 py-2 md:py-3 text-sm md:text-base">
                {t("overview.cta")}
              </Button>
            </div>

            <div className="order-1 lg:order-2 grid grid-cols-2 gap-4 md:gap-6">
              <div className="aspect-[3/5] rounded-lg bg-[url('/placeholder-w9fk9.png')] bg-cover bg-center" />
              <div className="aspect-[3/2] rounded-lg bg-[url('/placeholder-bknm7.png')] bg-cover bg-center" />
            </div>
          </div>
        </section>

        {/* Service Routes */}
        <section className="bg-gray-50 py-8 md:py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-8 md:mb-12">
              {t("routes.title")}
            </h2>

            {/* Xi'an-Moscow Route */}
            <div className="grid md:grid-cols-2 gap-0 mb-8 md:mb-12 rounded-lg overflow-hidden shadow-lg">
              <div className="h-64 md:h-80 bg-[url('/placeholder.svg?height=300&width=600')] bg-cover bg-center" />
              <div className="bg-gradient-to-r from-blue-700 to-blue-500 text-white p-6 md:p-8 flex flex-col justify-center">
                <div className="uppercase tracking-wide text-white/80 text-xs mb-2">SAGOKE EXPRESS</div>
                <h3 className="text-xl md:text-2xl font-semibold mb-3 md:mb-4">{t("routes.xianMoscow.title")}</h3>
                <ul className="text-sm md:text-base text-white/95 space-y-1 md:space-y-2 list-disc pl-5 mb-4 md:mb-6">
                  {(t.raw("routes.xianMoscow.features") as string[]).map((feature, i) => (
                    <li key={i}>{feature}</li>
                  ))}
                </ul>
                <div className="text-sm underline underline-offset-4 cursor-pointer hover:text-white/80">
                  {t("routes.consultation")} →
                </div>
              </div>
            </div>

            {/* Chengdu-Minsk Route */}
            <div className="grid md:grid-cols-2 gap-0 rounded-lg overflow-hidden shadow-lg">
              <div className="bg-gradient-to-r from-blue-700 to-blue-500 text-white p-6 md:p-8 order-2 md:order-1 flex flex-col justify-center">
                <div className="uppercase tracking-wide text-white/80 text-xs mb-2">SAGOKE EXPRESS</div>
                <h3 className="text-xl md:text-2xl font-semibold mb-3 md:mb-4">{t("routes.chengduMinsk.title")}</h3>
                <ul className="text-sm md:text-base text-white/95 space-y-1 md:space-y-2 list-disc pl-5 mb-4 md:mb-6">
                  {(t.raw("routes.chengduMinsk.features") as string[]).map((feature, i) => (
                    <li key={i}>{feature}</li>
                  ))}
                </ul>
                <div className="text-sm underline underline-offset-4 cursor-pointer hover:text-white/80">
                  {t("routes.consultation")} →
                </div>
              </div>
              <div className="h-64 md:h-80 bg-[url('/placeholder.svg?height=300&width=600')] bg-cover bg-center order-1 md:order-2" />
            </div>
          </div>
        </section>

        {/* Advantages */}
        <section className="container mx-auto px-4 py-8 md:py-16">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3 md:mb-4">{t("advantages.title")}</h2>
          <p className="text-gray-600 mb-6 md:mb-8 text-sm md:text-base max-w-3xl">{t("advantages.desc")}</p>

          <ul className="space-y-3 md:space-y-4">
            {(t.raw("advantages.list") as string[]).map((advantage, i) => (
              <li key={i} className="flex gap-3 md:gap-4">
                <CheckCircle2 className="h-5 w-5 md:h-6 md:w-6 text-blue-600 mt-0.5 flex-shrink-0" />
                <span className="text-sm md:text-base text-gray-700">{advantage}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* CTA Section */}
        <section className="bg-blue-600 py-12 md:py-16">
          <div className="container mx-auto px-4 text-center">
            <h3 className="text-xl md:text-2xl font-semibold text-white mb-3 md:mb-4">{t("cta.title")}</h3>
            <p className="text-white/90 max-w-2xl mx-auto mb-6 md:mb-8 text-sm md:text-base">{t("cta.desc")}</p>
            <Button className="bg-white text-blue-600 hover:bg-gray-100 px-6 md:px-8 py-2 md:py-3 text-sm md:text-base font-semibold">
              {t("cta.button")}
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
