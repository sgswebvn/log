"use client"

import { useState } from 'react'
import { Search } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useTranslations } from 'next-intl'
import Image from 'next/image'

export default function HeroSection() {
  const t = useTranslations('hero')
  const [searchData, setSearchData] = useState({
    departure: '',
    destination: ''
  })

  const handleSearch = async () => {
    console.log('Tìm kiếm:', searchData)
  }

  return (
    <section className="relative h-[500px] bg-gradient-to-r from-blue-900/80 to-blue-700/80">
      <Image
        src="/placeholder.svg?height=500&width=800&text=Logistics+Background"
        alt="Logistics background"
        fill
        className="object-cover -z-10"
        priority
      />
      <div className="absolute inset-0 bg-blue-900/60" />
      
      <div className="relative container mx-auto px-4 h-full flex flex-col justify-center text-white">
        <div className="max-w-lg">
          <h1 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
            {t('title')}
          </h1>
          
          <div className="text-5xl font-bold text-orange-400 mb-8">
            {t('subtitle')}
          </div>
          
          {/* Search Form */}
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-md">
            <div className="space-y-4">
              <Input 
                placeholder={t('searchPlaceholder.departure')}
                className="border-gray-300"
                value={searchData.departure}
                onChange={(e) => setSearchData({...searchData, departure: e.target.value})}
              />
              <Input 
                placeholder={t('searchPlaceholder.destination')}
                className="border-gray-300"
                value={searchData.destination}
                onChange={(e) => setSearchData({...searchData, destination: e.target.value})}
              />
              <Button 
                className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-3"
                onClick={handleSearch}
              >
                <Search className="h-4 w-4 mr-2" />
                {t('searchButton')}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
