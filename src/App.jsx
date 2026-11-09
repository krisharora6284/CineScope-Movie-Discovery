import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import Watchlist from './pages/Watchlist'
import Detail from './pages/Detail'

export default function App() {
  return <div className="app"><Header/><Routes><Route path="/" element={<Home/>}/><Route path="/watchlist" element={<Watchlist/>}/><Route path="/title/:id" element={<Detail/>}/></Routes><Footer/></div>
}