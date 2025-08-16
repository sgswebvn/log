"use client"

import { useTranslations } from "next-intl"
import Image from "next/image"
import Link from "next/link"
import { useLocale } from "next-intl"

const services = [
  {
    id: "sea-transport",
    titleKey: "seaTransport.title",
    descKey: "seaTransport.desc",
    icon: "/abstract-geometric-logo.png",
  },
  {
    id: "rail-transport",
    titleKey: "railTransport.title",
    descKey: "railTransport.desc",
    icon: "/abstract-logo-2.png",
  },
  {
    id: "project-logistics",
    titleKey: "projectLogistics.title",
    descKey: "projectLogistics.desc",
    icon: "/abstract-logo-3.png",
  },
  {
    id: "import-logistics",
    titleKey: "importLogistics.title",
    descKey: "importLogistics.desc",
    icon: "/abstract-geometric-logo-4.png",
  },
  {
    id: "container-operations",
    titleKey: "containerOps.title",
    descKey: "containerOps.desc",
    icon: "/logo-number-5.png",
  },
  {
    id: "warehouse-customs",
    titleKey: "warehouseCustoms.title",
    descKey: "warehouseCustoms.desc",
    icon: "/abstract-geometric-logo.png",
  },
]

export default function HomeServiceIcons() {
  const t = useTranslations("home.services")
  const locale = useLocale()

  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Dịch vụ của chúng tôi</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">Giải pháp logistics toàn diện cho mọi nhu cầu</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {services.map((service) => (
            <Link key={service.id} href={`/${locale}/services`}>
              <div className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105 hover:bg-gradient-to-br hover:from-blue-500 hover:to-blue-600 cursor-pointer">
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 mb-6 relative">
                    <Image
                      src={service.icon || "/placeholder.svg"}
                      alt={service.titleKey}
                      fill
                      className="object-contain group-hover:brightness-0 group-hover:invert transition-all duration-500"
                    />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-white transition-colors duration-500">
                    {service.id === "sea-transport" && "Vận tải biển quốc tế"}
                    {service.id === "rail-transport" && "Vận tải đường biển"}
                    {service.id === "project-logistics" && "Logistics dự án"}
                    {service.id === "import-logistics" && "Logistics nhập khẩu"}
                    {service.id === "container-operations" && "Vận hành container"}
                    {service.id === "warehouse-customs" && "Kho bãi & Hải quan"}
                  </h3>
                  <p className="text-gray-600 group-hover:text-white/90 transition-colors duration-500 leading-relaxed">
                    {service.id === "sea-transport" && "Vận tải đường biển"}
                    {service.id === "rail-transport" && "Logistics dự án"}
                    {service.id === "project-logistics" && "Xử lý hàng dự án"}
                    {service.id === "import-logistics" && "Hàng không và nhập khẩu"}
                    {service.id === "container-operations" && "Dịch vụ vận hành"}
                    {service.id === "warehouse-customs" && "Lưu kho và thông quan"}
                  </p>
                  <div className="mt-4 text-sm text-gray-500 group-hover:text-white/80 transition-colors duration-500">
                    {service.id === "warehouse-customs" && "Dịch vụ chuỗi cung ứng"}
                    {service.id !== "warehouse-customs" && "Giải pháp đầu‑cuối"}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
