import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { client, urlFor } from '../lib/sanity'
import { PortableText } from '@portabletext/react'
import { ArrowLeft, Trophy } from 'lucide-react'

export default function HallOfFameMember() {
    const { slug } = useParams()
    const [member, setMember] = useState<any>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (!slug) return

        client.fetch(`*[_type == "hallOfFame"][0].members[slug.current == $slug][0]{
      name,
      year,
      "imageUrl": image.asset->url,
      description
    }`, { slug }).then((data) => {
            setMember(data)
            setLoading(false)
        }).catch(() => setLoading(false))
    }, [slug])

    if (loading) {
        return <div className="min-h-screen pt-40 text-center text-gray-500">Laddar profil...</div>
    }

    if (!member) {
        return (
            <div className="min-h-screen pt-40 text-center">
                <h2 className="text-2xl font-bold text-gray-800">Personen hittades inte</h2>
                <Link to="/hall-of-fame" className="text-primary underline mt-4 block">Tillbaka till listan</Link>
            </div>
        )
    }

    return (
        <div className="bg-gray-50 min-h-screen pt-20 mt-[-5rem]">
            <div className="max-w-4xl mx-auto px-4 py-16">

                {/* Tillbaka-knapp */}
                <Link
                    to="/hall-of-fame"
                    className="inline-flex items-center text-gray-600 hover:text-primary transition-colors mb-8 font-medium"
                >
                    <ArrowLeft className="w-5 h-5 mr-2" /> Tillbaka till Hall of Fame
                </Link>

                <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                    <div className="flex flex-col md:flex-row">

                        {/* Bild */}
                        <div className="w-full md:w-1/2 bg-gray-200 relative min-h-[400px]">
                            {member.imageUrl ? (
                                <img
                                    src={urlFor(member.imageUrl).width(800).url()}
                                    alt={member.name}
                                    className="absolute inset-0 w-full h-full object-cover"
                                />
                            ) : (
                                <div className="flex items-center justify-center h-full text-gray-400">
                                    <Trophy className="w-20 h-20 opacity-20" />
                                </div>
                            )}
                        </div>

                        {/* Text */}
                        <div className="w-full md:w-1/2 p-8 md:p-12">
                            <span className="inline-block bg-accent text-white px-4 py-1 rounded-full text-sm font-bold mb-4 shadow-sm">
                                Invald {member.year}
                            </span>

                            <h1 className="text-4xl font-black text-gray-900 mb-6 leading-tight">
                                {member.name}
                            </h1>

                            <div className="prose prose-lg text-gray-600">
                                {member.description ? (
                                    <PortableText value={member.description} />
                                ) : (
                                    <p className="italic text-gray-400">Ingen beskrivning tillgänglig.</p>
                                )}
                            </div>
                        </div>

                    </div>
                </div>

            </div>
        </div>
    )
}