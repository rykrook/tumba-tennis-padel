import { useEffect, useState } from 'react'
import { client } from '../lib/sanity'
import HallOfFameCard from '../components/HallOfFameCard'
import { Trophy } from 'lucide-react'
import { Link } from 'react-router-dom'

interface Member {
  name: string
  year: string
  imageUrl?: string
  slug?: string
  description?: any[]
}

export default function HallOfFame() {
  const [members, setMembers] = useState<Member[]>([])

  useEffect(() => {
    client.fetch(`*[_type == "hallOfFame"][0].members[]{
      name,
      year,
      "imageUrl": image.asset->url,
      "slug": slug.current,
      description
    }`).then((data) => {
      setMembers(data || [])
    })
  }, [])

  if (members.length === 0) {
    return (
      <div className="min-h-screen pt-40 text-center bg-gray-50">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        <p className="mt-4 text-gray-600">Laddar...</p>
      </div>
    )
  }

  return (
    <div className="bg-gray-50 pt-20 mt-[-5rem] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-16">

        <h1 className="text-5xl md:text-6xl font-black text-primary text-center mb-6">
          <Trophy className="w-12 h-12 inline-block mr-4 text-accent" /> Hall of Fame
        </h1>

        <p className="text-lg md:text-xl text-gray-700 text-center max-w-3xl mx-auto mb-16 border-b border-primary/10 pb-8">
          Här hedrar vi de medlemmar, tränare och styrelseledamöter som genom åren har gjort en exceptionell insats. Deras engagemang och prestationer är en inspiration för oss alla.
        </p>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {members.map((member, i) => (
            member.slug ? (
              <Link
                key={i}
                to={`/hall-of-fame/${member.slug}`}
                className="block h-full transition-transform hover:-translate-y-2"
              >
                <HallOfFameCard member={member} />
              </Link>
            ) : (
              <div key={i} className="block h-full opacity-75">
                <HallOfFameCard member={member} />
              </div>
            )
          ))}
        </div>
      </div>
    </div>
  )
}