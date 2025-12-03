import { useEffect, useState } from 'react'
import { client } from '../lib/sanity'
import HallOfFameCard from '../components/HallOfFameCard'
import { Trophy } from 'lucide-react'

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
      <div className="max-w-7xl mx-auto px-4 py-32 text-center mt-[-5rem] pt-20"> {/* Anpassad för navbar */}
        <h1 className="text-5xl font-black text-primary mb-12">
          <Trophy className="w-12 h-12 inline-block mr-4 text-accent" /> Hall of Fame
        </h1>
        <p className="text-2xl text-gray-600">
          Inga medlemmar än – håll utkik!
        </p>
      </div>
    )
  }

  return (
    <div className="bg-gray-50 pt-20 mt-[-5rem]"> {/* Lägger till bakgrund och anpassning för navbar */}
      <div className="max-w-7xl mx-auto px-4 py-16">

        {/* SIDTITIEL */}
        <h1 className="text-5xl md:text-6xl font-black text-primary text-center mb-6">
          <Trophy className="w-12 h-12 inline-block mr-4 text-accent" /> Hall of Fame
        </h1>

        {/* INTROTEXT */}
        <p className="text-lg md:text-xl text-gray-700 text-center max-w-3xl mx-auto mb-16 border-b border-primary/10 pb-8">
          Här hedrar vi de medlemmar, tränare och styrelseledamöter som genom åren har gjort en exceptionell insats för Tumba Tennisklubb. Deras engagemang och prestationer är en inspiration för oss alla.
        </p>

        {/* KORT GALLERI */}
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {members.map((member, i) => (
            <HallOfFameCard key={member.slug || i} member={member} />
          ))}
        </div>
      </div>
    </div>
  )
}