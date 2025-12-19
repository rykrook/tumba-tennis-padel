import { useEffect, useState } from 'react'
import { client } from '../lib/sanity'
import { Mail, Users, User, UserCheck, ChevronDown, ChevronUp } from 'lucide-react'

interface Person {
  name: string;
  role: string;
  bio: string;
  imageUrl?: string;
  email?: string;
}

const TrainerCard = ({ p, RoleIcon }: { p: Person; RoleIcon: any }) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const isLongBio = p.bio && p.bio.length > 80

  return (
    <div
      className={`
        bg-white shadow-md hover:shadow-xl transition-all duration-300 
        overflow-hidden border-t-4 border-accent rounded-lg /* Lade till rounded-lg för mjukare hörn på själva kortet */
        flex flex-row sm:flex-col h-auto sm:h-auto
        /* Lade till lite padding på hela kortet på desktop för att ge plats åt cirkeln */
        sm:p-4
        ${isExpanded ? 'ring-1 ring-accent/20' : ''}
      `}
    >
      <div className="
        relative shrink-0
        /* FIXERAD STORLEK & RUND FORM */
        w-24 h-24 sm:w-32 sm:h-32 rounded-full overflow-hidden
        
        /* STYLING: Vit kant och skugga för 'pop' */
        border-4 border-white shadow-md
        
        /* PLACERING */
        /* Mobil: Lite marginal till vänster och i toppen */
        m-3 sm:m-0
        /* Desktop: Centrerad horisontellt, marginal i botten */
        sm:mx-auto sm:mb-2
      ">
        {p.imageUrl ? (
          <img
            src={p.imageUrl}
            alt={p.name}
            className="absolute inset-0 w-full h-full object-cover object-center"
          />
        ) : (
          <div className="bg-gray-100 w-full h-full flex items-center justify-center">
            <RoleIcon className="w-10 h-10 sm:w-14 sm:h-14 text-gray-400" />
          </div>
        )}
      </div>

      {/* TEXT & INNEHÅLL */}
      <div className="flex-1 flex flex-col p-3 sm:p-2 text-center sm:text-center">

        {/* TITEL & ROLL */}
        <div className="min-h-[60px] sm:min-h-[70px]">
          <h3 className="text-lg sm:text-xl font-bold text-gray-900 leading-tight mb-1">
            {p.name}
          </h3>
          <p className="text-accent font-semibold text-xs sm:text-base mb-2 sm:mb-4 flex items-center justify-center gap-1.5 sm:gap-2">
            <RoleIcon className="w-3 h-3 sm:w-4 sm:h-4" />
            {p.role}
          </p>
        </div>

        {/* BIOGRAFI */}
        <div className="relative mb-2 sm:mb-4 text-left sm:text-center">
          <div
            className={`
              text-gray-600 text-xs sm:text-sm leading-relaxed transition-all duration-500 ease-in-out
              ${isExpanded ? 'h-auto opacity-100' : 'h-[72px] overflow-hidden opacity-90'}
            `}
          >
            {p.bio || "\u00A0"}
          </div>
        </div>

        {/* KNAPPAR */}
        <div className="mt-auto pt-2 sm:pt-4 flex flex-wrap items-center justify-between gap-2 border-t border-gray-100">

          {p.email ? (
            <a
              href={`mailto:${p.email}`}
              className="inline-flex items-center gap-1.5 text-primary hover:text-accent font-medium text-xs sm:text-sm transition"
            >
              <Mail className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="hidden xs:inline">Kontakta</span>
              <span className="xs:hidden">Mail</span>
            </a>
          ) : <span className="h-5"></span>}

          {isLongBio && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="flex items-center gap-1 text-[10px] sm:text-xs font-bold uppercase tracking-wider text-gray-400 hover:text-accent transition-colors ml-auto"
            >
              {isExpanded ? (
                <>Dölj <ChevronUp className="w-3 h-3" /></>
              ) : (
                <>Läs mer <ChevronDown className="w-3 h-3" /></>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

// HUVUDKOMPONENT
export default function TranareStyrelsen() {
  const [people, setPeople] = useState<Person[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    client
      .fetch(`*[_type == "tranareStyrelsen"][0].people[]{
        name,
        role,
        bio,
        "imageUrl": image.asset->url,
        email
      }`)
      .then((data) => {
        setPeople(data || [])
        setIsLoading(false)
      })
  }, [])

  const getIconForRole = (role: string) => {
    const lowerCaseRole = role ? role.toLowerCase() : ''
    if (lowerCaseRole.includes('tränare')) return UserCheck
    if (lowerCaseRole.includes('styrelse') || lowerCaseRole.includes('ordförande')) return Users
    return User
  }

  if (isLoading) {
    return (
      <div className="bg-gray-50 pt-20 mt-[-5rem] min-h-screen flex items-center justify-center">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="bg-gray-50 pt-20 mt-[-5rem] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-12">

        <h1 className="text-5xl md:text-6xl font-black text-primary mb-6 text-center">
          Tränare & Styrelse
        </h1>

        <p className="text-xl text-gray-700 text-center max-w-3xl mx-auto mb-16 border-b border-primary/10 pb-8">
          Här hittar du kontaktuppgifter till vårt team av tränare och vår engagerade styrelse. Tveka inte att höra av dig om du har frågor!
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8 items-start">
          {people.map((p: Person, i: number) => {
            const RoleIcon = getIconForRole(p.role);
            return (
              <TrainerCard key={i} p={p} RoleIcon={RoleIcon} />
            )
          })}
        </div>
      </div>
    </div>
  )
}