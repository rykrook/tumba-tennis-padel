export default {
  name: 'news',
  title: 'Nyheter',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Rubrik',
      type: 'string',
    },
    {
      name: 'slug',
      title: 'Slug (URL)',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (Rule: { required: () => { (): any; new(): any; error: { (arg0: string): any; new(): any; }; }; }) => Rule.required().error('Slug är obligatoriskt för att skapa en giltig URL.'),
    },
    {
      name: 'publishedAt',
      title: 'Publicerad',
      type: 'date',
      options: { dateFormat: 'YYYY-MM-DD' },
    },
    {
      name: 'excerpt',
      title: 'Kort sammanfattning (visas på startsidan)',
      type: 'text',
      rows: 4,
      description: 'Max 2–3 meningar – resten visas när man klickar på nyheten',
    },
    {
      name: 'image',
      title: 'Bild',
      type: 'image',
      options: { hotspot: true },
    },
    {
      name: 'body',
      title: 'Fullständigt innehåll',
      type: 'array',
      description: 'Huvudinnehållet för nyheten, går också att formatera en mailadress som länk och skriva mailto:namn@adress.com',
      of: [{ type: 'block' }, { type: 'image' }],
    },
  ],
  preview: {
    select: {
      title: 'title',
      date: 'publishedAt',
      media: 'image',
    },
  },
  orderings: [
    { title: 'Nyast först', name: 'dateDesc', by: [{ field: 'publishedAt', direction: 'desc' }] },
  ],
}