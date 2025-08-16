"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname, useRouter } from "next/navigation"
import { useLocale, useTranslations } from "next-intl"
import { Menu, X, Globe, ChevronDown } from "lucide-react"
import { useState, useEffect } from "react"

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
  const [isScrolled, setIsScrolled] = useState(false)

  const isActive = (to: string) => pathname?.startsWith(`/${locale}${to}`)

  const switchLang = (newLocale: string) => {
    const rest = pathname?.replace(`/${locale}`, "") || ""
    router.push(`/${newLocale}${rest}`)
    setLangOpen(false)
  }

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`bg-white shadow-sm transition-all duration-300 ${isScrolled ? "fixed top-0 left-0 right-0 z-50 shadow-lg" : ""}`}
    >
      {/* Top contact bar */}
      <div className="bg-gray-50 border-b">
        <div className="container mx-auto px-4 py-2">
          <div className="flex justify-between items-center text-sm text-gray-600">
            <div className="flex items-center gap-3 md:gap-6">
              <div className="flex items-center gap-1">
                <span>📧</span>
                <span className="text-xs sm:text-sm">duke@sagoke-group.com</span>
              </div>
              <div className="flex items-center gap-1">
                <span>📞</span>
                <span className="text-xs sm:text-sm">+84 123 456 789</span>
              </div>
            </div>
            <div className="flex items-center gap-4">
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
          <button className="lg:hidden p-2" onClick={() => setOpen(!open)} aria-label="Menu">
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>

          <Link href={`/${locale}`} className="hidden md:flex flex-1 justify-center lg:flex-none">
            <Image src="/images/sagoke-logo.png" alt="Sagoke" width={140} height={48} className="object-contain" />
          </Link>

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

          <nav className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={`/${locale}${item.href}`}
                className={`text-sm font-bold uppercase tracking-wide transition-colors ${isActive(item.href) ? "text-blue-600" : "text-gray-700 hover:text-blue-600"
                  }`}
              >
                {tNav(item.key)}
              </Link>
            ))}
          </nav>
        </div>
      </div>

      {open && (
        <div className="lg:hidden border-t bg-white">
          <nav className="container mx-auto px-4 py-4 space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={`/${locale}${item.href}`}
                className="block py-3 text-gray-700 uppercase font-bold border-b border-gray-100 last:border-b-0"
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
