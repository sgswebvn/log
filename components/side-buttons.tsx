"use client"

import { Mail, Phone, MessageSquare, ChevronUp } from 'lucide-react'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export default function SideButtons() {
  const btnBase = "w-11 h-11 rounded-full bg-white/95 shadow-lg border border-gray-200 flex items-center justify-center hover:bg-blue-50 hover:border-blue-400 transition-all hover:shadow-blue-200"
  return (
    <TooltipProvider>
      <div className="fixed right-4 bottom-6 z-40 flex flex-col gap-3">
        <Tooltip>
          <TooltipTrigger asChild>
            <a href="mailto:duke@sagoke-group.com" aria-label="Email Sagoke">
              <div className={btnBase}><Mail className="h-5 w-5 text-blue-600" /></div>
            </a>
          </TooltipTrigger>
          <TooltipContent>Gmail: duke@sagoke-group.com</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <a href="tel:+84123456789" aria-label="Phone">
              <div className={btnBase}><Phone className="h-5 w-5 text-blue-600" /></div>
            </a>
          </TooltipTrigger>
          <TooltipContent>Gọi điện</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <a href="sms:+84123456789" aria-label="SMS">
              <div className={btnBase}><MessageSquare className="h-5 w-5 text-blue-600" /></div>
            </a>
          </TooltipTrigger>
          <TooltipContent>SMS</TooltipContent>
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
          <TooltipContent>Lên đầu trang</TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  )
}
