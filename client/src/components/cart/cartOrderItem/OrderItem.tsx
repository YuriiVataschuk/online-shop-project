/* eslint-disable react/display-name */
import React from 'react'

import { CartProduct } from '../../../utils/types'
import styles from './cart.order.item.module.scss'
import { useAppSelector } from '../../../app/hooks'
import { translateContent } from '../../../utils/translate'

type Props = {
  item: CartProduct
}

export const OrderItem: React.FC<Props> = React.memo(({ item }) => {
  const lang = useAppSelector((state) => state.global)


  return (
    <li className={styles.item}>
      <p className={styles.name}>{item.name}</p>
      <p className={styles.field}>
        {translateContent('size: ', 'розір: ', lang)}
        <span>{item.size}</span>
      </p>
      <p className={styles.field}>
        {translateContent('qoantity: ', 'кількість: ', lang)}
        <span className={styles.quantity}>{item.quantity}</span>
      </p>
      <span>
        {item.quantity * +item.price + translateContent(' UAH', ' ГРН', lang)}
      </span>
    </li>
  )
})
