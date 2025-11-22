import { useEffect, useState } from 'react'
import { client, urlFor } from '../lib/sanity'
import { PortableText } from '@portabletext/react'

export default function Home() {
  const [home, setHome] = useState<any>(null)
  const [news, setNews] = useState<any[]>([])
  const [hallOfFame, setHallOfFame] = useState<any[]>([])

  useEffect(() => {
    Promise.all([
      client.fetch(`*[_type == "homepage"][0]{heroImage, welcome, "videoUrl": backgroundVideo.asset->url}`),
      client.fetch(`*[_type == "news"] | order(publishedAt desc)[0...3]`),
      client.fetch(`*[_type == "hallOfFame"][0].members[]{name, year, "imageUrl": image.asset->url}`)
    ]).then(([h, n, hof]) => {
      setHome(h)
      setNews(n)
      setHallOfFame(hof)
    })
  }, [])

  return (
    <>
      {/* HERO-SEKTION MED VIDEO */}
     <section className="relative h-screen flex items-center justify-center overflow-hidden">
  {/* Bakgrund */}
  {home?.videoUrl ? (
    <video autoPlay muted loop playsInline className="absolute top-0 left-0 w-full h-full object-cover">
      <source src={home.videoUrl} type="video/mp4" />
    </video>
  ) : home?.heroImage ? (
    <img src={urlFor(home.heroImage).width(1920).url()} alt="Välkommen" className="absolute top-0 left-0 w-full h-full object-cover" />
  ) : null}

  <div className="absolute inset-0 bg-black/60" />

  <div className="relative z-10 text-center px-6 max-w-6xl">
    <div className="animate-fadeIn">
      <PortableText
        value={home?.welcome || []}
        components={{
          block: {
            h1: ({ children }) => (
              <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white drop-shadow-2xl leading-tight mb-6">
                {children}
              </h1>
            ),
            h2: ({ children }) => (
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white drop-shadow-xl mb-4">
                {children}
              </h2>
            ),
            normal: ({ children }) => (
              <p className="text-xl sm:text-2xl md:text-3xl font-medium text-white drop-shadow-lg leading-relaxed">
                {children}
              </p>
            ),
          },
          marks: {
            strong: ({ children }) => <span className="text-accent font-black">{children}</span>,
          },
        }}
      />
    </div>
  </div>
</section>

      <div className="bg-gray-50">
        {/* Nyheter */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-4xl md:text-5xl font-bold text-primary mb-12 text-center">
              Senaste nytt
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {news.map((item) => (
                <article key={item._id} className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition">
                  {item.image && (
                    <img src={urlFor(item.image).width(600).height(400).url()} alt={item.title} className="w-full h-48 object-cover" />
                  )}
                  <div className="p-6">
                    <time className="text-sm text-gray-500">
                      {item.publishedAt && new Date(item.publishedAt).toLocaleDateString('sv-SE')}
                    </time>
                    <h3 className="text-xl font-bold text-primary mt-2 mb-3">{item.title}</h3>
                    <div className="prose prose-sm text-gray-700">
                      <PortableText value={item.body} />
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Hall of Fame */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-4xl md:text-5xl font-bold text-accent mb-12 text-center">
              Hall of Fame
            </h2>
            <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-8">
              {hallOfFame.map((m, i) => (
                <div key={i} className="bg-white rounded-2xl shadow-xl overflow-hidden text-center hover:scale-105 transition">
                  {m.imageUrl ? (
                    <img src={m.imageUrl} alt={m.name} className="w-full h-64 object-cover" />
                  ) : (
                    <div className="bg-gray-200 h-64 flex items-center justify-center">
                      <span className="text-gray-500">Ingen bild</span>
                    </div>
                  )}
                  <div className="p-6">
                    <h3 className="text-xl font-bold">{m.name}</h3>
                    <p className="text-accent font-semibold">{m.year}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  )
}