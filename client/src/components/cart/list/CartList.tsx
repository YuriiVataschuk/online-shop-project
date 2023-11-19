import React from 'react'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
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
    <TransitionGroup
      className={styles.list}
      style={{
        height: checkout ? '50vh' : '65vh',
        paddingTop: checkout ? 0 : 40,
      }}
    >
      {cartList.length > 0 ? (
        cartList.map((item) => (
          <CSSTransition
            key={item.name + item.id}
            timeout={500}
            classNames="fade"
          >
            <li className="cart__item">
              {checkout ? <OrderItem item={item} /> : <CartItem item={item} />}
            </li>
          </CSSTransition>
        ))
      ) : (
        <CSSTransition key="empty" timeout={200} classNames="fade">
          <h1 className={styles.title}>
            {isEng ? 'CART IS EMPTY' : 'КОРЗИНА ПОРОЖНЯ'}
          </h1>
        </CSSTransition>
      )}
    </TransitionGroup>
  )
}
