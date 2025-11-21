export default {
  name: 'tennisskola',
  title: 'Tennisskola',
  type: 'document',
  fields: [
    { name: 'content', title: 'Innehåll', type: 'array', of: [{ type: 'block' }] },
    { name: 'image', title: 'Bild', type: 'image', options: { hotspot: true } },
  ],
}
