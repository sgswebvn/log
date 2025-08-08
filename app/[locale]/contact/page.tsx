"use client"

import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Breadcrumbs from '@/components/breadcrumbs'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import { useTranslations } from 'next-intl'

export default function ContactPage() {
  const t = useTranslations('contactPage')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<{ok?: boolean; msg?: string}>({})

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true); setResult({})
    const fd = new FormData(e.currentTarget)
    const payload = Object.fromEntries(fd.entries())
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })
      const json = await res.json().catch(() => ({}))
      if (!res.ok || !json.success) throw new Error(json?.error || 'Failed')
      setResult({ ok: true, msg: t('success') })
      e.currentTarget.reset()
    } catch {
      try {
        const res2 = await fetch('/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: new URLSearchParams(payload as any).toString()
        })
        const json2 = await res2.json()
        if (!res2.ok || !json2.success) throw new Error(json2?.error || 'Failed')
        setResult({ ok: true, msg: t('success') })
        e.currentTarget.reset()
      } catch {
        setResult({ ok: false, msg: t('error') })
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <Header />
      <Breadcrumbs />
      <main className="container mx-auto px-4 py-8 grid gap-8 md:grid-cols-2">
        <section>
          <h1 className="text-2xl font-semibold text-gray-900">Sagoke — {t('title')}</h1>
          <p className="text-gray-600 mt-2">{t('desc')}</p>
          <form onSubmit={handleSubmit} className="mt-6 space-y-4 bg-white rounded-xl border p-6">
            <div>
              <label className="text-sm font-medium text-gray-700">{t('fields.name')}</label>
              <Input name="name" required placeholder={t('placeholders.name')} />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-700">{t('fields.email')}</label>
                <Input type="email" name="email" required placeholder="you@example.com" />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">{t('fields.phone')}</label>
                <Input type="tel" name="phone" placeholder="+84 123 456 789" />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">{t('fields.message')}</label>
              <Textarea name="message" required rows={6} placeholder={t('placeholders.message')} />
            </div>
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700" disabled={loading}>
              {loading ? t('submitting') : t('submit')}
            </Button>
            {result.msg && (
              <p className={`text-sm ${result.ok ? 'text-green-600' : 'text-red-600'}`}>{result.msg}</p>
            )}
          </form>
        </section>

        <aside className="bg-white rounded-xl border p-6">
          <h2 className="text-lg font-semibold text-gray-900">{t('info.title')}</h2>
          <p className="text-gray-600 mt-2">{t('info.desc')}</p>
          <ul className="mt-4 text-sm text-gray-700 space-y-1">
            <li>Website: <a className="text-blue-700 hover:underline" href="https://sagoke-group.com" target="_blank" rel="noreferrer">sagoke-group.com</a></li>
            <li>Email: <a className="text-blue-700 hover:underline" href="mailto:sagoke-group@gmail.com">sagoke-group@gmail.com</a></li>
            <li>Tel: +84 123 456 789</li>
            <li>Address: Hanoi, Vietnam</li>
          </ul>
        </aside>
      </main>
      <Footer />
    </div>
  )
}
