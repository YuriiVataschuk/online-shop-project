import { Card } from '../components/card/Card'

export const ProductsPage = () => {
  return (
    <main className="products-page">
      <h1 className="products-page__title">Products Page</h1>
      <div className="products-page__content">
        <ul className="products-page__list">
          <li className="products-page__item">
            <Card />
          </li>
          <li className="products-page__item">
            <Card />
          </li>
          <li className="products-page__item">
            <Card />
          </li>
        </ul>
      </div>
    </main>
  )
}
