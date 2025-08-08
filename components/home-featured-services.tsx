import Image from "next/image"
import Link from "next/link"
import { useTranslations, useLocale } from "next-intl"

const cards = [
  { img: "/placeholder-shy73.png", titleKey: "rail.t", subKey: "rail.s" },
  { img: "/placeholder-3n2at.png", titleKey: "searail.t", subKey: "searail.s" },
  { img: "/placeholder-qshua.png", titleKey: "truck.t", subKey: "truck.s" }
]

export default function HomeFeaturedServices() {
  const t = useTranslations('home.featured')
  const locale = useLocale()
  return (
    <div className="grid gap-6 md:grid-cols-3">
      {cards.map((c, i) => (
        <Link key={i} href={`/${locale}/services`} className="rounded-lg border bg-white hover:shadow-md transition-shadow">
          <div className="relative w-full h-44 overflow-hidden rounded-t-lg">
            <Image src={c.img || "/placeholder.svg"} alt={t(c.titleKey)} fill className="object-cover" />
          </div>
          <div className="p-4">
            <h3 className="text-gray-900 font-semibold">{t(c.titleKey)}</h3>
            <p className="text-sm text-gray-600">{t(c.subKey)}</p>
          </div>
        </Link>
      ))}
    </div>
  )
}
