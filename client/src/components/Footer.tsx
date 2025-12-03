import { Instagram, Facebook, Mail, Phone, MapPin } from 'lucide-react'
import { client } from '../lib/sanity'
import { useEffect, useState } from 'react'
import logo from '../assets/tumbatk.png'

interface KontaktData {
  address: string;
  phone: string;
  email: string;
}

export default function Footer() {
  const [settings, setSettings] = useState<any>(null)
  const [kontaktData, setKontaktData] = useState<KontaktData | null>(null)

  useEffect(() => {
    client.fetch(`*[_type == "siteSettings"][0]{instagram, facebook, currentTermin, holidayNote}`).then(setSettings)

    client.fetch(`*[_type == "kontakt"][0]{address, phone, email}`).then(setKontaktData)
  }, [])

  return (
    <footer className="bg-primary text-white py-12 mt-16">
      <div className="max-w-7xl mx-auto px-6">

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-16 border-b border-white/20 pb-10 mb-8">

          {/* 1. KLUBBINFO & TERMIN (Vänster) */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <img
              src={logo}
              alt="Tumba Tennisklubb Logotyp"
              className="h-16 w-16 mb-4"
            />
            <p className="text-xl font-bold tracking-wider mb-2">Tumba TK</p>

            {(settings?.currentTermin || settings?.holidayNote) && (
              <div className="mt-4 text-sm">
                {settings?.currentTermin && (
                  <p className="font-semibold mb-1">{settings.currentTermin}</p>
                )}
                {settings?.holidayNote && (
                  <p className="opacity-90 italic">{settings.holidayNote}</p>
                )}
              </div>
            )}
          </div>

          {/* 2. KONTAKTA OSS (Mitten) */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <h3 className="text-xl font-bold mb-4 border-b-2 border-accent pb-1">Kontakta oss</h3>

            <ul className="space-y-3">
              {kontaktData?.address && (
                <li className="flex items-start md:items-center gap-3">
                  <MapPin className="w-5 h-5 text-accent flex-shrink-0 mt-1 md:mt-0" />
                  <span className="text-base">{kontaktData.address}</span>
                </li>
              )}
              {kontaktData?.email && (
                <li className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-accent flex-shrink-0" />
                  <a href={`mailto:${kontaktData.email}`} className="text-base hover:text-accent transition">
                    {kontaktData.email}
                  </a>
                </li>
              )}
              {kontaktData?.phone && (
                <li className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-accent flex-shrink-0" />
                  <a href={`tel:${kontaktData.phone.replace(/\s/g, '')}`} className="text-base hover:text-accent transition">
                    {kontaktData.phone}
                  </a>
                </li>
              )}
            </ul>
          </div>

          {/* 3. FÖLJ OSS / SOCIALA MEDIER (Höger) */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <h3 className="text-xl font-bold mb-4 border-b-2 border-accent pb-1">Följ oss</h3>

            <div className="flex justify-center gap-6">
              {settings?.instagram && (
                <a href={settings.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="hover:text-accent transition">
                  <Instagram className="w-8 h-8" />
                </a>
              )}
              {settings?.facebook && (
                <a href={settings.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="hover:text-accent transition">
                  <Facebook className="w-8 h-8" />
                </a>
              )}
            </div>
          </div>
        </div>

        {/* UPPHOVSRÄTT / SLUT */}
        <div className="text-center">
          <p className="mt-4 text-sm opacity-75">
            © {new Date().getFullYear()} Tumba Tennisklubb. Alla rättigheter reserverade.
          </p>
        </div>

      </div>
    </footer>
  )
}