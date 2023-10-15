/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import classNames from 'classnames'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { SizeList } from '../SizeList'
import { useAppDispatch } from '../../app/hooks'
import * as cartActions from '../../features/cartSelector'
import { CartProduct } from '../../utils/types'

type Props = {
  item: CartProduct
}

export const CartItem: React.FC<Props> = ({ item }) => {
  const dispatch = useAppDispatch()

  const [quantity, setQuantity] = useState<number>(item.quantity)
  const [size, setSize] = useState<string>(item.size)
  useEffect(() => {
    dispatch(cartActions.setQuantity({ id: item.id, quantity: quantity }))
  }, [quantity])

  return (
    <div className="cart__item">
      <div className="cart__item--img">
        <img
          src="images/close-mobile-menu.png"
          alt="remove item"
          className="cart__item--remove"
          width={25}
          onClick={() => {
            dispatch(cartActions.removeFromCart(item.id))
          }}
        />
        <Link to={item.path}>
          <img src={item.image} width="100%" alt={item.name} />
        </Link>
      </div>

      <div className="cart__item--panel">
        <p className="cart__item--name">{item.name}</p>

        <p className="cart__item--quantity">
          <span>{quantity}</span>
          <button
            className={classNames('cart__item--minus', {
              disabled: quantity === 1,
            })}
            onClick={() => setQuantity(quantity - 1)}
          >
            -
          </button>
          <button
            className="cart__item--plus"
            onClick={() => setQuantity(quantity + 1)}
          >
            +
          </button>
        </p>
        <SizeList sizes={item.sizes} size={size} setSize={setSize} />
      </div>
    </div>
  )
}
