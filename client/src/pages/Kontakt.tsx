import { useEffect, useState } from 'react'
import { client } from '../lib/sanity'

export default function Kontakt() {
  const [data, setData] = useState<any>(null)

  useEffect(() => {
    client.fetch(`*[_type == "kontakt"][0]`).then(setData)
  }, [])

  if (!data) return <div className="p-8 text-center text-xl">Laddar...</div>

  return (
    <div className="max-w-4xl mx-auto px-4 py-16 text-center">
      <h1 className="text-5xl md:text-6xl font-black text-primary mb-12">
        Kontakt
      </h1>
      <div className="bg-white rounded-xl shadow-2xl p-8 grid md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-bold mb-4">Kontaktuppgifter</h2>
          <p className="text-lg mb-2"><strong>Adress:</strong> {data.address}</p>
          <p className="text-lg mb-2"><strong>Telefon:</strong> <a href={`tel:${data.phone}`} className="text-primary hover:underline">{data.phone}</a></p>
          <p className="text-lg mb-6"><strong>E-post:</strong> <a href={`mailto:${data.email}`} className="text-primary hover:underline">{data.email}</a></p>
        </div>
        <div>
          <h2 className="text-2xl font-bold mb-4">Skicka meddelande</h2>
          <form className="space-y-4">
            <input type="text" placeholder="Namn" className="w-full p-3 border rounded-lg" required />
            <input type="email" placeholder="E-post" className="w-full p-3 border rounded-lg" required />
            <textarea placeholder="Meddelande" rows={5} className="w-full p-3 border rounded-lg" required></textarea>
            <button type="submit" className="bg-secondary text-white px-6 py-3 rounded-lg hover:bg-primary transition">
              Skicka meddelande
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}