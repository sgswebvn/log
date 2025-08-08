import { Button } from "@/components/ui/button"
import { useTranslations } from "next-intl"

export default function ServicesCta() {
  const t = useTranslations('servicesPage.cta')
  return (
    <section id="contact" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 text-center">
        <h3 className="text-xl md:text-2xl font-semibold text-gray-900">{t('title')}</h3>
        <p className="text-gray-600 max-w-2xl mx-auto mt-2">{t('desc')}</p>
        <Button className="mt-6 bg-blue-600 hover:bg-blue-700">{t('button')}</Button>
      </div>
    </section>
  )
}
