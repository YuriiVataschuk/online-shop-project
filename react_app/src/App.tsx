import { Route, Routes, useLocation } from 'react-router-dom'
import { Cart } from './components/cart/Cart'
import { Footer } from './components/footer/Footer'
import { Header } from './components/header/Header'
import { HomePage } from './pages/HomePage'
import { ProductsPage } from './pages/ProductsPage'

const productItems = ['shirts', 'sweatshirts', 'hoodies']
function App() {
  const path = useLocation().pathname
  const index = productItems.indexOf(path.slice(1))
  return (
    <div className="app">
      <Header />
      <Cart />
      <Routes>
        <Route path={'/'} element={<HomePage />} />
        <Route path={productItems[index]} element={<ProductsPage />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App
