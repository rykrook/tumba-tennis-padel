// client/src/components/Navbar.tsx
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { 
  Users, Trophy, Calendar, Phone, MapPin, 
  Menu, X, ChevronDown, UserCog 
} from 'lucide-react'
import logo from '../assets/tumbatk.png'

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <nav className="bg-primary text-white shadow-xl sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-4">
            <img src={logo} alt="Tumba TK" className="h-14 w-14" />
            <span className="text-2xl font-bold hidden lg:block">Tumba Tennis & Padel</span>
          </Link>

          {/* Desktop meny */}
          <div className="hidden md:flex items-center space-x-8 text-lg font-medium">
            <Link to="/" className="hover:bg-secondary px-4 py-2 rounded transition">Hem</Link>
            <Link to="/tennis" className="hover:bg-secondary px-4 py-2 rounded transition">Tennis</Link>
            <Link to="/padel" className="hover:bg-secondary px-4 py-2 rounded transition">Padel</Link>

            {/* KLUBBEN – hover med osynlig ramp så den inte försvinner */}
            <div className="relative">
              <div 
                className="hover:bg-secondary px-4 py-2 rounded flex items-center gap-2 transition cursor-pointer-events"
                onMouseEnter={(e) => e.currentTarget.parentElement?.querySelector('.dropdown')?.classList.remove('hidden')}
              >
                <Users className="w-5 h-5" />
                Klubben
                <ChevronDown className="w-4 h-4" />
              </div>

              {/* Dropdown med osynlig ramp (detta är tricket) */}
              <div 
                className="dropdown hidden absolute top-full left-1/2 -translate-x-1/2 pt-5 w-80"
                onMouseLeave={(e) => e.currentTarget.classList.add('hidden')}
              >
                <div className="h-5 -mt-5"></div> {/* Osynlig ramp */}
                <div className="bg-white text-gray-800 rounded-xl shadow-2xl border border-accent/20 overflow-hidden">
                  <Link to="/kontakt" className="block px-6 py-4 hover:bg-gray-50 flex items-center gap-4">
                    <Phone className="w-5 h-5 text-primary" /> Kontakt
                  </Link>
                  <Link to="/hitta-hit" className="block px-6 py-4 hover:bg-gray-50 flex items-center gap-4">
                    <MapPin className="w-5 h-5 text-primary" /> Hitta hit
                  </Link>
                  <Link to="/hall-of-fame" className="block px-6 py-4 hover:bg-gray-50 flex items-center gap-4">
                    <Trophy className="w-5 h-5 text-accent" /> Hall of Fame
                  </Link>
                  <Link to="/tranare-styrelsen" className="block px-6 py-4 hover:bg-gray-50 flex items-center gap-4">
                    <UserCog className="w-5 h-5 text-primary" /> Tränare & Styrelse
                  </Link>
                  <Link to="/träningsdagar" className="block px-6 py-4 hover:bg-gray-50 flex items-center gap-4">
                    <Calendar className="w-5 h-5 text-primary" /> Träningsdagar
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Mobil hamburgare */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2"
          >
            {mobileOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
          </button>
        </div>

        {/* Mobilmeny */}
        {mobileOpen && (
          <div className="md:hidden pb-6">
            <Link to="/" className="block py-3 px-4 hover:bg-secondary rounded">Hem</Link>
            <Link to="/tennis" className="block py-3 px-4 hover:bg-secondary rounded">Tennis</Link>
            <Link to="/padel" className="block py-3 px-4 hover:bg-secondary rounded">Padel</Link>
            <Link to="/kontakt" className="block py-3 px-4 hover:bg-secondary rounded">Kontakt</Link>
            <Link to="/hitta-hit" className="block py-3 px-4 hover:bg-secondary rounded">Hitta hit</Link>
            <Link to="/hall-of-fame" className="block py-3 px-4 hover:bg-secondary rounded">Hall of Fame</Link>
            <Link to="/tranare-styrelsen" className="block py-3 px-4 hover:bg-secondary rounded">Tränare & Styrelse</Link>
            <Link to="/träningsdagar" className="block py-3 px-4 hover:bg-secondary rounded">Träningsdagar</Link>
          </div>
        )}
      </div>
    </nav>
  )
}