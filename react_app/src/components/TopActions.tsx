/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import * as cartActions from '../features/cartSelector'
import { Modal } from './modal/Modal'
import { Link } from 'react-router-dom'

type Props = {
  setSowNav: () => void
  showNav: boolean
}
export const TopActions: React.FC<Props> = ({ setSowNav, showNav }) => {
  const dispatch = useAppDispatch()
  const cartList = useAppSelector((state) => state.cart.cartList)
  const amount = cartList.reduce((a, c) => a + c.quantity * +c.price, 0)
  const [showModal, setShowModal] = useState(false)

  const person = useAppSelector((state) => state.person)
  const handleShowModal = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!person.active) {
      e.preventDefault()
      setShowModal(!showModal)
    }
  }

  useEffect(() => {
    setShowModal(false)
  }, [person])

  return (
    <div className="top-actions">
      {cartList.length > 0 && (
        <span
          className="top-actions__cart-amount"
          style={{
            borderColor: showNav ? 'black' : '#fff',
            color: showNav ? 'black' : '#fff',
          }}
        >
          {cartList.reduce((a, c) => a + c.quantity, 0)}
        </span>
      )}
      <img
        className="top-actions__cart"
        src={showNav ? 'images/cart-black.png' : 'images/cart-icon.png'}
        alt="cart icon"
        width={27}
        onClick={() => dispatch(cartActions.setShowCart(true))}
      />

      <span
        style={{
          color: showNav ? 'black' : '#fff',
        }}
      >
        {' '}
        {amount} UAH
      </span>
      <img
        src={
          showNav ? 'images/close-mobile-menu.png' : 'images/mobile-menu.png'
        }
        alt="mobile menu"
        width={27}
        className="top-actions__show-nav"
        onClick={setSowNav}
      />
      <Link to="account">
        <div
          className="top-actions__account"
          onClick={(e) => handleShowModal(e)}
        >
          <div className="top-actions__account--head"></div>
          <div className="top-actions__account--body"></div>
        </div>
      </Link>

      <Modal
        showModal={showModal}
        setShowModal={() => setShowModal(!showModal)}
      />
    </div>
  )
}
