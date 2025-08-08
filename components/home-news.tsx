import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useTranslations, useLocale } from "next-intl"

const items = [
  { id: 1, img: "/cross-border-train-event.png", titleKey: "a1.t", summaryKey: "a1.s" },
  { id: 2, img: "/placeholder-yk79n.png", titleKey: "a2.t", summaryKey: "a2.s" },
  { id: 3, img: "/china-europe-freight.png", titleKey: "a3.t", summaryKey: "a3.s" },
  { id: 4, img: "/exhibition-event.png", titleKey: "a4.t", summaryKey: "a4.s" },
  { id: 5, img: "/generic-statement-card.png", titleKey: "a5.t", summaryKey: "a5.s" },
]

export default function HomeNews() {
  const t = useTranslations('home.news')
  const locale = useLocale()
  const formatter = new Intl.DateTimeFormat(locale === 'vi' ? 'vi-VN' : 'en-US')

  return (
    <div>
      <div className="grid gap-6 md:grid-cols-3">
        {items.map((n) => (
          <Card key={n.id} className="overflow-hidden hover:shadow-lg transition-shadow">
            <CardContent className="p-0">
              <Image src={n.img || "/placeholder.svg"} alt={t(n.titleKey)} width={320} height={180} className="w-full h-44 object-cover" />
              <div className="p-4">
                <h3 className="font-semibold text-gray-900 line-clamp-2">{t(n.titleKey)}</h3>
                <p className="text-sm text-gray-600 mt-2 line-clamp-2">{t(n.summaryKey)}</p>
                <div className="mt-3 text-xs text-gray-500">{formatter.format(new Date())}</div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex justify-center mt-6">
        <Button variant="outline">{t('more')}</Button>
      </div>
    </div>
  )
}
