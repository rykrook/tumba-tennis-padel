import { useEffect, useState } from 'react'
import { client } from '../lib/sanity'

export default function TranareStyrelsen() {
  const [people, setPeople] = useState<any[]>([])

  useEffect(() => {
    client
      .fetch(`*[_type == "tranareStyrelsen"][0].people[]{
        name,
        role,
        bio,
        "imageUrl": image.asset->url,
        email
      }`)
      .then(setPeople)
  }, [])

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 lg:py-12">
      <h1 className="text-4xl md:text-5xl font-bold text-primary mb-10 text-center">
        Tränare & Styrelse
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
        {people.map((p: any, i: number) => (
          <div
            key={i}
            className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col h-full overflow-hidden"
          >
            {p.imageUrl ? (
              <img
                src={p.imageUrl}
                alt={p.name}
                className="w-full h-48 sm:h-56 lg:h-64 object-cover"
              />
            ) : (
              <div className="bg-gray-200 h-48 sm:h-56 lg:h-64 flex items-center justify-center">
                <span className="text-gray-500">Ingen bild</span>
              </div>
            )}

            <div className="p-5 md:p-6 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-1">{p.name}</h3>
                <p className="text-primary font-semibold text-sm md:text-base mb-3">{p.role}</p>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">{p.bio}</p>
              </div>

              {/* E-POST – klickbar med ikon */}
              {p.email && (
                <a
                  href={`mailto:${p.email}`}
                  className="inline-flex items-center gap-2 text-primary hover:text-secondary font-medium text-sm transition mt-auto"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                  {p.email}
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}