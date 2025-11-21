import { useEffect, useState } from 'react'
import { client, urlFor } from '../lib/sanity'
import { PortableText } from '@portabletext/react'

export default function Padel() {
  const [data, setData] = useState<any>(null)

  useEffect(() => {
    client.fetch(`*[_type == "padelaktiviteter"][0]`).then(setData)
  }, [])

  if (!data) return <div className="p-8 text-center text-xl">Laddar...</div>

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-5xl font-bold text-orange-600 mb-8">Padelaktiviteter</h1>
      {data.image && (
        <img src={urlFor(data.image).width(1000).url()} alt="Padel" className="w-full rounded-xl shadow-2xl mb-10" />
      )}
      <div className="prose prose-lg max-w-none">
        <PortableText value={data.content} />
      </div>
    </div>
  )
}