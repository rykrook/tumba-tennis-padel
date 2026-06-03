import { useEffect, useState } from 'react'
import { client } from '../lib/sanity'
import HallOfFameCard from '../components/HallOfFameCard'
import { Trophy } from 'lucide-react'
import { Link } from 'react-router-dom'
import PageHeader from '../components/PageHeader'
import Spinner from '../components/Spinner'

interface Member {
  name: string
  year: string
  imageUrl?: string
  slug?: string
}

export default function HallOfFame() {
  const [members, setMembers] = useState<Member[] | null>(null)

  useEffect(() => {
    client
      .fetch(`*[_type == "hallOfFame"][0].members[]{
        name, year, "imageUrl": image.asset->url, "slug": slug.current
      }`)
      .then((data) => setMembers(data || []))
      .catch(() => setMembers([]))
  }, [])

  if (members === null) return <Spinner label="Laddar Hall of Fame…" />

  return (
    <div className="bg-surface min-h-screen">
      <PageHeader
        title="Hall of Fame"
        Icon={Trophy}
        intro="Här hedrar vi de medlemmar, tränare och styrelseledamöter som gjort en exceptionell insats för klubben genom åren."
      />

      <div className="container-page py-12 md:py-16">
        {members.length === 0 ? (
          <p className="text-center text-xl text-slate-600 py-16">
            Inga medlemmar har utsetts ännu. Håll utkik!
          </p>
        ) : (
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
            {members.map((member, i) =>
              member.slug ? (
                <Link key={i} to={`/hall-of-fame/${member.slug}`} className="block h-full transition-transform hover:-translate-y-1">
                  <HallOfFameCard member={member} />
                </Link>
              ) : (
                <div key={i} className="block h-full opacity-75">
                  <HallOfFameCard member={member} />
                </div>
              )
            )}
          </div>
        )}
      </div>
    </div>
  )
}
