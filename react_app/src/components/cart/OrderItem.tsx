/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import React from 'react'
import { useAppSelector } from '../../app/hooks'
import { CartProduct } from '../../utils/types'

type Props = {
  item: CartProduct
}

export const OrderItem: React.FC<Props> = React.memo(({ item }) => {
  return (
    <li className="cart__order-item">
      <p className="cart__order-item--name">{item.name}</p>
      <p className="cart__order-item--size">
        size
        <span>{item.size}</span>
      </p>
      <p className="cart__order-item--qoantity">
        qoantity
        <span>{item.quantity}</span>
      </p>
      <span>{item.quantity * +item.price + ' UAH'}</span>
    </li>
  )
})
