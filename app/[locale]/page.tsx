import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Breadcrumbs from '@/components/breadcrumbs'
import HomeSlideshow from '@/components/home-slideshow'
import TrackingBar from '@/components/tracking-bar'
import HomeNews from '@/components/home-news-featured'
import HomeFeaturedServices from '@/components/home/home-featured-services'
import HomeServiceIcons from '@/components/home/home-service-icons'
import HomePhilosophy from '@/components/home/home-philosophy'

export default function HomeLocalePage() {
  return (
    <div className="bg-white">
      <Header />
      <Breadcrumbs />
      <main>
        <HomeSlideshow />
        <TrackingBar />
        <section className="container mx-auto px-4 py-8">
          <HomeNews />
        </section>
        <section className="container mx-auto px-4 py-10">
          <HomeFeaturedServices />
        </section>
        <section className="container mx-auto px-4 py-10">
          <HomeServiceIcons />
        </section>
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4">
            <HomePhilosophy />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
