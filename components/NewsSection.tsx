import { Card, CardContent } from '@/components/ui/card'
import { useTranslations, useLocale } from 'next-intl'
import Image from 'next/image'
import Link from 'next/link'

export default function NewsSection() {
  const t = useTranslations('news')
  const locale = useLocale()

  const newsData = [
    {
      id: 1,
      title: t('articles.article1.title'),
      content: t('articles.article1.content'),
      image: "/placeholder.svg?height=200&width=400&text=News+1",
      date: "2024-01-15"
    },
    {
      id: 2,
      title: t('articles.article2.title'),
      content: t('articles.article2.content'),
      image: "/placeholder.svg?height=200&width=400&text=News+2",
      date: "2024-01-10"
    },
    {
      id: 3,
      title: t('articles.article3.title'),
      content: t('articles.article3.content'),
      image: "/placeholder.svg?height=200&width=400&text=News+3",
      date: "2024-01-05"
    },
    {
      id: 4,
      title: t('articles.article4.title'),
      content: t('articles.article4.content'),
      image: "/placeholder.svg?height=200&width=400&text=News+4",
      date: "2024-01-01"
    }
  ]

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold text-center mb-8 text-gray-800">
          {t('title')}
        </h2>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
          {newsData.map((news) => (
            <Card key={news.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <CardContent className="p-0">
                <Link href={`/${locale}/news/${news.id}`}>
                  <Image
                    src={news.image || "/placeholder.svg"}
                    alt={news.title}
                    width={400}
                    height={200}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2">
                      {news.title}
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed line-clamp-3">
                      {news.content}
                    </p>
                    <div className="mt-3 text-xs text-gray-500">
                      {new Date(news.date).toLocaleDateString(locale === 'vi' ? 'vi-VN' : 'en-US')}
                    </div>
                  </div>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
