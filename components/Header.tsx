"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname, useRouter } from "next/navigation"
import { useLocale, useTranslations } from "next-intl"
import { Menu, X, Globe, ChevronDown } from "lucide-react"
import { useState } from "react"

const navItems = [
  { href: "/about", key: "about" },
  { href: "/services", key: "services" },
  { href: "/news", key: "news" },
  { href: "/contact", key: "contact" },
]

export default function Header() {
  const tNav = useTranslations("navigation")
  const locale = useLocale()
  const pathname = usePathname()
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [langOpen, setLangOpen] = useState(false)

  const isActive = (to: string) => pathname?.startsWith(`/${locale}${to}`)

  const switchLang = (newLocale: string) => {
    const rest = pathname?.replace(`/${locale}`, "") || ""
    router.push(`/${newLocale}${rest}`)
    setLangOpen(false)
  }

  return (
    <header className="bg-white shadow-sm">
      {/* Top contact bar - Now visible on all devices with icons */}
      <div className="bg-gray-50 border-b">
        <div className="container mx-auto px-4 py-2">
          <div className="flex justify-between items-center text-sm text-gray-600">
            {/* Contact info with icons on all devices */}
            <div className="flex items-center gap-3 md:gap-6">
              <div className="flex items-center gap-1">
                <span>📧</span>
                <span className="text-xs sm:text-sm">sagoke-group@gmail.com</span>
              </div>
            </div>
            <div className="flex items-center gap-4">
              {/* Social links - now visible on mobile too */}
              <div className="flex gap-2">
                <a
                  href="#"
                  className="w-5 h-5 md:w-6 md:h-6 bg-blue-600 rounded text-white text-xs flex items-center justify-center hover:bg-blue-700 transition-colors"
                >
                  f
                </a>
                <a
                  href="#"
                  className="w-5 h-5 md:w-6 md:h-6 bg-blue-500 rounded text-white text-xs flex items-center justify-center hover:bg-blue-600 transition-colors"
                >
                  in
                </a>
                <a
                  href="#"
                  className="w-5 h-5 md:w-6 md:h-6 bg-red-600 rounded text-white text-xs flex items-center justify-center hover:bg-red-700 transition-colors"
                >
                  yt
                </a>
              </div>
              {/* Desktop language selector */}
              <div className="hidden md:block relative">
                <button
                  onClick={() => setLangOpen(!langOpen)}
                  className="flex items-center gap-1 hover:text-blue-600 transition-colors"
                >
                  <Globe className="h-4 w-4" />
                  {locale.toUpperCase()}
                  <ChevronDown className="h-3 w-3" />
                </button>
                {langOpen && (
                  <div className="absolute right-0 top-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg z-50 min-w-[100px]">
                    <button
                      onClick={() => switchLang("vi")}
                      className={`block w-full text-left px-3 py-2 text-sm hover:bg-gray-50 ${locale === "vi" ? "bg-blue-50 text-blue-600" : "text-gray-700"}`}
                    >
                      🇻🇳 Tiếng Việt
                    </button>
                    <button
                      onClick={() => switchLang("en")}
                      className={`block w-full text-left px-3 py-2 text-sm hover:bg-gray-50 ${locale === "en" ? "bg-blue-50 text-blue-600" : "text-gray-700"}`}
                    >
                      🇺🇸 English
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-3 md:py-4">
          {/* Mobile menu button */}
          <button className="lg:hidden p-2" onClick={() => setOpen(!open)} aria-label="Menu">
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>

          {/* Logo - Hidden on small screens, shown on md+ */}
          <Link href={`/${locale}`} className="hidden md:flex flex-1 justify-center lg:flex-none">
            <Image src="/images/sagoke-logo.png" alt="Sagoke" width={120} height={40} className="object-contain" />
          </Link>

          {/* Mobile language selector */}
          <div className="lg:hidden relative">
            <button
              onClick={() => setLangOpen(!langOpen)}
              className="flex items-center gap-1 text-gray-600 hover:text-blue-600 transition-colors p-2"
            >
              <Globe className="h-5 w-5" />
              {locale.toUpperCase()}
              <ChevronDown className="h-3 w-3" />
            </button>
            {langOpen && (
              <div className="absolute right-0 top-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg z-50 min-w-[120px]">
                <button
                  onClick={() => switchLang("vi")}
                  className={`block w-full text-left px-3 py-2 text-sm hover:bg-gray-50 ${locale === "vi" ? "bg-blue-50 text-blue-600" : "text-gray-700"}`}
                >
                  🇻🇳 Tiếng Việt
                </button>
                <button
                  onClick={() => switchLang("en")}
                  className={`block w-full text-left px-3 py-2 text-sm hover:bg-gray-50 ${locale === "en" ? "bg-blue-50 text-blue-600" : "text-gray-700"}`}
                >
                  🇺🇸 English
                </button>
              </div>
            )}
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={`/${locale}${item.href}`}
                className={`text-sm font-medium uppercase tracking-wide transition-colors ${
                  isActive(item.href) ? "text-blue-600" : "text-gray-700 hover:text-blue-600"
                }`}
              >
                {tNav(item.key)}
              </Link>
            ))}
          </nav>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="lg:hidden border-t bg-white">
          <nav className="container mx-auto px-4 py-4 space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={`/${locale}${item.href}`}
                className="block py-3 text-gray-700 uppercase font-medium border-b border-gray-100 last:border-b-0"
                onClick={() => setOpen(false)}
              >
                {tNav(item.key)}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  )
}
