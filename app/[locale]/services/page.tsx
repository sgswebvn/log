import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ServicesHero from '@/components/services/services-hero'
import ServicesOverview from '@/components/services/services-overview'
import ServicesRoutes from '@/components/services/services-routes'
import ServicesAdvantages from '@/components/services/services-advantages'
import ServicesCta from '@/components/services/services-cta'

export default function ServicesPage() {
  return (
    <div className="bg-white">
      <Header />
      <main>
        <ServicesHero />
        <section className="container mx-auto px-4 py-10">
          <ServicesOverview />
        </section>
        <ServicesRoutes />
        <section className="container mx-auto px-4 py-12">
          <ServicesAdvantages />
        </section>
        <ServicesCta />
      </main>
      <Footer />
    </div>
  )
}
