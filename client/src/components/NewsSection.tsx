import { Link } from 'react-router-dom'
import { urlFor } from '../lib/sanity'
import { ArrowRight } from 'lucide-react'
import type { SanityImage } from '../lib/types'

interface NewsItem {
  _id: string
  title: string
  slug?: string | { current: string }
  publishedAt?: string
  excerpt?: string
  image?: SanityImage
}

interface NewsSectionProps {
  news: NewsItem[]
  title?: string
}

export default function NewsSection({ news, title = 'Senaste nytt' }: NewsSectionProps) {
  if (!news || news.length === 0) return null

  return (
    <section className="section bg-white">
      <div className="container-page">
        <div className="flex flex-col md:flex-row justify-between md:items-end mb-10 border-b border-accent pb-4">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-primary">{title}</h2>
          <Link
            to="/nyheter"
            className="hidden md:inline-flex items-center gap-2 text-base font-semibold text-slate-600 hover:text-accent-dark transition-colors group"
          >
            Visa alla nyheter
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 items-start">
          {news.map((item) => {
            const slug = typeof item.slug === 'string' ? item.slug : item.slug?.current
            return (
              <Link key={item._id} to={`/nyheter/${slug}`} className="card-hover group flex flex-col h-full overflow-hidden">
                <div className="relative w-full aspect-[16/9] bg-slate-50 flex items-center justify-center overflow-hidden border-b border-slate-100">
                  {item.image ? (
                    <img
                      src={urlFor(item.image).width(800).url()}
                      alt={item.title}
                      className="max-w-full max-h-full object-contain transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full bg-primary/5 flex items-center justify-center">
                      <span className="text-primary/40 font-medium">Bild saknas</span>
                    </div>
                  )}
                  {item.publishedAt && (
                    <div className="absolute top-0 left-0 bg-white/95 backdrop-blur-sm px-3 py-1.5 border-b border-r border-slate-200 z-10">
                      <time className="text-xs font-bold tracking-wider text-primary uppercase">
                        {new Date(item.publishedAt).toLocaleDateString('sv-SE', { month: 'short', day: 'numeric' })}
                      </time>
                    </div>
                  )}
                </div>

                <div className="flex flex-col flex-grow p-6">
                  <h3 className="text-xl font-display font-bold text-slate-900 leading-snug group-hover:text-primary transition-colors mb-3 line-clamp-2">
                    {item.title}
                  </h3>
                  <p className="text-slate-600 leading-relaxed line-clamp-3 mb-6 flex-grow">
                    {item.excerpt || 'Läs mer om nyheten…'}
                  </p>
                  <span className="flex items-center gap-1 text-sm font-bold text-accent-dark mt-auto pt-4 border-t border-slate-100">
                    Läs hela artikeln
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            )
          })}
        </div>

        <div className="mt-10 md:hidden">
          <Link to="/nyheter" className="btn-primary w-full">
            Visa alla nyheter
          </Link>
        </div>
      </div>
    </section>
  )
}
