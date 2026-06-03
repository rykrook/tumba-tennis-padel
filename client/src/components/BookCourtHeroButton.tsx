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
      className="btn-outline"
    >
      {data.buttonText || 'Boka bana på Matchi.se'}
      <ArrowRight className="w-4 h-4" />
    </a>
  )
}
