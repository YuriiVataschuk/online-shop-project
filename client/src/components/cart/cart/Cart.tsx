import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { CartList } from '../list/CartList'
import { CartToggle } from '../toggle/CartToggle'
import { CartPanel } from '../panel/CartPanel'
import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import * as cartActions from '../../../features/cartSelector'

import styles from './cart.module.scss'

export const Cart = () => {
  const [checkout, setCheckout] = useState(false)
  const dispatch = useAppDispatch()
  const { showCart } = useAppSelector((state) => state.cart)
  const path = useLocation().pathname
  useEffect(() => {
    const Id = (e: MouseEvent) => {
      const target = e.target as HTMLDivElement
      if (
        target.className.includes('cart') ||
        target.className.includes('close') ||
        target.className.includes('size') ||
        target.className.includes('input') ||
        target.className.includes('button')
      )
        return
      setCheckout(false)
      dispatch(cartActions.setShowCart(false))
    }

    document.addEventListener('click', Id)

    return () => document.removeEventListener('click', Id)
  }, [showCart, dispatch])

  useEffect(() => {
    dispatch(cartActions.setShowCart(false))
  }, [path, dispatch])

  return (
    <div
      className={styles.cart}
      style={{
        top: showCart ? 0 : -1000,
      }}
    >
      <CartToggle />
      <CartList checkout={checkout} />
      <CartPanel setCheckout={setCheckout} checkout={checkout} />
    </div>
  )
}
