export default {
  name: 'padelaktivitet',
  title: 'Padel – Sidan & Anmälan',
  type: 'document',
  fields: [
    {
      name: 'heroImage',
      title: 'Huvudbild (om ingen video)',
      type: 'image',
      options: { hotspot: true },
    },
    {
      name: 'heroTitle',
      title: 'Stor titel på hero',
      type: 'string',
      initialValue: 'Padel',
    },
    {
      name: 'backgroundVideo',
      title: 'Bakgrundsvideo (hero)',
      type: 'file',
      options: { accept: 'video/mp4' },
      description: 'Ladda upp en MP4 – visas istället för bild',
    },
    {
      name: 'content',
      title: 'Text under hero',
      type: 'array',
      of: [{ type: 'block' }],
    },

    {
      name: 'aktiviteter',
      title: 'Aktiviteter & Anmälan',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'aktivitet',
              title: 'Aktivitet / Titel',
              type: 'string',
              description: 'T.ex. "Americano Torsdagar"',
            },
            {
              name: 'info',
              title: 'Info under knappen (nivå, tid, pris)',
              type: 'string',
            },
            {
              name: 'anmalanTyp',
              title: 'Typ av anmälan',
              type: 'string',
              options: {
                list: [
                  { title: 'Länk (Matchi etc.)', value: 'link' },
                  { title: 'Kontaktformulär', value: 'form' },
                ],
                layout: 'radio',
              },
              initialValue: 'link',
            },
            {
              name: 'url',
              title: 'Länk (om "Länk" vald)',
              type: 'url',
              hidden: ({ parent }: any) => parent?.anmalanTyp !== 'link',
            },
            {
              name: 'formText',
              title: 'Text ovanför formuläret (om "Kontaktformulär" vald)',
              type: 'string',
              description: 'T.ex. "Fyll i formuläret så kontaktar vi dig!"',
              hidden: ({ parent }: any) => parent?.anmalanTyp !== 'form',
            },
            {
              name: 'detaljer',
              title: 'Detaljerad beskrivning (Valfritt)',
              type: 'array',
              of: [{ type: 'block' }],
              description: 'Längre information om tider, förkunskaper och upplägg',
            },
          ],
          preview: {
            select: {
              title: 'aktivitet',
              subtitle: 'info',
            },
          },
        },
      ],
    },
  ],
  preview: {
    prepare() {
      return { title: 'Padel – Sidan & Anmälan' }
    },
  },
}