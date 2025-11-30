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
    {
      name: 'keyServices',
      title: 'Vad vill du spela idag? (CTA)',
      type: 'object',
      fields: [
        {
          name: 'title',
          title: 'Rubrik',
          type: 'string',
          initialValue: 'Vad vill du spela idag?',
        },
        {
          name: 'tennisTitle',
          title: 'Tennis – knapptext',
          type: 'string',
          initialValue: 'VÅR TENNIS',
        },
        {
          name: 'tennisText',
          title: 'Tennis – beskrivning',
          type: 'text',
          initialValue: 'Läs allt om våra träningsgrupper, kurser och klubbens tennisverksamhet.',
        },
        {
          name: 'padelTitle',
          title: 'Padel – knapptext',
          type: 'string',
          initialValue: 'VÅR PADEL',
        },
        {
          name: 'padelText',
          title: 'Padel – beskrivning',
          type: 'text',
          initialValue: 'Hitta tider, information om tränare och hur du kommer igång med padel hos oss.',
        },
      ],
    },
    {
      name: 'bookCourt',
      title: 'Boka bana CTA',
      type: 'object',
      fields: [
        {
          name: 'title',
          title: 'Rubrik',
          type: 'string',
          initialValue: 'Spelsugen?',
        },
        {
          name: 'text',
          title: 'Beskrivning',
          type: 'string',
          initialValue: 'Det finns tider tillgängliga för alla medlemmar, medlemskap är gratis!',
        },
        {
          name: 'buttonText',
          title: 'Knapptext',
          type: 'string',
          initialValue: 'BOKA BANA PÅ MATCHI.SE',
        },
        {
          name: 'url',
          title: 'Länk',
          type: 'url',
          initialValue: 'https://www.matchi.se/facilities/tumbatk',
        },
      ],
    },
  ],
}