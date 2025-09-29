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

export default function RoadTransportPage() {
    const params = useParams()
    const locale = params.locale as string
    const t = useTranslations("servicesRoad")
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
                <Image src="/images/services/road.png" alt={t("hero.title")} fill className="object-cover" priority />
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
                        src={"/images/services/duongbo.png"}
                        alt={t("content.intro.title")}
                        width={700}
                        height={400}
                        className="rounded mb-4"
                    />
                    <h2 className="text-2xl md:text-3xl font-bold mb-6">{t("content.intro.title")}</h2>

                    {/* Giới thiệu dịch vụ vận chuyển đường bộ */}
                    <div className="mb-8">
                        <h3 className="text-xl font-semibold mb-4">{t("content.intro.section1.title")}</h3>
                        <h4 className="text-lg font-semibold mb-3">{t("content.intro.section1.fcl.title")}</h4>
                        <p className="text-gray-700 mb-4">{t("content.intro.section1.fcl.desc1")}</p>
                        <p className="text-gray-700 mb-4">{t("content.intro.section1.fcl.advantages")}</p>
                        <ul className="list-disc pl-5 space-y-2 mb-4">
                            <li className="text-gray-700">{t("content.intro.section1.fcl.advantagesItems.safety")}</li>
                            <li className="text-gray-700">{t("content.intro.section1.fcl.advantagesItems.cost")}</li>
                            <li className="text-gray-700">{t("content.intro.section1.fcl.advantagesItems.convenience")}</li>
                        </ul>
                        <h4 className="text-lg font-semibold mb-3">{t("content.intro.section1.lcl.title")}</h4>
                        <p className="text-gray-700 mb-4">{t("content.intro.section1.lcl.desc1")}</p>
                        <p className="text-gray-700 mb-4">{t("content.intro.section1.lcl.advantages")}</p>
                        <ul className="list-disc pl-5 space-y-2 mb-4">
                            <li className="text-gray-700">{t("content.intro.section1.lcl.advantagesItems.cost")}</li>
                            <li className="text-gray-700">{t("content.intro.section1.lcl.advantagesItems.flexibility")}</li>
                            <li className="text-gray-700">{t("content.intro.section1.lcl.advantagesItems.optimization")}</li>
                        </ul>
                        <p className="text-gray-700 mb-4">{t("content.intro.section1.additionalServices")}</p>
                    </div>

                    {/* Tầm quan trọng của FCL và LCL */}
                    <div className="mb-8">
                        <h3 className="text-xl font-semibold mb-4">{t("content.intro.section2.title")}</h3>
                        <h4 className="text-lg font-semibold mb-3">{t("content.intro.section2.role.title")}</h4>
                        <p className="text-gray-700 mb-4">{t("content.intro.section2.role.desc1")}</p>
                        <p className="text-gray-700 mb-4">{t("content.intro.section2.role.advantages")}</p>
                        <ul className="list-disc pl-5 space-y-2 mb-4">
                            <li className="text-gray-700">{t("content.intro.section2.role.advantagesItems.flexibility")}</li>
                            <li className="text-gray-700">{t("content.intro.section2.role.advantagesItems.accessibility")}</li>
                            <li className="text-gray-700">{t("content.intro.section2.role.advantagesItems.costEfficiency")}</li>
                        </ul>
                        <h4 className="text-lg font-semibold mb-3">{t("content.intro.section2.benefits.title")}</h4>
                        <p className="text-gray-700 mb-4">{t("content.intro.section2.benefits.desc1")}</p>
                        <p className="text-gray-700 mb-4">{t("content.intro.section2.benefits.fclBenefits")}</p>
                        <ul className="list-disc pl-5 space-y-2 mb-4">
                            <li className="text-gray-700">{t("content.intro.section2.benefits.fclBenefitsItems.safety")}</li>
                            <li className="text-gray-700">{t("content.intro.section2.benefits.fclBenefitsItems.cost")}</li>
                            <li className="text-gray-700">{t("content.intro.section2.benefits.fclBenefitsItems.simplification")}</li>
                        </ul>
                        <p className="text-gray-700 mb-4">{t("content.intro.section2.benefits.lclBenefits")}</p>
                        <ul className="list-disc pl-5 space-y-2 mb-4">
                            <li className="text-gray-700">{t("content.intro.section2.benefits.lclBenefitsItems.cost")}</li>
                            <li className="text-gray-700">{t("content.intro.section2.benefits.lclBenefitsItems.flexibility")}</li>
                            <li className="text-gray-700">{t("content.intro.section2.benefits.lclBenefitsItems.optimization")}</li>
                        </ul>
                    </div>

                    {/* Đặc điểm nổi bật */}
                    <div className="mb-8">
                        <h2 className="text-2xl font-bold mb-6">{t("content.features.title")}</h2>
                        <h3 className="text-xl font-semibold mb-4">{t("content.features.fcl.title")}</h3>
                        <p className="text-gray-700 mb-4">{t("content.features.fcl.desc1")}</p>
                        <p className="text-gray-700 mb-4">{t("content.features.fcl.advantages")}</p>
                        <ul className="list-disc pl-5 space-y-2 mb-4">
                            <li className="text-gray-700">{t("content.features.fcl.advantagesItems.safety")}</li>
                            <li className="text-gray-700">{t("content.features.fcl.advantagesItems.cost")}</li>
                            <li className="text-gray-700">{t("content.features.fcl.advantagesItems.convenience")}</li>
                        </ul>
                        <p className="text-gray-700 mb-4">{t("content.features.fcl.containerTypes")}</p>
                        <ul className="list-disc pl-5 space-y-2 mb-4">
                            <li className="text-gray-700">{t("content.features.fcl.containerTypesItems.container20ft")}</li>
                            <li className="text-gray-700">{t("content.features.fcl.containerTypesItems.container40ft")}</li>
                            <li className="text-gray-700">{t("content.features.fcl.containerTypesItems.highCube")}</li>
                        </ul>
                        <p className="text-gray-700 mb-4">{t("content.features.fcl.process")}</p>
                        <ul className="list-disc pl-5 space-y-2 mb-4">
                            <li className="text-gray-700">{t("content.features.fcl.processItems.packing")}</li>
                            <li className="text-gray-700">{t("content.features.fcl.processItems.portTransport")}</li>
                            <li className="text-gray-700">{t("content.features.fcl.processItems.finalDelivery")}</li>
                        </ul>
                        <h3 className="text-xl font-semibold mb-4">{t("content.features.lcl.title")}</h3>
                        <p className="text-gray-700 mb-4">{t("content.features.lcl.desc1")}</p>
                        <p className="text-gray-700 mb-4">{t("content.features.lcl.advantages")}</p>
                        <ul className="list-disc pl-5 space-y-2 mb-4">
                            <li className="text-gray-700">{t("content.features.lcl.advantagesItems.cost")}</li>
                            <li className="text-gray-700">{t("content.features.lcl.advantagesItems.flexibility")}</li>
                            <li className="text-gray-700">{t("content.features.lcl.advantagesItems.optimization")}</li>
                        </ul>
                        <p className="text-gray-700 mb-4">{t("content.features.lcl.consolidationProcess")}</p>
                        <ul className="list-disc pl-5 space-y-2 mb-4">
                            <li className="text-gray-700">{t("content.features.lcl.consolidationProcessItems.gathering")}</li>
                            <li className="text-gray-700">{t("content.features.lcl.consolidationProcessItems.consolidation")}</li>
                            <li className="text-gray-700">{t("content.features.lcl.consolidationProcessItems.transport")}</li>
                        </ul>
                        <p className="text-gray-700 mb-4">{t("content.features.lcl.safetyMeasures")}</p>
                        <ul className="list-disc pl-5 space-y-2 mb-4">
                            <li className="text-gray-700">{t("content.features.lcl.safetyMeasuresItems.qualityCheck")}</li>
                            <li className="text-gray-700">{t("content.features.lcl.safetyMeasuresItems.packing")}</li>
                            <li className="text-gray-700">{t("content.features.lcl.safetyMeasuresItems.sealing")}</li>
                        </ul>
                    </div>

                    {/* Lợi ích khi sử dụng dịch vụ Vinalogs */}
                    <div className="mb-8">
                        <h2 className="text-2xl font-bold mb-6">{t("content.benefits.title")}</h2>
                        <h3 className="text-xl font-semibold mb-4">{t("content.benefits.cost.title")}</h3>
                        <ul className="list-disc pl-5 space-y-2 mb-4">
                            <li className="text-gray-700">{t("content.benefits.cost.items.optimization")}</li>
                            <li className="text-gray-700">{t("content.benefits.cost.items.logistics")}</li>
                        </ul>
                        <h3 className="text-xl font-semibold mb-4">{t("content.benefits.safety.title")}</h3>
                        <ul className="list-disc pl-5 space-y-2 mb-4">
                            <li className="text-gray-700">{t("content.benefits.safety.items.monitoring")}</li>
                            <li className="text-gray-700">{t("content.benefits.safety.items.packaging")}</li>
                        </ul>
                        <h3 className="text-xl font-semibold mb-4">{t("content.benefits.flexibility.title")}</h3>
                        <ul className="list-disc pl-5 space-y-2 mb-4">
                            <li className="text-gray-700">{t("content.benefits.flexibility.items.variety")}</li>
                            <li className="text-gray-700">{t("content.benefits.flexibility.items.doorToDoor")}</li>
                        </ul>
                        <h3 className="text-xl font-semibold mb-4">{t("content.benefits.customerService.title")}</h3>
                        <ul className="list-disc pl-5 space-y-2 mb-4">
                            <li className="text-gray-700">{t("content.benefits.customerService.items.dedicatedTeam")}</li>
                            <li className="text-gray-700">{t("content.benefits.customerService.items.support")}</li>
                        </ul>
                    </div>

                    {/* Quy trình sử dụng dịch vụ */}
                    <div className="mb-8">
                        <h2 className="text-2xl font-bold mb-6">{t("content.process.title")}</h2>
                        <h3 className="text-xl font-semibold mb-4">{t("content.process.steps.request.title")}</h3>
                        <ul className="list-disc pl-5 space-y-2 mb-4">
                            <li className="text-gray-700">{t("content.process.steps.request.items.contact")}</li>
                            <li className="text-gray-700">{t("content.process.steps.request.items.consultation")}</li>
                        </ul>
                        <h3 className="text-xl font-semibold mb-4">{t("content.process.steps.quotation.title")}</h3>
                        <ul className="list-disc pl-5 space-y-2 mb-4">
                            <li className="text-gray-700">{t("content.process.steps.quotation.items.detailedQuote")}</li>
                            <li className="text-gray-700">{t("content.process.steps.quotation.items.contract")}</li>
                        </ul>
                        <h3 className="text-xl font-semibold mb-4">{t("content.process.steps.preparation.title")}</h3>
                        <ul className="list-disc pl-5 space-y-2 mb-4">
                            <li className="text-gray-700">{t("content.process.steps.preparation.items.guidance")}</li>
                            <li className="text-gray-700">{t("content.process.steps.preparation.items.packing")}</li>
                        </ul>
                        <h3 className="text-xl font-semibold mb-4">{t("content.process.steps.transportation.title")}</h3>
                        <ul className="list-disc pl-5 space-y-2 mb-4">
                            <li className="text-gray-700">{t("content.process.steps.transportation.items.routePlanning")}</li>
                            <li className="text-gray-700">{t("content.process.steps.transportation.items.monitoring")}</li>
                        </ul>
                        <h3 className="text-xl font-semibold mb-4">{t("content.process.steps.delivery.title")}</h3>
                        <ul className="list-disc pl-5 space-y-2 mb-4">
                            <li className="text-gray-700">{t("content.process.steps.delivery.items.confirmation")}</li>
                            <li className="text-gray-700">{t("content.process.steps.delivery.items.postDelivery")}</li>
                        </ul>
                    </div>



                    {/* FAQ */}
                    <div className="mb-8">
                        <h3 className="text-xl font-semibold mb-4">{t("content.faq.title")}</h3>
                        <div className="space-y-4">
                            <details className="border-b pb-4">
                                <summary className="font-semibold cursor-pointer">{t("content.faq.items.transportTime.question")}</summary>
                                <p className="text-gray-700 mt-2">{t("content.faq.items.transportTime.answer")}</p>
                            </details>
                            <details className="border-b pb-4">
                                <summary className="font-semibold cursor-pointer">{t("content.faq.items.quotation.question")}</summary>
                                <p className="text-gray-700 mt-2">{t("content.faq.items.quotation.answer")}</p>
                            </details>
                            <details className="border-b pb-4">
                                <summary className="font-semibold cursor-pointer">{t("content.faq.items.incident.question")}</summary>
                                <p className="text-gray-700 mt-2">{t("content.faq.items.incident.answer")}</p>
                            </details>
                        </div>
                    </div>

                    {/* Hỏi thêm */}
                    <div className="mb-8">
                        <h3 className="text-xl font-semibold mb-4">{t("content.ask.title")}</h3>
                        <Link href={`/${locale}/contact/#contact-area`}>
                            <Button className="bg-orange-500 hover:bg-orange-600 text-white">
                                {t("content.ask.cta")} <span className="ml-2">→</span>
                            </Button>
                        </Link>
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



            <Footer />
        </div>
    )
}