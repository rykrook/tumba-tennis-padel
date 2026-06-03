import type { ReactNode } from 'react'
import { urlFor } from '../lib/sanity'
import type { SanityImage } from '../lib/types'

interface PageHeroProps {
  /** Sanity-bildkälla (används om ingen video finns) */
  image?: SanityImage
  /** Direkt video-URL (mp4) */
  videoUrl?: string
  /** Rubrik (utelämna om du skickar egen rubrik via children) */
  title?: string
  subtitle?: string
  /** 'full' = nästan helskärm (startsidan), 'short' = kompakt banner (undersidor) */
  height?: 'full' | 'short'
  /** Lägg hjälten under den transparenta menyn (startsidan) */
  overlapNav?: boolean
  /** Extra innehåll (t.ex. knappar) under rubriken */
  children?: ReactNode
}

export default function PageHero({
  image,
  videoUrl,
  title,
  subtitle,
  height = 'short',
  overlapNav = false,
  children,
}: PageHeroProps) {
  const heightClass = height === 'full' ? 'h-[88vh] min-h-[520px]' : 'h-[200px] md:h-[280px]'
  const overlapClass = overlapNav ? '-mt-20 pt-20' : ''

  return (
    <section className={`relative ${heightClass} ${overlapClass} flex items-center justify-center overflow-hidden`}>
      {videoUrl ? (
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src={videoUrl} type="video/mp4" />
        </video>
      ) : image ? (
        <img
          src={urlFor(image).width(1920).url()}
          alt={title || ''}
          className="absolute inset-0 w-full h-full object-cover"
        />
      ) : (
        <div className="absolute inset-0 bg-primary" />
      )}

      {/* Mjuk gradient istället för platt svart overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/80 via-primary/45 to-primary/70" />

      <div className="relative z-10 text-center px-6 max-w-5xl animate-fadeIn">
        {title && (
          <h1 className="font-display font-extrabold text-white drop-shadow-lg leading-tight tracking-tight text-4xl sm:text-5xl md:text-6xl lg:text-7xl">
            {title}
          </h1>
        )}
        {subtitle && (
          <p className="mt-5 text-lg md:text-2xl text-white/90 font-medium max-w-3xl mx-auto drop-shadow">
            {subtitle}
          </p>
        )}
        {children && <div className="mt-8 flex flex-wrap items-center justify-center gap-4">{children}</div>}
      </div>
    </section>
  )
}
