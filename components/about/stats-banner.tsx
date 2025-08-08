import { Package, Users, Trophy, Building2 } from 'lucide-react'
import { useTranslations } from "next-intl"

const items = [
  { icon: Users, key: 'years', value: '23+' },
  { icon: Building2, key: 'countries', value: '700+' },
  { icon: Trophy, key: 'projects', value: '3500+' },
  { icon: Package, key: 'square', value: '50000+' },
]

export default function StatsBanner() {
  const t = useTranslations('about.stats')
  return (
    <section className="bg-blue-700 text-white">
      <div className="container mx-auto px-4 py-8 grid grid-cols-2 md:grid-cols-4 gap-6">
        {items.map(({ icon: Icon, key, value }) => (
          <div key={key} className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-white/15 flex items-center justify-center">
              <Icon className="h-5 w-5" />
            </div>
            <div>
              <div className="text-xl font-semibold leading-none">{value}</div>
              <div className="text-xs sm:text-sm text-white/90 mt-1">{t(key)}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
