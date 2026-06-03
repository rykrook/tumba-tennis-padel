import { useEffect, useState } from 'react'
import { client } from '../lib/sanity'
import { PortableText, type PortableTextComponents } from '@portabletext/react'
import { Link } from 'react-router-dom'
import { GraduationCap, CalendarDays, MapPin, ArrowRight } from 'lucide-react'
import NewsSection from '../components/NewsSection'
import BookCourtCTA from '../components/BookCourtCTA'
import HallOfFameCard from '../components/HallOfFameCard'
import KeyServicesCTA from '../components/KeyServicesCTA'
import BookCourtHeroButton from '../components/BookCourtHeroButton'
import PageHero from '../components/PageHero'
import type { BookCourt, RichText, SanityImage } from '../lib/types'

interface HomeDoc {
  heroImage?: SanityImage
  welcome?: RichText
  videoUrl?: string
}

interface NewsCard {
  _id: string
  title: string
  slug?: string
  publishedAt?: string
  excerpt?: string
  image?: SanityImage
}

interface HofMember {
  name: string
  year: string
  imageUrl?: string
  slug?: string
}

interface HomeSettings {
  keyServices?: Record<string, string>
  bookCourt?: BookCourt
  heroButton?: { buttonText?: string; url?: string }
}

const portableTextComponents: PortableTextComponents = {
  block: {
    h1: ({ children }) => (
      <h1 className="font-display font-extrabold text-white text-4xl md:text-6xl lg:text-7xl leading-tight tracking-tight drop-shadow-lg">
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className="font-display font-bold text-white text-3xl md:text-4xl leading-snug drop-shadow-lg">
        {children}
      </h2>
    ),
    normal: ({ children }) => (
      <p className="text-lg md:text-2xl text-white/90 font-medium drop-shadow max-w-2xl mx-auto mt-5">
        {children}
      </p>
    ),
  },
}

const quickPaths = [
  {
    to: '/tennis',
    Icon: GraduationCap,
    title: 'Tennis & kurser',
    text: 'Träningsgrupper och kurser för barn och vuxna – och hur du anmäler dig.',
  },
  {
    to: '/träningsdagar',
    Icon: CalendarDays,
    title: 'Träningsdagar',
    text: 'Se schemat för terminens träningsdagar, månad för månad.',
  },
  {
    to: '/kontakt',
    Icon: MapPin,
    title: 'Kontakt',
    text: 'Har du frågor om kurser eller annat? Vi hjälper dig gärna.',
  },
]

export default function Home() {
  const [home, setHome] = useState<HomeDoc | null>(null)
  const [news, setNews] = useState<NewsCard[]>([])
  const [hallOfFame, setHallOfFame] = useState<HofMember[]>([])
  const [siteSettings, setSiteSettings] = useState<HomeSettings | null>(null)

  useEffect(() => {
    Promise.all([
      client.fetch(`*[_type == "homepage"][0]{
        heroImage,
        welcome,
        "videoUrl": backgroundVideo.asset->url
      }`),
      client.fetch(`*[_type == "news"] | order(publishedAt desc)[0...3]{
        _id, title, publishedAt, excerpt, image, "slug": slug.current
      }`),
      client.fetch(`*[_type == "hallOfFame"][0].members[]{
        name, year, "imageUrl": image.asset->url, "slug": slug.current
      }`),
      client.fetch(`*[_type == "siteSettings"][0]{ keyServices, bookCourt, heroButton }`),
    ]).then(([homeData, newsData, hofData, settings]) => {
      setHome(homeData)
      setNews(newsData || [])
      setHallOfFame(hofData || [])
      setSiteSettings(settings || {})
    })
  }, [])

  return (
    <>
      {/* HERO */}
      <PageHero videoUrl={home?.videoUrl} image={home?.heroImage} height="full" overlapNav>
        <div className="text-center">
          <PortableText value={home?.welcome || []} components={portableTextComponents} />
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link to="/tennis" className="btn-accent">
              Tennis &amp; kurser
              <ArrowRight className="w-4 h-4" />
            </Link>
            <BookCourtHeroButton data={siteSettings?.heroButton || {}} />
          </div>
        </div>
      </PageHero>

      {/* QUICK PATHS – det föräldrar oftast letar efter */}
      <section className="section bg-surface">
        <div className="container-page">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {quickPaths.map(({ to, Icon, title, text }) => (
              <Link key={to} to={to} className="card-hover group p-8 flex flex-col">
                <div className="flex items-center justify-center h-14 w-14 rounded-2xl bg-primary/10 text-primary mb-5">
                  <Icon className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-display font-bold text-primary mb-2">{title}</h3>
                <p className="text-slate-600 leading-relaxed flex-grow">{text}</p>
                <span className="mt-5 inline-flex items-center gap-2 font-semibold text-accent-dark group-hover:gap-3 transition-all">
                  Läs mer <ArrowRight className="w-4 h-4" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <NewsSection news={news} />
      <KeyServicesCTA data={siteSettings?.keyServices || {}} />
      <BookCourtCTA data={siteSettings?.bookCourt || {}} />

      {/* Hall of Fame */}
      <section className="section bg-surface">
        <div className="container-page">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-primary mb-12 text-center">
            Hall of Fame
          </h2>

          {hallOfFame && hallOfFame.length > 0 ? (
            <>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mb-12">
                {hallOfFame.slice(0, 4).map((member, i) =>
                  member.slug ? (
                    <Link key={i} to={`/hall-of-fame/${member.slug}`} className="block h-full transition-transform hover:-translate-y-1">
                      <HallOfFameCard member={member} />
                    </Link>
                  ) : (
                    <div key={i}>
                      <HallOfFameCard member={member} />
                    </div>
                  )
                )}
              </div>

              <div className="text-center">
                <Link to="/hall-of-fame" className="btn-primary">
                  Visa hela Hall of Fame
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </>
          ) : (
            <div className="card text-center p-10 max-w-2xl mx-auto">
              <p className="text-lg text-slate-600 mb-6">
                Vi har för närvarande inga utsedda medlemmar i vår Hall of Fame. Håll utkik – nya
                framstående individer läggs till framöver!
              </p>
              <Link to="/hall-of-fame" className="btn-primary">
                Läs mer om Hall of Fame
              </Link>
            </div>
          )}
        </div>
      </section>
    </>
  )
}
