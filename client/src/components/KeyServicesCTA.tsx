import { Link } from 'react-router-dom'

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
  return (
    <section className="py-20 bg-primary/95 text-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-10 md:mb-16">
          {data.title || 'Vad vill du spela idag?'}
        </h2>

        <div className="grid md:grid-cols-2 gap-8 md:gap-12">
          <Link
            to="/tennis"
            className="group flex flex-col items-center justify-center p-8 border-2 border-accent rounded-lg bg-white/5 hover:bg-white/10 transition-all duration-300 transform hover:scale-[1.02]"
          >
            <h3 className="text-2xl md:text-3xl font-extrabold mb-2 text-white">
              {data.tennisTitle || 'VÅR TENNIS'}
            </h3>
            <p className="text-white/80 max-w-sm mb-6">
              {data.tennisText || 'Läs allt om våra träningsgrupper och kurser.'}
            </p>
            <span className="text-accent font-semibold flex items-center gap-2 border-b-2 border-accent/50 group-hover:border-accent transition-colors">
              Utforska Tennis
            </span>
          </Link>

          <Link
            to="/padel"
            className="group flex flex-col items-center justify-center p-8 border-2 border-accent rounded-lg bg-white/5 hover:bg-white/10 transition-all duration-300 transform hover:scale-[1.02]"
          >
            <h3 className="text-2xl md:text-3xl font-extrabold mb-2 text-white">
              {data.padelTitle || 'VÅR PADEL'}
            </h3>
            <p className="text-white/80 max-w-sm mb-6">
              {data.padelText || 'Hitta tider och information om padel hos oss.'}
            </p>
            <span className="text-accent font-semibold flex items-center gap-2 border-b-2 border-accent/50 group-hover:border-accent transition-colors">
              Utforska Padel
            </span>
          </Link>
        </div>
      </div>
    </section>
  )
}