"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ChevronRight } from 'lucide-react'
import { useLocale, useTranslations } from "next-intl"

type Crumb = { href: string; label: string }

export default function Breadcrumbs({ currentTitle }: { currentTitle?: string }) {
  const pathname = usePathname()
  const locale = useLocale()
  const t = useTranslations('breadcrumbs')

  // Build segments excluding locale
  const segments = pathname.split('/').filter(Boolean)
  const segs = segments[0] === locale ? segments.slice(1) : segments

  const crumbs: Crumb[] = []
  let href = `/${locale}`
  crumbs.push({ href, label: t('home') })

  for (let i = 0; i < segs.length; i++) {
    const seg = segs[i]
    href += `/${seg}`
    const key = seg as keyof typeof t
    const label = t.has(seg) ? t(seg) : decodeURIComponent(seg)
    if (i < segs.length - 1) {
      crumbs.push({ href, label })
    } else {
      crumbs.push({ href, label: currentTitle || label })
    }
  }

  return (
    <nav aria-label="Breadcrumb" className="bg-gray-50/70">
      <ol className="container mx-auto px-4 py-2 flex items-center gap-1 text-sm text-gray-600">
        {crumbs.map((c, i) => (
          <li key={i} className="flex items-center">
            {i === crumbs.length - 1 ? (
              <span className="text-gray-800">{c.label}</span>
            ) : (
              <Link href={c.href} className="hover:text-blue-600">{c.label}</Link>
            )}
            {i < crumbs.length - 1 && <ChevronRight className="mx-1 h-4 w-4 text-gray-400" />}
          </li>
        ))}
      </ol>
    </nav>
  )
}
