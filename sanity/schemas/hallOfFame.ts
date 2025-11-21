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
          fields: [
            { name: 'name', title: 'Namn', type: 'string' },
            { name: 'year', title: 'År', type: 'string' },
            { name: 'image', title: 'Bild', type: 'image' },
          ],
        },
      ],
    },
  ],
}
