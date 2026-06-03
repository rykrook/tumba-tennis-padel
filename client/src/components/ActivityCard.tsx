import { useState } from 'react'
import { PortableText } from '@portabletext/react'
import { ArrowRight, ChevronDown } from 'lucide-react'
import type { RichText } from '../lib/types'

export interface Activity {
  titel: string
  info?: string
  anmalanTyp?: 'link' | 'form'
  url?: string
  formText?: string
  detaljer?: RichText
}

export default function ActivityCard({ activity }: { activity: Activity }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="card flex flex-col overflow-hidden">
      <div className="p-6 flex-grow">
        <h3 className="text-xl font-display font-bold text-primary mb-2">{activity.titel}</h3>
        {activity.info && <p className="text-slate-600 leading-relaxed">{activity.info}</p>}
      </div>

      <div className="p-6 pt-0 flex flex-col gap-3">
        {activity.detaljer && (
          <button
            onClick={() => setOpen((v) => !v)}
            className={`flex items-center justify-between w-full py-2.5 px-4 rounded-xl border text-sm font-semibold transition-colors ${
              open
                ? 'border-primary bg-primary/5 text-primary'
                : 'border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            <span>{open ? 'Dölj detaljer' : 'Visa mer information'}</span>
            <ChevronDown className={`w-4 h-4 transition-transform ${open ? 'rotate-180' : ''}`} />
          </button>
        )}

        {activity.url && (
          <a href={activity.url} target="_blank" rel="noopener noreferrer" className="btn-primary w-full">
            Anmäl dig nu
            <ArrowRight className="w-4 h-4" />
          </a>
        )}
      </div>

      {open && activity.detaljer && (
        <div className="px-6 pb-6 pt-2 border-t border-slate-100 bg-surface">
          <div className="prose prose-sm max-w-none text-slate-700 pt-4">
            <PortableText value={activity.detaljer} />
          </div>
        </div>
      )}
    </div>
  )
}
