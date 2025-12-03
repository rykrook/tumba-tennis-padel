import { useEffect, useState } from 'react'
import { client, urlFor } from '../lib/sanity'
import { PortableText } from '@portabletext/react'
import NewsSection from '../components/NewsSection'
import BookCourtCTA from '../components/BookCourtCTA'
import HallOfFameCard from '../components/HallOfFameCard'
import KeyServicesCTA from '../components/KeyServicesCTA'
import BookCourtHeroButton from '../components/BookCourtHeroButton'

const portableTextComponents = {
  block: {
    h1: (props: any) => (
      <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold text-white mb-6 md:mb-8 
                     leading-tight tracking-tighter drop-shadow-2xl">
        {props.children}
      </h1>
    ),
    h2: (props: any) => (
      <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 md:mb-8 
                     leading-snug drop-shadow-xl">
        {props.children}
      </h2>
    ),
    normal: (props: any) => (
      <p className="text-xl md:text-2xl text-white font-medium drop-shadow-xl max-w-3xl mx-auto">
        {props.children}
      </p>
    ),
  },
}

export default function Home() {
  const [home, setHome] = useState<any>(null)
  const [news, setNews] = useState<any[]>([])
  const [hallOfFame, setHallOfFame] = useState<any[]>([])
  const [siteSettings, setSiteSettings] = useState<any>(null)

  useEffect(() => {
    Promise.all([
      // 1. Homepage
      client.fetch(`*[_type == "homepage"][0]{
      heroImage,
      welcome,
      "videoUrl": backgroundVideo.asset->url
    }`),

      // 2. Nyheter
      client.fetch(`*[_type == "news"] | order(publishedAt desc)[0...3]{
      _id,
      title,
      publishedAt,
      excerpt,
      image,
      "slug": slug.current
    }`),
      // 3. Hall Of Fame
      client.fetch(`*[_type == "hallOfFame"][0].members[]{
      name,
      year,
      image,
      "imageUrl": image.asset->url,
      "slug": slug.current,
      description
    }`),
      // 4. Komponenter
      client.fetch(`*[_type == "siteSettings"][0]{
      keyServices,
      bookCourt
    }`),
      client.fetch(`*[_type == "siteSettings"][0]{
      heroButton
    }`)
    ]).then(([homeData, newsData, hofData, settings, heroButtonData]) => {
      setHome(homeData)
      setNews(newsData || [])
      setHallOfFame(hofData || [])
      setSiteSettings({ ...(settings || {}), ...(heroButtonData || {}) })
    })
  }, [])

  return (
    <>
      {/* HERO */}
      <section className="relative h-[60vh] md:h-[90vh] mt-[-5rem] pt-20 flex items-center justify-center overflow-hidden">
        {home?.videoUrl ? (
          <video autoPlay muted loop playsInline className="absolute top-0 left-0 -z-30 w-full h-full object-cover">
            <source src={home.videoUrl} type="video/mp4" />
          </video>
        ) : home?.heroImage ? (
          <img src={urlFor(home.heroImage).width(1920).url()} alt="Välkommen" className="absolute top-0 left-0 w-full h-full object-cover" />
        ) : null}

        <div className="absolute inset-0 bg-black/60" />

        <div className="relative z-10 text-center px-6 max-w-6xl">
          <div className="animate-fadeIn">
            <PortableText value={home?.welcome || []} components={portableTextComponents} />
          </div>
          <div className="mt-12">
            <BookCourtHeroButton data={siteSettings?.heroButton || {}} />
          </div>
        </div>
      </section>

      <NewsSection news={news} />
      <KeyServicesCTA data={siteSettings?.keyServices || {}} />
      <BookCourtCTA data={siteSettings?.bookCourt || {}} />

      {/* Hall of Fame */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-accent mb-12 text-center">
            Hall of Fame
          </h2>

          {hallOfFame && hallOfFame.length > 0 ? (
            <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-8">
              {hallOfFame.map((member, i) => (
                <HallOfFameCard key={member._id || i} member={member} />
              ))}
            </div>
          ) : (
            <div className="text-center p-10 border border-gray-200 rounded-lg shadow-sm bg-gray-50">
              <p className="text-xl text-gray-700 mb-6">
                Vi har för närvarande inga utsedda medlemmar i vår Hall of Fame.
                Håll utkik! Nya framstående individer kommer att läggas till i framtiden.
              </p>
              <a
                href="/hall-of-fame"
                className="inline-block px-8 py-3 text-lg font-semibold text-white bg-accent hover:bg-accent-dark rounded-md transition duration-300"
              >
                Läs mer om Hall of Fame
              </a>
            </div>
          )}

        </div>
      </section>
    </>
  )
}