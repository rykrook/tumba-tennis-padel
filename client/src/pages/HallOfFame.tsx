import React, { useEffect, useState } from 'react'
import { client } from '../lib/sanity'

export default function HallOfFame() {
  const [members, setMembers] = useState<any[]>([])

  useEffect(() => {
    client
      .fetch(`
        *[_type == "hallOfFame"][0].members[]{
          name,
          year,
          "imageUrl": image.asset->url
        }
      `)
      .then((data) => setMembers(data || []))
      .catch((err) => console.error("Fel:", err))
  }, [])

  if (members.length === 0) {
    return (
      <div className="max-w-6xl mx-auto p-6 text-center py-20">
        <p className="text-2xl text-gray-600">Inga medlemmar än i Hall of Fame</p>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-5xl font-bold text-yellow-600 mb-10 text-center">
        Hall of Fame
      </h1>

      <div className="grid md:grid-cols-3 gap-8">
        {members.map((member, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-2xl overflow-hidden text-center transform transition hover:scale-105"
          >
            {member.imageUrl ? (
              <img
                src={member.imageUrl}
                alt={member.name || 'Medlem'}
                className="w-full h-64 object-cover"
              />
            ) : (
              <div className="w-full h-64 bg-gray-200 flex items-center justify-center">
                <span className="text-gray-500">Ingen bild</span>
              </div>
            )}

            <div className="p-6">
              <h3 className="text-2xl font-bold text-gray-800">
                {member.name || 'Okänt namn'}
              </h3>
              <p className="text-lg text-gray-600 mt-2">{member.year || ''}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}