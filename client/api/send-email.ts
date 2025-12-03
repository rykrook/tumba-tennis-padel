export default async function handler(req: any, res: any) {
    if (req.method === 'OPTIONS') {
        res.setHeader('Access-Control-Allow-Origin', '*')
        res.setHeader('Access-Control-Allow-Methods', 'POST')
        return res.status(200).end()
    }

    if (req.method !== 'POST') {
        return res.status(405).end()
    }

    // Vi tar emot data från formuläret
    const { name, email, phone, message, aktivitet, honeypot } = req.body

    // 1. Förbättrad Honeypot-kontroll: Returnera 200 OK för att inte avslöja bot-fälla.
    if (honeypot) {
        console.log('Bot detected, silently ignoring request.')
        return res.status(200).json({ success: true, message: 'Message ignored.' }) 
    }

    // Enkel validering
    if (!name || !email || !message) {
        return res.status(400).json({ error: 'Missing required fields (name, email, or message).' })
    }

    try {
        const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                service_id: process.env.VITE_EMAILJS_SERVICE_ID,
                template_id: process.env.VITE_EMAILJS_TEMPLATE_ID, 
                user_id: process.env.VITE_EMAILJS_PUBLIC_KEY,

                template_params: {
                    user_name: name || 'Okänt namn',
                    user_email: email || 'ingen@email.se',
                    user_phone: phone || 'Inget telefonnummer',
                    user_message: message || '(Inget meddelande)',
                    aktivitet: aktivitet || 'Kontakt',
                    time: new Date().toLocaleString('sv-SE', { timeZone: 'Europe/Stockholm' }), 
                    subject_line: `Ny kontakt från hemsidan: ${name}`, 
                },
            }),
        })

        if (response.ok) {
            console.log('Mail skickat framgångsrikt via EmailJS REST API.')
            res.status(200).json({ success: true })
        } else {
            const text = await response.text()
            console.error('EmailJS svarade med felkod:', response.status, text)
            // Logga eventuella EmailJS-fel för felsökning
            res.status(500).json({ 
                error: 'Misslyckades skicka via EmailJS.', 
                details: text.substring(0, 100) // Skickar bara en del av felet till klienten
            })
        }
    } catch (error) {
        console.error('Server error (Network/Fetch issue):', error)
        res.status(500).json({ error: 'Ett oväntat serverfel inträffade.' })
    }
}