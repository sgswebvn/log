"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { useTranslations } from "next-intl";

export default function TradingCompanyPage() {
    const t = useTranslations("trading");

    return (
        <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white text-gray-800">
            {/* Header */}
            <Header />

            {/* Banner */}
            <section className="relative h-[60vh] flex items-center justify-center bg-gradient-to-r from-blue-900 to-gray-800 text-white overflow-hidden pt-20">
                <div className="absolute inset-0 bg-[url('/trading-bg.jpg')] bg-cover bg-center opacity-20"></div>
                <div className="relative z-10 text-center space-y-6 px-4">
                    <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight">
                        {t("banner.title")}
                    </h1>
                    <p className="text-xl md:text-2xl max-w-2xl mx-auto">
                        {t("banner.subtitle")}
                    </p>
                    <Button variant="secondary" size="lg" className="hover:scale-105 transition-transform">
                        {t("banner.cta")}
                    </Button>
                </div>
            </section>

            {/* About */}
            <section className="max-w-7xl mx-auto py-20 px-4 md:px-8 grid md:grid-cols-2 gap-12 items-center">
                <div className="space-y-6">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                        {t("about.title")}
                    </h2>
                    <p className="text-gray-700 leading-relaxed">
                        {t("about.description1")}
                    </p>
                    <p className="text-gray-700 leading-relaxed">
                        {t("about.description2")}
                    </p>
                    <Button variant="default" className="hover:bg-blue-700 transition-colors">
                        {t("about.cta")}
                    </Button>
                </div>
                <div className="relative w-full h-64 md:h-80 rounded-xl overflow-hidden shadow-2xl">
                    <Image
                        src="/trading.jpg"
                        alt={t("about.imageAlt")}
                        fill
                        className="object-cover transition-transform hover:scale-105 duration-300"
                    />
                </div>
            </section>

            {/* Core Values */}
            <section className="bg-blue-50 py-20 px-4 md:px-8">
                <div className="max-w-7xl mx-auto text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-10">
                        {t("coreValues.title")}
                    </h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            {
                                title: t("coreValues.values.0.title"),
                                desc: t("coreValues.values.0.description"),
                            },
                            {
                                title: t("coreValues.values.1.title"),
                                desc: t("coreValues.values.1.description"),
                            },
                            {
                                title: t("coreValues.values.2.title"),
                                desc: t("coreValues.values.2.description"),
                            },
                        ].map((val, i) => (
                            <div key={i} className="p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all">
                                <h3 className="text-xl font-semibold text-blue-600 mb-3">{val.title}</h3>
                                <p className="text-gray-700">{val.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* History */}
            <section className="bg-gray-100 py-20 px-4 md:px-8">
                <div className="max-w-7xl mx-auto text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
                        {t("history.title")}
                    </h2>
                    <p className="text-gray-700 max-w-3xl mx-auto mb-10 leading-relaxed">
                        {t("history.description")}
                    </p>
                    <div className="grid md:grid-cols-3 gap-6">
                        <div className="p-6 bg-white rounded-lg shadow-lg">
                            <h3 className="text-xl font-semibold text-blue-600 mb-2">2010</h3>
                            <p className="text-gray-600">{t("history.milestones.0")}</p>
                        </div>
                        <div className="p-6 bg-white rounded-lg shadow-lg">
                            <h3 className="text-xl font-semibold text-blue-600 mb-2">2015</h3>
                            <p className="text-gray-600">{t("history.milestones.1")}</p>
                        </div>
                        <div className="p-6 bg-white rounded-lg shadow-lg">
                            <h3 className="text-xl font-semibold text-blue-600 mb-2">2023</h3>
                            <p className="text-gray-600">{t("history.milestones.2")}</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Partners */}
            {/* <section className="max-w-7xl mx-auto py-20 px-4 md:px-8 text-center">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12">
                    {t("partners.title")}
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center">
                    {["partner1.png", "partner2.png", "partner3.png", "partner4.png"].map((logo, i) => (
                        <div key={i} className="relative h-20 w-full grayscale hover:grayscale-0 transition">
                            <Image src={`/${logo}`} alt={`${t("partners.alt")} ${i + 1}`} fill className="object-contain" />
                        </div>
                    ))}
                </div>
            </section> */}

            {/* Services */}
            <section className="max-w-7xl mx-auto py-20 px-4 md:px-8">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-12">
                    {t("services.title")}
                </h2>
                <div className="grid md:grid-cols-3 gap-8">
                    {[
                        {
                            title: t("services.items.0.title"),
                            desc: t("services.items.0.description"),
                        },
                        {
                            title: t("services.items.1.title"),
                            desc: t("services.items.1.description"),
                        },
                        {
                            title: t("services.items.2.title"),
                            desc: t("services.items.2.description"),
                        },
                        {
                            title: t("services.items.3.title"),
                            desc: t("services.items.3.description"),
                        },
                    ].map((service, i) => (
                        <div
                            key={i}
                            className="p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all hover:-translate-y-2"
                        >
                            <h3 className="text-xl font-semibold text-blue-600 mb-3">{service.title}</h3>
                            <p className="text-gray-600">{service.desc}</p>
                        </div>
                    ))}
                </div>
            </section>


            {/* Contact CTA */}
            <section className="bg-gradient-to-r from-blue-900 to-blue-600 text-white py-20 px-4 md:px-8 text-center">
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                    {t("contactCta.title")}
                </h2>
                <p className="max-w-2xl mx-auto mb-8">
                    {t("contactCta.description")}
                </p>
                <Button size="lg" variant="secondary" className="hover:scale-105 transition-transform">
                    {t("contactCta.cta")}
                </Button>
            </section>

            {/* Footer */}
            <Footer />
        </main>
    );
}