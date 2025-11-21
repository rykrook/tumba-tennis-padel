import { Link } from 'react-router-dom'
import { Home, Users, Trophy, Calendar, Phone, MapPin } from 'lucide-react'
import logo from '../assets/tumbatk.png'

export default function Navbar() {
  return (
    <nav className="bg-primary text-white shadow-xl sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center gap-3">
            <img src={logo} alt="Tumba TK" className="h-14 w-14" />
            <span className="text-xl font-bold hidden sm:block">Tumba Tennis & Padel</span>
          </Link>

          <div className="hidden md:flex items-center space-x-6 text-sm font-medium">
            <Link to="/" className="hover:bg-secondary px-4 py-2 rounded flex items-center gap-2"><Home className="w-4 h-4"/>Hem</Link>
            <Link to="/tennis" className="hover:bg-secondary px-4 py-2 rounded">Tennis</Link>
            <Link to="/padel" className="hover:bg-secondary px-4 py-2 rounded">Padel</Link>
            
            <div className="relative group">
              <span className="hover:bg-secondary px-4 py-2 rounded cursor-pointer flex items-center gap-2">
                <Users className="w-4 h-4"/>Klubben
              </span>
              <div className="absolute top-full left-0 mt-1 bg-white text-gray-800 rounded-lg shadow-xl hidden group-hover:block w-64">
                <Link to="/kontakt" className="block px-4 py-3 hover:bg-gray-100 flex items-center gap-2"><Phone className="w-4 h-4"/>Kontakt</Link>
                <Link to="/hitta-hit" className="block px-4 py-3 hover:bg-gray-100 flex items-center gap-2"><MapPin className="w-4 h-4"/>Hitta hit</Link>
                <Link to="/hall-of-fame" className="block px-4 py-3 hover:bg-gray-100 flex items-center gap-2"><Trophy className="w-4 h-4"/>Hall of Fame</Link>
                <Link to="/tranare-styrelsen" className="block px-4 py-3 hover:bg-gray-100">Tränare & Styrelse</Link>
                <Link to="/träningsdagar" className="block px-4 py-3 hover:bg-gray-100 flex items-center gap-2"><Calendar className="w-4 h-4"/>Träningsdagar</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}