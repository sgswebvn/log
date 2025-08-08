import Header from '@/components/Header'
import Footer from '@/components/Footer'
import AboutHero from '@/components/about/about-hero'
import AboutOverview from '@/components/about/about-overview'
import StatsBanner from '@/components/about/stats-banner'
import Timeline from '@/components/about/timeline'
import Philosophy from '@/components/about/philosophy'
import Certifications from '@/components/about/certifications'
import Awards from '@/components/about/awards'

export default function AboutPage() {
  return (
    <div className="bg-white">
      <Header />
      <main>
        <AboutHero />
        <section className="container mx-auto px-4">
          <AboutOverview />
        </section>
        <StatsBanner />
        <section className="container mx-auto px-4 py-10">
          <Timeline />
        </section>
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4">
            <Philosophy />
          </div>
        </section>
        <section className="container mx-auto px-4 py-12">
          <Certifications />
        </section>
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4">
            <Awards />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
