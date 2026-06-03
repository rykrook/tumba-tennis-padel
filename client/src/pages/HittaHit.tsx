import { useEffect, useState } from 'react'
import type { ReactNode } from 'react'
import { client } from '../lib/sanity'
import { MapPin, Train, ParkingCircle, Navigation } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import PageHeader from '../components/PageHeader'
import Spinner from '../components/Spinner'

interface HittaHitData {
  address?: string
  mapEmbed?: string
}

function InfoCard({ Icon, title, children }: { Icon: LucideIcon; title: string; children: ReactNode }) {
  return (
    <div className="bg-white rounded-2xl shadow-soft border border-slate-100 p-5 flex gap-4">
      <div className="flex items-center justify-center h-12 w-12 rounded-xl bg-primary/10 text-primary shrink-0">
        <Icon className="w-6 h-6" />
      </div>
      <div>
        <h3 className="font-display font-bold text-primary mb-1">{title}</h3>
        <div className="text-slate-600 leading-relaxed">{children}</div>
      </div>
    </div>
  )
}

export default function HittaHit() {
  const [data, setData] = useState<HittaHitData | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    client
      .fetch(`*[_type == "hittaHit"][0]{address, mapEmbed}`)
      .then((result) => {
        setData(result)
        setIsLoading(false)
      })
      .catch(() => setIsLoading(false))
  }, [])

  if (isLoading) return <Spinner label="Laddar karta…" />

  const address = data?.address || 'Adress saknas'
  const mapEmbed = data?.mapEmbed || ''
  const hasAddress = !!data?.address
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(address)}`

  return (
    <div className="bg-surface min-h-screen">
      <PageHeader
        title="Hitta hit"
        Icon={MapPin}
        intro="Välkommen till oss i Tumba – här är allt du behöver för att hitta rätt."
      />

      <div className="container-page py-12 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-stretch">
          {/* Karta */}
          <div className="lg:col-span-3 rounded-2xl overflow-hidden shadow-soft border border-slate-100 bg-white h-[400px] lg:h-[600px]">
            {mapEmbed ? (
              <div
                dangerouslySetInnerHTML={{ __html: mapEmbed }}
                className="w-full h-full [&>iframe]:w-full [&>iframe]:h-full [&>iframe]:border-0"
              />
            ) : (
              <div className="w-full h-full bg-slate-100 flex items-center justify-center">
                <span className="text-slate-500 text-lg">Kartinbäddning saknas.</span>
              </div>
            )}
          </div>

          {/* Info */}
          <div className="lg:col-span-2 flex flex-col gap-5">
            <InfoCard Icon={MapPin} title="Adress">
              <p className="whitespace-pre-line">{address}</p>
            </InfoCard>

            <InfoCard Icon={ParkingCircle} title="Bil & parkering">
              Hallen ligger centralt i Tumba. Det finns gott om parkeringsmöjligheter i anslutning till byggnaden.
            </InfoCard>

            <InfoCard Icon={Train} title="Kollektivtrafik">
              Ta pendeltåget till <strong className="font-semibold text-slate-900">Tumba station</strong>. Därifrån är det
              cirka 5 minuters promenad till hallen.
            </InfoCard>

            {hasAddress && (
              <a
                href={directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group mt-auto w-full inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl
                           bg-gradient-to-r from-primary to-secondary text-white font-semibold text-base
                           shadow-lg shadow-primary/25 transition-all duration-200 hover:shadow-xl hover:-translate-y-0.5"
              >
                <Navigation className="w-5 h-5 transition-transform group-hover:-translate-y-0.5" />
                Vägbeskrivning
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
