import { useEffect, useState } from 'react'
import { client } from '../lib/sanity'
import botvid from '../assets/botvid.png'

export default function KommunBanner() {
  const [showBanner, setShowBanner] = useState(true)

  useEffect(() => {
    client
      .fetch(`*[_type == "siteSettings"][0]{showKommunBanner}`)
      .then((data) => {
        if (data && data.showKommunBanner === false) {
          setShowBanner(false)
        }
      })
  }, [])

  if (!showBanner) return null

  return (
    <div className="bg-accent/10 border-b-4 border-accent py-3">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-center gap-3 flex-wrap text-center">
        <img src={botvid} alt="Botkyrka kommun" className="h-9 md:h-10" />
        <p className="text-xs md:text-sm font-bold text-primary leading-tight">
          Från 1 september 2025 driver <span className="text-red-700">Botkyrka kommun</span> anläggningen →{' '}
          <a href="https://www.botkyrka.se/uppleva-och-gora/idrott-och-motion/har-kan-du-trana/idrottsanlaggningar/tumba/tumba-tennis-och-padelhall" target="_blank" rel="noopener noreferrer" className="underline hover:text-secondary font-bold">
            botkyrka.se
          </a>
        </p>
      </div>
    </div>
  )
}