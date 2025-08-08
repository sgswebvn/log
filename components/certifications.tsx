"use client"

import Image from "next/image"
import { useTranslations } from "next-intl"
import { Card, CardContent } from "@/components/ui/card"

const certs = [
  { img: "/iso9001-certificate.png", caption: "ISO 9001" },
  { img: "/certificate-management-concept.png", caption: "Management Certificate" },
  { img: "/placeholder-6e8qr.png", caption: "Quality Assurance" },
]

export default function Certifications() {
  const t = useTranslations('about.certs')

  return (
    <div>
      <h2 className="text-2xl font-semibold text-gray-900">{t('title')}</h2>
      <p className="text-gray-600 text-sm sm:text-base mt-2">{t('desc')}</p>

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-6">
        {certs.map((c, i) => (
          <Card key={i} className="overflow-hidden">
            <CardContent className="p-0">
              <div className="relative aspect-[13/9] w-full">
                <Image src={c.img || "/placeholder.svg"} alt={c.caption} fill className="object-cover" />
              </div>
              <div className="px-4 py-3 text-sm text-gray-700">{c.caption}</div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
