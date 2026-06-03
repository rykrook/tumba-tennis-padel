import { Link, useLocation } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'
import {
  Trophy, MapPin, Menu, X, ChevronDown, ChevronRight,
  UserCog, Newspaper, Ticket,
} from 'lucide-react'
import logo from '../assets/tumbatklogga.png'

const BOOK_URL = 'https://www.matchi.se/facilities/tumbatk'

const primaryLinks = [
  { to: '/tennis', label: 'Tennis' },
  { to: '/padel', label: 'Padel' },
  { to: '/träningsdagar', label: 'Träningsdagar' },
  { to: '/kontakt', label: 'Kontakt' },
]

const moreLinks = [
  { to: '/nyheter', label: 'Nyheter', Icon: Newspaper },
  { to: '/hitta-hit', label: 'Hitta hit', Icon: MapPin },
  { to: '/hall-of-fame', label: 'Hall of Fame', Icon: Trophy },
  { to: '/tranare-styrelsen', label: 'Tränare & Styrelse', Icon: UserCog },
]

export default function Navbar() {
  const location = useLocation()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [moreOpen, setMoreOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const moreRef = useRef<HTMLDivElement>(null)

  const isHome = location.pathname === '/'
  const transparent = isHome && !scrolled && !mobileOpen

  const isActive = (to: string) =>
    location.pathname === to || location.pathname.startsWith(to + '/')

  // Scroll-medveten bakgrund (transparent högst upp på startsidan)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Stäng "Mer"-menyn vid klick utanför eller Esc
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (moreRef.current && !moreRef.current.contains(e.target as Node)) setMoreOpen(false)
    }
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && (setMoreOpen(false), setMobileOpen(false))
    document.addEventListener('mousedown', onClick)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onClick)
      document.removeEventListener('keydown', onKey)
    }
  }, [])

  // Lås bakgrundsscroll när mobilmenyn är öppen
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileOpen])

  const closeAll = () => {
    setMobileOpen(false)
    setMoreOpen(false)
  }

  const navBg = transparent
    ? 'bg-transparent'
    : 'bg-white/95 backdrop-blur shadow-sm'
  const linkColor = transparent ? 'text-white' : 'text-slate-700'

  const linkClass = (active: boolean) =>
    `px-3 py-2 rounded-lg font-medium transition-colors ${
      transparent
        ? `${active ? 'text-white' : 'text-white/90'} hover:bg-white/15`
        : `${active ? 'text-primary' : 'text-slate-700'} hover:bg-primary/5 hover:text-primary`
    } ${active ? 'font-semibold' : ''}`

  return (
    <>
    <nav className={`sticky top-0 z-50 transition-colors duration-300 ${navBg}`}>
      <div className="container-page">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" onClick={closeAll} className="flex items-center gap-3">
            <img src={logo} alt="Tumba TK" className="h-14 w-14 md:h-16 md:w-16" />
            <span className={`hidden sm:block text-xl font-display font-bold ${linkColor}`}>
              Tumba Tennisklubb
            </span>
          </Link>

          {/* Desktop-meny */}
          <div className="hidden lg:flex items-center gap-1">
            {primaryLinks.map((l) => (
              <Link key={l.to} to={l.to} className={linkClass(isActive(l.to))}>
                {l.label}
              </Link>
            ))}

            {/* "Mer"-dropdown */}
            <div className="relative" ref={moreRef}>
              <button
                onClick={() => setMoreOpen((v) => !v)}
                aria-expanded={moreOpen}
                aria-haspopup="true"
                className={`${linkClass(false)} flex items-center gap-1`}
              >
                Mer
                <ChevronDown className={`w-4 h-4 transition-transform ${moreOpen ? 'rotate-180' : ''}`} />
              </button>

              {moreOpen && (
                <div className="absolute top-full right-0 mt-2 w-72 bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden py-2">
                  {moreLinks.map(({ to, label, Icon }) => (
                    <Link
                      key={to}
                      to={to}
                      onClick={closeAll}
                      className={`flex items-center gap-3 px-5 py-3 text-slate-700 hover:bg-primary/5 hover:text-primary transition-colors ${
                        isActive(to) ? 'text-primary font-semibold bg-primary/5' : ''
                      }`}
                    >
                      <Icon className="w-5 h-5 text-accent" />
                      {label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Boka bana */}
            <a
              href={BOOK_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={`ml-2 inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-semibold transition-colors ${
                transparent
                  ? 'bg-white text-primary hover:bg-accent'
                  : 'bg-primary text-white hover:bg-secondary'
              }`}
            >
              <Ticket className="w-4 h-4" />
              Boka bana
            </a>
          </div>

          {/* Mobil hamburgare */}
          <button
            onClick={() => setMobileOpen(true)}
            aria-label="Öppna meny"
            className={`lg:hidden p-2 ${linkColor}`}
          >
            <Menu className="w-8 h-8" />
          </button>
        </div>
      </div>
    </nav>

      {/* Helskärms mobilmeny – ligger utanför <nav> så att backdrop-blur
          inte skapar ett containing block för den fixerade overlayn */}
      {mobileOpen && (
        <div className="fixed inset-0 bg-primary z-[99] flex flex-col overflow-y-auto lg:hidden">
          <div className="flex justify-between items-center p-6 border-b border-white/10">
            <img src={logo} alt="Tumba TK" className="h-16 w-16" />
            <button onClick={closeAll} aria-label="Stäng meny" className="p-2 text-white hover:text-accent transition-colors">
              <X className="w-8 h-8" />
            </button>
          </div>

          <div className="flex flex-col p-8 gap-2">
            <Link to="/" onClick={closeAll} className="text-3xl font-display font-bold text-white py-2 flex items-center justify-between hover:text-accent transition-colors">
              Hem <ChevronRight className="w-7 h-7 text-accent/60" />
            </Link>
            {primaryLinks.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={closeAll}
                className="text-3xl font-display font-bold text-white py-2 flex items-center justify-between hover:text-accent transition-colors"
              >
                {l.label} <ChevronRight className="w-7 h-7 text-accent/60" />
              </Link>
            ))}

            <a
              href={BOOK_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-accent mt-4 w-full"
            >
              <Ticket className="w-5 h-5" />
              Boka bana på Matchi.se
            </a>

            <h4 className="text-sm font-semibold text-accent uppercase tracking-widest mt-8 mb-3">Klubben</h4>
            <div className="flex flex-col gap-3">
              {moreLinks.map(({ to, label, Icon }) => (
                <Link
                  key={to}
                  to={to}
                  onClick={closeAll}
                  className="text-lg font-medium text-white/90 hover:text-accent transition-colors flex items-center gap-3"
                >
                  <Icon className="w-5 h-5 text-accent" /> {label}
                </Link>
              ))}
            </div>
          </div>

          <div className="mt-auto p-8 border-t border-white/10">
            <p className="text-sm text-white/50">© {new Date().getFullYear()} Tumba Tennisklubb</p>
          </div>
        </div>
      )}
    </>
  )
}
