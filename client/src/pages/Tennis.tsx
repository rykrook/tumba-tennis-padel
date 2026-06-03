import { useEffect, useState } from 'react'
import { client } from '../lib/sanity'
import { PortableText } from '@portabletext/react'
import PageHero from '../components/PageHero'
import ActivitiesSection from '../components/ActivitiesSection'
import BookCourtCTA from '../components/BookCourtCTA'
import Spinner from '../components/Spinner'
import { richTextComponents } from '../lib/portableText'
import type { Activity } from '../components/ActivityCard'
import type { BookCourt, RichText, SanityImage } from '../lib/types'

interface TennisData {
  heroImage?: SanityImage
  heroTitle?: string
  videoUrl?: string
  content?: RichText
  aktiviteter?: Activity[]
}

export default function Tennis() {
  const [data, setData] = useState<TennisData | null>(null)
  const [siteSettings, setSiteSettings] = useState<{ bookCourt?: BookCourt } | null>(null)

  useEffect(() => {
    Promise.all([
      client.fetch(`*[_type == "tennis"][0]{
        heroImage,
        heroTitle,
        "videoUrl": backgroundVideo.asset->url,
        content,
        aktiviteter[]{ titel, info, anmalanTyp, url, formText, detaljer }
      }`),
      client.fetch(`*[_type == "siteSettings"][0]{bookCourt}`),
    ]).then(([tennisData, settings]) => {
      setData(tennisData)
      setSiteSettings(settings)
    })
  }, [])

  if (!data) return <Spinner label="Hämtar tennisinformation…" />

  const activities = (data.aktiviteter || []).filter(Boolean)
  const hasActivities = activities.length > 0

  return (
    <>
      <PageHero videoUrl={data.videoUrl} image={data.heroImage} title={data.heroTitle || 'Tennis'} />

      {data.content && data.content.length > 0 && (
        <section className="py-8 md:py-12">
          <div className="container-page max-w-2xl">
            <div className="relative rounded-2xl bg-cream shadow-soft px-6 py-7 md:px-10 md:py-8 text-center [&>*:last-child]:mb-0">
              <span className="block mx-auto mb-4 h-1 w-12 rounded-full bg-accent" />
              <PortableText value={data.content} components={richTextComponents} />
            </div>
          </div>
        </section>
      )}

      <div className="bg-surface border-t border-slate-100">
        <ActivitiesSection activities={activities} bookCourt={siteSettings?.bookCourt} />
      </div>

      {hasActivities && <BookCourtCTA data={siteSettings?.bookCourt || {}} />}
    </>
  )
}
