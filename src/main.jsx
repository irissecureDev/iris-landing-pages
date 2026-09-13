import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import ChurchPage from './pages/ChurchPage.jsx'
import RestaurantPage from './pages/RestaurantPage.jsx'
import AutoShopPage from './pages/AutoShopPage.jsx'
import BakeryPage from './pages/BakeryPage.jsx'
import CarDealerPage from './pages/CarDealerPage.jsx'
import MosquePage from './pages/MosquePage.jsx'
import SynagoguePage from './pages/SynagoguePage.jsx'
import HinduTemplePage from './pages/HinduTemplePage.jsx'

const Home = () => (
  <div style={{
    minHeight: '100vh', background: '#0B1D3A',
    display: 'flex', flexDirection: 'column',
    alignItems: 'center', justifyContent: 'center',
    fontFamily: 'sans-serif', gap: 24, padding: 40
  }}>
    <div style={{ textAlign: 'center', marginBottom: 16 }}>
      <div style={{ fontSize: 48, marginBottom: 12 }}>💼</div>
      <h1 style={{ color: '#00C8C8', fontSize: 36, fontWeight: 800, marginBottom: 8 }}>Iris Financial</h1>
      <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 16 }}>Industry Landing Pages</p>
    </div>
    {[
      { path: '/churches', label: '⛪ Churches', color: '#C9A84C' },
      { path: '/restaurants', label: '🍽️ Restaurants', color: '#C4501A' },
      { path: '/autoshop', label: '🔧 Auto Repair Shops', color: '#F5C400' },
      { path: '/bakery', label: '🥖 Bakeries', color: '#C8A96E' },
      { path: '/cardealer', label: '🚗 Car Dealers', color: '#DC2626' },
      { path: '/mosque', label: '🕌 Masajid', color: '#00C8A0' },
      { path: '/synagogue', label: '🕍 Synagogues', color: '#4A6FE3' },
      { path: '/hindutemple', label: '🛕 Hindu Temples', color: '#FF8C00' },
    ].map(({ path, label, color }) => (
      <Link key={path} to={path} style={{
        background: color, color: path === '/autoshop' ? '#0E0F11' : 'white',
        padding: '16px 48px', borderRadius: 8, textDecoration: 'none',
        fontWeight: 700, fontSize: 17, minWidth: 280, textAlign: 'center',
        transition: 'opacity 0.2s', display: 'block'
      }}
        onMouseEnter={e => e.target.style.opacity = '0.85'}
        onMouseLeave={e => e.target.style.opacity = '1'}
      >{label}</Link>
    ))}
  </div>
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/churches" element={<ChurchPage />} />
      <Route path="/restaurants" element={<RestaurantPage />} />
      <Route path="/autoshop" element={<AutoShopPage />} />
      <Route path="/bakery" element={<BakeryPage />} />
      <Route path="/cardealer" element={<CarDealerPage />} />
      <Route path="/mosque" element={<MosquePage />} />
      <Route path="/synagogue" element={<SynagoguePage />} />
      <Route path="/hindutemple" element={<HinduTemplePage />} />
    </Routes>
  </BrowserRouter>
)
