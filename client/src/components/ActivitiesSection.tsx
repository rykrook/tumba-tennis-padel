import ActivityCard, { type Activity } from './ActivityCard'
import SignupForm from './SignupForm'
import BookCourtCTA from './BookCourtCTA'
import { CalendarSearch } from 'lucide-react'
import type { BookCourt } from '../lib/types'

interface ActivitiesSectionProps {
  activities: Activity[]
  /** Visas när det inte finns några aktiviteter */
  bookCourt?: BookCourt
}

/**
 * Delad sektion för Tennis- och Padelsidornas aktiviteter:
 * länk-kort i ett rutnät + inbäddade anmälningsformulär.
 */
export default function ActivitiesSection({ activities, bookCourt }: ActivitiesSectionProps) {
  const linkActivities = activities.filter((a) => a.anmalanTyp === 'link' && a.url)
  const formActivities = activities.filter((a) => a.anmalanTyp === 'form')
  const hasAny = activities.length > 0

  // Antal kolumner anpassas efter antal kort: 4 kort = full rad,
  // färre kort = centrerat rutnät (ingen "triangel" eller ensamt kort till vänster)
  const count = linkActivities.length
  const gridLayout =
    count === 1
      ? 'max-w-sm'
      : count === 2
        ? 'sm:grid-cols-2 max-w-2xl'
        : count === 3
          ? 'sm:grid-cols-2 lg:grid-cols-3 max-w-5xl'
          : 'sm:grid-cols-2 lg:grid-cols-4'

  if (!hasAny) {
    return (
      <section className="section">
        <div className="container-page max-w-3xl text-center">
          <div className="card p-10 md:p-12">
            <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-primary/10 text-primary mb-6">
              <CalendarSearch className="h-8 w-8" />
            </div>
            <h2 className="text-3xl font-display font-bold text-primary mb-3">Inga aktiviteter just nu</h2>
            <p className="text-lg text-slate-600 mb-8">Håll utkik – nya aktiviteter läggs upp löpande!</p>
            <BookCourtCTA data={bookCourt || {}} bare />
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="pt-8 pb-16 md:pt-10 md:pb-20">
      <div className="container-page">
        <div className="text-center mb-10">
          <h2 className="inline-block text-3xl md:text-4xl font-display font-bold text-primary border-b-4 border-accent pb-2">
            Aktiviteter &amp; kurser
          </h2>
        </div>

        {linkActivities.length > 0 && (
          <div className={`grid grid-cols-1 ${gridLayout} gap-6 md:gap-8 items-start mb-16 mx-auto`}>
            {linkActivities.map((akt, i) => (
              <ActivityCard key={i} activity={akt} />
            ))}
          </div>
        )}

        {formActivities.map((akt, i) => (
          <div
            key={`form-${i}`}
            className="card border-t-4 border-t-primary p-6 md:p-10 max-w-3xl mx-auto mb-10"
          >
            <SignupForm
              activity={akt.titel}
              title={`Anmälan: ${akt.titel}`}
              info={akt.info}
              formText={akt.formText}
            />
          </div>
        ))}
      </div>
    </section>
  )
}
