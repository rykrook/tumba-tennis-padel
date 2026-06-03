import { useEffect, useState } from 'react'
import { client } from '../lib/sanity'
import { MapPin, Train, ParkingCircle } from 'lucide-react'
import PageHeader from '../components/PageHeader'
import Spinner from '../components/Spinner'

interface HittaHitData {
  address?: string
  mapEmbed?: string
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

  return (
    <div className="bg-surface min-h-screen">
      <PageHeader title="Hitta hit" Icon={MapPin} />

      <div className="container-page py-12 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Karta */}
          <div className="lg:col-span-2 w-full overflow-hidden rounded-2xl shadow-soft">
            {mapEmbed ? (
              <div
                dangerouslySetInnerHTML={{ __html: mapEmbed }}
                className="w-full h-96 md:h-[500px] lg:h-full min-h-96 [&>iframe]:w-full [&>iframe]:h-full"
              />
            ) : (
              <div className="w-full h-96 md:h-[500px] lg:h-full min-h-96 bg-slate-200 flex items-center justify-center">
                <span className="text-slate-500 text-lg">Kartinbäddning saknas.</span>
              </div>
            )}
          </div>

          {/* Information */}
          <div className="card border-l-4 border-l-accent p-6 md:p-8 space-y-8">
            <div>
              <h2 className="text-2xl font-display font-bold text-primary mb-3">Välkommen!</h2>
              <div className="flex items-center gap-3 text-lg font-semibold text-slate-800">
                <MapPin className="w-6 h-6 text-accent flex-shrink-0" />
                <p className="whitespace-pre-line">{address}</p>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-display font-bold text-slate-800 mb-2 border-b border-slate-100 pb-1">
                Bil &amp; parkering
              </h3>
              <div className="flex items-start gap-3 text-slate-700 leading-relaxed">
                <ParkingCircle className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                <p>Hallen ligger centralt i Tumba. Det finns gott om parkeringsmöjligheter i anslutning till byggnaden.</p>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-display font-bold text-slate-800 mb-2 border-b border-slate-100 pb-1">
                Kollektivtrafik
              </h3>
              <div className="flex items-start gap-3 text-slate-700 leading-relaxed">
                <Train className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                <p>
                  Ta pendeltåget till <strong className="font-semibold text-slate-900">Tumba station</strong>. Därifrån är
                  det cirka 5 minuters promenad till hallen.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
