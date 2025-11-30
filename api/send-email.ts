export default async function handler(req: any, res: any) {
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
      headers: {
        'Content-Type': 'application/json',
        'Origin': 'https://tumba-tennis-padel.vercel.app',
      },
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

    if (!response.ok) {
      const errorText = await response.text()
      console.error('EmailJS error:', response.status, errorText)
      return res.status(500).json({ error: 'EmailJS svarade inte OK' })
    }

    res.status(200).json({ success: true })
  } catch (error: any) {
    console.error('Server error:', error)
    res.status(500).json({ error: error.message || 'Misslyckades' })
  }
}