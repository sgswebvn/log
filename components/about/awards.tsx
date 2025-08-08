import Image from "next/image"
import { useTranslations } from "next-intl"

const awards = Array.from({ length: 8 }).map((_, i) => ({
  img: `/placeholder.svg?height=160&width=240&query=award+certificate+${i+1}`,
  title: `Award ${i + 1}`
}))

export default function Awards() {
  const t = useTranslations('about.awards')
  return (
    <div>
      <h2 className="text-2xl font-semibold text-gray-900 text-center">{t('title')}</h2>
      <p className="text-gray-600 text-center max-w-2xl mx-auto mt-2 text-sm sm:text-base">{t('desc')}</p>
      <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-6">
        {awards.map((a, i) => (
          <figure key={i} className="rounded-md border bg-white p-3">
            <div className="relative aspect-[3/2] w-full overflow-hidden rounded">
              <Image src={a.img || "/placeholder.svg"} alt={a.title} fill className="object-cover" />
            </div>
            <figcaption className="mt-2 text-xs text-gray-600 text-center">{a.title}</figcaption>
          </figure>
        ))}
      </div>
    </div>
  )
}
