// sanity/schemas/siteSettings.ts
export default {
  name: 'siteSettings',
  title: 'Webbplatsinställningar',
  type: 'document',
  fields: [
    {
      name: 'showKommunBanner',
      title: 'Visa Botkyrka-banner?',
      type: 'boolean',
      initialValue: true,
    },
    {
      name: 'instagram',
      title: 'Instagram-länk',
      type: 'url',
    },
    {
      name: 'facebook',
      title: 'Facebook-länk',
      type: 'url',
    },
    {
      name: 'currentTermin',
      title: 'Aktuell termin',
      type: 'string',
      description: 'T.ex. "Vårterminen 2025"',
    },
    {
      name: 'holidayNote',
      title: 'Lovnotering',
      type: 'string',
      description: 'T.ex. "Sportlov vecka 9 · Påsklov vecka 16"',
    },
  ],
}