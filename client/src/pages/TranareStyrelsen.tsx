import { useEffect, useState } from 'react'
import { client } from '../lib/sanity'
import { Mail, Users, User, UserCheck } from 'lucide-react'

interface Person {
  name: string;
  role: string;
  bio: string;
  imageUrl?: string;
  email?: string;
}

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

  // Bestäm ikon baserat på titel
  const getIconForRole = (role: string) => {
    const lowerCaseRole = role.toLowerCase()
    if (lowerCaseRole.includes('tränare')) return UserCheck
    if (lowerCaseRole.includes('styrelse') || lowerCaseRole.includes('ordförande')) return Users
    return User
  }

  // Visar laddningsstatus
  if (isLoading) {
    return (
      <div className="bg-gray-50 pt-20 mt-[-5rem] min-h-screen flex items-center justify-center">
        <p className="text-xl text-primary">Laddar tränare och styrelse...</p>
      </div>
    )
  }


  return (
    <div className="bg-gray-50 pt-20 mt-[-5rem] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-12">

        {/* SIDTITIEL */}
        <h1 className="text-5xl md:text-6xl font-black text-primary mb-6 text-center">
          Tränare & Styrelse
        </h1>

        {/* INTROTEXT */}
        <p className="text-xl text-gray-700 text-center max-w-3xl mx-auto mb-16 border-b border-primary/10 pb-8">
          Här hittar du kontaktuppgifter till vårt team av tränare och vår engagerade styrelse. Tveka inte att höra av dig om du har frågor!
        </p>

        {/* KORT GALLERI */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
          {people.map((p: Person, i: number) => {
            const RoleIcon = getIconForRole(p.role);
            return (
              <div
                key={i}
                className="
                    bg-white shadow-lg 
                    hover:shadow-xl hover:scale-[1.01] 
                    transition-all duration-300 flex flex-col h-full overflow-hidden 
                    border-t-4 border-accent /* Skarp accentlinje upptill */
                "
              >
                {p.imageUrl ? (
                  <img
                    src={p.imageUrl}
                    alt={p.name}
                    className="w-full h-56 object-cover object-top"
                  />
                ) : (
                  <div className="bg-gray-200 h-56 flex items-center justify-center">
                    <RoleIcon className="w-12 h-12 text-gray-400" /> 
                  </div>
                )}

                <div className="p-5 md:p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-1">{p.name}</h3>
                    <p className="text-accent font-semibold text-sm md:text-base mb-3 flex items-center gap-2">
                      <RoleIcon className="w-4 h-4" />
                      {p.role}
                    </p>
                    <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">{p.bio}</p>
                  </div>

                  {/* E-POST – klickbar med Lucide-ikon */}
                  {p.email && (
                    <a
                      href={`mailto:${p.email}`}
                      className="inline-flex items-center gap-2 text-primary hover:text-accent font-medium text-base transition mt-auto pt-4 border-t border-gray-100"
                    >
                      <Mail className="w-5 h-5" />
                      Kontakta
                    </a>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}