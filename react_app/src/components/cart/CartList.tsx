import React from 'react'
import { useAppSelector } from '../../app/hooks'

import { CartItem } from './CartItem'
import { OrderItem } from './OrderItem'

type Props = {
  checkout: boolean
}

export const CartList: React.FC<Props> = ({ checkout }) => {
  const { cartList } = useAppSelector((state) => state.cart)

  return (
    <ul
      className="cart__list"
      style={{
        height: checkout ? '50vh' : '65vh',
        transition: 'all 0.5s ease',
        paddingTop: checkout ? 0 : 40,
      }}
    >
      <h1 className="cart__list--title">My purhase</h1>
      {cartList.length ? (
        cartList.map((item) => (
          <li className="cart__item" key={item.name + item.id}>
            {checkout ? <OrderItem item={item} /> : <CartItem item={item} />}
          </li>
        ))
      ) : (
        <h3 className="cart__empty">CART IS EMPTY</h3>
      )}
    </ul>
  )
}
