import Image from "next/image";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";

const cards = [
  { img: "/images/banner2.jpg", titleKey: "rail.t", subKey: "rail.s" },
  { img: "/SeaRail.jpg", titleKey: "searail.t", subKey: "searail.s" },
  { img: "/images/truck.jpg", titleKey: "truck.t", subKey: "truck.s" },
];

export default function HomeFeaturedServices() {
  const t = useTranslations("home.featured");
  const locale = useLocale();

  return (
    <div className="container mx-auto px-4 grid gap-6 md:grid-cols-3 pt-4">
      {cards.map((c, i) => (
        <Link
          key={i}
          href={`/${locale}/services#${c.titleKey.split(".")[0]}`}
          className="rounded-lg border hover:shadow-md transition-shadow"
        >
          <div className="relative w-full h-44 overflow-hidden rounded-t-lg">
            <Image
              src={c.img || "/placeholder.svg"}
              alt={t(c.titleKey)}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover"
            />
          </div>
          <div className="p-4">
            <h3 className="text-gray-900 font-semibold">{t(c.titleKey)}</h3>
            <p className="text-sm text-gray-600">{t(c.subKey)}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}