"use client"

import Link from "next/link"
import { Mail, Phone, MapPin, Globe } from "lucide-react"
import { useTranslations, useLocale } from "next-intl"

export default function Footer() {
  const t = useTranslations("footer")
  const tCommon = useTranslations("common")
  const tNav = useTranslations("navigation")
  const tServices = useTranslations()
  const locale = useLocale()

  const services = [
    "services.items.seaFreight.title",
    "services.items.airLogistics.title",
    "services.items.forwarding.title",
    "services.items.warehousing.title",
    "services.items.supplyChain.title",
  ]

  return (
    <footer className="bg-gray-900 text-white pt-14">
      <div className="container mx-auto px-4">
        {/* 4 Cột */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Company Info */}
          <div>
            <h3 className="text-2xl font-extrabold mb-4 bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
              Sagoke
            </h3>
            <p className="text-gray-300 leading-relaxed mb-4">{t("description")}</p>
          </div>



          {/* Services */}
          <div>
            <h4 className="font-semibold mb-4">{t("mainServices")}</h4>
            <ul className="space-y-2 text-gray-300">
              {services.map((serviceKey, index) => (
                <li key={index}>{tServices(serviceKey)}</li>
              ))}
            </ul>
          </div>
          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">{t("quickLinks")}</h4>
            <ul className="space-y-2">
              <li>
                <Link href={`/${locale}`} className="text-gray-300 hover:text-white">
                  {tNav("home")}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/services`} className="text-gray-300 hover:text-white">
                  {tNav("services")}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/news`} className="text-gray-300 hover:text-white">
                  {tNav("news")}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/contact`} className="text-gray-300 hover:text-white">
                  {tNav("contact")}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/about`} className="text-gray-300 hover:text-white">
                  {tNav("about")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold mb-4">{t("contact")}</h4>
            <div className="space-y-2 text-gray-200/90">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <span className="text-sm">ops@sagoke-group.com</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <span className="text-sm">{tCommon("contactInfo.phone")}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span className="text-sm">{tCommon("contactInfo.address")}</span>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="h-4 w-4" />
                <a
                  href="https://sagoke-group.com"
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm hover:underline"
                >
                  sagoke-group.com
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-white/10 mt-10 py-6 text-center">
          <p className="text-gray-400 text-sm">{t("copyright").replace("NEP Logistics", "Sagoke")}</p>
        </div>
      </div>
    </footer>
  )
}
