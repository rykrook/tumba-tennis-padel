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
      description: 'Avmarkera för att dölja bannern helt (t.ex. efter 2025)',
      initialValue: true,
    },
  ],
  preview: {
    prepare() {
      return {
        title: 'Webbplatsinställningar',
      }
    }
  }
}