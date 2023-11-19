/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */

import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import * as cartActions from '../../features/cartSelector'
import { Modal } from '../modal/Modal'
import { Link } from 'react-router-dom'

import styles from './top-actions.module.scss'
import { translateContent } from '../../utils/translate'

type Props = {
  setSowNav: () => void
  showNav: boolean
}
export const TopActions: React.FC<Props> = ({ setSowNav, showNav }) => {
  const lang = useAppSelector((state) => state.global)
  const dispatch = useAppDispatch()
  const cartList = useAppSelector((state) => state.cart.cartList)
  const amount = cartList.reduce((a, c) => a + c.quantity * +c.price, 0)
  const [showModal, setShowModal] = useState(false)

  const person = useAppSelector((state) => state.person)
  const handleShowModal = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (person.token) {
      setShowModal(false)
    } else {
      e.preventDefault()
      setShowModal(true)
    }
  }

  useEffect(() => {
    setShowModal(false)
  }, [person])

  return (
    <div className={styles.topActions}>
      {cartList.length > 0 && (
        <span
          className={styles.cartAmount}
          style={{
            borderColor: showNav ? 'black' : '#fff',
            color: showNav ? 'black' : '#fff',
          }}
        >
          {cartList.reduce((a, c) => a + c.quantity, 0)}
        </span>
      )}
      <img
        className={styles.cart}
        src={showNav ? 'images/cart-black.png' : 'images/cart-icon.png'}
        alt={translateContent('cart icon', 'іконка кошика', lang)}
        width={27}
        onClick={() => dispatch(cartActions.setShowCart(true))}
      />

      <span
        style={{
          color: showNav ? 'black' : '#fff',
        }}
      >
        {' '}
        {amount.toFixed(2)} {translateContent('UAH', 'ГРН', lang)}
      </span>
      <img
        src={
          showNav ? 'images/close-mobile-menu.png' : 'images/mobile-menu.png'
        }
        alt={translateContent('mobile menu', 'меню для мобільного', lang)}
        width={27}
        className={styles.showNav}
        onClick={setSowNav}
      />
      <Link to="account">
        <div className={styles.account} onClick={(e) => handleShowModal(e)}>
          <div className={styles.head}></div>
          <div className={styles.body}></div>
        </div>
      </Link>

      <Modal
        showModal={showModal}
        setShowModal={() => setShowModal(!showModal)}
      />
    </div>
  )
}
