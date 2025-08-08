import { Ship, Package, Plane, Shield, Warehouse, Truck } from 'lucide-react'
import { useTranslations } from 'next-intl'

export default function ServicesSection() {
  const t = useTranslations('services')

  const services = [
    {
      icon: Ship,
      title: t('items.seaFreight.title'),
      description: t('items.seaFreight.description')
    },
    {
      icon: Package,
      title: t('items.forwarding.title'),
      description: t('items.forwarding.description')
    },
    {
      icon: Plane,
      title: t('items.airLogistics.title'),
      description: t('items.airLogistics.description')
    },
    {
      icon: Shield,
      title: t('items.supervision.title'),
      description: t('items.supervision.description')
    },
    {
      icon: Warehouse,
      title: t('items.warehousing.title'),
      description: t('items.warehousing.description')
    },
    {
      icon: Truck,
      title: t('items.supplyChain.title'),
      description: t('items.supplyChain.description')
    }
  ]

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
          {t('title')}
        </h2>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const IconComponent = service.icon
            return (
              <div key={index} className="text-center group cursor-pointer">
                <div className="w-20 h-20 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                  <IconComponent className="h-10 w-10 text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-800 mb-2 text-sm md:text-base">
                  {service.title}
                </h3>
                <p className="text-xs md:text-sm text-gray-600 leading-relaxed">
                  {service.description}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
