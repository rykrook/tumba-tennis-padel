import { useEffect, useState } from 'react'
import { client, urlFor } from '../lib/sanity'
import { PortableText } from '@portabletext/react'

export default function Tennis() {
  const [data, setData] = useState<any>(null)

  useEffect(() => {
    client.fetch(`*[_type == "tennisskola"][0]`).then(setData)
  }, [])

  if (!data) return <div className="p-8 text-center text-xl">Laddar...</div>

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-5xl font-bold text-green-700 mb-8">Tennisskola</h1>
      {data.image && (
        <img src={urlFor(data.image).width(1000).url()} alt="Tennisskola" className="w-full rounded-xl shadow-2xl mb-10" />
      )}
      <div className="prose prose-lg max-w-none">
        <PortableText value={data.content} />
      </div>
    </div>
  )
}