import { Suspense } from 'react'
import { redirect } from 'next/navigation'
import Header from '@/components/Header'
import HeroSection from '@/components/HeroSection'
import NewsSection from '@/components/NewsSection'
import StatementSection from '@/components/StatementSection'
import ServicesSection from '@/components/ServicesSection'
import PhilosophySection from '@/components/PhilosophySection'
import Footer from '@/components/Footer'

export default function Index() {
  // Chuyển mặc định về tiếng Việt
  redirect('/vi')

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <HeroSection />
      <Suspense fallback={<div>Đang tải...</div>}>
        <NewsSection />
      </Suspense>
      <StatementSection />
      <ServicesSection />
      <PhilosophySection />
      <Footer />
    </div>
  )
}
