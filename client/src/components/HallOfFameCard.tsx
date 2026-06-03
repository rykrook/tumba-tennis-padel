import { Trophy } from 'lucide-react'

interface Member {
  name: string
  year: string
  imageUrl?: string
}

/**
 * Presentationskort för Hall of Fame. Rent visuellt – navigeringen sköts
 * av föräldern (<Link> till medlemssidan), så kortet är ingen egen knapp.
 */
export default function HallOfFameCard({ member }: { member: Member }) {
  return (
    <div className="group relative h-full rounded-2xl overflow-hidden shadow-soft border border-slate-100 bg-white">
      <div className="aspect-[3/4] overflow-hidden bg-slate-100">
        {member.imageUrl ? (
          <img
            src={member.imageUrl}
            alt={member.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-primary/5">
            <Trophy className="w-16 h-16 text-accent/40" />
          </div>
        )}
      </div>

      {/* Namn + årtal som overlay längst ner */}
      <div className="absolute inset-x-0 bottom-0 p-5 pt-14 bg-gradient-to-t from-primary via-primary/55 to-transparent">
        <span className="inline-block mb-2 px-2.5 py-0.5 rounded-full bg-accent text-primary text-xs font-bold">
          Invald {member.year}
        </span>
        <h3 className="text-xl font-display font-bold text-white leading-tight drop-shadow">{member.name}</h3>
      </div>
    </div>
  )
}
