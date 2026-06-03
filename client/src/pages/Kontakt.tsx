import { useEffect, useState } from 'react'
import { Mail, Phone, MapPin, Info } from 'lucide-react'
import { client } from '../lib/sanity'
import { PortableText, type PortableTextComponents } from '@portabletext/react'
import PageHeader from '../components/PageHeader'
import SignupForm from '../components/SignupForm'
import Spinner from '../components/Spinner'
import type { RichText } from '../lib/types'

interface BookingNotice {
  title: string
  text: string
  email?: string
}

interface KontaktData {
  address: string
  phone: string
  email: string
  content: RichText
  bookingNotice?: BookingNotice
}

const portableTextComponents: PortableTextComponents = {
  block: {
    normal: ({ children }) => <p className="text-slate-700 leading-relaxed mb-4">{children}</p>,
    h2: ({ children }) => <h2 className="text-2xl font-display font-bold text-primary mb-3 mt-6">{children}</h2>,
  },
  list: {
    bullet: ({ children }) => <ul className="list-disc list-inside space-y-1 pl-4 text-slate-700">{children}</ul>,
  },
}

export default function Kontakt() {
  const [kontaktData, setKontaktData] = useState<KontaktData | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    client
      .fetch(`*[_type == "kontakt"][0]{
        address, phone, email, content,
        bookingNotice { title, text, email }
      }`)
      .then((data) => {
        setKontaktData(data)
        setIsLoading(false)
      })
      .catch((err) => {
        console.error('Kunde inte hämta kontaktdata: ', err)
        setIsLoading(false)
      })
  }, [])

  if (isLoading) return <Spinner label="Laddar kontaktinformation…" />

  return (
    <div className="bg-surface min-h-screen">
      <PageHeader
        title="Kontakta oss"
        intro="Har du frågor om kurser, träningsdagar eller annat? Hör av dig så återkommer vi så snart vi kan."
      />

      <div className="container-page max-w-6xl py-12 md:py-16">
        <div className="grid md:grid-cols-2 gap-10 lg:gap-12">
          {/* Klubbinfo */}
          <div className="space-y-7">
            <h2 className="text-2xl font-display font-bold text-primary border-b border-accent/50 pb-3">Klubbinfo</h2>

            {kontaktData?.email && (
              <div className="flex items-start gap-4">
                <Mail className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-primary">E-post</h3>
                  <a href={`mailto:${kontaktData.email}`} className="text-slate-700 hover:text-accent transition">
                    {kontaktData.email}
                  </a>
                </div>
              </div>
            )}

            {kontaktData?.phone && (
              <div className="flex items-start gap-4">
                <Phone className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-primary">Telefon</h3>
                  <a href={`tel:${kontaktData.phone.replace(/\s/g, '')}`} className="text-slate-700 hover:text-accent transition">
                    {kontaktData.phone}
                  </a>
                </div>
              </div>
            )}

            {kontaktData?.address && (
              <div className="flex items-start gap-4">
                <MapPin className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-primary">Adress</h3>
                  <p className="text-slate-700 whitespace-pre-line">{kontaktData.address}</p>
                </div>
              </div>
            )}

            {kontaktData?.content && kontaktData.content.length > 0 && (
              <div className="pt-6 border-t border-slate-200">
                <PortableText value={kontaktData.content} components={portableTextComponents} />
              </div>
            )}

            {kontaktData?.bookingNotice?.title && (
              <div className="bg-cream border-l-4 border-accent p-5 rounded-r-xl shadow-sm">
                <div className="flex items-start gap-4">
                  <Info className="w-6 h-6 text-accent-dark mt-1 shrink-0" />
                  <div>
                    <h3 className="font-bold text-primary mb-1">{kontaktData.bookingNotice.title}</h3>
                    <p className="text-sm text-slate-700 mb-3 leading-relaxed">{kontaktData.bookingNotice.text}</p>
                    {kontaktData.bookingNotice.email && (
                      <div className="text-sm">
                        <span className="text-slate-700 font-medium">Kontakta istället: </span>
                        <a
                          href={`mailto:${kontaktData.bookingNotice.email}`}
                          className="font-bold text-accent-dark hover:text-primary underline underline-offset-2"
                        >
                          {kontaktData.bookingNotice.email}
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Kontaktformulär */}
          <div className="card border-t-4 border-t-accent p-6 md:p-10">
            <h3 className="text-2xl font-display font-bold text-primary mb-6">Skicka ett meddelande</h3>
            <SignupForm activity="Kontakt" messageRequired />
          </div>
        </div>
      </div>
    </div>
  )
}
