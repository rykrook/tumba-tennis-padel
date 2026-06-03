import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { client } from '../lib/sanity'
import { PortableText } from '@portabletext/react'
import { ArrowLeft, Trophy } from 'lucide-react'
import Spinner from '../components/Spinner'
import type { RichText } from '../lib/types'

interface Member {
  name: string
  year: string
  imageUrl?: string
  description?: RichText
}

export default function HallOfFameMember() {
  const { slug } = useParams()
  const [member, setMember] = useState<Member | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!slug) return
    client
      .fetch(
        `*[_type == "hallOfFame"][0].members[slug.current == $slug][0]{
          name, year, "imageUrl": image.asset->url, description
        }`,
        { slug }
      )
      .then((data) => {
        setMember(data)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [slug])

  if (loading) return <Spinner label="Laddar profil…" />

  if (!member) {
    return (
      <div className="bg-surface min-h-[60vh] flex flex-col justify-center items-center text-center px-6">
        <h2 className="text-2xl font-display font-bold text-slate-800 mb-6">Personen hittades inte</h2>
        <Link to="/hall-of-fame" className="btn-primary">Tillbaka till listan</Link>
      </div>
    )
  }

  return (
    <div className="bg-surface min-h-screen">
      <div className="container-page max-w-4xl py-12 md:py-16">
        <Link to="/hall-of-fame" className="inline-flex items-center gap-2 text-slate-600 hover:text-primary transition-colors mb-8 font-medium">
          <ArrowLeft className="w-5 h-5" /> Tillbaka till Hall of Fame
        </Link>

        <div className="card overflow-hidden">
          <div className="flex flex-col md:flex-row">
            <div className="w-full md:w-1/2 bg-slate-200 relative min-h-[320px] md:min-h-[440px]">
              {member.imageUrl ? (
                <img src={member.imageUrl} alt={member.name} className="absolute inset-0 w-full h-full object-cover" />
              ) : (
                <div className="flex items-center justify-center h-full text-slate-400">
                  <Trophy className="w-20 h-20 opacity-20" />
                </div>
              )}
            </div>

            <div className="w-full md:w-1/2 p-8 md:p-12">
              <span className="inline-block bg-accent text-primary px-4 py-1 rounded-full text-sm font-bold mb-4">
                Invald {member.year}
              </span>
              <h1 className="text-3xl md:text-4xl font-display font-extrabold text-primary mb-6 leading-tight">
                {member.name}
              </h1>
              <div className="prose prose-lg max-w-none text-slate-600">
                {member.description ? (
                  <PortableText value={member.description} />
                ) : (
                  <p className="italic text-slate-400">Ingen beskrivning tillgänglig.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
