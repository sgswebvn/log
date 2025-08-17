"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname, useRouter } from "next/navigation"
import { useLocale, useTranslations } from "next-intl"
import { Menu, X, ChevronDown } from "lucide-react"
import { useState, useEffect, useRef } from "react"
import { MdEmail } from "react-icons/md"

// Danh sách các mục điều hướng
const navItems = [
  { href: "/about", key: "about" },
  { href: "/services", key: "services" },
  { href: "/news", key: "news" },
  { href: "/contact", key: "contact" },
]

// Component Dropdown Ngôn ngữ tùy chỉnh
function LanguageSwitcher() {
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const languages = [
    { code: "vi", name: "VI", flag: "/flags/vn.png" },
    { code: "en", name: "EN", flag: "/flags/en.png" },
  ]

  const handleLanguageChange = (newLocale: string) => {
    const newPath = pathname.replace(`/${locale}`, `/${newLocale}`)
    router.push(newPath)
    setIsOpen(false)
  }

  // Đóng dropdown khi click ra ngoài
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [dropdownRef])

  const currentLanguage = languages.find(lang => lang.code === locale)

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 text-sm text-gray-700 px-3 py-1.5 rounded-md hover:bg-gray-100 transition-colors duration-200"
      >
        <Image
          src={currentLanguage?.flag || "/flags/vn.png"}
          alt={currentLanguage?.name || "flag"}
          width={20}
          height={14}
          className="object-contain rounded-sm"
        />
        <span>{currentLanguage?.name}</span>
        <ChevronDown size={16} className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>


      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-32 bg-white rounded-lg shadow-lg border z-10 overflow-hidden">
          <ul>
            {languages.map((lang) => (
              <li key={lang.code}>
                <button
                  onClick={() => handleLanguageChange(lang.code)}
                  className="w-full text-left px-4 py-2 text-sm text-gray-800 hover:bg-blue-50 flex items-center gap-2"
                >
                  <Image
                    src={lang.flag}
                    alt={lang.name}
                    width={20}
                    height={14}
                    className="object-contain rounded-sm"
                  />
                  <span>{lang.name}</span>
                </button>
              </li>
            ))}

          </ul>
        </div>
      )}
    </div>
  )
}


export default function Header() {
  const tNav = useTranslations("navigation")
  const tCta = useTranslations("cta")
  const locale = useLocale()
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  // Hàm kiểm tra link có đang active không
  const isActive = (href: string) => {
    const activePath = `/${locale}${href}`
    // Trường hợp trang chủ
    if (href === '/') return pathname === `/${locale}`
    return pathname.startsWith(activePath)
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md">
      {/* --- TOP BAR --- */}
      <div className="bg-gray-50 text-gray-600 text-sm border-b">
        <div className="container mx-auto flex justify-between items-center px-4 h-9">
          {/* Email */}
          <a href="mailto:sake@sagoke-group.com" className="flex items-center gap-2 hover:text-blue-600 transition-colors">
            <MdEmail className="text-blue-600" size={16} />
            <span className=" sm:inline">duke@sagoke-group.com</span>
          </a>

          {/* Select ngôn ngữ */}
          <LanguageSwitcher />
        </div>
      </div>

      {/* --- MAIN NAV --- */}
      <div className="container mx-auto flex justify-between items-center px-4 h-20">
        {/* Logo */}
        <Link href={`/${locale}`} className="flex-shrink-0 hidden md:block">
          <Image
            src="/images/sagoke-logo.png"
            alt="Sagoke Logo"
            width={140}
            height={45}
            className="object-contain"
            priority
          />
        </Link>

        {/* Nav (desktop) */}
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={`/${locale}${item.href}`}
              className={`relative text-[15px] uppercase font-medium transition-colors duration-300 
        ${isActive(item.href)
                  ? "text-blue-600"
                  : "text-gray-700 hover:text-blue-600"
                }
        after:content-[''] after:absolute after:left-0 after:bottom-[-4px] after:h-[2px] 
        after:w-full after:bg-blue-600 after:transition-transform after:duration-300 
        ${isActive(item.href) ? 'after:scale-x-100' : 'after:scale-x-0'}
        hover:after:scale-x-100`}
            >
              {tNav(item.key)}
            </Link>
          ))}
        </nav>


        {/* CTA button */}
        <div className="hidden md:block">
          <Link
            href={`/${locale}/contact`}
            className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-full shadow-lg hover:bg-blue-700 transform hover:scale-105 transition-all duration-300"
          >
            {tCta('getStarted')}
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
          onClick={() => setOpen(!open)}
          aria-label="Toggle Menu"
          aria-expanded={open}
        >
          {open ? (
            <X className="h-6 w-6 text-gray-800" />
          ) : (
            <Menu className="h-6 w-6 text-gray-800" />
          )}
        </button>
      </div>

      {/* --- MOBILE NAV (Animated) --- */}
      <div className={`md:hidden bg-white shadow-lg transition-all duration-500 ease-in-out overflow-hidden ${open ? 'max-h-[500px] border-t' : 'max-h-0'}`}>
        <nav className="px-4 pt-4 pb-6 space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={`/${locale}${item.href}`}
              onClick={() => setOpen(false)}
              className={`block py-3 px-3 text-gray-800 uppercase font-semibold rounded-md hover:bg-gray-100 hover:text-blue-600 transition-colors duration-200 ${isActive(item.href) ? 'text-blue-600 bg-blue-50' : ''}`}
            >
              {tNav(item.key)}
            </Link>
          ))}
          <div className="pt-4">
            <Link
              href={`/${locale}/contact`}
              className="block w-full text-center py-3 px-5 bg-blue-600 text-white font-semibold rounded-full shadow hover:bg-blue-700 transition-all duration-300"
              onClick={() => setOpen(false)}
            >
              {tCta('getStarted')}
            </Link>
          </div>
        </nav>
      </div>
    </header >
  )
}