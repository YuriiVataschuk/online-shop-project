/* eslint-disable react/prop-types */
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { CartList } from './CartList'
import { CartToggle } from './CartToggle'
import { CartPanel } from './CartPanel'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import * as cartActions from '../../features/cartSelector'

export const Cart = () => {
  const dispatch = useAppDispatch()
  const { showCart } = useAppSelector((state) => state.cart)
  const path = useLocation().pathname
  useEffect(() => {
    const Id = (e: MouseEvent) => {
      const target = e.target as HTMLDivElement
      if (
        target.className.includes('cart') ||
        target.className.includes('size')
      )
        return

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
      className="cart"
      style={{
        top: showCart ? 0 : -1000,
      }}
    >
      <CartToggle />
      <CartList />
      <CartPanel />
    </div>
  )
}
