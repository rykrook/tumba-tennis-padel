import { useEffect, useState } from 'react'
import { client } from '../lib/sanity'
import { CalendarDays, AlertTriangle } from 'lucide-react'

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
type DayField = 'man' | 'tis' | 'ons' | 'tor' | 'fre' | 'lor' | 'son';

export default function Traningsdagar() {
  const [data, setData] = useState<TräningsdagarData | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    client
      .fetch(`*[_type == "traningsdagar"][0]{
        termin,
        dates,
        note
      }`)
      .then((result) => {
        setData(result)
        setIsLoading(false)
      })
      .catch(() => setIsLoading(false))
  }, [])

  // Säker fallback om data inte är laddad än
  if (isLoading) {
    return (
      <div className="bg-gray-50 pt-20 mt-[-5rem] min-h-screen flex items-center justify-center">
        <p className="text-xl text-primary">Laddar träningsschema...</p>
      </div>
    )
  }

  // Säker fallback om ingen data hittas
  if (!data) {
    return (
      <div className="bg-gray-50 pt-20 mt-[-5rem] min-h-screen max-w-7xl mx-auto px-4 py-32 text-center">
        <h1 className="text-5xl font-black text-primary mb-12">
          Träningsdagar
        </h1>
        <p className="text-2xl text-gray-600">
          Träningsschemat kunde inte hittas just nu.
        </p>
      </div>
    )
  }

  const dates = data.dates || {}

  const days: { label: string, field: DayField }[] = [
    { label: 'Måndag', field: 'man' },
    { label: 'Tisdag', field: 'tis' },
    { label: 'Onsdag', field: 'ons' },
    { label: 'Torsdag', field: 'tor' },
    { label: 'Fredag', field: 'fre' },
    { label: 'Lördag', field: 'lor' },
    { label: 'Söndag', field: 'son' },
  ]

  return (
    <div className="bg-gray-50 pt-20 mt-[-5rem] min-h-screen">
      <div className="max-w-6xl mx-auto px-4 py-16">

        {/* SIDTITIEL */}
        <h1 className="text-5xl md:text-6xl font-black text-primary text-center mb-4">
          <CalendarDays className="w-12 h-12 inline-block mr-4 text-accent" />
          {data.termin || "Träningsdagar"}
        </h1>

        {data.termin && (
          <p className="text-xl text-gray-700 text-center max-w-3xl mx-auto mb-12 border-b border-primary/10 pb-4">
            Schema för aktuell termin. Kontrollera alltid med din tränare vid tveksamhet.
          </p>
        )}

        {/* SCHEMATABELL */}
        <div className="bg-white shadow-2xl overflow-hidden border-t-4 border-primary">
          <div className="bg-primary text-white text-center py-4 text-2xl font-extrabold uppercase tracking-wider">
            Träningsdagar
          </div>

          {/* Schemarutor - Två kolumner på mobil, expanderar sedan */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-7 divide-x divide-y border-gray-100">
            {days.map((day) => {
              const scheduleText = dates[day.field];
              const hasSchedule = !!scheduleText && scheduleText.trim() !== '–';

              return (
                <div
                  key={day.field}
                  className={`
                          p-4 sm:p-6 text-center 
                          transition-colors duration-200
                          ${hasSchedule ? 'bg-white hover:bg-accent/5' : 'bg-gray-50 text-gray-400'}
                          flex flex-col
                      `}
                >
                  <h3 className={`font-extrabold text-lg sm:text-xl mb-3 ${hasSchedule ? 'text-primary' : 'text-gray-500'}`}>
                    {day.label}
                  </h3>
                  <p className={`text-base leading-relaxed whitespace-pre-line ${hasSchedule ? 'text-gray-700' : 'italic'}`}>
                    {scheduleText || "Stängt / Ej schema"}
                  </p>
                </div>
              )
            }
            )}
          </div>

          {/* Notisruta */}
          {data.note && (
            <div className="bg-accent/10 py-4 px-6 text-sm md:text-base font-medium flex items-center justify-center gap-3">
              <AlertTriangle className="w-5 h-5 text-accent flex-shrink-0" />
              <span>{data.note}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}