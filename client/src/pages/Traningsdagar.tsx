import { useEffect, useState } from 'react'
import { client } from '../lib/sanity'
import { CalendarDays, AlertTriangle } from 'lucide-react'

type DatumPerManad = {
  _key: string;
  manadsNamn: string;
  datumLista: string[];
}

type TräningsdagarData = {
  termin?: string
  datumPerManad?: DatumPerManad[]
  note?: string
}

export default function Traningsdagar() {
  const [data, setData] = useState<TräningsdagarData | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    client
      .fetch(`*[_type == "traningsdagar"][0]{
                termin,
                datumPerManad, 
                note
            }`)
      .then((result) => {
        setData(result)
        setIsLoading(false)
      })
      .catch(() => setIsLoading(false))
  }, [])

  if (isLoading) {
    return (
      <div className="bg-gray-50 pt-20 mt-[-5rem] min-h-screen flex items-center justify-center">
        <p className="text-xl text-primary">Laddar träningsschema...</p>
      </div>
    )
  }

  if (!data || !data.datumPerManad || data.datumPerManad.length === 0) {
    return (
      <div className="bg-gray-50 pt-20 mt-[-5rem] min-h-screen max-w-7xl mx-auto px-4 py-32 text-center">

        <h1 className="text-5xl font-black text-primary mb-12">
          <CalendarDays className="w-12 h-12 inline-block mr-4 text-accent" />
          {data?.termin || "Träningsdagar"}
        </h1>
        <p className="text-2xl text-gray-600">
          Inga träningsdatum har lagts in för aktuell termin.
        </p>
      </div>
    )
  }

  return (
    <div className="bg-gray-50 pt-20 mt-[-5rem] min-h-screen">
      <div className="max-w-6xl mx-auto px-4 py-16">

        {/* SIDTITEL OCH INTROTEXT */}
        <h1 className="text-5xl md:text-6xl font-black text-primary text-center mb-4">
          <CalendarDays className="w-12 h-12 inline-block mr-4 text-accent" />
          {data.termin || "Träningsdagar"}
        </h1>

        {data.termin && (
          <p className="text-xl text-gray-700 text-center max-w-3xl mx-auto mb-12 border-b border-primary/10 pb-4">
            Schema för aktuell termin. Kontrollera alltid med din tränare vid tveksamhet.
          </p>
        )}


        {data.note && (
          <div className="bg-accent/10 py-4 px-6 text-sm md:text-base font-medium flex items-center justify-center gap-3 max-w-4xl mx-auto rounded-xl mb-12 border-l-4 border-accent shadow-sm">
            <AlertTriangle className="w-5 h-5 text-accent flex-shrink-0" />
            <span>{data.note}</span>
          </div>
        )}


        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {data.datumPerManad.map((manad) => (
            <div
              key={manad._key}
              className="bg-white p-6 rounded-xl shadow-2xl border-t-4 border-accent transition-shadow hover:shadow-xl"
            >
              <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b border-gray-200 pb-2">
                {manad.manadsNamn}
              </h2>

              {/* Datumtaggar */}
              <div className="flex flex-wrap gap-2">
                {manad.datumLista.map((dag, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 bg-primary text-white rounded-full text-sm font-medium whitespace-nowrap"
                  >
                    {dag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}