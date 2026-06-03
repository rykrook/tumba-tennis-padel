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
    <div className="bg-cream border-b border-accent/40 py-2.5">
      <div className="container-page flex items-center justify-center gap-3 flex-wrap text-center">
        <img src={botvid} alt="Botkyrka kommun" className="h-8 md:h-9" />
        <p className="text-xs md:text-sm font-semibold text-primary leading-tight">
          Från 1 september 2025 driver Botkyrka kommun anläggningen →{' '}
          <a
            href="https://www.botkyrka.se/uppleva-och-gora/idrott-och-motion/har-kan-du-trana/idrottsanlaggningar/tumba/tumba-tennis-och-padelhall"
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-2 hover:text-secondary font-bold"
          >
            botkyrka.se
          </a>
        </p>
      </div>
    </div>
  )
}