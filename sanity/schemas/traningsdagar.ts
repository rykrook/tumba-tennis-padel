export default {
    name: 'traningsdagar',
    title: 'Träningsdagar',
    type: 'document',
    fields: [
        {
            name: 'termin',
            title: 'Termin',
            type: 'string',
            description: 'T.ex. "Vårterminen 2026"',
        },
        {
            name: 'datumPerManad',
            title: 'Träningsdatum (Månadsvis)',
            type: 'array',
            description: 'Lista över träningsdagar, organiserade per månad. Fylls i med månad och datum.',
            of: [
                {
                    type: 'object',
                    name: 'manad',
                    fields: [
                        {
                            name: 'manadsNamn',
                            title: 'Månad',
                            type: 'string',
                            validation: (Rule: any) => Rule.required(),
                        },
                        {
                            name: 'datumLista',
                            title: 'Datum i denna månad',
                            type: 'array',
                            description: 'Lägg till varje träningsdag i denna månad. T.ex. "Tis 14/1".',
                            of: [{ type: 'string' }],
                            validation: (Rule: any) => Rule.required().min(1),
                        },
                    ],
                    preview: {
                        select: {
                            title: 'manadsNamn',
                            subtitle: 'datumLista.length',
                        },
                        prepare({ title, subtitle }: { title: string, subtitle: number }) {
                            return {
                                title: title || 'Ny Månad',
                                subtitle: subtitle ? `${subtitle} träningsdagar` : 'Inga datum',
                            }
                        }
                    }
                }
            ]
        },

        {
            name: 'note',
            title: 'Lovnotering',
            type: 'string',
            description: 'T.ex. "Sportlov vecka 9 · Påsklov vecka 16"',
        },
    ],
}