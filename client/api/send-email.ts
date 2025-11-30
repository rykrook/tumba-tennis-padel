export default async function handler(req: any, res: any) {
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'POST')
    return res.status(200).end()
  }

  if (req.method !== 'POST') return res.status(405).end()

  const { name, email, phone, message, aktivitet, honeypot } = req.body

  if (honeypot) return res.status(400).json({ error: 'Bot' })

  try {
    const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        service_id: process.env.EMAILJS_SERVICE_ID,
        template_id: process.env.EMAILJS_TEMPLATE_ID,
        user_id: process.env.EMAILJS_PUBLIC_KEY,
        private_key: process.env.EMAILJS_PRIVATE_KEY,
        template_params: {
          from_name: name?.trim() || 'Okänt namn',
          from_email: email?.trim() || 'no-reply@tumbatk.se',
          phone: phone?.trim() || 'Inget telefonnummer',
          message: message?.trim() || '(Inget meddelande)',
          aktivitet: aktivitet?.trim() || 'Allmänt',
        },
      }),
    })

    const text = await response.text()
    console.log('EmailJS response:', response.status, text)

    if (response.ok) {
      return res.status(200).json({ success: true })
    } else {
      return res.status(400).json({ error: 'EmailJS 400', details: text })
    }
  } catch (error: any) {
    console.error('Email error:', error)
    return res.status(500).json({ error: error.message })
  }
}