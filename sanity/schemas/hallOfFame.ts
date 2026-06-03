export default {
  name: 'hallOfFame',
  title: 'Hall of Fame',
  type: 'document',
  fields: [
    {
      name: 'members',
      title: 'Medlemmar',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'member',
          fields: [
            { name: 'name', title: 'Namn', type: 'string' },
            {
              name: 'slug',
              title: 'Slug (länk)',
              type: 'slug',
              description: 'Klicka på "Generate" för att skapa en länk utifrån namnet. Krävs för att personen ska kunna öppnas på egen sida.',
              options: {
                // Källan måste vara en funktion eftersom fältet ligger i en array
                source: (_doc: unknown, options: { parent?: { name?: string } }) => options.parent?.name || '',
                maxLength: 96,
              },
            },
            { name: 'year', title: 'Invald år', type: 'string' },
            { name: 'image', title: 'Bild', type: 'image', options: { hotspot: true } },
            {
              name: 'description',
              title: 'Beskrivning',
              type: 'array',
              of: [{ type: 'block' }],
            },
          ],
          preview: {
            select: {
              title: 'name',
              subtitle: 'year',
              media: 'image',
            },
          },
        },
      ],
    },
  ],
}