'use client'

import Link from "next/link"
import Image from "next/image"
import { usePathname, useRouter } from "next/navigation"
import { useLocale, useTranslations } from "next-intl"
import { ChevronDown, Menu, X, Globe, Linkedin, Facebook, Instagram, Youtube } from 'lucide-react'
import { useState } from "react"

type Item = { href: string; key: 'about' | 'services' | 'news' | 'contact'; hasDropdown?: boolean }

const leftNav: Item[] = [
  { href: "/about", key: "about", hasDropdown: false },
  { href: "/services", key: "services", hasDropdown: true }
]
const rightNav: Item[] = [
  { href: "/news", key: "news", hasDropdown: true },
  { href: "/contact", key: "contact", hasDropdown: true }
]

export default function Header() {
  const tNav = useTranslations('navigation')
  const locale = useLocale()
  const pathname = usePathname()
  const router = useRouter()
  const [open, setOpen] = useState(false)

  const isActive = (to: string) => pathname?.startsWith(`/${locale}${to}`)

  const switchLang = () => {
    const newLocale = locale === "vi" ? "en" : "vi"
    const rest = pathname?.replace(`/${locale}`, "") || ""
    router.push(`/${newLocale}${rest}`)
  }

  function NavLink({
    href, label, active, showChevron
  }: { href: string; label: string; active?: boolean; showChevron?: boolean }) {
    return (
      <Link
        href={`/${locale}${href}`}
        aria-current={active ? 'page' : undefined}
        className={[
          "relative group px-3 py-2 text-sm font-semibold uppercase tracking-wide",
          "transition-colors",
          active ? "text-blue-700" : "text-gray-800 hover:text-blue-700"
        ].join(" ")}
      >
        <span className="relative">
          {label}
          {showChevron && <ChevronDown className="ml-1 inline-block h-4 w-4 align-[-2px] text-gray-400" />}
        </span>
        {/* Gradient underline on hover */}
        <span
          className={[
            "pointer-events-none absolute left-2 right-2 -bottom-[2px] h-[2px] rounded-full",
            "bg-gradient-to-r from-blue-500 via-cyan-400 to-blue-500",
            "opacity-0 group-hover:opacity-100 transition-opacity"
          ].join(" ")}
        />
        {/* Active indicator */}
        {active && (
          <span className="pointer-events-none absolute left-2 right-2 -bottom-[2px] h-[2px] rounded-full bg-blue-700" />
        )}
      </Link>
    )
  }

  return (
    <header className="sticky top-0 z-30 bg-white/90 backdrop-blur border-b">
      {/* Top info bar */}
      <div className="container mx-auto px-4 hidden md:flex items-center justify-between text-sm text-gray-600 py-2">
        <div className="flex items-center gap-3">
          <span className="inline-flex items-center gap-2">
            <Image src="/open-mailbox-letters.png" alt="mail" width={20} height={16} />
            <a href="mailto:sagoke-group@gmail.com" className="hover:text-blue-700">sagoke-group@gmail.com</a>
          </span>
          <span className="text-gray-300">|</span>
          <a href="https://sagoke-group.com" target="_blank" rel="noreferrer" className="hover:text-blue-700">
            sagoke-group.com
          </a>
        </div>
        <div className="flex items-center gap-4">
          <a href="#" aria-label="LinkedIn" className="hover:text-blue-700"><Linkedin className="h-4 w-4" /></a>
          <a href="#" aria-label="Facebook" className="hover:text-blue-700"><Facebook className="h-4 w-4" /></a>
          <a href="#" aria-label="Instagram" className="hover:text-blue-700"><Instagram className="h-4 w-4" /></a>
          <a href="#" aria-label="YouTube" className="hover:text-blue-700"><Youtube className="h-4 w-4" /></a>
          <button onClick={switchLang} className="pl-4 border-l text-gray-700 hover:text-blue-700 inline-flex items-center gap-1">
            <Globe className="h-4 w-4" /> {locale.toUpperCase()}
          </button>
        </div>
      </div>

      {/* Main nav line with centered logo */}
      <div className="container mx-auto px-4 py-3 flex items-center justify-between md:justify-center">
        <button className="md:hidden p-2 rounded-md hover:bg-gray-100" onClick={() => setOpen(v => !v)} aria-label="Menu">
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>

        <nav className="hidden md:flex items-center">
          {leftNav.map(item => (
            <NavLink
              key={item.href}
              href={item.href}
              label={tNav(item.key)}
              active={isActive(item.href)}
              showChevron={item.hasDropdown}
            />
          ))}
        </nav>

        <Link href={`/${locale}`} className="mx-6 group relative">
          <Image
            src="/images/sagoke-logo.png"
            alt="Sagoke Logo"
            width={132}
            height={50}
            className="object-contain transition-transform duration-200 group-hover:scale-[1.03]"
          />
          <span className="absolute -inset-x-3 -bottom-1 h-[2px] bg-gradient-to-r from-blue-500 via-cyan-400 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity" />
        </Link>

        <nav className="hidden md:flex items-center">
          {rightNav.map(item => (
            <NavLink
              key={item.href}
              href={item.href}
              label={tNav(item.key)}
              active={isActive(item.href)}
              showChevron={item.hasDropdown}
            />
          ))}
        </nav>
      </div>

      {/* Divider line */}
      <div className="hidden md:block border-t" />

      {/* Mobile drawer */}
      {open && (
        <div className="md:hidden border-t bg-white shadow-sm">
          <nav className="flex flex-col p-2">
            {[...leftNav, ...rightNav].map(item => (
              <Link
                key={item.href}
                href={`/${locale}${item.href}`}
                className="px-3 py-3 border-b text-gray-800 uppercase font-medium hover:bg-gray-50"
                onClick={() => setOpen(false)}
              >
                {tNav(item.key)}
              </Link>
            ))}
            <div className="px-3 py-2 text-sm text-gray-600 flex items-center justify-between">
              <a href="mailto:sagoke-group@gmail.com" className="hover:text-blue-700">sagoke-group@gmail.com</a>
              <button onClick={switchLang} className="ml-4 inline-flex items-center gap-1 text-gray-800">
                <Globe className="h-4 w-4" /> {locale.toUpperCase()}
              </button>
            </div>
            <a href="https://sagoke-group.com" className="px-3 pb-3 text-blue-700 text-sm">sagoke-group.com</a>
          </nav>
        </div>
      )}
    </header>
  )
}
