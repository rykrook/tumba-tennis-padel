export default {
  name: 'tennis',
  title: 'Tennis – Hela sidan',
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
      initialValue: 'Tennis',
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

    // ANMÄLNINGAR
    {
      name: 'aktiviteter',
      title: 'Anmälan & Aktiviteter',
      type: 'array',
      description: 'Lägg till så många du vill – varje blir en knapp på Tennis-sidan',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'titel',
              title: 'Titel på knappen',
              type: 'string',
              description: 'T.ex. "Tennislekis", "Tennisskola", "Vuxentennis"',
            },
            {
              name: 'info',
              title: 'Text under knappen (ålder, tid, pris)',
              type: 'string',
              description: 'T.ex. "4–6 år", "Torsdagar 18–20"',
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
              description: 'Lämna tomt = knappen visas inte',
              hidden: ({ parent }: any) => parent?.anmalanTyp !== 'link',
            },
            {
              name: 'formText',
              title: 'Text ovanför formuläret (om "Kontaktformulär" vald)',
              type: 'string',
              description: 'T.ex. "Fyll i formuläret så kontaktar vi dig!"',
              hidden: ({ parent }: any) => parent?.anmalanTyp !== 'form',
            },
          ],
          preview: {
            select: {
              title: 'titel',
              subtitle: 'info',
            },
          },
        },
      ],
    },
  ],
  preview: {
    prepare() {
      return { title: 'Tennis – Hela sidan' }
    },
  },
}