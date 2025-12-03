import { useEffect, useState } from 'react'
import { Mail, Phone, MapPin } from 'lucide-react'
import { client } from '../lib/sanity'
import { PortableText, type PortableTextComponents } from '@portabletext/react'

// **IMPORTERA EMAILJS CLIENT SDK**
import emailjs from '@emailjs/browser'

interface KontaktData {
  address: string;
  phone: string;
  email: string;
  content: any[];
}

interface FormData {
  name: string;
  email: string;
  phone: string;
  message: string;
  honeypot: string;
}

// Hämta nycklar från miljövariablerna (måste ha VITE_ prefix i Vite)
const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID as string
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID as string
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY as string


// Komponenten för Portable Text (oförändrad)
const portableTextComponents: PortableTextComponents = {
  block: {
    normal: ({ children }) => <p className="text-gray-700 leading-relaxed mb-4">{children}</p>,
    h2: ({ children }) => <h2 className="text-2xl font-bold text-primary mb-3 mt-6">{children}</h2>,
  },
  list: {
    bullet: ({ children }) => <ul className="list-disc list-inside space-y-1 pl-4 text-gray-700">{children}</ul>,
  }
}


export default function Kontakt() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    message: '',
    honeypot: '',
  })
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')
  const [kontaktData, setKontaktData] = useState<KontaktData | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // HÄMTA KONTAKTDATA FRÅN SANITY (oförändrad)
  useEffect(() => {
    const query = `*[_type == "kontakt"][0]{
        address,
        phone,
        email,
        content
      }`

    client.fetch(query).then((data) => {
      setKontaktData(data)
      setIsLoading(false)
    }).catch((err) => {
      console.error("Kunde inte hämta kontaktdata: ", err)
      setIsLoading(false)
    })
  }, [])

  // Hanterar alla input-förändringar (oförändrad)
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  // **UPPDATERAD FORMULÄR SUBMIT LOGIK - Använder EmailJS Client SDK**
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.honeypot) return // HONEYPOT KONTROLL

    // Validering av nycklar
    if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
        console.error("EmailJS-nycklar saknas i miljövariablerna!")
        setStatus('error')
        return
    }

    setStatus('sending')

    // Förbered data som matchar din EmailJS-mall-variabler (t.ex. {{user_name}})
    const templateParams = {
        user_name: formData.name,
        user_email: formData.email,
        user_phone: formData.phone || 'Inget telefonnummer',
        user_message: formData.message,
        aktivitet: 'Kontakt',
        subject_line: `Ny kontaktförfrågan: ${formData.name}`,
    };


    try {
        // Skicka mail direkt via EmailJS
        const res = await emailjs.send(
            SERVICE_ID, 
            TEMPLATE_ID, 
            templateParams, 
            { publicKey: PUBLIC_KEY } // Autentiseras med Public Key
        )

        if (res.status === 200) {
            console.log('Mail skickat framgångsrikt!', res.text);
            setStatus('success')
            // Rensa formuläret
            setFormData({ name: '', email: '', phone: '', message: '', honeypot: '' })
        } else {
            console.error('EmailJS svarade med felkod:', res.status, res.text)
            setStatus('error')
        }
    } catch (error) {
        console.error('EmailJS fel (Client-side):', error)
        setStatus('error')
    }
  }

  // Laddnings- eller fel-state (oförändrad)
  if (isLoading) {
    return (
      <div className="bg-gray-50 pt-20 mt-[-5rem] min-h-screen flex items-center justify-center">
        <p className="text-xl text-primary">Laddar kontaktinformation...</p>
      </div>
    )
  }


  return (
    // ... (resten av return-koden är oförändrad)
    <div className="bg-gray-50 pt-20 mt-[-5rem] min-h-screen">
      <div className="max-w-6xl mx-auto px-4 py-16">
        <h1 className="text-5xl md:text-6xl font-black text-primary text-center mb-6">
          Kontakta oss
        </h1>

        <p className="text-xl text-gray-700 text-center max-w-3xl mx-auto mb-12">
          Har du frågor om kurser, bokningar eller tider? Fyll i formuläret så återkommer vi så snart som möjligt.
        </p>

        <div className="grid md:grid-cols-2 gap-12">

          {/* 1. KLUBBINFO & EXTRA INFO (Dynamisk från Sanity) */}
          <div className="space-y-8 p-8 md:p-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-6 border-b border-accent/50 pb-3">Klubbinfo</h2>

            {/* E-POST */}
            {kontaktData?.email && (
              <div className="flex items-start space-x-4">
                <Mail className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-lg font-semibold text-primary">E-post</h3>
                  <a href={`mailto:${kontaktData.email}`} className="text-gray-700 hover:text-accent transition">
                    {kontaktData.email}
                  </a>
                </div>
              </div>
            )}

            {/* TELEFON */}
            {kontaktData?.phone && (
              <div className="flex items-start space-x-4">
                <Phone className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-lg font-semibold text-primary">Telefon</h3>
                  <a href={`tel:${kontaktData.phone.replace(/\s/g, '')}`} className="text-gray-700 hover:text-accent transition">
                    {kontaktData.phone}
                  </a>
                </div>
              </div>
            )}

            {/* ADRESS */}
            {kontaktData?.address && (
              <div className="flex items-start space-x-4">
                <MapPin className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-lg font-semibold text-primary">Adress</h3>
                  <p className="text-gray-700 whitespace-pre-line">
                    {kontaktData.address}
                  </p>
                </div>
              </div>
            )}

            {/* EXTRA INFO FRÅN SANITY */}
            {kontaktData?.content && kontaktData.content.length > 0 && (
              <div className="pt-8 border-t border-gray-200">
                <PortableText value={kontaktData.content} components={portableTextComponents} />
              </div>
            )}

          </div>

          {/* 2. KONTAKTFORMULÄR */}
          <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 border-t-4 border-accent">
            {status === 'success' ? (
              <div className="text-center py-12">
                <h2 className="text-3xl font-bold text-green-600 mb-4">
                  Tack för ditt meddelande!
                </h2>
                <p className="text-lg">Vi hör av oss snart</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3">
                <h3 className="text-2xl font-bold text-primary mb-6">Skicka ett meddelande</h3>

                {/* HONEYPOT */}
                <input type="text" name="honeypot" value={formData.honeypot} onChange={handleChange} className="hidden" />

                <input
                  type="text"
                  name="name"
                  placeholder="Namn *"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-5 py-2 border border-gray-300 rounded-xl focus:ring-4 focus:ring-primary/20 focus:border-primary focus:outline-none text-base transition duration-200"
                />

                <input
                  type="email"
                  name="email"
                  placeholder="E-post *"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-5 py-2 border border-gray-300 rounded-xl focus:ring-4 focus:ring-primary/20 focus:border-primary focus:outline-none text-base transition duration-200"
                />

                <input
                  type="tel"
                  name="phone"
                  placeholder="Telefon (valfritt)"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-5 py-2 border border-gray-300 rounded-xl focus:ring-4 focus:ring-primary/20 focus:border-primary focus:outline-none text-base transition duration-200"
                />

                <textarea
                  name="message"
                  placeholder="Meddelande *"
                  required
                  rows={3}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-5 py-2 border border-gray-300 rounded-xl focus:ring-4 focus:ring-primary/20 focus:border-primary focus:outline-none text-base resize-none transition duration-200"
                />

                <div className="text-center pt-4">
                  <button
                    type="submit"
                    disabled={status === 'sending'}
                    className="inline-flex items-center justify-center gap-2 px-10 py-2 bg-primary text-white text-sm font-medium hover:bg-secondary transition-colors shadow-sm uppercase tracking-wider"
                  >
                    {status === 'sending' ? 'Skickar...' : 'Skicka meddelande'}
                  </button>
                </div>

                {status === 'error' && (
                  <p className="text-center text-red-600 font-medium pt-2">
                    Något gick fel – prova igen!
                  </p>
                )}
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}