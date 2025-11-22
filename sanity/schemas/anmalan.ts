export default {
  name: 'anmalan',
  title: 'Anmälan & Bokning',
  type: 'document',
  fields: [
    {
      name: 'tennislekisUrl',
      title: 'Tennislekis – länk',
      type: 'url',
      description: 'Lämna tomt = knappen visas inte',
    },
    {
      name: 'tennislekisText',
      title: 'Tennislekis – text under knappen',
      type: 'string',
      description: 'T.ex. "4–6 år"',
    },
    {
      name: 'tennisskolaUrl',
      title: 'Tennisskola – länk',
      type: 'url',
    },
    {
      name: 'tennisskolaText',
      title: 'Tennisskola – text under knappen',
      type: 'string',
      description: 'T.ex. "7–16 år"',
    },
    {
      name: 'vuxentennisUrl',
      title: 'Vuxentennis – länk',
      type: 'url',
    },
    {
      name: 'vuxentennisText',
      title: 'Vuxentennis – text under knappen',
      type: 'string',
      description: 'T.ex. "Från 16 år"',
    },
  ],
}