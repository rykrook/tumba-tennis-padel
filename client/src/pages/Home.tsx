import { useEffect, useState } from 'react'
import { client, urlFor } from '../lib/sanity'
import { PortableText } from '@portabletext/react'

export default function Home() {
  const [data, setData] = useState<any>(null)

  useEffect(() => {
    client.fetch(`*[_type == "homepage"][0]`).then(setData)
  }, [])

  if (!data) return <div className="p-8 text-center">Laddar...</div>

  return (
    <div className="max-w-5xl mx-auto p-6">
      {data.heroImage && (
        <img src={urlFor(data.heroImage).width(1200).url()} alt="Tumba Tennis & Padel" className="w-full rounded-xl shadow-2xl mb-10" />
      )}
      <h1 className="text-5xl font-bold text-green-700 mb-8">Välkommen till Tumba Tennis & Padel!</h1>
      {data.welcome && <PortableText value={data.welcome} />}
    </div>
  )
}