import { ArrowRight } from 'lucide-react'

interface Props {
  data: {
    title?: string
    text?: string
    buttonText?: string
    url?: string
  }
  /** Utan egen sektionsbakgrund – för inbäddning i andra kort */
  bare?: boolean
}

export default function BookCourtCTA({ data, bare = false }: Props) {
  const inner = (
    <>
      <h2 className="text-3xl md:text-4xl font-display font-bold text-primary mb-3">
        {data.title || 'Spelsugen?'}
      </h2>
      <p className="text-slate-600 mb-8 max-w-lg mx-auto">
        {data.text || 'Det finns lediga tider för alla medlemmar – och medlemskap är gratis!'}
      </p>
      <a
        href={data.url || 'https://www.matchi.se/facilities/tumbatk'}
        target="_blank"
        rel="noopener noreferrer"
        className="btn-primary"
      >
        {data.buttonText || 'Boka bana på Matchi.se'}
        <ArrowRight className="w-4 h-4" />
      </a>
    </>
  )

  if (bare) {
    return <div className="text-center">{inner}</div>
  }

  return (
    <section className="section bg-cream">
      <div className="container-page text-center">{inner}</div>
    </section>
  )
}
