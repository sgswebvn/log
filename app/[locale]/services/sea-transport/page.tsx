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

export default function SeaTransportPage() {
    const params = useParams()
    const locale = params.locale as string
    const t = useTranslations("servicesSea")
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

    return (
        <div className="bg-gray-50 min-h-screen">
            <Header />

            {/* Hero */}
            <section className="relative h-72 md:h-96 flex items-center justify-center overflow-hidden">

                <Image
                    src={"/images/services/ss1.png"}
                    alt={t("hero.title")} fill className="object-cover" priority />
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
                        src={"/images/services/ss.png"}
                        alt={t("content.overview.title")}
                        width={700}
                        height={400}
                        className="rounded mb-4"
                    />
                    <h2 className="text-2xl md:text-3xl font-bold mb-6">{t("content.overview.title")}</h2>
                    <p className="text-gray-700 mb-4">{t("content.overview.intro")}</p>
                    <p className="text-gray-700 mb-4">{t("content.overview.routes")}</p>

                    <h2 className="text-2xl md:text-3xl font-bold mb-6 mt-8">{t("content.types.title")}</h2>
                    <p className="text-gray-700 mb-4">{t("content.types.intro")}</p>
                    <div className="space-y-4 mb-8">
                        <p className="text-gray-700">{t("content.types.fcl")}</p>
                        <p className="text-gray-700">{t("content.types.lcl")}</p>
                        <p className="text-gray-700">{t("content.types.bulkSpecial")}</p>
                        <p className="text-gray-700">{t("content.types.multimodal")}</p>
                    </div>

                    <h2 className="text-2xl md:text-3xl font-bold mb-6 mt-8">{t("content.prosCons.title")}</h2>
                    <p className="text-gray-700 mb-4">{t("content.prosCons.intro")}</p>
                    <div className="space-y-4 mb-8">
                        <p className="text-gray-700">{t("content.prosCons.pros")}</p>
                        <p className="text-gray-700">{t("content.prosCons.cons")}</p>
                        <p className="text-gray-700">{t("content.prosCons.note")}</p>
                    </div>

                    <h2 className="text-2xl md:text-3xl font-bold mb-6 mt-8">{t("content.cost.title")}</h2>
                    <p className="text-gray-700 mb-4">{t("content.cost.intro")}</p>
                    <div className="space-y-4 mb-8">
                        <p className="text-gray-700">{t("content.cost.factors")}</p>
                        <p className="text-gray-700">{t("content.cost.calculation")}</p>
                        <p className="text-gray-700">{t("content.cost.surcharges")}</p>
                    </div>

                    <h2 className="text-2xl md:text-3xl font-bold mb-6 mt-8">{t("content.time.title")}</h2>
                    <p className="text-gray-700 mb-4">{t("content.time.average")}</p>
                    <p className="text-gray-700 mb-4">{t("content.time.factors")}</p>
                    <p className="text-gray-700 mb-4">{t("content.time.commitment")}</p>

                    <h2 className="text-2xl md:text-3xl font-bold mb-6 mt-8">{t("content.clients.title")}</h2>
                    <p className="text-gray-700 mb-4">{t("content.clients.list")}</p>

                    <h2 className="text-2xl md:text-3xl font-bold mb-6 mt-8">{t("content.process.title")}</h2>
                    <div className="space-y-4 mb-8">
                        <p className="text-gray-700">{t("content.process.step1")}</p>
                        <p className="text-gray-700">{t("content.process.step2")}</p>
                        <p className="text-gray-700">{t("content.process.step3")}</p>
                        <p className="text-gray-700">{t("content.process.step4")}</p>
                        <p className="text-gray-700">{t("content.process.step5")}</p>
                    </div>

                    <p className="text-gray-700 mb-4">{t("content.callToAction")}</p>

                    <h2 className="text-2xl md:text-3xl font-bold mb-6 mt-8">{t("content.benefits.title")}</h2>
                    <div className="space-y-2 mb-8">
                        <p className="text-gray-700 flex items-center"><span className="text-green-500 mr-2">✔</span>{t("content.benefits.professional")}</p>
                        <p className="text-gray-700 flex items-center"><span className="text-green-500 mr-2">✔</span>{t("content.benefits.courteous")}</p>
                        <p className="text-gray-700 flex items-center"><span className="text-green-500 mr-2">✔</span>{t("content.benefits.support")}</p>
                    </div>

                    <h2 className="text-2xl md:text-3xl font-bold mb-6 mt-8">{t("content.faq.title")}</h2>
                    <div className="space-y-4">
                        <details className="border rounded-lg p-4">
                            <summary className="font-semibold">{t("content.faq.q1")}</summary>
                            <p className="mt-2 text-gray-700">{t("content.faq.a1")}</p>
                        </details>
                        <details className="border rounded-lg p-4">
                            <summary className="font-semibold">{t("content.faq.q2")}</summary>
                            <p className="mt-2 text-gray-700">{t("content.faq.a2")}</p>
                        </details>
                        <details className="border rounded-lg p-4">
                            <summary className="font-semibold">{t("content.faq.q3")}</summary>
                            <p className="mt-2 text-gray-700">{t("content.faq.a3")}</p>
                        </details>
                    </div>

                    <h2 className="text-2xl md:text-3xl font-bold mb-6 mt-8">{t("content.ask.title")}</h2>
                    <Link href={`/${locale}/contact/#contact-area`}>
                        <Button className="bg-orange-500 hover:bg-orange-600 text-white">
                            {t("content.ask.cta")} <span className="ml-2">→</span>
                        </Button>
                    </Link>
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



            <Footer />
        </div>
    )
}