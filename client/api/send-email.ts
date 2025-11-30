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
        template_params: {
          from_name: name || 'Okänt namn',
          from_email: email || 'no-reply@example.com',
          phone: phone || 'Inget telefonnummer',
          message: message || '(tomt meddelande)',
          aktivitet: aktivitet || 'Allmänt',
        },
      }),
    })

    if (response.ok) {
      console.log('EmailJS: Mail skickat!')
      return res.status(200).json({ success: true })
    } else {
      const errorText = await response.text()
      console.error('EmailJS error:', response.status, errorText)
      return res.status(500).json({ error: 'EmailJS svarade inte OK' })
    }
  } catch (error: any) {
    console.error('Fetch error:', error.message)
    return res.status(500).json({ error: 'Serverfel' })
  }
}