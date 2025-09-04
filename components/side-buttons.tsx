"use client"

import { Mail, MessageSquare, ChevronUp, PhoneCall } from 'lucide-react'
import { Tooltip, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { SiZalo } from 'react-icons/si'

export default function SideButtons() {
  const btnBase = "w-11 h-11 rounded-full bg-white/95 shadow-lg border border-gray-200 flex items-center justify-center hover:bg-blue-50 hover:border-blue-400 transition-all hover:shadow-blue-200"
  return (
    <TooltipProvider>
      <div className="fixed right-4 bottom-6 z-40 flex flex-col gap-3">
        <Tooltip>
          <TooltipTrigger asChild>
            <a href="mailto:ops@sagoke-group.com" aria-label="Email Sagoke">
              <div className={btnBase}><Mail className="h-5 w-5 text-blue-600" /></div>
            </a>
          </TooltipTrigger>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <a href="tel:+84385655582" aria-label="Phone" >
              <div className={btnBase}><PhoneCall className="h-5 w-5 text-blue-600 " /></div>
            </a>
          </TooltipTrigger>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <a
              href="https://zalo.me/84385655582"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Zalo"
            >
              <div className={btnBase}>
                <SiZalo className="h-5 w-5 text-blue-600" />
              </div>
            </a>
          </TooltipTrigger>

        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              aria-label="Scroll to top"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            >
              <div className={btnBase}><ChevronUp className="h-5 w-5 text-blue-600" /></div>
            </button>
          </TooltipTrigger>
        </Tooltip>
      </div>
    </TooltipProvider>
  )
}
