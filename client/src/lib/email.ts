import emailjs from '@emailjs/browser'

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID as string
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID as string
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY as string

export interface SignupParams {
  name: string
  email: string
  phone?: string
  message?: string
  /** Aktivitetens namn, eller "Kontakt" för det allmänna formuläret */
  activity: string
}

/**
 * Skickar en anmälan/kontaktförfrågan via EmailJS.
 * Kastar fel om nycklar saknas eller om sändningen misslyckas.
 */
export async function sendSignup(params: SignupParams): Promise<void> {
  if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
    throw new Error('EmailJS-nycklar saknas i miljövariablerna (VITE_EMAILJS_*).')
  }

  const templateParams = {
    user_name: params.name,
    user_email: params.email,
    user_phone: params.phone || 'Inget telefonnummer',
    user_message: params.message || '(Inget meddelande)',
    aktivitet: params.activity,
    subject_line:
      params.activity === 'Kontakt'
        ? `Ny kontaktförfrågan: ${params.name}`
        : `NY ANMÄLAN: ${params.activity}`,
  }

  await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, { publicKey: PUBLIC_KEY })
}
