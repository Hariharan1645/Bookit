import { Routes, Route } from 'react-router-dom'
import './index.css'
import Navbar from './components/Navbar'
import MainPage from './pages/MainPage'
import SearchPage from './pages/SearchPage'
import DetailsPage from './pages/DetailsPage'
import CheckoutPage from './pages/CheckoutPage'
import ResultPage from './pages/ResultPage'

export default function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/details/:id" element={<DetailsPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/result" element={<ResultPage />} />
      </Routes>
    </div>
  )
}
