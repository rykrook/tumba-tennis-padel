import type { PortableTextComponents } from '@portabletext/react'

/**
 * Delad rich text-rendering för innehållssektioner (Tennis- och Padelsidorna).
 * Ljus, läsvänlig typografi som matchar designsystemet.
 */
export const richTextComponents: PortableTextComponents = {
  block: {
    h1: ({ children }) => (
      <h1 className="text-3xl md:text-4xl font-display font-bold text-primary mt-0 mb-6 tracking-tight">{children}</h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-2xl md:text-3xl font-display font-bold text-slate-900 mb-4">{children}</h2>
    ),
    normal: ({ children }) => (
      <p className="text-base md:text-lg leading-relaxed text-slate-700 mb-4">{children}</p>
    ),
  },
  marks: {
    strong: ({ children }) => <span className="font-bold text-primary">{children}</span>,
  },
}
