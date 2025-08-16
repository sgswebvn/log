import { Ship, Package, Plane, Shield, Warehouse, Truck } from "lucide-react";
import { useTranslations } from "next-intl";

export default function HomeServiceIcons() {
  const t = useTranslations("home.icons");
  const items = [
    { icon: Ship, key: "sea" },
    { icon: Package, key: "project" },
    { icon: Plane, key: "import" },
    { icon: Shield, key: "operation" },
    { icon: Warehouse, key: "warehouse" },
    { icon: Truck, key: "supply" },
  ];

  return (
    <div className="container mx-auto px-4 grid grid-cols-2 md:grid-cols-3 gap-6">
      {items.map(({ icon: Icon, key }) => (
        <div
          key={key}
          className="group rounded-xl border shadow-sm p-8 text-center bg-white hover:bg-blue-50 hover:scale-105 transition-all duration-300"
        >
          <div className="w-14 h-14 mx-auto rounded-full bg-blue-100 flex items-center justify-center group-hover:bg-blue-200 transition-colors duration-300">
            <Icon className="h-7 w-7 text-blue-600 group-hover:text-blue-800 transition-colors duration-300" />
          </div>
          <h4 className="mt-3 font-medium text-gray-900 group-hover:text-blue-800 transition-colors duration-300">
            {t(`${key}.t`)}
          </h4>
          <p className="text-sm text-gray-600 mt-1 group-hover:text-blue-700 transition-colors duration-300">
            {t(`${key}.s`)}
          </p>
        </div>
      ))}
    </div>
  );
}