export default {
  name: 'tranareStyrelsen',
  title: 'Tränare & Styrelsen',
  type: 'document',
  fields: [
    {
      name: 'people',
      title: 'Personer',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'name', title: 'Namn', type: 'string' },
            { name: 'role', title: 'Roll', type: 'string' },
            { name: 'bio', title: 'Bio', type: 'text' },
            { name: 'image', title: 'Bild', type: 'image' },
          ],
        },
      ],
    },
  ],
}
