import { useEffect, useState } from 'react'
import { client } from '../lib/sanity'
import { MapPin, Train, ParkingCircle } from 'lucide-react'

interface HittaHitData {
  address?: string;
  mapEmbed?: string;
}

export default function HittaHit() {
  const [data, setData] = useState<HittaHitData | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    client.fetch(`*[_type == "hittaHit"][0]{address, mapEmbed}`)
      .then((result) => {
        setData(result)
        setIsLoading(false)
      })
      .catch(() => setIsLoading(false))
  }, [])

  if (isLoading) {
    return (
      <div className="bg-gray-50 pt-20 mt-[-5rem] min-h-screen flex items-center justify-center">
        <p className="text-xl text-primary">Laddar karta...</p>
      </div>
    )
  }

  const address = data?.address || "Adress saknas";
  const mapEmbed = data?.mapEmbed || '';

  return (
    <div className="bg-gray-50 pt-20 mt-[-5rem] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-16">

        {/* SIDTITIEL */}
        <h1 className="text-5xl md:text-6xl font-black text-primary text-center mb-12">
          <MapPin className="w-12 h-12 inline-block mr-4 text-accent" /> Hitta hit
        </h1>

        {/* CONTAINER FÖR KARTA OCH INFO */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

          {/* KARTA */}
          <div className="lg:col-span-2 w-full overflow-hidden shadow-2xl border-b-4 border-primary">
            {mapEmbed ? (
              <div
                dangerouslySetInnerHTML={{ __html: mapEmbed }}
                className="w-full h-96 md:h-[500px] lg:h-full min-h-96"
              />
            ) : (
              <div className="w-full h-96 md:h-[500px] lg:h-full min-h-96 bg-gray-200 flex items-center justify-center">
                <span className="text-gray-500 text-lg">Kartinbäddning saknas i Sanity.</span>
              </div>
            )}
          </div>


          {/* INFORMATION */}
          <div className="flex flex-col justify-start space-y-8 p-6 bg-white shadow-lg border-l-4 border-accent h-full">

            {/* ADRESS */}
            <div>
              <h2 className="text-2xl font-black text-primary mb-3">Välkommen!</h2>
              <div className="flex items-center gap-3 text-lg font-bold text-gray-800">
                <MapPin className="w-6 h-6 text-accent flex-shrink-0" />
                <p className="whitespace-pre-line">{address}</p>
              </div>
            </div>

            {/* BIL & PARKERING */}
            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-3 border-b border-gray-100 pb-1">Bil & Parkering</h3>

              <div className="flex items-start gap-3 text-base leading-relaxed text-gray-700">
                <ParkingCircle className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                <p>
                  Hallen ligger centralt i Tumba. Det finns gott om parkeringsmöjligheter i anslutning till byggnaden.
                </p>
              </div>
            </div>

            {/* KOLLEKTIVTRAFIK */}
            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-3 border-b border-gray-100 pb-1">Kollektivtrafik</h3>

              <div className="flex items-start gap-3 text-base leading-relaxed text-gray-700">
                <Train className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                <p>
                  Ta Pendeltåget till **Tumba Station**. Från stationen är det cirka 5 minuters promenad till hallen.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}