import { Suspense } from "react"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import HomeSlideshow from "@/components/home-slideshow"
import HomeNewsFeatured from "@/components/home-news-featured"
import HomeServiceIcons from "@/components/home/home-service-icons"
import HomeFeaturedServices from "@/components/home/home-featured-services"
import HomePhilosophy from "@/components/home/home-philosophy"
import SideButtons from "@/components/side-buttons"

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Header />

      <main>
        <div className="h-[109px]" />
        {/* Hero Slideshow */}
        <HomeSlideshow />


        {/* News Section - Moved above services */}
        <Suspense fallback={<div className="h-96 bg-gray-100 animate-pulse" />}>
          <HomeNewsFeatured />
        </Suspense>

        {/* Service Icons - Moved below news */}
        <HomeServiceIcons />

        {/* Featured Services */}
        <HomeFeaturedServices />

        {/* Philosophy */}
        <HomePhilosophy />
      </main>

      <Footer />
      <SideButtons />
    </div>
  )
}
