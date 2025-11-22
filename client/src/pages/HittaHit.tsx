import { useEffect, useState } from 'react'
import { client } from '../lib/sanity'

export default function HittaHit() {
  const [data, setData] = useState<any>(null)

  useEffect(() => {
    client.fetch(`*[_type == "hittaHit"][0]{address, mapEmbed}`).then(setData)
  }, [])

  if (!data) return <div className="p-8 text-center text-xl">Laddar karta...</div>

  return (
    <div className="px-4 py-8">
      <h1 className="text-4xl md:text-5xl font-bold text-primary mb-8 text-center">
        Hitta hit
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-4xl mx-auto">
       
        <div className="lg:col-span-2 w-full rounded-2xl overflow-hidden shadow-2xl">
          <div dangerouslySetInnerHTML={{ __html: data.mapEmbed || '' }} className="w-full h-96 md:h-[600px] lg:h-full min-h-96" />
        </div>

     
        <div className="flex flex-col justify-center space-y-6 text-gray-700">
          <div>
            <h2 className="text-2xl font-bold mb-2">Välkommen!</h2>
            <p className="text-lg font-semibold">
              {data.address || "Bryggarvägen 9, 147 30 Tumba"}
            </p>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-2">Hitta till oss</h3>
            <p className="text-base leading-relaxed">
              Hallen ligger precis ovanför Coop med gott om parkering. 
              
            </p>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-2">Med kollektivtrafik</h3>
            <p className="text-base">
              Pendeltåg till Tumba station → 5 min promenad
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}