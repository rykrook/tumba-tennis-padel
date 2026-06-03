import { useEffect, useState } from 'react'
import { Mail, Phone, MapPin, Info, Send } from 'lucide-react'
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
          <div className="rounded-3xl overflow-hidden bg-white shadow-xl shadow-primary/10 border border-slate-100">
            <div className="relative overflow-hidden bg-gradient-to-br from-primary to-secondary px-6 md:px-8 py-7 text-white">
              {/* dekorativa cirklar */}
              <div className="absolute -right-8 -top-10 h-32 w-32 rounded-full bg-white/10" />
              <div className="absolute right-4 top-12 h-20 w-20 rounded-full bg-accent/20" />
              <div className="relative flex items-center gap-4">
                <div className="flex items-center justify-center h-12 w-12 rounded-2xl bg-white/15 backdrop-blur-sm shrink-0">
                  <Send className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-2xl font-display font-bold leading-tight">Skicka ett meddelande</h2>
                  <p className="text-white/80 text-sm">Vi svarar så snart vi kan</p>
                </div>
              </div>
            </div>
            <div className="p-6 md:p-8">
              <SignupForm activity="Kontakt" messageRequired />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
