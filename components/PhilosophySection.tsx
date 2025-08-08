import { useTranslations } from 'next-intl'

export default function PhilosophySection() {
  const t = useTranslations('philosophy')

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="border-l-4 border-orange-400 pl-6 mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
            {t('title')}
          </h2>
          <p className="text-gray-600 leading-relaxed text-base md:text-lg">
            {t('content')}
          </p>
        </div>
        
        {/* Company Contact and Logos Section */}
        <div className="text-center space-y-8">
          <div>
            <h3 className="text-xl font-bold text-blue-600 mb-2">联系我们</h3>
            <p className="text-gray-600">{t('contact')}</p>
          </div>
          
          <div className="flex justify-center items-center space-x-12">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-lg mx-auto mb-3 flex items-center justify-center">
                <span className="text-white font-bold text-sm">NEP</span>
              </div>
              <div className="text-sm text-gray-600">NEP Eurasia</div>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-600 rounded-lg mx-auto mb-3 flex items-center justify-center">
                <span className="text-white font-bold text-sm">NEP</span>
              </div>
              <div className="text-sm text-gray-600">NEP Logistics</div>
            </div>
          </div>
          
          <div className="text-center">
            <h3 className="text-2xl font-bold text-gray-800 tracking-wider">
              GRAND
            </h3>
          </div>
        </div>
      </div>
    </section>
  )
}
