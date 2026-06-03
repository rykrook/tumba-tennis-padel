import { useState } from 'react'
import { User, Mail, Phone, MessageSquare, Send } from 'lucide-react'
import { sendSignup } from '../lib/email'

interface SignupFormProps {
  /** Aktivitetens namn, eller "Kontakt" för allmänna meddelanden */
  activity: string
  /** Rubrik ovanför formuläret */
  title?: string
  /** Beskrivande text under rubriken */
  info?: string
  /** Liten kursiv hjälptext */
  formText?: string
  /** Visa fältet för meddelande som obligatoriskt (kontaktformuläret) */
  messageRequired?: boolean
}

const inputClass =
  'w-full pl-12 pr-4 py-3.5 rounded-xl border border-slate-200 bg-slate-50/70 placeholder-slate-400 text-base ' +
  'transition duration-200 focus:border-primary focus:bg-white focus:ring-4 focus:ring-primary/15 focus:outline-none'

const iconClass = 'pointer-events-none absolute left-4 w-5 h-5 text-slate-400'

export default function SignupForm({
  activity,
  title,
  info,
  formText,
  messageRequired = false,
}: SignupFormProps) {
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')
  const isContact = activity === 'Kontakt'

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const formData = new FormData(form)

    // Honeypot – om dolt fält är ifyllt, låtsas vi att allt gick bra
    if (formData.get('honeypot')) {
      setStatus('success')
      form.reset()
      return
    }

    setStatus('sending')
    try {
      await sendSignup({
        activity,
        name: (formData.get('name') as string) || '',
        email: (formData.get('email') as string) || '',
        phone: (formData.get('phone') as string) || '',
        message: (formData.get('message') as string) || '',
      })
      setStatus('success')
      form.reset()
    } catch (err) {
      console.error('Anmälningsfel:', err)
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className="text-center bg-green-50 border border-green-200 text-green-800 rounded-2xl py-12 px-6">
        <div className="mx-auto mb-4 flex items-center justify-center h-14 w-14 rounded-full bg-green-100">
          <Send className="w-6 h-6 text-green-600" />
        </div>
        <p className="text-2xl font-display font-bold mb-1">
          {isContact ? 'Tack för ditt meddelande!' : 'Tack för din anmälan!'}
        </p>
        <p className="text-green-700">Vi hör av oss så snart vi kan.</p>
      </div>
    )
  }

  return (
    <div>
      {title && (
        <h3 className="text-3xl md:text-4xl font-display font-bold text-primary text-center mb-3">
          {title}
        </h3>
      )}
      {info && <p className="text-center text-lg text-slate-600 mb-4">{info}</p>}
      {formText && (
        <p className="text-center text-base italic text-slate-500 mb-8 border-b border-slate-200 pb-4">
          {formText}
        </p>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Honeypot (dolt för människor) */}
        <input type="text" name="honeypot" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="relative flex items-center">
            <User className={iconClass} />
            <input type="text" name="name" placeholder="Namn *" required className={inputClass} />
          </div>
          <div className="relative flex items-center">
            <Mail className={iconClass} />
            <input type="email" name="email" placeholder="E-post *" required className={inputClass} />
          </div>
        </div>

        <div className="relative flex items-center">
          <Phone className={iconClass} />
          <input type="tel" name="phone" placeholder="Telefon (valfritt)" className={inputClass} />
        </div>

        <div className="relative">
          <MessageSquare className={`${iconClass} top-4`} />
          <textarea
            name="message"
            placeholder={messageRequired ? 'Meddelande *' : 'Meddelande / önskemål (valfritt)'}
            required={messageRequired}
            rows={5}
            className={`${inputClass} resize-none`}
          />
        </div>

        <button
          type="submit"
          disabled={status === 'sending'}
          className="group w-full inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl
                     bg-gradient-to-r from-primary to-secondary text-white font-semibold text-base
                     shadow-lg shadow-primary/25 transition-all duration-200
                     hover:shadow-xl hover:-translate-y-0.5
                     disabled:opacity-60 disabled:hover:translate-y-0 disabled:cursor-not-allowed"
        >
          {status === 'sending' ? (
            'Skickar…'
          ) : (
            <>
              {isContact ? 'Skicka meddelande' : 'Skicka anmälan'}
              <Send className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
            </>
          )}
        </button>

        {status === 'error' && (
          <p className="text-center text-red-600 font-medium">
            Något gick fel – prova igen eller kontakta oss direkt via mail.
          </p>
        )}
      </form>
    </div>
  )
}
