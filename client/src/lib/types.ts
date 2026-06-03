import type { SanityImageSource } from '@sanity/image-url/lib/types/types'
import type { PortableTextBlock } from '@portabletext/react'

/** Sanity-bildkälla (referens eller redan upplöst objekt). */
export type SanityImage = SanityImageSource

/** Innehåll i rich text-format (Portable Text). */
export type RichText = PortableTextBlock[]

/** Inställningar för "Boka bana"-knappen/-sektionen. */
export interface BookCourt {
  title?: string
  text?: string
  buttonText?: string
  url?: string
}
