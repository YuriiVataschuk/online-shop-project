/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/display-name */

import React from 'react'
import { Link } from 'react-router-dom'

import { useAppDispatch } from '../../../../app/hooks'
import * as cartActions from '../../../../features/cartSelector'
import { CartProduct } from '../../../../utils/types'

import styles from './cart-item.module.scss'
import { CartItemPanel } from '../panel/CartItemPanel'

type Props = {
  item: CartProduct
}

export const CartItem: React.FC<Props> = React.memo(({ item }) => {
  const dispatch = useAppDispatch()
  return (
    <div className={styles.item}>
      <div className={styles.img}>
        <img
          src="images/close-mobile-menu.png"
          alt="remove item"
          className={styles.remove}
          width={25}
          onClick={() => {
            dispatch(cartActions.removeFromCart(item.id))
          }}
        />
        <Link to={item.path}>
          <img src={item.image} width="100%" alt={item.name} />
        </Link>
      </div>
      <CartItemPanel item={item} />
    </div>
  )
})
