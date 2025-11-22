
export default {
  name: 'anmalan',
  title: 'Anmälan & Aktiviteter',
  type: 'document',
  fields: [
    {
      name: 'aktiviteter',
      title: 'Aktiviteter (Tennis & Padel)',
      type: 'array',
      description: 'Lägg till så många aktiviteter du vill – varje blir en knapp på sajten',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'titel',
              title: 'Titel på knappen',
              type: 'string',
              description: 'T.ex. "Tennislekis", "Tennisskola", etc..',
            },
            {
              name: 'url',
              title: 'Länk till anmälan',
              type: 'url',
              description: 'Lämna tomt = knappen visas inte',
            },
            {
              name: 'info',
              title: 'Text under knappen',
              type: 'string',
              description: 'T.ex. "4–6 år", "Torsdagar kl 18–20", "Nybörjare"',
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
}