import type { LucideIcon } from 'lucide-react'

interface PageHeaderProps {
  title: string
  intro?: string
  Icon?: LucideIcon
}

/**
 * Ljus rubrikbanner för undersidor. Ger en konsekvent topp utan att
 * behöva överlappa menyn (ersätter den gamla `mt-[-5rem] pt-20`-hacken).
 */
export default function PageHeader({ title, intro, Icon }: PageHeaderProps) {
  return (
    <header className="bg-gradient-to-b from-primary to-primary-dark text-white">
      <div className="container-page py-14 md:py-20 text-center">
        <h1 className="font-display font-extrabold text-4xl md:text-5xl lg:text-6xl tracking-tight flex items-center justify-center gap-3 flex-wrap">
          {Icon && <Icon className="w-9 h-9 md:w-11 md:h-11 text-accent" />}
          {title}
        </h1>
        {intro && (
          <p className="mt-5 text-lg md:text-xl text-white/85 max-w-3xl mx-auto leading-relaxed">
            {intro}
          </p>
        )}
      </div>
    </header>
  )
}
