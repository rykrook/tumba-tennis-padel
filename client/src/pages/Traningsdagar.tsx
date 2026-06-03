import { useEffect, useState } from 'react'
import { client } from '../lib/sanity'
import { CalendarDays, Info } from 'lucide-react'
import PageHeader from '../components/PageHeader'
import Spinner from '../components/Spinner'

type DatumPerManad = {
  _key: string
  manadsNamn: string
  datumLista: string[]
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
      .fetch(`*[_type == "traningsdagar"][0]{ termin, datumPerManad, note }`)
      .then((result) => {
        setData(result)
        setIsLoading(false)
      })
      .catch(() => setIsLoading(false))
  }, [])

  if (isLoading) return <Spinner label="Laddar träningsschema…" />

  const months = data?.datumPerManad ?? []
  const hasDates = months.length > 0

  return (
    <div className="bg-surface min-h-screen">
      <PageHeader
        title={data?.termin || 'Träningsdagar'}
        Icon={CalendarDays}
        intro={hasDates ? 'Schema för aktuell termin. Kontrollera alltid med din tränare vid tveksamhet.' : undefined}
      />

      <div className="container-page max-w-5xl py-12 md:py-16">
        {data?.note && (
          <div className="flex items-center gap-3 bg-cream border border-accent/40 rounded-full px-5 py-3 w-fit max-w-full mx-auto mb-12 shadow-sm">
            <Info className="w-5 h-5 text-accent-dark flex-shrink-0" />
            <span className="text-slate-700 font-medium text-sm md:text-base">{data.note}</span>
          </div>
        )}

        {hasDates ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {months.map((manad) => (
              <div key={manad._key} className="bg-white rounded-2xl shadow-soft border border-slate-100 overflow-hidden flex flex-col">
                <div className="flex items-center gap-2.5 px-5 py-3.5 bg-primary/[0.04] border-b border-slate-100">
                  <CalendarDays className="w-5 h-5 text-accent" />
                  <h2 className="text-lg font-display font-bold text-primary">{manad.manadsNamn}</h2>
                </div>
                <ul className="divide-y divide-slate-50">
                  {manad.datumLista.map((dag, i) => (
                    <li key={i} className="flex items-start gap-3 px-5 py-2.5">
                      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-accent shrink-0" />
                      <span className="text-sm font-medium text-slate-700">{dag}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-xl text-slate-600 py-16">
            Inga träningsdatum har lagts in för aktuell termin.
          </p>
        )}
      </div>
    </div>
  )
}
