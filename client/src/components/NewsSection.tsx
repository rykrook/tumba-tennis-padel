import { Link } from 'react-router-dom'
import { urlFor } from '../lib/sanity'
import { ArrowRight } from 'lucide-react'

interface NewsItem {
  _id: string
  title: string
  slug?: { current: string }
  publishedAt?: string
  excerpt?: string
  image?: any
}

interface NewsSectionProps {
  news: NewsItem[]
  title?: string
}

export default function NewsSection({ news, title = "Senaste nytt" }: NewsSectionProps) {
  if (!news || news.length === 0) {
    return null
  }

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        <div className="flex flex-col md:flex-row justify-start md:justify-between items-start md:items-end mb-12 border-b border-accent pb-4">
          <h2 className="text-4xl md:text-5xl font-black text-primary w-full md:w-auto">
            {title}
          </h2>

          <Link
            to="/nyheter"
            className="hidden md:flex items-center gap-2 text-base font-semibold text-gray-700 hover:text-accent transition-colors group mt-4 md:mt-0"
          >
            Visa alla nyheter
            <ArrowRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
          {news.map((item) => {
            const slug = item.slug;

            return (
              <Link
                key={item._id}
                to={`/nyheter/${slug || item._id}`}
                className="group flex flex-col h-full bg-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.01] overflow-hidden"
              >
                <div className="relative overflow-hidden aspect-[4/3] bg-gray-100">
                  {item.image ? (
                    <img
                      src={urlFor(item.image).width(800).height(500).url()}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                    />
                  ) : (
                    <div className="w-full h-full bg-primary/20 flex items-center justify-center">
                      <span className="text-primary font-medium">Bild saknas</span>
                    </div>
                  )}

                  {item.publishedAt && (
                    <div className="absolute top-0 left-0 bg-white/95 backdrop-blur-sm px-3 py-1.5 border-b-2 border-r-2 border-gray-200">
                      <time className="text-xs font-semibold tracking-wider text-primary uppercase">
                        {new Date(item.publishedAt).toLocaleDateString('sv-SE', {
                          month: 'short',
                          day: 'numeric'
                        })}
                      </time>
                    </div>
                  )}
                </div>

                <div className="flex flex-col flex-grow p-6">
                  <h3 className="text-xl font-bold text-gray-900 leading-snug group-hover:text-accent transition-colors mb-3">
                    {item.title}
                  </h3>

                  <div className="text-gray-700 text-base leading-normal line-clamp-3 mb-4 flex-grow">
                    {item.excerpt || 'Ingen sammanfattning tillgänglig'}
                  </div>

                  <div className="flex items-center text-sm font-semibold text-accent hover:text-primary transition-colors mt-auto pt-4 border-t border-gray-100">
                    <span className="pb-0.5 border-b border-accent/50 group-hover:border-accent transition-all">
                      Läs mer
                    </span>
                    <ArrowRight className="w-4 h-4 ml-1 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                  </div>
                </div>
              </Link>
            )
          })}
        </div>

        <div className="mt-12 md:hidden">
          <Link
            to="/nyheter"
            className="w-full py-3 block text-center border border-accent text-accent hover:bg-accent/10 transition-colors font-semibold"
          >
            Visa alla nyheter
          </Link>
        </div>
      </div>
    </section>
  )
}