import { ArrowRight } from 'lucide-react'

interface Props {
  data: {
    title?: string
    text?: string
    buttonText?: string
    url?: string
  }
}

export default function BookCourtCTA({ data }: Props) {
  return (
    <section className="bg-gray-50 border border-gray-100 p-12 md:p-16 text-center">
      <h2 className="text-3xl font-light text-gray-900 mb-4">
        {data.title || 'Spelsugen?'}
      </h2>
      <p className="text-gray-500 mb-8 max-w-lg mx-auto font-light">
        {data.text || 'Det finns tider tillgängliga för alla medlemmar, medlemskap är gratis!'}
      </p>
      <a
        href={data.url || 'https://www.matchi.se/facilities/tumbatk'}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center justify-center gap-2 px-10 py-4 bg-primary text-white text-sm font-medium hover:bg-secondary transition-colors shadow-sm uppercase tracking-wider"
      >
        {data.buttonText || 'BOKA BANA PÅ MATCHI.SE'}
        <ArrowRight className="w-4 h-4 ml-1" />
      </a>
    </section>
  )
}