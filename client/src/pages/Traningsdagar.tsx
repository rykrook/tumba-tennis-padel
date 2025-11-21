import { useEffect, useState } from 'react'
import { client } from '../lib/sanity'

export default function Traningsdagar() {
  const [schedule, setSchedule] = useState<any[]>([])

  useEffect(() => {
    client.fetch(`*[_type == "traningsdagar"][0].schedule`).then(setSchedule)
  }, [])

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-5xl font-bold text-green-700 mb-10">Träningsdagar</h1>
      <div className="bg-white rounded-xl shadow-2xl overflow-hidden">
        <table className="w-full">
          <thead className="bg-green-600 text-white">
            <tr>
              <th className="p-4 text-left">Dag</th>
              <th className="p-4 text-left">Tid</th>
              <th className="p-4 text-left">Aktivitet</th>
            </tr>
          </thead>
          <tbody>
            {schedule.map((s: any, i: number) => (
              <tr key={i} className={i % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                <td className="p-4 font-semibold">{s.day}</td>
                <td className="p-4">{s.time}</td>
                <td className="p-4">{s.activity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}