export default async function handler(req: any, res: any) {
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'POST')
    return res.status(200).end()
  }

  if (req.method !== 'POST') {
    return res.status(405).end()
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
        private_key: process.env.EMAILJS_PRIVATE_KEY,
        template_params: {
          name: name || 'Okänt namn',
          email: email || 'ingen@email.se',
          phone: phone || 'Inget telefonnummer',
          message: message || '(Inget meddelande)',
          aktivitet: aktivitet || 'Kontakt',
          time: new Date().toLocaleString('sv-SE')
        },
      }),
    })

    if (response.ok) {
      console.log('Mail skickat!')
      res.status(200).json({ success: true })
    } else {
      const text = await response.text()
      console.error('EmailJS error:', text)
      res.status(500).json({ error: 'EmailJS svarade inte OK' })
    }
  } catch (error) {
    console.error('Server error:', error)
    res.status(500).json({ error: 'Misslyckades skicka mail' })
  }
}