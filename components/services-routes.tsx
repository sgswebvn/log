"use client"

import { useTranslations } from "next-intl"

function RoutePanel({ title, items, align='left' asAlign }: { title: string; items: string[]; align?: 'left'|'right' }) {
  return (
    <section className="grid md:grid-cols-2">
      {align === 'left' ? (
        <>
          <div className="h-72 bg-[url('/placeholder.svg?height=300&width=600')] bg-cover bg-center" />
          <div className="bg-gradient-to-r from-blue-700 to-blue-500 text-white p-8 flex flex-col justify-center">
            <div className="uppercase tracking-wide text-white/80 text-xs">SAGOKE EXPRESS</div>
            <h3 className="text-2xl font-semibold mt-2">{title}</h3>
            <ul className="text-sm text-white/95 mt-3 space-y-1 list-disc pl-5">
              {items.map((li, i) => (<li key={i}>{li}</li>))}
            </ul>
            <div className="mt-4 text-sm underline underline-offset-4">Online consultation →</div>
          </div>
        </>
      ) : (
        <>
          <div className="bg-gradient-to-r from-blue-700 to-blue-500 text-white p-8 order-2 md:order-1 flex flex-col justify-center">
            <div className="uppercase tracking-wide text-white/80 text-xs">SAGOKE EXPRESS</div>
            <h3 className="text-2xl font-semibold mt-2">{title}</h3>
            <ul className="text-sm text-white/95 mt-3 space-y-1 list-disc pl-5">
              {items.map((li, i) => (<li key={i}>{li}</li>))}
            </ul>
            <div className="mt-4 text-sm underline underline-offset-4">Online consultation →</div>
          </div>
          <div className="h-72 bg-[url('/placeholder.svg?height=300&width=600')] bg-cover bg-center order-1 md:order-2" />
        </>
      )}
    </section>
  )
}

export default function ServicesRoutes() {
  const t = useTranslations('servicesPage.routes')
  return (
    <div id="services">
      <RoutePanel title="Xi’an–Moscow Express" items={t.raw('xianMoscow') as string[]} align="left" />
      <RoutePanel title="Chengdu–Minsk Express" items={t.raw('chengduMinsk') as string[]} align="right" />
    </div>
  )
}
