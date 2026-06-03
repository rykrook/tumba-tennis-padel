import { useEffect, useState } from 'react'
import { client } from '../lib/sanity'
import { Mail, Users, User, UserCheck, ChevronDown, ChevronUp } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import PageHeader from '../components/PageHeader'
import Spinner from '../components/Spinner'

interface Person {
  name: string
  role: string
  bio: string
  imageUrl?: string
  email?: string
}

const TrainerCard = ({ p, RoleIcon }: { p: Person; RoleIcon: LucideIcon }) => {
  const [expanded, setExpanded] = useState(false)
  const isLongBio = !!p.bio && p.bio.length > 160

  return (
    <div className="card p-6 sm:p-8 flex flex-col items-center text-center h-full">
      {/* Avatar */}
      <div className="w-32 h-32 rounded-full overflow-hidden ring-4 ring-accent/25 shadow-md mb-5 shrink-0">
        {p.imageUrl ? (
          <img src={p.imageUrl} alt={p.name} className="w-full h-full object-cover object-center" />
        ) : (
          <div className="bg-primary/5 w-full h-full flex items-center justify-center">
            <RoleIcon className="w-14 h-14 text-primary/30" />
          </div>
        )}
      </div>

      {/* Namn + roll */}
      <h3 className="text-xl font-display font-bold text-primary leading-tight">{p.name}</h3>
      {p.role && (
        <span className="inline-flex items-center gap-1.5 mt-2 px-3 py-1 rounded-full bg-accent/15 text-accent-dark text-sm font-semibold">
          <RoleIcon className="w-4 h-4" />
          {p.role}
        </span>
      )}

      {/* Bio */}
      {p.bio && (
        <p className={`mt-4 text-slate-600 leading-relaxed text-sm ${expanded ? '' : 'line-clamp-4'}`}>
          {p.bio}
        </p>
      )}
      {isLongBio && (
        <button
          onClick={() => setExpanded((v) => !v)}
          className="mt-2 inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-slate-400 hover:text-accent-dark transition-colors"
        >
          {expanded ? (
            <>Dölj <ChevronUp className="w-3.5 h-3.5" /></>
          ) : (
            <>Läs mer <ChevronDown className="w-3.5 h-3.5" /></>
          )}
        </button>
      )}

      {/* Kontakt */}
      {p.email && (
        <a
          href={`mailto:${p.email}`}
          className="mt-auto pt-5 inline-flex items-center gap-2 text-primary hover:text-accent-dark font-semibold text-sm transition-colors"
        >
          <Mail className="w-4 h-4" />
          Kontakta
        </a>
      )}
    </div>
  )
}

export default function TranareStyrelsen() {
  const [people, setPeople] = useState<Person[] | null>(null)

  useEffect(() => {
    client
      .fetch(`*[_type == "tranareStyrelsen"][0].people[]{
        name, role, bio, "imageUrl": image.asset->url, email
      }`)
      .then((data) => setPeople(data || []))
      .catch(() => setPeople([]))
  }, [])

  const getIconForRole = (role: string): LucideIcon => {
    const r = role ? role.toLowerCase() : ''
    if (r.includes('tränare')) return UserCheck
    if (r.includes('styrelse') || r.includes('ordförande')) return Users
    return User
  }

  if (people === null) return <Spinner label="Laddar tränare & styrelse…" />

  return (
    <div className="bg-surface min-h-screen">
      <PageHeader
        title="Tränare & Styrelse"
        intro="Här hittar du kontaktuppgifter till vårt team av tränare och vår engagerade styrelse. Tveka inte att höra av dig!"
      />

      <div className="container-page py-12 md:py-16">
        {people.length === 0 ? (
          <p className="text-center text-xl text-slate-600 py-16">Inga personer har lagts in ännu.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-5xl mx-auto items-stretch">
            {people.map((p, i) => (
              <TrainerCard key={i} p={p} RoleIcon={getIconForRole(p.role)} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
