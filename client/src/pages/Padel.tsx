import { useEffect, useState } from 'react'
import { client, urlFor } from '../lib/sanity'
import { PortableText } from '@portabletext/react'
import BookCourtCTA from '../components/BookCourtCTA'
import emailjs from '@emailjs/browser'

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID as string
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID as string
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY as string

export default function Padel() {
  const [data, setData] = useState<any>(null)
  const [siteSettings, setSiteSettings] = useState<any>(null)
  const [sentForms, setSentForms] = useState<number[]>([])

useEffect(() => {
    Promise.all([
      client.fetch(`*[_type == "padelaktivitet"][0]{
        heroImage,
        heroTitle,
        "videoUrl": backgroundVideo.asset->url,
        content,
        aktiviteter[]{
          aktivitet,
          info,
          showForm
        }
      }`),
      client.fetch(`*[_type == "siteSettings"][0]{bookCourt}`)
    ]).then(([padelData, settings]) => {
      setData(padelData)
      setSiteSettings(settings)
    })
  }, [])

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>, index: number) => {
    e.preventDefault()
    const form = e.currentTarget as HTMLFormElement
    const formData = new FormData(form)

    // HONEYPOT KONTROLL
    if (formData.get('honeypot')) {
      form.reset()
      setSentForms(prev => [...prev, index])
      setTimeout(() => setSentForms(prev => prev.filter(i => i !== index)), 8000)
      return
    }

    // Validering av nycklar
    if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
      console.error("EmailJS-nycklar saknas i miljövariablerna!")
      alert('Något gick fel vid skickandet – saknar konfigurationsnycklar!') 
      return
    }

    // Förbered data som matcharEmailJS-mall
    const templateParams = {
      user_name: formData.get('name') as string,
      user_email: formData.get('email') as string,
      user_phone: (formData.get('phone') as string) || 'Inget telefonnummer',
      user_message: (formData.get('message') as string) || '(Inget meddelande)',
      aktivitet: data.aktiviteter[index].aktivitet,
      subject_line: `NY ANMÄLAN (Padel): ${data.aktiviteter[index].aktivitet}`,
    }

    // Anropa EmailJS
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
      console.error('EmailJS Anmälningsfel (Padel):', error);
      alert('Något gick fel – prova igen!');
    })
  }


  // 1. Laddningsskärm
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
            Hämtar padelinformation.
          </p>
        </div>
      </div>
    )
  }
  
  // Kontrollera om det finns några aktiviteter med formulär som ska visas
  const hasAktiviteter = data.aktiviteter?.some((a: any) => a.showForm)

  // 2. Huvudrendering (Alltid visas när data har laddats)
  return (
    <div className="w-full">
      {/* HERO – video eller bild (denna del ska ALLTID visas) */}
      <div className="relative w-full bottom-20 h-[25vh] md:h-[35vh] overflow-hidden">
        {data.videoUrl ? (
          <video autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover">
            <source src={data.videoUrl} type="video/mp4" />
          </video>
        ) : data.heroImage ? (
          <img src={urlFor(data.heroImage).width(1920).url()} alt="Padel" className="absolute inset-0 w-full h-full object-cover" />
        ) : null}

        <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white text-center drop-shadow-2xl px-6">
            {data.heroTitle || 'Padel'}
          </h1>
        </div>
      </div>

      {/* Text under hero (denna del ska ALLTID visas) */}
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

      {/* ANMÄLNINGSFORMULÄR ELLER INGET-AKTIVITETER-MEDDELANDE */}
      <div className="border-t border-gray-200 pt-16">
      {hasAktiviteter ? (
        <div className="mb-24">
          {data.aktiviteter.map((akt: any, i: number) => (
            akt.showForm && (
              <div key={i} className="bg-gray-50 rounded-3xl shadow-2xl shadow-primary/20 p-6 md:p-10 lg:p-12 max-w-4xl mx-auto border-t-4 border-primary mb-12">
                <h2 className="text-3xl font-bold text-primary text-center mb-4">
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
                    <input type="text" name="name" placeholder="Namn" required className="w-full px-6 py-4 border-2 border-gray-300 rounded-xl focus:border-primary focus:outline-none text-lg" />
                    <input type="email" name="email" placeholder="E-post" required className="w-full px-6 py-4 border-2 border-gray-300 rounded-xl focus:border-primary focus:outline-none text-lg" />
                    <input type="tel" name="phone" placeholder="Telefon (valfritt)" className="w-full px-6 py-4 border-2 border-gray-300 rounded-xl focus:border-primary focus:outline-none text-lg" />

                    <div className="text-center">
                      <button type="submit" className="inline-flex items-center justify-center gap-2 px-10 py-4 bg-primary text-white text-sm font-medium hover:bg-secondary transition-colors shadow-sm uppercase tracking-wider"
                      >
                        Skicka anmälan – {akt.aktivitet}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            )
          ))}
        </div>
      ) : (
        // VISAS OM hasAktiviteter ÄR FALSE, ERSÄTTER FORMULÄRSEKTIONEN
        <div className="max-w-5xl mx-auto px-4 py-0 text-center">
          <div className="bg-white shadow-lg p-12 max-w-3xl mx-auto border-t-4 border-gray-200">
            
            {/* Ikon */}
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

            {/* BookCourtCTA inuti meddelandet */}
            <BookCourtCTA data={siteSettings?.bookCourt || {}} />
            
          </div>
        </div>
      )}
      </div>

      
      {hasAktiviteter && <BookCourtCTA data={siteSettings?.bookCourt || {}} />}
    </div>
  )
}