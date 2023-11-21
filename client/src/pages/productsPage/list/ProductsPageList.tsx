import React from 'react'
import { Card } from '../../../components/card/Card'

import styles from './products.list.module.scss'
import { ListProduct } from '../../../utils/types'

type Props = {
  items: ListProduct[]
  place: string
}

export const ProductsPageList: React.FC<Props> = ({ items = [], place }) => {
  return (
    <ul className={styles.list}>
      {items.map((item) => (
        <li className={styles.item} key={item.id}>
          <Card item={item} />
        </li>
      ))}
    </ul>
  )
}
