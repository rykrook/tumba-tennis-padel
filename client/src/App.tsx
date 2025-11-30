import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
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
import { useEffect } from 'react'
import NewsItem from './pages/NewsItem'
import NewsArchive from './pages/NewsArchive'

function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}
function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="flex flex-col min-h-screen">
        <KommunBanner />
        <div className="relative z-40">
          <Navbar />
        </div>
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
            <Route path="/nyheter" element={<NewsArchive />} />
            <Route path="/nyheter/:slug" element={<NewsItem />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App
