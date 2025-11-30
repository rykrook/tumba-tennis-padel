export const config = {
  api: {
    bodyParser: true,
  },
}
export default async function handler(req: any, res: any) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
  //cors
  if (req.method === 'OPTIONS') {
    res.status(200).end()
    return
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { name, email, phone, message, aktivitet, honeypot } = req.body

  if (honeypot) {
    return res.status(400).json({ error: 'Bot detected' })
  }

  try {
    const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        service_id: process.env.EMAILJS_SERVICE_ID,
        template_id: process.env.EMAILJS_TEMPLATE_ID,
        user_id: process.env.EMAILJS_PUBLIC_KEY,
        template_params: {
          from_name: name || 'Okänt namn',
          from_email: email || 'ingen@email.se',
          phone: phone || 'Inget telefonnummer',
          message: message || 'Inget meddelande',
          aktivitet: aktivitet || 'Kontakt',
        },
      }),
    })

    if (response.ok) {
      res.status(200).json({ success: true })
    } else {
      res.status(500).json({ error: 'EmailJS svarade inte OK' })
    }
  } catch (error) {
    console.error('Email error:', error)
    res.status(500).json({ error: 'Misslyckades skicka mail' })
  }
}