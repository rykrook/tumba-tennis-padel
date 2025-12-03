import { ArrowRight } from 'lucide-react'

interface Props {
  data: {
    buttonText?: string
    url?: string
  }
}

export default function BookCourtHeroButton({ data }: Props) {
  return (
    <a
      href={data.url || 'https://www.matchi.se/facilities/tumbatk'}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center justify-center gap-2 
                 px-10 py-4 
                 bg-transparent  // Transparent bakgrund
                 text-white      // Vit text
                 border-2 border-white // Vit kantlinje
                 text-sm font-medium 
                 hover:bg-white  // Vid hover, fyll med vit bakgrund
                 hover:text-primary // Och byt till primary-färg på texten för kontrast
                 transition-colors 
                 shadow-md 
                 uppercase tracking-wider"
    >
      {data.buttonText || 'BOKA BANA PÅ MATCHI.SE'}
      <ArrowRight className="w-4 h-4 ml-1" />
    </a>
  )
}