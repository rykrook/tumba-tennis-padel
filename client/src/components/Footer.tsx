import { Instagram, Facebook } from 'lucide-react'
import { client } from '../lib/sanity'
import { useEffect, useState } from 'react'

export default function Footer() {
  const [settings, setSettings] = useState<any>(null)

  useEffect(() => {
    client.fetch(`*[_type == "siteSettings"][0]{instagram, facebook, currentTermin, holidayNote}`).then(setSettings)
  }, [])

  return (
    <footer className="bg-primary text-white py-8 mt-16">
      <div className="max-w-7xl mx-auto px-4 text-center">
        {settings?.currentTermin && (
          <p className="text-xl font-bold mb-2">{settings.currentTermin}</p>
        )}
        {settings?.holidayNote && (
          <p className="text-sm mb-6 opacity-90">{settings.holidayNote}</p>
        )}

        <div className="flex justify-center gap-8">
          {settings?.instagram && (
            <a href={settings.instagram} target="_blank" rel="noopener noreferrer" className="hover:opacity-70 transition">
              <Instagram className="w-8 h-8" />
            </a>
          )}
          {settings?.facebook && (
            <a href={settings.facebook} target="_blank" rel="noopener noreferrer" className="hover:opacity-70 transition">
              <Facebook className="w-8 h-8" />
            </a>
          )}
        </div>

        <p className="mt-8 text-sm opacity-75">
          © {new Date().getFullYear()} Tumba Tennis & Padel
        </p>
      </div>
    </footer>
  )
}