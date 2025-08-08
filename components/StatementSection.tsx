import { useTranslations } from 'next-intl'

export default function StatementSection() {
  const t = useTranslations('statement')

  return (
    <section className="bg-blue-600 py-16">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold text-white mb-6">{t('title')}</h2>
        <div className="max-w-4xl mx-auto">
          <p className="text-white/90 text-lg leading-relaxed mb-4">
            {t('content')}
          </p>
          <p className="text-white/80 text-base leading-relaxed">
            {t('description')}
          </p>
        </div>
      </div>
    </section>
  )
}
