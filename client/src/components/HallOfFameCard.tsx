import { PortableText } from '@portabletext/react'
import { useState } from 'react'
import { X, Trophy } from 'lucide-react'

interface Member {
    name: string
    year: string
    imageUrl?: string
    description?: any[]
}

export default function HallOfFameCard({ member }: { member: Member }) {
    const [isOpen, setIsOpen] = useState(false)

    const modalProseStyle = `
        prose prose-lg max-w-none mx-auto text-gray-700 mt-8 
        prose-headings:text-primary prose-headings:font-extrabold 
        prose-p:text-lg prose-p:leading-relaxed
    `;

    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                className="group block w-full text-left"
            >
                <div className="
                    bg-white shadow-lg overflow-hidden text-center transition transform duration-200 /* Ingen rundning här */
                    group-hover:scale-[1.03] 
                    group-hover:shadow-2xl 
                ">
                    {member.imageUrl ? (
                        <img
                            src={member.imageUrl}
                            alt={member.name}
                            className="w-full h-72 object-cover border-b-4 border-accent transition duration-300 group-hover:border-primary" 
                        />
                    ) : (
                        <div className="bg-gray-100 h-72 flex items-center justify-center">
                            <Trophy className="w-16 h-16 text-accent/50" />
                        </div>
                    )}

                    {/* Textinnehåll */}
                    <div className="p-6">
                        <h3 className="text-2xl font-extrabold text-primary mb-1">{member.name}</h3> 
                        <p className="text-lg font-medium text-gray-600 border-t border-gray-100 pt-2 mt-2">
                            Invald: <span className="text-accent font-bold">{member.year}</span>
                        </p>
                    </div>
                </div>
            </button>

            {/* MODAL */}
            {isOpen && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 px-4 transition-opacity duration-300"
                    onClick={() => setIsOpen(false)}
                >
                    <div
                        className="bg-white rounded-none shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto transform scale-100 transition-transform duration-300" 
                        onClick={e => e.stopPropagation()}
                    >

                        {/* Stängningsknapp (Över bild) */}
                        <div className="absolute top-4 right-4 z-10">
                            <button
                                onClick={() => setIsOpen(false)}
                                className="p-2 bg-white/70 backdrop-blur-sm text-gray-800 hover:bg-white transition-colors shadow-lg rounded-full"
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        {member.imageUrl && (
                           <img
                                src={member.imageUrl}
                                alt={member.name}
                                className="w-full h-auto max-h-[60vh] object-contain border-b-4 border-accent mx-auto"
                            />
                        )}

                        <div className="p-8 md:p-12">
                            {/* Rubrik */}
                            <h2 className="text-4xl md:text-5xl font-black text-primary text-center mb-2 leading-tight">
                                {member.name}
                            </h2>
                            {/* Årtal */}
                            <p className="text-xl font-bold text-accent text-center mb-8 border-b border-gray-100 pb-6">
                                Invald {member.year}
                            </p>

                            {/* Beskrivning */}
                            {member.description && member.description.length > 0 ? (
                                <div className={modalProseStyle}>
                                    <PortableText value={member.description} />
                                </div>
                            ) : (
                                <p className="text-center text-gray-500 italic mt-8">
                                    Ingen beskrivning tillgänglig
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}