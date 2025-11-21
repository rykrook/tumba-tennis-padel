import { useEffect, useState } from 'react'
import { client } from '../lib/sanity'

export default function HittaHit() {
  const [data, setData] = useState<any>(null)

  useEffect(() => {
    client.fetch(`*[_type == "hittaHit"][0]`).then(setData)
  }, [])

  if (!data) return <div className="p-8 text-center text-xl">Laddar...</div>

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-5xl font-bold text-green-700 mb-8">Hitta hit</h1>
      <div className="bg-white rounded-xl shadow-2xl p-6">
        <p className="text-xl mb-6"><strong>Adress:</strong> {data.address}</p>
        <div 
          dangerouslySetInnerHTML={{ __html: data.mapEmbed || '' }} 
          className="w-full h-96 rounded-lg overflow-hidden"
        />
      </div>
    </div>
  )
}