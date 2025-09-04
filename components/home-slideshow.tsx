"use client"

import Image from "next/image"
import { useEffect, useState } from "react"
import { useLocale } from "next-intl"
import { supabase } from "@/lib/supabase"

interface Slide {
  id: string
  src: string
  title: string
  alt: string
  description: string
}

export default function HomeSlideshow() {
  const locale = useLocale();
  const [slides, setSlides] = useState<Slide[]>([])
  const [index, setIndex] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchSlides = async () => {
      try {
        const { data, error } = await supabase
          .from("banners")
          .select("id, title_vi, title_en, description_vi, description_en, image_url, order_number, active")
          .eq("active", true)
          .order("order_number", { ascending: true })

        if (error) throw error

        const formattedSlides: Slide[] = data.map((banner) => ({
          id: banner.id,
          src: banner.image_url,
          title: locale === "vi" ? banner.title_vi : banner.title_en,
          alt: banner.title_en || banner.title_vi,
          description: (locale === "vi" ? banner.description_vi : banner.description_en) || "",
        }))

        setSlides(formattedSlides)
      } catch (error) {
        console.error("Error fetching slides:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchSlides()
  }, [locale]) // Re-fetch if locale changes

  useEffect(() => {
    if (slides.length > 0) {
      const id = setInterval(() => setIndex((i) => (i + 1) % slides.length), 5000)
      return () => clearInterval(id)
    }
  }, [slides])

  if (loading) {
    return (
      <section className="relative w-full h-[420px] sm:h-[520px] overflow-hidden">
        <div className="absolute inset-0 bg-gray-200 animate-pulse" />
      </section>
    )
  }

  if (slides.length === 0) {
    return (
      <section className="relative w-full h-[420px] sm:h-[520px] overflow-hidden">
        <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
          <p className="text-gray-500">Chưa có banner nào được thêm.</p>
        </div>
      </section>
    )
  }

  const s = slides[index]

  return (
    <section className="relative w-full h-[420px] sm:h-[520px] overflow-hidden">
      <Image
        src={s.src || "/placeholder.svg"}
        alt={s.alt}
        fill
        priority
        className="object-cover scale-105 animate-[slowZoom_12s_ease-in-out_infinite_alternate]"
      />
      {/* soft gradient glass overlay */}
      <div className="absolute inset-0 bg-gradient-to-tr from-black/50 via-black/25 to-transparent" />
      {/* floating glow orbs */}
      <div className="pointer-events-none">
        <div className="absolute -left-10 top-10 w-52 h-52 bg-blue-500/20 blur-3xl rounded-full animate-[float_8s_ease-in-out_infinite]" />
        <div className="absolute right-10 bottom-6 w-56 h-56 bg-cyan-400/20 blur-3xl rounded-full animate-[float_10s_ease-in-out_infinite_reverse]" />
      </div>
      <div className="relative container mx-auto px-4 h-full flex items-center">
        <div className="text-white font-extrabold leading-tight text-3xl sm:text-5xl tracking-wide">
          <div
            className="animate-[slideIn_600ms_ease-out] will-change-transform"
          >
            {s.title}
          </div>
          {s.description && (
            <div className="mt-4 text-base sm:text-lg font-normal text-white/90 animate-[fadeIn_1s_ease-out_600ms_both]">
              {s.description}
            </div>
          )}
        </div>
      </div>
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            aria-label={`Slide ${i + 1}`}
            className={`w-2.5 h-2.5 rounded-full ${i === index ? 'bg-white' : 'bg-white/60 hover:bg-white'}`}
          />
        ))}
      </div>

      <style jsx global>{`
        @keyframes slideIn { from { transform: translateX(-24px); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
        @keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }
        @keyframes slowZoom { from { transform: scale(1.05) } to { transform: scale(1.12) } }
        @keyframes float { 0%{ transform: translateY(0)} 50%{ transform: translateY(-10px)} 100%{ transform: translateY(0)} }
      `}</style>
    </section>
  )
}