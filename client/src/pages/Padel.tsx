import { useEffect, useState } from 'react'
import { client, urlFor } from '../lib/sanity'
import { PortableText } from '@portabletext/react'

export default function Padel() {
  const [pageData, setPageData] = useState<any>(null)
  const [aktiviteter, setAktiviteter] = useState<any[]>([])
  const [sentForms, setSentForms] = useState<number[]>([])

  useEffect(() => {
    Promise.all([
      client.fetch(`*[_type == "padelaktivitet"][0]`),
      client.fetch(`*[_type == "padelaktivitet"][0].aktiviteter`)
    ]).then(([page, acts]) => {
      setPageData(page)
      setAktiviteter(acts || [])
    }).catch(err => console.error("Sanity fetch error:", err))
  }, [])

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>, index: number) => {
    e.preventDefault()
    setSentForms(prev => [...prev, index])
    setTimeout(() => setSentForms(prev => prev.filter(i => i !== index)), 5000)
  }

 if (!pageData) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-32 text-center">
        <div className="bg-white rounded-3xl shadow-2xl p-16 max-w-3xl mx-auto">
          <h2 className="text-4xl font-bold text-primary mb-6">
            Inga aktiviteter just nu
          </h2>
          <p className="text-xl text-gray-600 mb-12">
            Håll utkik – nya aktiviteter läggs upp löpande!
          <hr className="my-24 border-t-4 border-primary/20 rounded-full max-w-md mx-auto" />
          </p>
          <div className="mt-12">
            <h3 className="text-2xl font-bold text-primary mb-6">
              Boka bana
            </h3>
            <a
              href="https://www.matchi.se/facilities/tumbatk"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-primary hover:bg-secondary text-white font-bold text-xl px-16 py-8 rounded-2xl shadow-2xl transition transform hover:scale-105"
            >
              BOKA PADELBANA PÅ MATCHI.SE
            </a>
          </div>
        </div>
      </div>
    )
  }

  const hasAktiviteter = aktiviteter.some(akt => akt.showForm)

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-4xl md:text-5xl font-bold text-primary mb-10 text-center">
        Padel
      </h1>

      {pageData.image && (
        <img src={urlFor(pageData.image).width(1200).url()} alt="Padel" className="w-full rounded-2xl shadow-2xl mb-12" />
      )}

      <div className="prose prose-lg max-w-none mb-16 text-center">
        <PortableText value={pageData.content || []} />
      </div>

      {/* FORMULÄR – bara om det finns */}
      {hasAktiviteter && (
        <div className="space-y-16 mb-24">
          {aktiviteter.map((akt, i) => (
            akt.showForm && (
              <div key={i} className="bg-white rounded-2xl shadow-2xl p-8 md:p-12 max-w-3xl mx-auto">
                <h2 className="text-3xl font-bold text-primary mb-4 text-center">
                  Anmälan: {akt.aktivitet}
                </h2>

                {akt.info && (
                  <p className="text-center text-lg mb-8 text-gray-700 font-medium">
                    {akt.info}
                  </p>
                )}

                {sentForms.includes(i) ? (
                  <div className="text-center text-green-600 font-bold text-xl py-8">
                    Tack för din anmälan! Vi hör av oss snart.
                  </div>
                ) : (
                  <form onSubmit={(e) => handleSubmit(e, i)} className="space-y-6">
                    <input type="text" placeholder="Namn" required className="w-full px-6 py-4 border border-gray-300 rounded-xl text-lg focus:outline-none focus:border-primary" />
                    <input type="email" placeholder="E-post" required className="w-full px-6 py-4 border border-gray-300 rounded-xl text-lg focus:outline-none focus:border-primary" />
                    <input type="tel" placeholder="Telefon (valfritt)" className="w-full px-6 py-4 border border-gray-300 rounded-xl text-lg focus:outline-none focus:border-primary" />

                    <button type="submit" className="w-full bg-primary hover:bg-secondary text-white font-bold text-xl py-5 rounded-xl transition transform hover:scale-105">
                      Skicka anmälan – {akt.aktivitet}
                    </button>
                  </form>
                )}
              </div>
            )
          ))}
        </div>
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
          BOKA PADELBANA PÅ MATCHI.SE
        </a>
      </div>
    </div>
  )
}