import Image from "next/image"
import { useTranslations } from "next-intl"

export default function HomePhilosophy() {
  const t = useTranslations('home.philosophy')
  const logos = [
    "/abstract-geometric-logo.png",
    "/abstract-logo-2.png",
    "/abstract-logo-3.png",
    "/abstract-geometric-logo-4.png",
    "/logo-number-5.png",
  ]
  return (
    <div className="relative overflow-hidden rounded-xl bg-white">
      <div className="px-6 md:px-10 py-10">
        <h2 className="text-xl md:text-2xl font-bold text-gray-900">{t('title')}</h2>
        <p className="text-sm md:text-base text-gray-600 mt-2 max-w-4xl">{t('desc')}</p>
        <div className="flex flex-wrap gap-8 items-center mt-8">
          {logos.map((src, i) => (
            <div key={i} className="relative w-[110px] h-[26px]">
              <Image src={src || "/placeholder.svg"} alt={`Partner ${i + 1}`} fill className="object-contain" />
            </div>
          ))}
        </div>
      </div>
      <div className="hidden md:block absolute left-0 bottom-0 w-28 h-16 bg-blue-700 rounded-tr-[20px]" />
      <div className="hidden md:block absolute right-0 top-0 w-28 h-16 bg-orange-400 rounded-bl-[20px]" />
    </div>
  )
}
