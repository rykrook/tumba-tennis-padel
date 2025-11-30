import { Instagram, Facebook } from 'lucide-react'
import { client } from '../lib/sanity'
import { useEffect, useState } from 'react'
import logo from '../assets/tumbatk.png'

export default function Footer() {
  const [settings, setSettings] = useState<any>(null)

  useEffect(() => {
    client.fetch(`*[_type == "siteSettings"][0]{instagram, facebook, currentTermin, holidayNote}`).then(setSettings)
  }, [])

  return (
    <footer className="bg-primary text-white py-12 mt-16">
      <div className="max-w-7xl mx-auto px-4 text-center flex flex-col items-center">

        {(settings?.currentTermin || settings?.holidayNote) && (
          <div className="mb-6">
            {settings?.currentTermin && (
              <p className="text-xl font-bold mb-2">{settings.currentTermin}</p>
            )}
            {settings?.holidayNote && (
              <p className="text-sm opacity-90">{settings.holidayNote}</p>
            )}
          </div>
        )}

        <div className="flex justify-center gap-8 mb-8">
          {settings?.instagram && (
            <a href={settings.instagram} target="_blank" rel="noopener noreferrer" className="hover:opacity-70 transition">
              <Instagram className="w-7 h-7" />
            </a>
          )}
          {settings?.facebook && (
            <a href={settings.facebook} target="_blank" rel="noopener noreferrer" className="hover:opacity-70 transition">
              <Facebook className="w-7 h-7" />
            </a>
          )}
        </div>

        <p className="mt-4 text-sm opacity-75 border-t border-white/10 pt-4 w-full max-w-sm">
          © {new Date().getFullYear()} Tumba Tennisklubb
        </p>

        <img
          src={logo}
          alt="Tumba TK"
          className="h-14 w-14 mt-6 opacity-80"
        />

      </div>
    </footer>
  )
}