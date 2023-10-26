import React from 'react'
import { Card } from '../components/card/Card'

type Props = {
  items: any[]
}

export const ProductsPageList: React.FC<Props> = ({ items = [] }) => {
  return (
    <ul className="products-page__list">
      {items.map((item) => (
        <li className="products-page__item" key={item.id}>
          <Card item={{ ...item }} />
        </li>
      ))}
    </ul>
  )
}
