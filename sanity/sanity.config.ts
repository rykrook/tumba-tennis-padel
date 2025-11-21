import { defineConfig } from 'sanity'
import { deskTool } from 'sanity/desk'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './schemas/schema'

export default defineConfig({
  name: 'default',
  title: 'Tumba Tennis & Padel Studio',
  projectId: '4rcbyqke',
  dataset: 'production',
  plugins: [deskTool(), visionTool()],
  schema: {
    types: schemaTypes,
  },
})