export default {
  name: 'homepage',
  title: 'Hemsida',
  type: 'document',
  fields: [
    { name: 'heroImage', title: 'Huvudbild', type: 'image', options: { hotspot: true } },
    { name: 'welcome', title: 'Välkomsttext', type: 'array', of: [{ type: 'block' }] },
  ],
}
