import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

interface Props {
  data: {
    title?: string
    tennisTitle?: string
    tennisText?: string
    padelTitle?: string
    padelText?: string
  }
}

export default function KeyServicesCTA({ data }: Props) {
  const cards = [
    {
      to: '/tennis',
      title: data.tennisTitle || 'Vår tennis',
      text: data.tennisText || 'Läs allt om våra träningsgrupper och kurser för barn och vuxna.',
      cta: 'Utforska tennis',
    },
    {
      to: '/padel',
      title: data.padelTitle || 'Vår padel',
      text: data.padelText || 'Hitta tider och information om padel hos oss.',
      cta: 'Utforska padel',
    },
  ]

  return (
    <section className="section bg-primary text-white">
      <div className="container-page text-center">
        <h2 className="text-3xl md:text-4xl font-display font-bold mb-12">
          {data.title || 'Vad vill du spela idag?'}
        </h2>

        <div className="grid md:grid-cols-2 gap-6 md:gap-8 max-w-4xl mx-auto">
          {cards.map((c) => (
            <Link
              key={c.to}
              to={c.to}
              className="group flex flex-col items-center text-center p-8 rounded-2xl bg-white/5 border border-white/15 hover:bg-white/10 hover:border-accent/50 transition-all duration-300"
            >
              <h3 className="text-2xl font-display font-bold mb-2">{c.title}</h3>
              <p className="text-white/75 max-w-sm mb-6">{c.text}</p>
              <span className="inline-flex items-center gap-2 font-semibold text-accent group-hover:gap-3 transition-all">
                {c.cta}
                <ArrowRight className="w-5 h-5" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
