

import emailjs from '@emailjs/nodejs'

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { name, email, phone, message, aktivitet, honeypot } = req.body

  // Honeypot – blockerar bots
  if (honeypot) {
    return res.status(400).json({ error: 'Bot detected' })
  }

  try {
    await emailjs.send(
      process.env.EMAILJS_SERVICE_ID as string,
      process.env.EMAILJS_TEMPLATE_ID as string,
      {
        from_name: name,
        from_email: email,
        phone: phone || 'Inget telefonnummer',
        message,
        aktivitet: aktivitet || 'Allmänt meddelande',
      },
      {
        publicKey: process.env.EMAILJS_PUBLIC_KEY as string,
        privateKey: process.env.EMAILJS_PRIVATE_KEY as string,
      }
    )

    res.status(200).json({ success: true })
  } catch (error) {
    console.error('EmailJS error:', error)
    res.status(500).json({ error: 'Failed to send email' })
  }
}

// Vercel behöver detta för att veta att det är en serverless function
export const config = {
  api: {
    bodyParser: true,
  },
}
