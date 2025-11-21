export default {
  name: 'traningsdagar',
  title: 'Träningsdagar',
  type: 'document',
  fields: [
    {
      name: 'schedule',
      title: 'Schema',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'day', title: 'Dag', type: 'string' },
            { name: 'time', title: 'Tid', type: 'string' },
            { name: 'activity', title: 'Aktivitet', type: 'string' },
          ],
        },
      ],
    },
  ],
}
