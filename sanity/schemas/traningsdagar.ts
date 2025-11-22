export default {
  name: 'traningsdagar',
  title: 'Träningsdagar',
  type: 'document',
  fields: [
    {
      name: 'termin',
      title: 'Termin',
      type: 'string',
      description: 'T.ex. "Vårterminen 2025"',
    },
    {
      name: 'dates',
      title: 'Träningsdagar',
      type: 'object',
      fields: [
        { name: 'man', title: 'Måndagar', type: 'string' },
        { name: 'tis', title: 'Tisdagar', type: 'string' },
        { name: 'ons', title: 'Onsdagar', type: 'string' },
        { name: 'tor', title: 'Torsdagar', type: 'string' },
        { name: 'fre', title: 'Fredagar', type: 'string' },
        { name: 'lor', title: 'Lördagar', type: 'string' },
        { name: 'son', title: 'Söndagar', type: 'string' },
      ],
    },
    {
      name: 'note',
      title: 'Lovnotering',
      type: 'string',
      description: 'T.ex. "Sportlov vecka 9 · Påsklov vecka 16"',
    },
  ],
}