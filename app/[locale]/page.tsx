"use client"

import Header from "@/components/Header"
import Footer from "@/components/Footer"
import HomeSlideshow from "@/components/home-slideshow"
import TrackingBar from "@/components/tracking-bar"
import HomeNews from "@/components/home-news-featured"
import HomeFeaturedServices from "@/components/home/home-featured-services"
import HomeServiceIcons from "@/components/home/home-service-icons"
import HomePhilosophy from "@/components/home/home-philosophy"
import { useTranslations } from "next-intl"

export default function HomeLocalePage() {
  const t = useTranslations("home")

  return (
    <div className="bg-white">
      <Header />
      <main>
        <HomeSlideshow />
        <TrackingBar />

        <section className="container mx-auto px-4 py-8 md:py-12">
          <div className="text-center mb-6 md:mb-8">
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">{t("news.title")}</h2>
            <p className="text-sm md:text-base text-gray-600">{t("news.desc")}</p>
          </div>
          <HomeNews />
        </section>

        <section className="container mx-auto px-4 py-8 md:py-12">
          <div className="text-center mb-6 md:mb-8">
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">{t("featured.title")}</h2>
            <p className="text-sm md:text-base text-gray-600">{t("featured.desc")}</p>
          </div>
          <HomeFeaturedServices />
        </section>

        <section className="container mx-auto px-4 py-8 md:py-12">
          <div className="text-center mb-6 md:mb-8">
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">{t("services.title")}</h2>
            <p className="text-sm md:text-base text-gray-600">{t("services.desc")}</p>
          </div>
          <HomeServiceIcons />
        </section>

        <section className="py-8 md:py-12 bg-gray-50">
          <div className="container mx-auto px-4">
            <HomePhilosophy />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
