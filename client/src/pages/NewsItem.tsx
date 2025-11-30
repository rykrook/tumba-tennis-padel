import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { client, urlFor } from '../lib/sanity'
import { PortableText } from '@portabletext/react'
import { ArrowLeft } from 'lucide-react'

const portableTextComponents = {
    block: {
        h2: (props: any) => <h2 className="text-3xl font-bold text-gray-900 mt-10 mb-4 border-b pb-2">{props.children}</h2>,
        h3: (props: any) => <h3 className="text-2xl font-semibold text-gray-800 mt-8 mb-3">{props.children}</h3>,
        normal: (props: any) => <p className="text-lg text-gray-700 mb-6 leading-relaxed">{props.children}</p>,
    },
    list: {
        bullet: (props: any) => <ul className="list-disc pl-8 mb-6 space-y-2 text-gray-700">{props.children}</ul>,
        number: (props: any) => <ol className="list-decimal pl-8 mb-6 space-y-2 text-gray-700">{props.children}</ol>,
    },
    marks: {
        link: (props: any) => (
            <a
                href={props.value.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent hover:text-primary underline font-medium transition-colors"
            >
                {props.children}
            </a>
        ),
        strong: (props: any) => <strong className="font-extrabold text-gray-900">{props.children}</strong>,
    },
    types: {
        image: (props: any) => (
            <figure className="my-10 rounded-lg overflow-hidden shadow-xl">
                <img
                    src={urlFor(props.value).width(1200).url()}
                    alt={props.value.alt || props.value.caption || 'Nyhetsbild'}
                    className="w-full h-auto object-cover"
                />
            </figure>
        ),
    },
};

export default function NewsItem() {
    const { slug } = useParams<{ slug: string }>()
    const [news, setNews] = useState<any>(null)
    const [error, setError] = useState<string | null>(null)

   useEffect(() => {
  if (!slug) return

  client
    .fetch(
      `*[_type == "news" && slug.current == $slug][0]{
        title,
        publishedAt,
        image,
        excerpt,
        body
      }`,
      { slug }
    )
    .then((data) => {
      if (!data) {
        setError("Nyheten hittades inte.")
      } else {
        setNews(data)
      }
    })
    .catch((err) => {
      console.error('Fetch error:', err)
      setError("Kunde inte ladda nyheten.")
    })
}, [slug])

    if (!news && !error) {
          return (
      <div className="bg-gray-50 pt-20 mt-[-5rem] min-h-screen flex items-center justify-center">
        <p className="text-xl text-primary">Laddar nyheter...</p>
      </div>
    )
    }

    if (error) {
    return (
      <div className="min-h-screen pt-40 text-center">
        <p className="text-2xl text-red-600 font-bold mb-6">{error}</p>
        <Link to="/" className="text-primary hover:underline">
          ← Tillbaka till startsidan
        </Link>
      </div>
    )
  }

    return (
        <article className="pt-24 md:pt-32 pb-20 bg-white">
            <div className="max-w-4xl mx-auto px-6 lg:px-8">

                <Link
                    to="/nyheter"
                    className="text-sm font-semibold text-gray-600 hover:text-accent transition-colors flex items-center gap-1 mb-6"
                >
                    <ArrowLeft className="w-4 h-4" /> Alla nyheter
                </Link>

                <header className="pb-8 border-b border-gray-200 mb-8">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-primary mb-4 leading-tight">
                        {news.title}
                    </h1>
                    <time className="text-sm text-gray-500 font-medium uppercase tracking-wider">
                        Publicerad: {news.publishedAt && new Date(news.publishedAt).toLocaleDateString('sv-SE', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                        })}
                    </time>
                </header>

                {news.image && (
                    <figure className="mb-10 rounded-lg overflow-hidden shadow-2xl border-4 border-accent/20">
                        <img
                            src={urlFor(news.image).width(1000).url()}
                            alt={news.title}
                            className="w-full h-auto object-cover"
                        />
                    </figure>
                )}

                {news.excerpt && (
                    <p className="text-xl text-gray-800 italic mb-12 border-l-4 border-accent pl-4">
                        {news.excerpt}
                    </p>
                )}

                <div className="mt-8">
                    <PortableText value={news.body} components={portableTextComponents} />
                </div>

                <footer className="pt-12 mt-12 border-t border-gray-100">
                    <Link to="/nyheter" className="bg-accent text-white py-3 px-6 rounded-lg font-semibold hover:bg-primary transition-colors shadow-lg flex items-center justify-center gap-2 max-w-xs mx-auto">
                        <ArrowLeft className="w-5 h-5" /> Gå tillbaka till arkivet
                    </Link>
                </footer>

            </div>
        </article>
    )
}