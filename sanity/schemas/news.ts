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
      name: 'publishedAt',
      title: 'Publicerad',
      type: 'date',
      options: { dateFormat: 'YYYY-MM-DD' },
    },
    {
      name: 'body',
      title: 'Innehåll',
      type: 'array',
      of: [{ type: 'block' }],
    },
    {
      name: 'image',
      title: 'Bild',
      type: 'image',
      options: { hotspot: true },
    },
  ],
  preview: {
    select: {
      title: 'title',
      date: 'publishedAt',
      media: 'image',
    },
    prepare(selection: any) {
    const { title, date, media } = selection
    return {
      title,
      subtitle: date ? new Date(date).toLocaleDateString('sv-SE') : '',
      media,
    }
  }
  },
  orderings: [
    {
      title: 'Publicerad, nyast först',
      name: 'publishedAtDesc',
      by: [{ field: 'publishedAt', direction: 'desc' }],
    },
  ],
}