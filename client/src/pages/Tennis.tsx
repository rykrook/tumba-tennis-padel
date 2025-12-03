import { useEffect, useState } from 'react'
import { client, urlFor } from '../lib/sanity'
import { PortableText } from '@portabletext/react'
import { ArrowRight, ChevronDown } from 'lucide-react'
import BookCourtCTA from '../components/BookCourtCTA'
import emailjs from '@emailjs/browser'

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID as string
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID as string
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY as string

export default function Tennis() {
  const [data, setData] = useState<any>(null)
  const [siteSettings, setSiteSettings] = useState<any>(null)
  const [sentForms, setSentForms] = useState<number[]>([])
  const [openActivityIndex, setOpenActivityIndex] = useState<number | null>(null)

  useEffect(() => {
    Promise.all([
      client.fetch(`*[_type == "tennis"][0]{
        heroImage,
        heroTitle,
        "videoUrl": backgroundVideo.asset->url,
        content,
        aktiviteter[]{
          titel,
          info,
          anmalanTyp,
          url,
          formText,
          detaljer
        }
      }`),
      client.fetch(`*[_type == "siteSettings"][0]{bookCourt}`)
    ]).then(([tennisData, settings]) => {
      setData(tennisData)
      setSiteSettings(settings)
    })
  }, [])

 const handleSubmit = (e: React.FormEvent<HTMLFormElement>, index: number) => {
    e.preventDefault()
    const form = e.currentTarget as HTMLFormElement
    const formData = new FormData(form)

    // HONEYPOT
    if (formData.get('honeypot')) {
        form.reset();
        setSentForms(prev => [...prev, index]); // Falskt positivt, men blockerar botten
        setTimeout(() => setSentForms(prev => prev.filter(i => i !== index)), 8000);
        return;
    }

    // 1. Förbered EmailJS parametrar
    const templateParams = {
        user_name: formData.get('name') as string,
        user_email: formData.get('email') as string,
        user_phone: (formData.get('phone') as string) || 'Inget telefonnummer',
        user_message: (formData.get('message') as string) || '(Inget meddelande)',
        aktivitet: data.aktiviteter[index].titel,
        subject_line: `NY ANMÄLAN: ${data.aktiviteter[index].titel}`,
    }

    // 2. Anropa EmailJS
    emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        templateParams,
        { publicKey: PUBLIC_KEY }
    ).then(() => {
        // Hantera framgång
        setSentForms(prev => [...prev, index])
        form.reset()
        setTimeout(() => setSentForms(prev => prev.filter(i => i !== index)), 8000)
    }).catch((error) => {
        // Hantera fel
        console.error('EmailJS Anmälningsfel:', error);
        alert('Något gick fel vid skickandet – prova igen eller kontakta oss direkt via mail.');
    })
  }

  // 1. Laddningsskärm (Visas om data inte är laddad)
  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
        <div className="max-w-md w-full text-center bg-white p-10 shadow-lg space-y-6 border border-gray-100">
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-indigo-100 text-indigo-600">
            <svg className="animate-spin h-8 w-8" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.348 7.348M21 12a9 9 0 01-9 9m-1.555-5.333l-2.094-2.094L12 8l4 4-2.094 2.094" />
            </svg>
          </div>
          <h2 className="text-2xl font-semibold tracking-tight text-gray-900">
            Laddar sida...
          </h2>
          <p className="text-base text-gray-600">
            Hämtar tennisinformation.
          </p>
        </div>
      </div>
    )
  }

  // Kontrollera om det finns några aktiviteter
  const hasAktiviteter = data.aktiviteter?.length > 0
  const toggleDetails = (index: number) => {
    setOpenActivityIndex(openActivityIndex === index ? null : index)
  }
  // 2. Huvudrendering (Visas alltid när data har laddats)
  return (
    <>
      <div className="relative bottom-20 h-[25vh] md:h-[35vh] overflow-hidden">
        {/* VIDEO ELLER BILD */}
        {data?.videoUrl ? (
          <video autoPlay muted loop playsInline className="absolute top-0 left-0 w-full h-full object-cover">
            <source src={data.videoUrl} type="video/mp4" />
          </video>
        ) : data?.heroImage ? (
          <img src={urlFor(data.heroImage).width(1920).url()} alt="Tennis" className="absolute top-0 left-0 w-full h-full object-cover" />
        ) : null}

        <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
          <div className="text-center px-6">
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white drop-shadow-2xl leading-tight">
              {data?.heroTitle || 'Tennis'}
            </h1>
          </div>
        </div>
      </div>

      <section className="bg-white -mt-1">
        <div className="max-w-3xl mx-auto px-6 md:px-12 pt-0 pb-10">
          <div className="prose prose-lg mx-auto text-center">
            <PortableText
              value={data.content || []}
              components={{
                block: {
                  h1: ({ children }) => (
                    <h1 className="text-4xl md:text-5xl font-black text-primary mt-0 mb-8 tracking-tight">
                      {children}
                    </h1>
                  ),
                  h2: ({ children }) => (
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                      {children}
                    </h2>
                  ),
                  normal: ({ children }) => (
                    <p className="text-base md:text-lg leading-relaxed text-gray-700 mt-0 mb-4 font-light">
                      {children}
                    </p>
                  ),
                },
                marks: {
                  strong: ({ children }) => (
                    <span className="font-bold text-primary">{children}</span>
                  ),
                },
              }}
            />
          </div>
        </div>
      </section>

      <div className="border-t border-gray-200 pt-16">
        {hasAktiviteter ? (
          <section className="mb-24">
            <div className="flex flex-col items-center justify-center text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 tracking-tight border-b-4 border-primary pb-1">
                Aktiviteter & Kurser
              </h2>
            </div>

            {/* 1. KORT MED LÄNKAR OCH EXPANDERBARA DETALJER */}
    <div className="max-w-full mx-auto px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-24 items-start">
              {data.aktiviteter.map((akt: any, i: number) => {
                const isLink = akt.anmalanTyp === 'link' && akt.url
                const isExpanded = openActivityIndex === i

                if (!isLink) return null 

                return (
                  <div key={i} className="rounded-xl border border-gray-200 bg-white shadow-lg flex flex-col transition-all duration-300">

                    <div className="p-6 flex-grow">
                      <h3 className="text-2xl font-bold text-gray-900 mb-3">{akt.titel}</h3>

                      <p className="text-base text-gray-600 leading-relaxed mb-4">
                        {akt.info}
                      </p>
                    </div>

                    {/* KNAPPAR: Länk och Detaljer */}
                    <div className="p-6 pt-0 border-t border-gray-100 flex flex-col">

                      {/* DETALJKNAPP (om detaljer finns) */}
                      {akt.detaljer && (
                        <button
                          onClick={() => toggleDetails(i)}
                          className={`flex items-center justify-between w-full py-3 px-4 mb-3 border ${isExpanded ? 'border-primary bg-primary/10 text-primary' : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'} transition-all duration-300 font-semibold`}
                        >
                          <span>{isExpanded ? 'Dölj detaljer' : 'Visa mer information'}</span>
                          <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${isExpanded ? 'transform rotate-180' : ''}`} />
                        </button>
                      )}

                      {/* ANMÄLNINGSLÄNK */}
                      <a
                        href={akt.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary text-white text-lg font-semibold hover:bg-secondary transition-colors shadow-sm uppercase tracking-wider mt-2"
                      >
                        Anmäl dig nu
                        <ArrowRight className="w-5 h-5 ml-1" />
                      </a>
                    </div>

                    {/* EXPANDERBAR SEKTION (Detaljer) */}
                    {isExpanded && akt.detaljer && (
                      <div className="p-6 pt-0 border-t border-gray-200 bg-gray-50">
                        <div className="prose max-w-none text-gray-700 pt-4 pb-2">
                          {/* Använd PortableText här för att rendera dina detaljer */}
                          <PortableText value={akt.detaljer} />
                        </div>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>

            {/* 2. FORMULÄR SEKTION */}
            {data.aktiviteter.map((akt: any, i: number) => {
              if (akt.anmalanTyp === 'form') {
                return (
                  <div key={`form-${i}`} className="bg-white p-4 md:p-8 lg:p-12">
                    <div className="bg-gray-50 rounded-3xl shadow-2xl shadow-primary/20 p-6 md:p-10 lg:p-12 max-w-4xl mx-auto border-t-4 border-primary">
                      <h3 className="text-4xl font-extrabold text-primary text-center mb-3 tracking-tight">
                        Anmälan: {akt.titel}
                      </h3>
                      {akt.info && <p className="text-center text-xl text-gray-600 mb-6">{akt.info}</p>}
                      {akt.formText && <p className="text-center text-lg italic text-gray-500 mb-8 border-b pb-4">{akt.formText}</p>}

                      {sentForms.includes(i) ? (
                        <div className="text-center bg-green-50 border-4 border-green-400 text-green-700 font-bold text-2xl py-12 rounded-xl">
                          Tack för din anmälan! Vi hör av oss snart.
                        </div>
                      ) : (
                        <form onSubmit={(e) => handleSubmit(e, i)} className="space-y-8">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <input
                              type="text"
                              name="name"
                              placeholder="Namn*"
                              required
                              className="w-full px-5 py-3 border-2 border-gray-300 rounded-lg bg-white placeholder-gray-500 transition duration-300 
                                  focus:border-primary focus:ring-4 focus:ring-primary/20 focus:outline-none text-lg shadow-sm"
                            />
                            <input
                              type="email"
                              name="email"
                              placeholder="E-post*"
                              required
                              className="w-full px-5 py-3 border-2 border-gray-300 rounded-lg bg-white placeholder-gray-500 transition duration-300 
                                  focus:border-primary focus:ring-4 focus:ring-primary/20 focus:outline-none text-lg shadow-sm"
                            />
                          </div>
                          <input
                            type="tel"
                            name="phone"
                            placeholder="Telefon (valfritt)"
                            className="w-full px-5 py-3 border-2 border-gray-300 rounded-lg bg-white placeholder-gray-500 transition duration-300 
                               focus:border-primary focus:ring-4 focus:ring-primary/20 focus:outline-none text-lg shadow-sm"
                          />
                          <textarea
                            name="message"
                            placeholder="Meddelande / Önskemål (valfritt)"
                            rows={5}
                            className="w-full px-5 py-3 border-2 border-gray-300 rounded-lg bg-white placeholder-gray-500 transition duration-300 
                               focus:border-primary focus:ring-4 focus:ring-primary/20 focus:outline-none text-lg resize-none shadow-sm"
                          />

                          <div className="text-center pt-4">
                            <button
                              type="submit"
                              className="inline-flex items-center justify-center gap-2 px-10 py-4 bg-primary text-white text-sm font-medium hover:bg-secondary transition-colors shadow-sm uppercase tracking-wider"
                            >
                              Skicka anmälan
                            </button>
                          </div>
                        </form>
                      )}
                    </div>
                  </div>
                );
              }
              return null;
            })}
          </section>
        ) : (
          <div className="max-w-5xl mx-auto px-4 py-0 text-center">
            <div className="bg-white shadow-lg p-12 max-w-3xl mx-auto border-t-4 border-gray-200">

              <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-indigo-100 text-indigo-600 mb-6">
                <svg className="h-8 w-8" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>

              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Inga aktiviteter just nu
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                Håll utkik – nya aktiviteter läggs upp löpande!
              </p>
              <BookCourtCTA data={siteSettings?.bookCourt || {}} />

            </div>
          </div>
        )}
      </div>

      {hasAktiviteter && <BookCourtCTA data={siteSettings?.bookCourt || {}} />}

    </>
  )
}