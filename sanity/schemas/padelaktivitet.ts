
export default {
  name: 'padelaktivitet',
  title: 'Padel – Anmälan & Aktiviteter',
  type: 'document',
  fields: [
    {
      name: 'aktiviteter',
      title: 'Aktiviteter',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'aktivitet',
              title: 'Aktivitet',
              type: 'string',
              description: 'T.ex. "Americano Torsdagar" eller "Nybörjarkurs"',
            },
            {
              name: 'info',
              title: 'Info under knappen (nivå, tid, pris etc.)',
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
}