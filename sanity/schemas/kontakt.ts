export default {
  name: 'kontakt',
  title: 'Kontakt',
  type: 'document',
  fields: [
    { name: 'address', title: 'Adress', type: 'string' },
    { name: 'phone', title: 'Telefon', type: 'string' },
    { name: 'email', title: 'E-post', type: 'string' },
    { name: 'content', title: 'Extra info', type: 'array', of: [{ type: 'block' }] },
  ],
}
