import { useEffect, useState } from 'react'
import { client, urlFor } from '../lib/sanity'
import { Link, useSearchParams } from 'react-router-dom'
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react'
import PageHeader from '../components/PageHeader'
import Spinner from '../components/Spinner'
import type { SanityImage } from '../lib/types'

interface NewsItem {
  _id: string
  title: string
  slug?: string
  publishedAt?: string
  excerpt?: string
  image?: SanityImage
}

const ITEMS_PER_PAGE = 8

export default function NewsArchive() {
  const [news, setNews] = useState<NewsItem[]>([])
  const [totalCount, setTotalCount] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const [searchParams, setSearchParams] = useSearchParams()
  const currentPage = parseInt(searchParams.get('page') || '1')

  useEffect(() => {
    setLoading(true)
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
    const endIndex = startIndex + ITEMS_PER_PAGE

    const query = `{
      "articles": *[_type == "news"] | order(publishedAt desc)[${startIndex}...${endIndex}]{
        _id, title, publishedAt, excerpt, image, "slug": slug.current
      },
      "total": count(*[_type == "news"])
    }`

    client
      .fetch(query)
      .then((data) => {
        setNews(data.articles || [])
        setTotalCount(data.total || 0)
        setLoading(false)
      })
      .catch((err) => {
        console.error('Fetch error:', err)
        setError('Kunde inte ladda nyhetsarkivet.')
        setLoading(false)
      })
  }, [currentPage])

  const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE)

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setSearchParams({ page: page.toString() })
      window.scrollTo(0, 0)
    }
  }

  const renderPagination = () => {
    if (totalPages <= 1) return null
    const pages = []
    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`w-10 h-10 rounded-full font-semibold transition-colors ${
            i === currentPage
              ? 'bg-primary text-white shadow-md'
              : 'bg-white text-primary border border-slate-200 hover:bg-primary/5'
          }`}
        >
          {i}
        </button>
      )
    }
    return (
      <div className="flex justify-center items-center mt-16 gap-2">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="p-2 rounded-full transition-colors disabled:text-slate-300 text-primary hover:bg-primary/5"
          aria-label="Föregående sida"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        {pages}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="p-2 rounded-full transition-colors disabled:text-slate-300 text-primary hover:bg-primary/5"
          aria-label="Nästa sida"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>
    )
  }

  if (loading) return <Spinner label="Laddar nyhetsarkiv…" />

  if (error) {
    return (
      <div className="bg-surface min-h-screen flex flex-col justify-center items-center py-32">
        <p className="text-2xl text-red-600 font-bold">{error}</p>
      </div>
    )
  }

  return (
    <div className="bg-surface min-h-screen">
      <PageHeader
        title="Nyhetsarkiv"
        intro={`Alla nyheter och uppdateringar från klubben${totalCount ? ` – totalt ${totalCount} artiklar.` : '.'}`}
      />

      <div className="container-page py-12 md:py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
          {news.length > 0 ? (
            news.map((item) => (
              <Link
                key={item._id}
                to={`/nyheter/${item.slug}`}
                className="card-hover group flex flex-col h-full overflow-hidden"
              >
                <div className="relative overflow-hidden aspect-[16/9] bg-slate-50 flex items-center justify-center border-b border-slate-100">
                  {item.image ? (
                    <img
                      src={urlFor(item.image).width(600).url()}
                      alt={item.title}
                      className="max-w-full max-h-full object-contain transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-primary/5">
                      <span className="text-primary/40 font-medium text-sm">Bild saknas</span>
                    </div>
                  )}
                  {item.publishedAt && (
                    <div className="absolute top-0 left-0 bg-white/95 backdrop-blur-sm px-3 py-1.5 border-b border-r border-slate-200 z-10">
                      <time className="text-xs font-bold tracking-wider text-primary uppercase">
                        {new Date(item.publishedAt).toLocaleDateString('sv-SE', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </time>
                    </div>
                  )}
                </div>

                <div className="flex flex-col flex-grow p-5">
                  <h2 className="text-lg font-display font-bold text-slate-900 leading-snug group-hover:text-primary transition-colors mb-2 line-clamp-2">
                    {item.title}
                  </h2>
                  <p className="text-slate-600 text-sm line-clamp-3 mb-4 flex-grow leading-relaxed">
                    {item.excerpt || 'Ingen sammanfattning tillgänglig.'}
                  </p>
                  <span className="flex items-center gap-1 text-sm font-bold text-accent-dark mt-auto pt-3 border-t border-slate-100">
                    Läs mer
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            ))
          ) : (
            <p className="col-span-full text-center text-xl text-slate-600 p-10 card">
              Inga nyheter hittades just nu.
            </p>
          )}
        </div>

        {renderPagination()}
      </div>
    </div>
  )
}
