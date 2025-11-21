import { useEffect, useState } from 'react'
import { client, urlFor } from '../lib/sanity'

export default function TranareStyrelsen() {
  const [people, setPeople] = useState<any[]>([])

  useEffect(() => {
    client.fetch(`*[_type == "tranareStyrelsen"][0].people[]{name, role, bio, "imageUrl": image.asset->url}`).then(setPeople)
  }, [])

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-5xl font-bold text-green-700 mb-10">Tränare & Styrelse</h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {people.map((p: any, i: number) => (
          <div key={i} className="bg-white rounded-xl shadow-2xl overflow-hidden">
            {p.imageUrl && (
              <img src={p.imageUrl} alt={p.name} className="w-full h-64 object-cover" />
            )}
            <div className="p-6">
              <h3 className="text-2xl font-bold">{p.name}</h3>
              <p className="text-lg text-green-600 font-semibold mb-3">{p.role}</p>
              <p className="text-gray-700">{p.bio}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}