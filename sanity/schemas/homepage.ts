export default {
  name: 'homepage',
  title: 'Hemsida',
  type: 'document',
  fields: [
    { name: 'heroImage', title: 'Huvudbild', description: 'Ladda upp en bild istället för video', type: 'image', options: { hotspot: true } },
    { name: 'welcome', title: 'Välkomsttext', type: 'array', of: [{ type: 'block' }] },
    {
      name: 'backgroundVideo',
      title: 'Bakgrundsvideo (startsida)',
      type: 'file',  // MP4 rekommenderas
      description: 'Ladda upp en cinematic MP4-video, t.ex. drönarvideon! (max 20 MB för snabb laddning)',
      options: {
        accept: 'video/mp4'
      }
    },
  ],
}
