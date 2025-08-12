"use client"

import { Ship, Package, Plane, Shield, Warehouse, Truck } from "lucide-react"
import { useTranslations } from "next-intl"

export default function HomeServiceIcons() {
  const t = useTranslations("home.icons")
  const items = [
    { icon: Ship, key: "sea" },
    { icon: Package, key: "project" },
    { icon: Plane, key: "import" },
    { icon: Shield, key: "operation" },
    { icon: Warehouse, key: "warehouse" },
    { icon: Truck, key: "supply" },
  ]
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
      {items.map(({ icon: Icon, key }) => (
        <div
          key={key}
          className="group rounded-xl border bg-white p-6 md:p-8 text-center shadow-sm transition-all duration-300 hover:shadow-xl hover:border-blue-300 hover:-translate-y-1 hover:bg-blue-50"
        >
          <div className="w-14 h-14 mx-auto rounded-full bg-blue-100 flex items-center justify-center ring-0 group-hover:ring-8 ring-blue-50 transition-all duration-300 group-hover:bg-blue-600 group-hover:scale-110">
            <Icon className="h-7 w-7 text-blue-600 group-hover:text-white transition-colors duration-300" />
          </div>
          <h4 className="mt-3 font-semibold text-gray-900 group-hover:text-blue-700 transition-colors duration-300">
            {t(`${key}.t`)}
          </h4>
          <p className="text-sm text-gray-600 mt-1 group-hover:text-gray-700 transition-colors duration-300">
            {t(`${key}.s`)}
          </p>
        </div>
      ))}
    </div>
  )
}
