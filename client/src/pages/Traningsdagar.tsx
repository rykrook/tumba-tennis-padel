import { useEffect, useState } from 'react'
import { client } from '../lib/sanity'

type TräningsdagarData = {
  termin?: string
  dates?: {
    man?: string
    tis?: string
    ons?: string
    tor?: string
    fre?: string
    lor?: string
    son?: string
  }
  note?: string
}

export default function Traningsdagar() {
  const [data, setData] = useState<TräningsdagarData | null>(null)

  useEffect(() => {
    client
      .fetch(`*[_type == "traningsdagar"][0]{
        termin,
        dates,
        note
      }`)
      .then((result) => setData(result))
  }, [])

  // Säker fallback om data inte är laddad än
  if (!data) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-8 text-center text-xl text-gray-600">
        Laddar träningsschema...
      </div>
    )
  }

  const dates = data.dates || {}

  const days = [
    { label: 'Mån', field: 'man' as const },
    { label: 'Tis', field: 'tis' as const },
    { label: 'Ons', field: 'ons' as const },
    { label: 'Tor', field: 'tor' as const },
    { label: 'Fre', field: 'fre' as const },
    { label: 'Lör', field: 'lor' as const },
    { label: 'Sön', field: 'son' as const },
  ]

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-4xl md:text-5xl font-bold text-primary mb-8 text-center">
        {data.termin || "Träningsdagar"}
      </h1>

      <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
        <div className="bg-primary text-white text-center py-4 text-xl font-bold">
          {data.termin || "Träningsdagar"}
        </div>

        <div className="p-6 md:p-8 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-6 text-center">
          {days.map((day) => (
            <div key={day.field} className="bg-gray-50 rounded-xl p-4 min-h-60 flex flex-col justify-between">
              <h3 className="font-bold text-primary text-lg mb-3">{day.label}</h3>
              <p className="text-sm leading-relaxed whitespace-pre-line">
                {dates[day.field] || "–"}
              </p>
            </div>
          ))}
        </div>

        {data.note && (
          <div className="bg-accent/20 text-center py-4 px-6 text-sm md:text-base font-medium">
            {data.note}
          </div>
        )}
      </div>
    </div>
  )
}