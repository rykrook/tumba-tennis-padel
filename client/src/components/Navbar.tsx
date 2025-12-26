
import { Link, useLocation } from 'react-router-dom'
import { useState } from 'react'
import {
  Users, Trophy, Calendar, Phone, MapPin,
  Menu, X, ChevronDown, UserCog, ChevronRight,
  Newspaper
} from 'lucide-react'
import logo from '../assets/tumbatk.png'

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()

  // Funktion för att stänga menyn
  const closeMobileMenu = () => setMobileOpen(false)

  // Definiera vilka sökvägar som ska ha transparent bakgrund
  const transparentPages = ['/', '/tennis', '/padel']
  const isTransparent = transparentPages.includes(location.pathname)

  // KLASS-DEFINITIONER
  const defaultBgClass = "bg-primary text-white shadow-xl";
  
  // Bestäm navbarens bakgrund och textfärg
  let navBackgroundClass;
  let iconColorClass;

  if (mobileOpen) {
    // 1. Alltid primärfärg när mobilmenyn är öppen
    navBackgroundClass = defaultBgClass;
    iconColorClass = "text-white";
  } else if (isTransparent) {
    // 2. Transparent på utvalda sidor när stängd
    navBackgroundClass = "bg-transparent text-white";
    iconColorClass = "text-white";
  } else {
    // 3. Primärfärg på andra sidor när stängd (Fallback)
    navBackgroundClass = defaultBgClass;
    iconColorClass = "text-white";
  }

  return (
    <nav className={`relative top-0 z-50 transition-all duration-300 ${navBackgroundClass}`}>
      <div className="px-4 md:px-8 lg:px-12">
        <div className="flex justify-between items-center h-20">

          <Link to="/" className="flex items-center gap-4">
            <img src={logo} alt="Tumba TK" className="h-16 w-16 md:h-20 md:w-20" />
            <span className="hidden lg:block text-2xl font-bold">
              Tumba Tennisklubb
            </span>
          </Link>

          {/* 2. Desktop meny */}
          <div className="hidden md:flex items-center space-x-8 text-xl font-medium">
            <Link to="/" className="hover:bg-white/20 px-4 py-2 rounded transition">Hem</Link>
            <Link to="/tennis" className="hover:bg-white/20 px-4 py-2 rounded transition">Tennis</Link>
            <Link to="/padel" className="hover:bg-white/20 px-4 py-2 rounded transition">Padel</Link>

            <div className="relative">
              <div
                className="hover:bg-white/20 px-4 py-2 rounded flex items-center gap-2 transition cursor-pointer-events"
                onMouseEnter={(e) => e.currentTarget.parentElement?.querySelector('.dropdown')?.classList.remove('hidden')}
              >
                <Users className="w-5 h-5" />
                Klubben
                <ChevronDown className="w-4 h-4" />
              </div>

              <div
                className="dropdown hidden absolute top-full right-0 pt-5 w-80" // <--- Ändrade från left-1/2 till right-0 för att anpassa menyn till höger
                onMouseLeave={(e) => e.currentTarget.classList.add('hidden')}
              >
                <div className="h-5 -mt-5"></div>
                <div className="bg-white text-gray-800 rounded-xl shadow-2xl border border-accent/20 overflow-hidden">
                  <Link to="/nyheter" onClick={closeMobileMenu} className="block px-6 py-4 hover:bg-gray-100 flex items-center gap-4">
                    <Newspaper className="w-5 h-5 text-primary" /> Nyheter
                  </Link>
                  <Link to="/kontakt" onClick={closeMobileMenu} className="block px-6 py-4 hover:bg-gray-100 flex items-center gap-4">
                    <Phone className="w-5 h-5 text-primary" /> Kontakt
                  </Link>
                  <Link to="/hitta-hit" onClick={closeMobileMenu} className="block px-6 py-4 hover:bg-gray-100 flex items-center gap-4">
                    <MapPin className="w-5 h-5 text-primary" /> Hitta hit
                  </Link>
                  <Link to="/hall-of-fame" onClick={closeMobileMenu} className="block px-6 py-4 hover:bg-gray-100 flex items-center gap-4">
                    <Trophy className="w-5 h-5 text-accent" /> Hall of Fame
                  </Link>
                  <Link to="/tranare-styrelsen" onClick={closeMobileMenu} className="block px-6 py-4 hover:bg-gray-100 flex items-center gap-4">
                    <UserCog className="w-5 h-5 text-primary" /> Tränare & Styrelse
                  </Link>
                  <Link to="/träningsdagar" onClick={closeMobileMenu} className="block px-6 py-4 hover:bg-gray-100 flex items-center gap-4">
                    <Calendar className="w-5 h-5 text-primary" /> Träningsdagar
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Mobil hamburgare */}
          <button
            onClick={() => setMobileOpen(true)}
            className={`md:hidden p-2 transition-colors duration-300 ${iconColorClass}`}
          >
            <Menu className="w-8 h-8" />
          </button>
        </div>
      </div>

      {/* FULLSKÄRMSMOBILMENY */}
      {mobileOpen && (
        <div className="fixed inset-0 bg-primary z-[99] flex flex-col justify-start md:hidden overflow-y-auto">

          {/* TOPP: Stängningsknapp och Logotyp */}
          <div className="flex justify-between items-center p-6 border-b border-white/10">
            {/* Logotyp (Flyttad upp för bättre varumärkesnärvaro) */}
            <img src={logo} alt="Tumba TK" className="h-20 w-auto" /> 
            
            <button
              onClick={closeMobileMenu}
              // ÄNDRING: Tydlig accentfärg och större klickområde
              className="p-2 text-white hover:text-accent transition-colors"
            >
              <X className="w-8 h-8" />
            </button>
          </div>

          {/* MITTEN: Länkar - Tydlig struktur och styling */}
          <div className="flex flex-col p-8 flex-grow">

            {/* Huvudsektion: Stora länkar för primär navigering */}
            <div className="flex flex-col space-y-2 border-b border-white/10 pb-8 mb-8">
              <Link 
                to="/" 
                onClick={closeMobileMenu} 
                className="text-4xl font-bold text-white hover:text-accent transition-colors py-2 flex items-center justify-between"
              >
                Hem
                <ChevronRight className="w-8 h-8 text-accent/50 group-hover:text-accent transition-colors" />
              </Link>
              <Link 
                to="/tennis" 
                onClick={closeMobileMenu} 
                className="text-4xl font-bold text-white hover:text-accent transition-colors py-2 flex items-center justify-between"
              >
                Tennis
                <ChevronRight className="w-8 h-8 text-accent/50 group-hover:text-accent transition-colors" />
              </Link>
              <Link 
                to="/padel" 
                onClick={closeMobileMenu} 
                className="text-4xl font-bold text-white hover:text-accent transition-colors py-2 flex items-center justify-between"
              >
                Padel
                <ChevronRight className="w-8 h-8 text-accent/50 group-hover:text-accent transition-colors" />
              </Link>
            </div>

            {/* Underrubrik: Klubben */}
            <h4 className="text-sm font-semibold text-accent uppercase tracking-widest mb-4">Klubben</h4>
            
            {/* Klubben-länkar: Mindre textstorlek, konsekvent styling */}
            <div className="flex flex-col space-y-4">
              <Link 
                to="/nyheter" 
                onClick={closeMobileMenu} 
                className="text-xl font-medium text-white/90 hover:text-accent transition-colors flex items-center gap-3"
              >
                <ChevronRight className="w-5 h-5 text-accent" /> Nyheter
              </Link>
              <Link 
                to="/kontakt" 
                onClick={closeMobileMenu} 
                className="text-xl font-medium text-white/90 hover:text-accent transition-colors flex items-center gap-3"
              >
                <ChevronRight className="w-5 h-5 text-accent" /> Kontakt
              </Link>
              <Link 
                to="/hitta-hit" 
                onClick={closeMobileMenu} 
                className="text-xl font-medium text-white/90 hover:text-accent transition-colors flex items-center gap-3"
              >
                <ChevronRight className="w-5 h-5 text-accent" /> Hitta hit
              </Link>
              <Link 
                to="/hall-of-fame" 
                onClick={closeMobileMenu} 
                className="text-xl font-medium text-white/90 hover:text-accent transition-colors flex items-center gap-3"
              >
                {/* Återanvänd Trophy ikon men i accentfärg för att bryta mönstret lite */}
                <Trophy className="w-5 h-5 text-accent" /> Hall of Fame
              </Link>
              <Link 
                to="/tranare-styrelsen" 
                onClick={closeMobileMenu} 
                className="text-xl font-medium text-white/90 hover:text-accent transition-colors flex items-center gap-3"
              >
                <ChevronRight className="w-5 h-5 text-accent" /> Tränare & Styrelse
              </Link>
              <Link 
                to="/träningsdagar" 
                onClick={closeMobileMenu} 
                className="text-xl font-medium text-white/90 hover:text-accent transition-colors flex items-center gap-3"
              >
                <ChevronRight className="w-5 h-5 text-accent" /> Träningsdagar
              </Link>
            </div>
            
          </div>
          
          {/* Nedre Delen (Kan användas för kontaktinfo/sociala medier om det behövs) */}
          <div className="p-8 border-t border-white/10">
            <p className="text-sm text-white/50">© 2024 Tumba Tennisklubb. Alla rättigheter reserverade.</p>
          </div>
        </div>
      )}
    </nav>


  )
}