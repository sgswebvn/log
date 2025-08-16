"use client"

import Link from "next/link"
import { ChevronRight } from "lucide-react"
import { useLocale, useTranslations } from "next-intl"

interface BreadcrumbItem {
    label: string
    href?: string
}

interface BreadcrumbsProps {
    items?: BreadcrumbItem[]
}

export default function Breadcrumbs({ items = [] }: BreadcrumbsProps) {
    const locale = useLocale()
    const t = useTranslations("breadcrumbs")

    return (
        <nav className="flex items-center justify-center gap-2 text-sm text-white/90">
            <Link href={`/${locale}`} className="hover:text-white transition-colors">
                {t("home")}
            </Link>
            {items.map((item, i) => (
                <div key={i} className="flex items-center gap-2">
                    <ChevronRight className="h-4 w-4" />
                    {item.href ? (
                        <Link href={item.href} className="hover:text-white transition-colors">
                            {item.label}
                        </Link>
                    ) : (
                        <span className="text-white">{item.label}</span>
                    )}
                </div>
            ))}
        </nav>
    )
}
