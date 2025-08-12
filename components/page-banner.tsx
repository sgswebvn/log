"use client"

import Image from "next/image"
import Link from "next/link"
import { ChevronRight } from "lucide-react"
import { useLocale } from "next-intl"

type BreadcrumbItem = { label: string; href?: string }

interface PageBannerProps {
  title: string
  backgroundImage?: string
  breadcrumbs?: BreadcrumbItem[]
}

export default function PageBanner({
  title,
  backgroundImage = "/placeholder.svg?height=300&width=1200",
  breadcrumbs = [],
}: PageBannerProps) {
  const locale = useLocale()

  return (
    <section className="relative h-64 flex items-center justify-center">
      <Image src={backgroundImage || "/placeholder.svg"} alt="Page banner" fill className="object-cover" />
      <div className="absolute inset-0 bg-black/40" />

      <div className="relative text-center text-white">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">{title}</h1>

        {breadcrumbs.length > 0 && (
          <nav className="flex items-center justify-center gap-2 text-sm text-white/90">
            <Link href={`/${locale}`} className="hover:text-white">
              Trang chủ
            </Link>
            {breadcrumbs.map((crumb, i) => (
              <div key={i} className="flex items-center gap-2">
                <ChevronRight className="h-4 w-4" />
                {crumb.href ? (
                  <Link href={crumb.href} className="hover:text-white">
                    {crumb.label}
                  </Link>
                ) : (
                  <span>{crumb.label}</span>
                )}
              </div>
            ))}
          </nav>
        )}
      </div>
    </section>
  )
}
