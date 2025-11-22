import { useEffect, useState } from 'react'
import { client, urlFor } from '../lib/sanity'
import { PortableText } from '@portabletext/react'

export default function Tennis() {
  const [pageData, setPageData] = useState<any>(null)
  const [anmalan, setAnmalan] = useState<any>(null)

  useEffect(() => {
    Promise.all([
      client.fetch(`*[_type == "tennisskola"][0]`),
      client.fetch(`*[_type == "anmalan"][0]`)
    ]).then(([page, links]) => {
      setPageData(page)
      setAnmalan(links)
    })
  }, [])

  if (!pageData) return <div className="p-8 text-center text-xl">Laddar...</div>

  const buttons = [
    { url: anmalan?.tennislekisUrl, text: anmalan?.tennislekisText || '4–6 år', title: 'Tennislekis' },
    { url: anmalan?.tennisskolaUrl, text: anmalan?.tennisskolaText || '7–16 år', title: 'Tennisskola' },
    { url: anmalan?.vuxentennisUrl, text: anmalan?.vuxentennisText || 'Från 16 år', title: 'Vuxentennis' },
  ].filter(b => b.url)

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-5xl md:text-6xl font-black text-primary text-center mb-12">
        Tennis
      </h1>

      {pageData.image && (
        <img src={urlFor(pageData.image).width(1400).url()} alt="Tennisskola" className="w-full rounded-3xl shadow-2xl mb-16" />
      )}

      <div className="prose prose-xl max-w-none text-center mb-20">
        <PortableText value={pageData.content} />
      </div>
      {buttons.length > 0 && (
        <section className="mb-24">
          <h2 className="text-4xl font-black text-primary text-center mb-12">
            Anmäl dig till våra aktiviteter
          </h2>

          <div className="bg-gray-50 rounded-3xl p-10 md:p-16 shadow-xl border-4 border-primary/20">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {buttons.map((btn, i) => (
                <div key={i} className="text-center">
                  <a
                    href={btn.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block bg-primary hover:bg-secondary text-white font-black text-2xl px-10 py-12 rounded-3xl shadow-2xl transition transform hover:scale-105"
                  >
                    🎾 {btn.title}
                  </a>
                  <p className="text-xl font-bold text-primary mt-6">
                    {btn.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <hr className="my-24 border-t-4 border-primary/20 rounded-full max-w-md mx-auto" />

      <div className="text-center">
        <h2 className="text-4xl md:text-5xl font-black text-primary mb-10">
          Boka bana
        </h2>
        <a
          href="https://www.matchi.se/facilities/tumbatk"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-primary hover:bg-secondary text-white font-bold text-xl px-16 py-8 rounded-2xl shadow-2xl transition transform hover:scale-105"
        >
          BOKA TENNISBANA PÅ MATCHI.SE
        </a>
      </div>
    </div>
  )
}