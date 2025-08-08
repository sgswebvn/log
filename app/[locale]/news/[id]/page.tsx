import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Breadcrumbs from '@/components/breadcrumbs'
import Image from 'next/image'

export default function NewsDetailPage({ params }: { params: { id: string } }) {
  const id = params.id
  return (
    <div className="bg-white min-h-screen">
      <Header />
      <Breadcrumbs currentTitle={`News #${id}`} />
      <main className="container mx-auto px-4 py-8">
        <article className="prose max-w-none">
          <h1>News #{id}</h1>
          <div className="relative w-full h-80 rounded-lg overflow-hidden my-4">
            <Image src="/cross-border-train-event.png" alt="News hero" fill className="object-cover" />
          </div>
          <p>This is a placeholder news content. Replace with real content loaded from your CMS or MongoDB.</p>
        </article>
      </main>
      <Footer />
    </div>
  )
}
