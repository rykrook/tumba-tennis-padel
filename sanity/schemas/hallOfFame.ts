// sanity/schemas/hallOfFame.ts – 100 % fungerande!
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
            { name: 'year', title: 'Invald år', type: 'string' },
            { name: 'image', title: 'Bild', type: 'image', options: { hotspot: true } },
            {
              name: 'slug',
              title: 'Slug (URL)',
              type: 'slug',
              options: {
                source: 'name',
                maxLength: 96,
              },
            },
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