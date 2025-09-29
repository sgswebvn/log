"use client"

import Header from "@/components/Header"
import Footer from "@/components/Footer"
import Breadcrumbs from "@/components/common/breadcrumbs"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Mail, Phone } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useParams } from "next/navigation"
import { useTranslations } from "next-intl"

export default function ServicesWarehousingPage() {
    const params = useParams()
    const locale = params.locale as string
    const t = useTranslations("servicesWarehousing")
    const tBreadcrumbs = useTranslations("breadcrumbs")
    const tCommon = useTranslations("common")

    const sidebarServices = [
        { id: "sea", label: t("sidebar.sea"), href: `/${locale}/services/sea-transport` },
        { id: "air", label: t("sidebar.air"), href: `/${locale}/services/air-logistics` },
        { id: "road", label: t("sidebar.road"), href: `/${locale}/services/road` },
        { id: "warehouse", label: t("sidebar.warehouse"), href: `/${locale}/services/warehousing` },
        { id: "customs", label: t("sidebar.customs"), href: `/${locale}/services/customs` },
        { id: "project", label: t("sidebar.project"), href: `/${locale}/services/project-cargo` },
    ]
    // Safely handle the roles.items array
    const rolesItems = t("content.overview.roles.items", { returnObjects: true }) || [];

    return (
        <div className="bg-gray-50 min-h-screen">
            <Header />

            {/* Hero */}
            <section className="relative h-72 md:h-96 flex items-center justify-center overflow-hidden">
                <Image src="/media/dlcpsax4/luu-kho-bai.jpg?anchor=center&mode=crop&width=700&height=400&rnd=132203851548800000" alt={t("hero.title")} fill className="object-cover" priority />
                <div className="absolute inset-0 bg-black/70" />
                <div className="relative text-center text-white px-4 z-10 pt-10">
                    <h1 className="text-3xl md:text-5xl font-bold mb-3">{t("hero.title")}</h1>
                    <p className="text-blue-100 max-w-2xl mx-auto mb-5">{t("hero.subtitle")}</p>
                    <Breadcrumbs
                        items={[
                            { label: tBreadcrumbs("services"), href: `/${locale}/services` },
                            { label: t("hero.title") },
                        ]}
                    />
                </div>
            </section>

            {/* Main */}
            <main className="container mx-auto px-4 py-12 md:py-20 grid md:grid-cols-3 gap-8">
                {/* Nội dung */}
                <article className="md:col-span-2 bg-white rounded-2xl shadow-md p-8 text-left">
                    <Image
                        src="/images/services/house.png"
                        alt={t("content.title")}
                        width={700}
                        height={400}
                        className="rounded mb-4"
                    />
                    <h2 className="text-2xl md:text-3xl font-bold mb-6">{t("content.title")}</h2>
                    <p className="text-gray-700 leading-relaxed mb-6" dangerouslySetInnerHTML={{ __html: t("content.desc1") }} />

                    {/* Tổng quan */}
                    <div className="mb-8">
                        <h3 className="text-xl font-semibold mb-4">{t("content.overview.title")}</h3>
                        <p className="text-gray-700 mb-4" dangerouslySetInnerHTML={{ __html: t("content.overview.desc") }} />
                        <blockquote className="border-l-4 border-blue-600 pl-4 italic text-gray-600 mb-4" dangerouslySetInnerHTML={{ __html: t("content.overview.definition") }} />
                        <p className="text-gray-700 mb-4" dangerouslySetInnerHTML={{ __html: t("content.overview.example") }} />
                        <h4 className="text-lg font-semibold mb-3">{t("content.overview.roles.title")}</h4>
                        <ul className="list-disc pl-5 space-y-2 mb-4">
                            {Array.isArray(rolesItems) ? rolesItems.map((item, index) => (
                                <li key={index} className="text-gray-700" dangerouslySetInnerHTML={{ __html: item }} />
                            )) : null}
                        </ul>
                        <h4 className="text-lg font-semibold mb-3">{t("content.overview.ecommerce.title")}</h4>
                        <p className="text-gray-700" dangerouslySetInnerHTML={{ __html: t("content.overview.ecommerce.desc") }} />
                    </div>

                    {/* Các loại hình kho bãi */}
                    <div className="mb-8">
                        <h3 className="text-xl font-semibold mb-4">{t("content.types.title")}</h3>
                        <p className="text-gray-700 mb-4" dangerouslySetInnerHTML={{ __html: t("content.types.desc") }} />
                        <div className="space-y-6">
                            <div>
                                <h4 className="text-lg font-semibold mb-2">{t("content.types.bonded.title")}</h4>
                                <p className="text-gray-700" dangerouslySetInnerHTML={{ __html: t("content.types.bonded.desc") }} />
                            </div>
                            <div>
                                <h4 className="text-lg font-semibold mb-2">{t("content.types.cfs.title")}</h4>
                                <p className="text-gray-700" dangerouslySetInnerHTML={{ __html: t("content.types.cfs.desc") }} />
                            </div>
                            <div>
                                <h4 className="text-lg font-semibold mb-2">{t("content.types.cold.title")}</h4>
                                <p className="text-gray-700" dangerouslySetInnerHTML={{ __html: t("content.types.cold.desc") }} />
                            </div>
                            <div>
                                <h4 className="text-lg font-semibold mb-2">{t("content.types.general.title")}</h4>
                                <p className="text-gray-700" dangerouslySetInnerHTML={{ __html: t("content.types.general.desc") }} />
                            </div>
                        </div>
                    </div>

                    {/* Lợi ích */}
                    <div className="mb-8">
                        <h3 className="text-xl font-semibold mb-4">{t("content.benefits.title")}</h3>
                        <p className="text-gray-700 mb-4" dangerouslySetInnerHTML={{ __html: t("content.benefits.desc") }} />
                        <div className="space-y-6">
                            <div>
                                <h4 className="text-lg font-semibold mb-2">{t("content.benefits.cost.title")}</h4>
                                <p className="text-gray-700" dangerouslySetInnerHTML={{ __html: t("content.benefits.cost.desc") }} />
                            </div>
                            <div>
                                <h4 className="text-lg font-semibold mb-2">{t("content.benefits.flexibility.title")}</h4>
                                <p className="text-gray-700" dangerouslySetInnerHTML={{ __html: t("content.benefits.flexibility.desc") }} />
                            </div>
                            <div>
                                <h4 className="text-lg font-semibold mb-2">{t("content.benefits.data.title")}</h4>
                                <p className="text-gray-700" dangerouslySetInnerHTML={{ __html: t("content.benefits.data.desc") }} />
                            </div>
                            <div>
                                <h4 className="text-lg font-semibold mb-2">{t("content.benefits.risk.title")}</h4>
                                <p className="text-gray-700" dangerouslySetInnerHTML={{ __html: t("content.benefits.risk.desc") }} />
                            </div>
                        </div>
                    </div>

                    {/* Dịch vụ tại Sagoke */}
                    <div className="mb-8">
                        <h3 className="text-xl font-semibold mb-4">{t("content.Sagoke.title")}</h3>
                        <p className="text-gray-700 mb-4" dangerouslySetInnerHTML={{ __html: t("content.Sagoke.desc") }} />
                        <div className="space-y-4">
                            <p className="text-gray-700" dangerouslySetInnerHTML={{ __html: t("content.Sagoke.infrastructure") }} />
                            <p className="text-gray-700" dangerouslySetInnerHTML={{ __html: t("content.Sagoke.management") }} />
                            <p className="text-gray-700" dangerouslySetInnerHTML={{ __html: t("content.Sagoke.flexibility") }} />
                            <p className="text-gray-700" dangerouslySetInnerHTML={{ __html: t("content.Sagoke.location") }} />
                            <p className="text-gray-700" dangerouslySetInnerHTML={{ __html: t("content.Sagoke.support") }} />
                            <p className="text-gray-700" dangerouslySetInnerHTML={{ __html: t("content.Sagoke.integration") }} />
                            <p className="text-gray-700" dangerouslySetInnerHTML={{ __html: t("content.Sagoke.quality") }} />
                            <p className="text-gray-700" dangerouslySetInnerHTML={{ __html: t("content.Sagoke.conclusion") }} />
                        </div>
                    </div>

                    {/* Lời kết */}
                    <div>
                        <h3 className="text-xl font-semibold mb-4">{t("content.conclusion.title")}</h3>
                        <p className="text-gray-700" dangerouslySetInnerHTML={{ __html: t("content.conclusion.desc") }} />
                    </div>
                </article>

                {/* Sidebar */}
                {/* Sidebar */}
                <aside className="space-y-6">
                    <div className="bg-white p-5 rounded-xl shadow-md">
                        <h4 className="font-semibold mb-4">{t("sidebar.search.title")}</h4>
                        <form method="GET" className="flex">
                            <input
                                name="keyword"
                                type="text"
                                className="form-control flex-1 mr-2 p-2 border rounded"
                                placeholder={t("sidebar.search.placeholder")}
                            />
                            <Button type="submit" className="bg-orange-500 hover:bg-orange-600 text-white p-2 rounded">
                                <span className="sr-only">Search</span>
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M12.9 14.32a8 8 0 1 1 1.41-1.41l5.35 5.33-1.42 1.42-5.33-5.34zM2 8a6 6 0 1 0 12 0A6 6 0 0 0 2 8z" />
                                </svg>
                            </Button>
                        </form>
                    </div>
                    <div className="bg-white p-5 rounded-xl shadow-md">
                        <h4 className="font-semibold mb-4">{t("sidebar.services.title")}</h4>
                        <ul className="space-y-2 text-sm">
                            {sidebarServices.map((s) => (
                                <li key={s.id}>
                                    <Link href={s.href} className="hover:text-blue-600">
                                        {s.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="bg-white p-5 rounded-xl shadow-md">
                        <h4 className="font-semibold mb-4">{t("sidebar.recentPosts.title")}</h4>
                        <ul className="space-y-4">
                            <li>
                                <div className="flex">
                                    <div>
                                        <h5 className="text-sm font-medium text-blue-500">
                                            {t("sidebar.recentPosts.items.post1")}
                                        </h5>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div className="flex">
                                    <div>
                                        <h5 className="text-sm font-medium text-blue-500">
                                            {t("sidebar.recentPosts.items.post2")}
                                        </h5>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div className="flex">
                                    <div>
                                        <h5 className="text-sm font-medium text-blue-500">
                                            {t("sidebar.recentPosts.items.post3")}
                                        </h5>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div className="flex">
                                    <div>
                                        <h5 className="text-sm font-medium text-blue-500">
                                            {t("sidebar.recentPosts.items.post4")}
                                        </h5>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div className="flex">
                                    <div>
                                        <h5 className="text-sm font-medium text-blue-500">
                                            {t("sidebar.recentPosts.items.post5")}
                                        </h5>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div className="bg-blue-50 p-5 rounded-xl shadow-md text-center">
                        <div className="mb-4"><span className="text-4xl">📞</span></div>
                        <h4 className="font-semibold mb-4 text-orange-500">{t("sidebar.support.title")}</h4>
                        <p className="text-gray-600 mb-4">{t("sidebar.support.desc")}</p>
                        <Link href={`/${locale}/contact`}>
                            <Button className="bg-orange-500 hover:bg-orange-600 text-white w-full">
                                {t("sidebar.support.cta")} <span className="ml-2">→</span>
                            </Button>
                        </Link>
                    </div>
                </aside>
            </main>

            {/* CTA cuối trang */}
            <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-16 text-center">
                <div className="container mx-auto px-4">
                    <h3 className="text-2xl md:text-3xl font-bold mb-4">{t("cta.title")}</h3>
                    <p className="text-blue-100 mb-8">{t("cta.desc")}</p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href={`/${locale}/contact`}>
                            <Button className="bg-white text-blue-700 hover:bg-gray-100 px-8 py-3 rounded-xl shadow-lg">
                                <Mail className="h-5 w-5 mr-2" />
                                {t("cta.button")}
                            </Button>
                        </Link>
                        <Button
                            variant="outline"
                            className="px-8 py-3 bg-white/10 border-white text-white rounded-xl shadow-lg hover:bg-white/20"
                        >
                            <Phone className="h-5 w-5 mr-2" />
                            {tCommon("contactInfo.phone")}
                        </Button>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    )
}