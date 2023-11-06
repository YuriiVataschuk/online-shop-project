import React from 'react'
import { useAppSelector } from '../../../app/hooks'

import { CartItem } from '../item/item/CartItem'
import { OrderItem } from '../cartOrderItem/OrderItem'
import styles from './cart-list.module.scss'

type Props = {
  checkout: boolean
}

export const CartList: React.FC<Props> = ({ checkout }) => {
  const { cartList } = useAppSelector((state) => state.cart)
  const lang = useAppSelector((state) => state.global)
  const isEng = lang === 'EN'

  return (
    <ul
      className={styles.list}
      style={{
        height: checkout ? '50vh' : '65vh',
        transition: 'all 0.5s ease',
        paddingTop: checkout ? 0 : 40,
      }}
    >
      <h1 className={styles.title}>{isEng ? 'My purhase' : 'Мої покупки'}</h1>
      {cartList.length ? (
        cartList.map((item) => (
          <li className="cart__item" key={item.name + item.id}>
            {checkout ? <OrderItem item={item} /> : <CartItem item={item} />}
          </li>
        ))
      ) : (
        <h3 className="cart__empty">
          {isEng ? 'CART IS EMPTY' : 'КОРЗИНА ПОРОЖНЯ'}
        </h3>
      )}
    </ul>
  )
}
