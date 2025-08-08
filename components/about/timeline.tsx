import { useTranslations } from "next-intl"

type Item = {
  year: string
  points: string[]
  color: 'blue' | 'yellow' | 'pink' | 'indigo'
}

const dotColorMap: Record<Item['color'], string> = {
  blue: 'bg-blue-600',
  yellow: 'bg-yellow-400',
  pink: 'bg-pink-500',
  indigo: 'bg-indigo-600',
}

export default function Timeline() {
  const t = useTranslations('about.timeline')
  const items: Item[] = [
    { year: '2002 - 2005', color: 'blue', points: t.raw('y2002_2005') as string[] },
    { year: '2006 - 2010', color: 'yellow', points: t.raw('y2006_2010') as string[] },
    { year: '2011 - 2015', color: 'pink', points: t.raw('y2011_2015') as string[] },
    { year: '2016 - 2020', color: 'indigo', points: t.raw('y2016_2020') as string[] },
  ]

  return (
    <div>
      <h2 className="text-2xl font-semibold text-gray-900 mb-6">{t('title')}</h2>
      <div className="relative">
        <div className="absolute left-4 sm:left-1/2 top-0 bottom-0 w-px bg-gray-200" aria-hidden />
        <ul className="space-y-12">
          {items.map((item, idx) => (
            <li key={idx} className="relative">
              <div
                className={`absolute left-[14px] sm:left-[calc(50%-6px)] top-1 w-3 h-3 rounded-full ${dotColorMap[item.color]}`}
                aria-hidden
              />
              <div className={`grid grid-cols-1 sm:grid-cols-2 gap-6 ${idx % 2 === 0 ? '' : 'sm:direction-rtl'}`}>
                <div className="sm:text-right">
                  <div className="inline-block rounded-md border bg-white px-4 py-3 shadow-sm">
                    <div className="text-sm text-gray-500">{t('period')}</div>
                    <div className="font-semibold text-gray-900">{item.year}</div>
                  </div>
                </div>
                <div className="sm:direction-ltr">
                  <div className="rounded-md border bg-white p-4 shadow-sm">
                    <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700">
                      {item.points.map((p, i) => (<li key={i}>{p}</li>))}
                    </ul>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
