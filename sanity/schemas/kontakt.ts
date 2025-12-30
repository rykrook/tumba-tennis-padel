export default {
  name: 'kontakt',
  title: 'Kontakt',
  type: 'document',
  fields: [
    { name: 'address', title: 'Adress', type: 'string' },
    { name: 'phone', title: 'Telefon', type: 'string' },
    { name: 'email', title: 'E-post', type: 'string' },
    {
      name: 'bookingNotice',
      title: 'Viktigt meddelande (Ovanför formulär)',
      description: 'Här kan du lägga in info om att ni INTE hanterar bokningar/friskvård. Rutan visas på hemsidan ENDAST om du fyller i "Titel".',
      type: 'object',
      fields: [
        {
          name: 'title',
          title: 'Titel',
          type: 'string',
          description: 'T.ex: "Gäller din fråga banbokning eller friskvård?"',
        },
        {
          name: 'text',
          title: 'Förklarande text',
          type: 'text',
          rows: 3,
          description: 'Förklara att kommunen har hand om detta.',
        },
        {
          name: 'email',
          title: 'Hänvisnings-email',
          type: 'string',
          description: 'Emailadressen vi hänvisar besökaren till.',
          initialValue: 'tennishallen@botkyrka.se',
        }
      ],
      options: {
        collapsible: true,
        collapsed: false,
      }
    },

    {
      name: 'content',
      title: 'Extra info',
      description: 'Vanlig text som visas på kontaktsidan.',
      type: 'array',
      of: [{ type: 'block' }]
    },
  ],
}
