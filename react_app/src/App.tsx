/* eslint-disable import/no-unresolved */
import { Route, Routes } from 'react-router-dom'
import { Cart } from './components/cart/Cart'
import { Footer } from './components/footer/Footer'
import { Header } from './components/header/Header'
import { HomePage } from './pages/HomePage'
import { ProductsPage } from './pages/productsPage/ProductsPage'
import { ProductPage } from './pages/ProductPage/ProductPage'
import { Account } from './pages/account/Account'
import { PageNotFound } from './pages/PageNotFound'

const productItems = ['shirts', 'sweatshirts', 'hoodies']

function App() {
  return (
    <div className="app">
      <Header />
      <Cart />
      <Routes>
        <Route path={'/'} element={<HomePage />} />
        <Route path={'account'} element={<Account />} />

        <Route path={productItems[0]}>
          <Route index element={<ProductsPage />} />
          <Route path=":id" element={<ProductPage />} />
        </Route>
        <Route path={productItems[1]}>
          <Route index element={<ProductsPage />} />
          <Route path=":id" element={<ProductPage />} />
        </Route>
        <Route path={productItems[2]}>
          <Route index element={<ProductsPage />} />
          <Route path=":id" element={<ProductPage />} />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App
