
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
              title: 'Aktivitet',
              type: 'string',
              description: 'T.ex. "Americano Torsdagar"',
            },
            {
              name: 'info',
              title: 'Info under knappen (nivå, tid, pris)',
              type: 'string',
            },
            {
              name: 'showForm',
              title: 'Visa anmälningsformulär?',
              type: 'boolean',
              initialValue: true,
            },
          ],
          preview: {
            select: {
              title: 'aktivitet',
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