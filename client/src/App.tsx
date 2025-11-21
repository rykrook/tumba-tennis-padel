import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import KommunBanner from './components/KommunBanner'
import Home from './pages/Home'
import Tennis from './pages/Tennis'
import Padel from './pages/Padel'
import Kontakt from './pages/Kontakt'
import HittaHit from './pages/HittaHit'
import HallOfFame from './pages/HallOfFame'
import TranareStyrelsen from './pages/TranareStyrelsen'
import Traningsdagar from './pages/Traningsdagar'

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <KommunBanner />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tennis" element={<Tennis />} />
          <Route path="/padel" element={<Padel />} />
          <Route path="/kontakt" element={<Kontakt />} />
          <Route path="/hitta-hit" element={<HittaHit />} />
          <Route path="/hall-of-fame" element={<HallOfFame />} />
          <Route path="/tranare-styrelsen" element={<TranareStyrelsen />} />
          <Route path="/träningsdagar" element={<Traningsdagar />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App