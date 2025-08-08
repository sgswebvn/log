import { Button } from "@/components/ui/button"
import { useTranslations } from "next-intl"

export default function ServicesOverview() {
  const t = useTranslations('servicesPage.overview')
  return (
    <section id="overview" className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
      <div>
        <h2 className="text-xl font-semibold text-gray-900">NEP EXPRESS</h2>
        <h3 className="text-gray-700 font-medium mt-1">{t('subtitle')}</h3>
        <p className="text-gray-600 mt-4">{t('p1')}</p>
        <p className="text-gray-600 mt-3">{t('p2')}</p>
        <Button className="mt-6 bg-blue-600 hover:bg-blue-700">{t('cta')}</Button>
      </div>
      <div className="grid grid-cols-2 gap-6">
        <div className="aspect-[3/5] rounded-lg bg-[url('/placeholder-w9fk9.png')] bg-cover bg-center" />
        <div className="aspect-[3/2] rounded-lg bg-[url('/placeholder-bknm7.png')] bg-cover bg-center" />
      </div>
    </section>
  )
}
