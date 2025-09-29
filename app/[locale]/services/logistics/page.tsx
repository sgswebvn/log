"use client"

import Header from "@/components/Header"
import Footer from "@/components/Footer"
import Breadcrumbs from "@/components/common/breadcrumbs"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Package, Globe, Clock, Shield, Award, Users, CheckCircle, Phone, Mail } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useParams } from "next/navigation"
import { useTranslations } from "next-intl"

export default function ServicesLogisticsPage() {
    const params = useParams()
    const locale = params.locale as string
    const t = useTranslations("servicesLogistics")
    const tBreadcrumbs = useTranslations("breadcrumbs")
    const tCommon = useTranslations("common")

    const advantages = [
        { icon: Globe, titleKey: "advantages.global.title", descKey: "advantages.global.desc" },
        { icon: Clock, titleKey: "advantages.time.title", descKey: "advantages.time.desc" },
        { icon: Shield, titleKey: "advantages.safety.title", descKey: "advantages.safety.desc" },
        { icon: Award, titleKey: "advantages.quality.title", descKey: "advantages.quality.desc" },
        { icon: Users, titleKey: "advantages.team.title", descKey: "advantages.team.desc" },
        { icon: CheckCircle, titleKey: "advantages.price.title", descKey: "advantages.price.desc" },
    ]

    const sidebarServices = [
        { id: "sea", label: t("sidebar.sea"), href: `/${locale}/services/sea-transport` },
        { id: "air", label: t("sidebar.air"), href: `/${locale}/services/air-logistics` },
        { id: "road", label: t("sidebar.road"), href: `/${locale}/services/road` },
        { id: "warehouse", label: t("sidebar.warehouse"), href: `/${locale}/services/warehousing` },
        { id: "customs", label: t("sidebar.customs"), href: `/${locale}/services/customs` },
        { id: "project", label: t("sidebar.project"), href: `/${locale}/services/project-cargo` },
    ]

    return (
        <div className="bg-gray-50 min-h-screen">
            <Header />

            {/* Hero */}
            <section className="relative h-72 md:h-96 flex items-center justify-center overflow-hidden">
                <Image src="/images/logistics-hero.jpg" alt="Hero Logistics" fill className="object-cover" priority />
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

            {/* Main Content */}
            <main className="container mx-auto px-4 py-12 md:py-20 grid md:grid-cols-3 gap-8">
                {/* Content */}
                <article className="md:col-span-2 bg-white rounded-2xl shadow-md p-8">
                    <Image
                        src="/images/services/image.png"
                        alt="Logistics Services"
                        width={800}
                        height={400}
                        className="rounded-2xl pb-5"
                    />

                    <h2 className="text-2xl md:text-3xl font-bold mb-6">{t("content.title")}</h2>
                    <p className="text-gray-700 leading-relaxed mb-6">{t("content.desc1")}</p>
                    <h3 className="text-xl font-semibold mb-2">{t("content.solution.title")}</h3>
                    <p className="mb-6 text-gray-700">{t("content.solution.desc")}</p>
                    <h3 className="text-xl font-semibold mb-2">{t("content.optimize.title")}</h3>
                    <p className="mb-6 text-gray-700">{t("content.optimize.desc")}</p>
                    <h3 className="text-xl font-semibold mb-2">{t("content.team.title")}</h3>
                    <p className="mb-6 text-gray-700">{t("content.team.desc")}</p>
                    <h3 className="text-xl font-semibold mb-2">{t("content.network.title")}</h3>
                    <p className="mb-6 text-gray-700">{t("content.network.desc")}</p>

                    <h3 className="text-xl font-semibold mb-2">{t("content.technology.title")}</h3>
                    <p className="mb-6 text-gray-700">{t("content.technology.desc")}</p>

                    <h3 className="text-xl font-semibold mb-2">{t("content.quality.title")}</h3>
                    <p className="mb-6 text-gray-700">{t("content.quality.desc")}</p>

                    <h3 className="text-xl font-semibold mb-2">{t("content.additional.title")}</h3>
                    <p className="mb-6 text-gray-700">{t("content.additional.desc")}</p>

                    <p className="mt-8 text-gray-800 font-medium italic">{t("content.conclusion")}</p>

                    {/* Advantages */}
                    <div className="mt-10">
                        <h3 className="text-xl md:text-2xl font-bold mb-6">{t("advantages.title")}</h3>
                        <div className="grid sm:grid-cols-2 gap-6">
                            {advantages.map((adv, idx) => {
                                const Icon = adv.icon
                                return (
                                    <Card
                                        key={idx}
                                        className="p-6 text-center bg-gradient-to-br from-white to-gray-50 shadow hover:shadow-lg rounded-xl transition"
                                    >
                                        <CardContent>
                                            <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                                                <Icon className="h-7 w-7 text-blue-600" />
                                            </div>
                                            <h4 className="text-lg font-bold text-gray-900 mb-2">{t(adv.titleKey)}</h4>
                                            <p className="text-gray-600 text-sm">{t(adv.descKey)}</p>
                                        </CardContent>
                                    </Card>
                                )
                            })}
                        </div>
                    </div>

                </article>

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
