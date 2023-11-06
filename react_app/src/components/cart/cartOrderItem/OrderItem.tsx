/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import React from 'react'

import { CartProduct } from '../../../utils/types'
import styles from './cart.order.item.module.scss'
import { useAppSelector } from '../../../app/hooks'

type Props = {
  item: CartProduct
}

export const OrderItem: React.FC<Props> = React.memo(({ item }) => {
  const lang = useAppSelector((state) => state.global)
  const isEng = lang === 'EN'
  return (
    <li className={styles.item}>
      <p className={styles.name}>{item.name}</p>
      <p className={styles.field}>
        {isEng ? 'size: ' : 'розір: '}
        <span>{item.size}</span>
      </p>
      <p className={styles.field}>
        {isEng ? 'qoantity: ' : 'кількість: '}
        <span className={styles.quantity}>{item.quantity}</span>
      </p>
      <span>{item.quantity * +item.price + (isEng ? ' UAH' : ' ГРН')}</span>
    </li>
  )
})
