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
import Footer from './components/Footer'

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <KommunBanner />
        
        <main className="flex-1">
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
        </main>

        <Footer />
      </div>
    </Router>
  )
}

export default App