import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { client, urlFor } from '../lib/sanity'
import { PortableText, type PortableTextComponents } from '@portabletext/react'
import { ArrowLeft } from 'lucide-react'
import Spinner from '../components/Spinner'
import type { RichText, SanityImage } from '../lib/types'

interface NewsDoc {
  title: string
  publishedAt?: string
  image?: SanityImage
  excerpt?: string
  body?: RichText
}

const portableTextComponents: PortableTextComponents = {
  block: {
    h2: ({ children }) => <h2 className="text-2xl md:text-3xl font-display font-bold text-slate-900 mt-10 mb-4 border-b border-slate-200 pb-2">{children}</h2>,
    h3: ({ children }) => <h3 className="text-xl md:text-2xl font-display font-semibold text-slate-800 mt-8 mb-3">{children}</h3>,
    normal: ({ children }) => <p className="text-lg text-slate-700 mb-6 leading-relaxed">{children}</p>,
  },
  list: {
    bullet: ({ children }) => <ul className="list-disc pl-8 mb-6 space-y-2 text-slate-700">{children}</ul>,
    number: ({ children }) => <ol className="list-decimal pl-8 mb-6 space-y-2 text-slate-700">{children}</ol>,
  },
  marks: {
    link: ({ value, children }) => (
      <a href={(value as { href?: string })?.href} target="_blank" rel="noopener noreferrer" className="text-accent-dark hover:text-primary underline font-medium transition-colors">
        {children}
      </a>
    ),
    strong: ({ children }) => <strong className="font-bold text-slate-900">{children}</strong>,
  },
  types: {
    image: ({ value }) => {
      const img = value as { alt?: string; caption?: string }
      return (
        <figure className="my-10 rounded-2xl overflow-hidden shadow-soft w-full bg-slate-50">
          <img
            src={urlFor(value as SanityImage).width(1200).url()}
            alt={img.alt || img.caption || 'Nyhetsbild'}
            className="w-full h-auto max-h-[600px] object-contain mx-auto"
          />
        </figure>
      )
    },
  },
}

export default function NewsItem() {
  const { slug } = useParams<{ slug: string }>()
  const [news, setNews] = useState<NewsDoc | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!slug) return
    client
      .fetch(
        `*[_type == "news" && slug.current == $slug][0]{ title, publishedAt, image, excerpt, body }`,
        { slug }
      )
      .then((data) => (data ? setNews(data) : setError('Nyheten hittades inte.')))
      .catch((err) => {
        console.error('Fetch error:', err)
        setError('Kunde inte ladda nyheten.')
      })
  }, [slug])

  if (error) {
    return (
      <div className="bg-surface min-h-[60vh] flex flex-col justify-center items-center text-center px-6">
        <p className="text-2xl text-red-600 font-bold mb-6">{error}</p>
        <Link to="/nyheter" className="btn-primary">Tillbaka till nyheter</Link>
      </div>
    )
  }

  if (!news) return <Spinner label="Laddar nyhet…" />

  return (
    <article className="py-14 md:py-20 bg-white">
      <div className="container-page max-w-3xl">
        <Link to="/nyheter" className="inline-flex items-center gap-1 text-sm font-semibold text-slate-600 hover:text-accent-dark transition-colors mb-6">
          <ArrowLeft className="w-4 h-4" /> Alla nyheter
        </Link>

        <header className="pb-8 border-b border-slate-200 mb-8">
          <h1 className="text-3xl md:text-5xl font-display font-extrabold text-primary mb-4 leading-tight">
            {news.title}
          </h1>
          {news.publishedAt && (
            <time className="text-sm text-slate-500 font-medium uppercase tracking-wider">
              Publicerad:{' '}
              {new Date(news.publishedAt).toLocaleDateString('sv-SE', { year: 'numeric', month: 'long', day: 'numeric' })}
            </time>
          )}
        </header>

        {news.image && (
          <figure className="mb-10 rounded-2xl overflow-hidden shadow-soft bg-slate-100">
            <img src={urlFor(news.image).width(1200).url()} alt={news.title} className="w-full h-auto max-h-[600px] object-contain mx-auto" />
          </figure>
        )}

        {news.excerpt && (
          <p className="text-xl text-slate-800 italic mb-12 border-l-4 border-accent pl-4">{news.excerpt}</p>
        )}

        <div>
          <PortableText value={news.body || []} components={portableTextComponents} />
        </div>

        <footer className="pt-12 mt-12 border-t border-slate-100 text-center">
          <Link to="/nyheter" className="btn-primary">
            <ArrowLeft className="w-5 h-5" /> Tillbaka till arkivet
          </Link>
        </footer>
      </div>
    </article>
  )
}
